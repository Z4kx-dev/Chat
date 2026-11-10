import os
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Libera o acesso para o seu front-end no GitHub Pages
CORS(app) 

@app.route('/')
def index():
    return jsonify({"status": "API online"}), 200

@app.route('/health', methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200

@app.route('/api/conversas', methods=["GET"])
def nome():
    dados = {
  "conversas": [
    {
      "id": "DeveriaTerUmHashAqui",
      "mensagens": [
        {
          "id": "DeveriaTerUmHashAqui",
          "remetente": "Raphael",
          "conteudo": "Olá! seu cabaçoide",
          "horario": "2026-11-09T14:30:00-03:00",
          "tipo": "texto",
          "status": "enviada"
        }
      ]
    }
  ]
}

    jsonVazia = jsonify(dados)
    return jsonVazia

@app.route('/api/conversas', methods=["POST"])
def post():
    dados = request.get_json()
    resultado = jsonify(dados)
    api = dados["conversas"][0]["mensagens"][0]
    print(api["conteudo"])
    return(resultado)

