(function(){

    angular.module('oquefazer.app')
        .controller('ListaController', ['$scope', '$http', '$location','$timeout', ListaController]);

    function ListaController ($scope, $http, $location, $timeout) {

        //Declaração de propriedades do controller
        var self = this;

        //self.HOST = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
        self.HOST = "/api";

        self.form_cadastro = true;
        self.form_edicao = false;

        self.listagem = [];
        self.listagem_pendentes = [];
        self.listagem_finalizados = [];
        self.atividade = {};
        self.atividade.status = false;

        self.adicionar = adicionar;
        self.listar = listar;
        self.visualizar = visualizar;
        self.editar = editar;
        self.limpar = limpar;
        self.excluir = excluir;
        self.finalizar = finalizar;
        self.pendenciar = pendenciar;

        listar();

        //Atualiza listagem
        function atualizarListagem(atividades){

            self.listagem_pendentes = [];
            self.listagem_finalizados = [];

            for (var i = 0; i < atividades.length; i++){
                //console.log(atividades[i]);
                if(atividades[i].status == 'false'){
                    self.listagem_pendentes.push(atividades[i]);
                }else{
                    self.listagem_finalizados.push(atividades[i]);
                }

            }

            self.atividade = {};
            self.atividade.status = false;

            self.atividadeEdicao = {};
            self.atividadeEdicao.status = false;

        }

        //Função para adicionar atividade
        function adicionar(atividade) {

            self.atividade = {
                "titulo": atividade.titulo,
                "descricao": atividade.descricao,
                "status": atividade.status,
                "_token": $("input[name='_token']").val()
            };

            $http.post(self.HOST + '/adicionar', self.atividade)
                .then(sucessoAdicao,erroAdicao);

        };

        function sucessoAdicao (response) {
            self.listagem = response.data;
            atualizarListagem(self.listagem);
            Materialize.toast('Atividade cadastrada com sucesso!', 4000);
        }

        function erroAdicao() {
            var ERRO = "Erro ao criar atividade";
            Materialize.toast(ERRO, 6000);
        }

        //Função para listar atividades
        function listar() {

            $http.get(self.HOST + '/listar')
                .then(sucessoListagem,erroListagem);

        };

        function sucessoListagem (response) {
            self.listagem = response.data;
            atualizarListagem(self.listagem);
            //$timeout(listar, 10000);
        }

        function erroListagem() {
            var ERRO = "Erro ao listar atividades";
            Materialize.toast(ERRO, 6000);
        }

        //Função para visualizar atividade
        function visualizar(atividade){

            self.form_cadastro = false;
            self.form_edicao = true;

            $(".formulario-de-edicao #titulo").focus();

            self.atividadeEdicao = atividade;

        }

        //Função para editar atividade
        function editar() {

            $http.post(self.HOST + '/editar', self.atividadeEdicao)
                .then(sucessoEdicao,erroEdicao);

        };

        function sucessoEdicao(response) {

            self.listagem = response.data;
            atualizarListagem(self.listagem);
            self.form_cadastro = true;
            self.form_edicao = false;
            self.atividadeEdicao = {};
            Materialize.toast('Atividade atualizada com sucesso!', 4000);

        }

        function erroEdicao() {
            var ERRO = "Erro ao editar atividade";
            Materialize.toast(ERRO, 6000);
        }

        //Função para remover todas as atividades cadastradas
        function limpar() {

            $http.post(self.HOST + '/limpar')
                .then(sucessoLimpeza,erroLimpeza);

        };

        function sucessoLimpeza(response) {

            self.listagem = response.data;
            atualizarListagem(self.listagem);
            Materialize.toast('Atividades removidas com sucesso!', 4000);

        }

        function erroLimpeza() {
            var ERRO = "Erro ao remover atividades";
            Materialize.toast(ERRO, 6000);
        }

        //Função para excluir atividade
        function excluir(atividade) {

            self.atividade = {
                "id_atividade": atividade.id_atividade,
            };

            $http.post(self.HOST + '/excluir', self.atividade)
                .then(sucessoExclusao,erroExclusao);

        };

        function sucessoExclusao(response) {

            self.listagem = response.data;
            atualizarListagem(self.listagem);
            Materialize.toast('Atividade removida com sucesso!', 4000);

        }

        function erroExclusao() {
            var ERRO = "Erro ao remover atividade";
            Materialize.toast(ERRO, 6000);
        }

        //Função para finalizar atividade
        function finalizar(atividade) {

            self.atividade = {
                "id_atividade": atividade.id_atividade,
            };

            $http.post(self.HOST + '/finalizar', self.atividade)
                .then(sucessoFinalizacao,erroFinalizacao);

        };

        function sucessoFinalizacao(response) {

            self.listagem = response.data;
            atualizarListagem(self.listagem);
            Materialize.toast('Atividade finalizada com sucesso!', 4000);

        }

        function erroFinalizacao() {
            var ERRO = "Erro ao finalizar atividade";
            Materialize.toast(ERRO, 6000);
        }

        //Função para tornar uma atividade pendente novamente
        function pendenciar(atividade) {

            self.atividade = {
                "id_atividade": atividade.id_atividade,
            };

            $http.post(self.HOST + '/pendenciar', self.atividade)
                .then(sucessoPendenciacao,erroPendenciacao);

        };

        function sucessoPendenciacao(response) {

            self.listagem = response.data;
            atualizarListagem(self.listagem);
            Materialize.toast('Atividade pendente novamente!', 4000);

        }

        function erroPendenciacao() {
            var ERRO = "Erro ao tornar atividade pendente";
            Materialize.toast(ERRO, 6000);
        }

    }

})();
