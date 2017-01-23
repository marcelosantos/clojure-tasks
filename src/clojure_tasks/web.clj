(ns clojure-tasks.web
  (:require [compojure.core :refer [defroutes GET PUT POST DELETE ANY]]
            [compojure.handler :refer [site]]
            [compojure.route :as route]
            [clojure.java.io :as io]
            [ring.adapter.jetty :as jetty]
            ;[ring.util.response :as resp]
            [environ.core :refer [env]]))

(defn inicial []
    (io/resource "public/index.html"))

(defn splash []
  {:status 200
   :headers {"Content-Type" "text/plain"}
   :body "Hello from Heroku"})

(defn listing []
 {:status 200
  :headers {"Content-Type" "application/json"}
  :body "[{\"id_atividade\":\"095b19fe3009b23415c5c9172599c6d14b34eee9\",\"titulo\":\"Implementar\",\"descricao\":\"Algo\",\"status\":\"false\",\"dt_criacao\":\"2017-01-13\"}]"})

(defn addtask []
 {:status 200
  :headers {"Content-Type" "application/json"}
  :body "[{\"id_atividade\":\"095b19fe3009b23415c5c9172599c6d14b34eee9\",\"titulo\":\"ABC\",\"descricao\":\"DEF\",\"status\":\"false\",\"dt_criacao\":\"2017-01-14\"}]"})

(defn edittask []
 {:status 200
  :headers {"Content-Type" "application/json"}
  :body "[{\"id_atividade\":\"095b19fe3009b23415c5c9172599c6d14b34eee9\",\"titulo\":\"ABC\",\"descricao\":\"DEF\",\"status\":\"false\",\"dt_criacao\":\"2017-01-14\"}]"})

(defn removetask []
 {:status 200
  :headers {"Content-Type" "application/json"}
  :body "[{\"id_atividade\":\"095b19fe3009b23415c5c9172599c6d14b34eee9\",\"titulo\":\"ABC\",\"descricao\":\"DEF\",\"status\":\"false\",\"dt_criacao\":\"2017-01-14\"}]"})

(defn viewtask []
 {:status 200
  :headers {"Content-Type" "application/json"}
  :body "[{\"id_atividade\":\"095b19fe3009b23415c5c9172599c6d14b34eee9\",\"titulo\":\"ABC\",\"descricao\":\"DEF\",\"status\":\"false\",\"dt_criacao\":\"2017-01-14\"}]"})

(defn show []
    (io/resource "show.html"))

(defroutes app
  ;(GET "/" [] (resp/file-response "index.html" {:root "public"}))
  (GET "/" []
       (inicial))
  (POST "/api/adicionar" []
       (addtask))
  (PUT "/api/editar" []
       (edittask))
  (DELETE "/api/remover" []
       (removetask))
  (DELETE "/api/visualizar" []
       (viewtask))
  (GET "/api/listar" []
       (listing))
  (GET "/show" []
       (show))
  (route/resources "/")
  (ANY "*" []
       (route/not-found (slurp (io/resource "404.html")))))

(defn -main [& [port]]
  (let [port (Integer. (or port (env :port) 5000))]
    (jetty/run-jetty (site #'app) {:port port :join? false})))

;; For interactive development:
;; (.stop server)
;; (def server (-main))
