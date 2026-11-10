from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

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

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5050)