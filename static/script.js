// Constantes
const caixaMensagem = document.querySelector(".caixa-mensagem");
const botaoEnviarMensagem = document.querySelector(".envio");
const elementoRaizMensagens = document.querySelector(".mensagens");


async function postAPI(MID, ID, Remetente, Conteudo, Tipo, Status) {
    const dados = {
        conversas: [
            {
                id: ID,
                mensagens: [
                    {
                        id: MID,
                        remetente: Remetente,
                        conteudo: Conteudo,
                        tipo: Tipo,
                        status: Status
                    },
                ],
            },
        ],
    };
    const post = await fetch(
        "https://chat-gvy6/api/conversas",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                     },
            body: JSON.stringify(dados)
        }
    )
    let resultado = post.ok;
    return resultado
}
// Função para pegar mensagens da API
async function getAPI() {
    const resposta = await fetch("/api/conversas");
    const api = await resposta.json();
    
    // Ajustado para o formato do seu JSON (com conversas)
    const msg = api.conversas[0].mensagens[0];
    
    // Retorna um OBJETO com todos os dados
    return {
        nome: msg.remetente,
        UID: api.conversas[0].id,
        MID: msg.id,
        conteudo: msg.conteudo,
        horario: msg.horario,
        status: msg.status,
        tipo: msg.tipo
    };
}

// Função de registrar Horário
function registrarHorario() {
    const agora = new Date();
    const horas = agora.getHours().toString().padStart(2, "0");
    const minutos = agora.getMinutes().toString().padStart(2, "0");
    return `${horas}:${minutos}`;
}

// Agora a função é async e recebe (texto, remetente) na ordem certa
async function criarMensagem(texto, remetente) {
    const divisao = document.createElement("div");
    const paragrafo = document.createElement("p");
    const horarioDeEnvio = document.createElement("span");
    const horario = registrarHorario();

    let content = texto; // Usa o texto recebido por padrão

    if (remetente === "usuario") {
        divisao.classList.add("mensagem-usuario");
        horarioDeEnvio.classList.add("horarios-u");
    } 
    else if (remetente === "received") {
        divisao.classList.add("mensagem-receive");
        horarioDeEnvio.classList.add("horarios-r");
        
        // Busca os dados da API e usa o conteúdo dela
        const dadosAPI = await getAPI();
        content = dadosAPI.conteudo; 
    }

    // Define os textos das mensagens
    paragrafo.textContent = content;
    horarioDeEnvio.textContent = horario;

    // Cria as mensagens na tela
    elementoRaizMensagens.appendChild(divisao);
    divisao.appendChild(paragrafo);
    divisao.appendChild(horarioDeEnvio);    
}

// Função de receber Mensagem
async function receberMensagem() {
    let mensagem = "Teste concluido! pode passar para próxima fase.";
    if (mensagem !== "") {
        criarMensagem(mensagem, "received");
    }
}

// Função de enviar Mensagem
async function enviarMensagem() {
    let mensagem = caixaMensagem.value.trim();

    if (mensagem !== "") {
        mensagem = caixaMensagem.value;
        const resultado = await postAPI("Teste", "TesteID", "Teste", mensagem, "texto", "enviada");
        if (resultado === true) {
        criarMensagem(mensagem, "usuario");
        caixaMensagem.value = "";
        setTimeout(receberMensagem, 1000);
        }
        else {
            console.error("deu erro ai");
            
        }
    } else {
        alert("Insira uma mensagem antes de enviá-la por favor...");
    }
}

// Eventos
botaoEnviarMensagem.addEventListener("click", enviarMensagem);

caixaMensagem.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        enviarMensagem();
    }
});
