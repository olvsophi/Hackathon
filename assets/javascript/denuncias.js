import { db, collection, auth } from './firebaseconfig.js';
import { getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { mostrarCarregamento, esconderCarregamento } from "./geral.js";

const form = document.getElementById('pesquisa');
const pesquisa = document.getElementById('pesquisaUsuario');
const comentarios = document.querySelector(".comentarios");

const ITENS_POR_PAGINA = 5;
let paginaAtual = 1;

const containerPaginacao = document.createElement("div");
containerPaginacao.classList.add("paginacao");
comentarios.insertAdjacentElement("afterend", containerPaginacao);

form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const termo = pesquisa.value.trim();

    if (termo === "") {
        return;
    }

    buscarDenunciaFeita(termo);
});

async function pegarDenuncias() {
    mostrarCarregamento();
    try {
        const resultado = await getDocs(collection(db, "denuncias"));
        return resultado;
    } catch (erro) {
        console.error(erro);
    } finally {
        esconderCarregamento();
    }
}


function criarHtmlDenuncia(dados, ehResultadoDeBusca) {
    const icone = dados.resolvido
        ? "../assets/icones/botao-like.svg"
        : "../assets/icones/botao-dislike.svg";

    return `
        <article class="denuncias-comentarios">
            <div class="perfis">
                <img src="../assets/icones/icone-de-perfil.svg">
                <p>Anônimo</p>
            </div>

            <div class="container-comentario">
                <div class="comentario">
                    <h3>${dados.topico}</h3>
                    <p>${dados.problema}</p>
                </div>

                <div class="botoes">
                    <div>
                        <p class="resultado">O problema foi resolvido?</p>
                        <img src="${icone}">
                    </div>
                </div>
            </div>
        </article>
    `;
}


async function carregarHTML() {
    comentarios.innerHTML = "";

    const resultado = await pegarDenuncias();

    if (!resultado) {
        return;
    }

    resultado.forEach((doc) => {
        const dados = doc.data();
        const htmlDoCard = criarHtmlDenuncia(dados, false);
        comentarios.innerHTML += htmlDoCard;
    });

    paginaAtual = 1;
    aplicarPaginacao();
}


form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    buscarDenunciaFeita(pesquisa.value);
});

async function buscarDenunciaFeita(termo) {

    if (termo.trim() === "") {
        carregarHTML();
        return;
    }

    comentarios.innerHTML = "";

    const resultado = await pegarDenuncias();

    if (!resultado) {
        return;
    }

    const palavrasBuscadas = termo.toLowerCase().trim().split(/\s+/);
    let encontrou = false;

    resultado.forEach((doc) => {
        const dados = doc.data();
        const topicoMinusculo = dados.topico.toLowerCase();

        const encontrouPalavra = palavrasBuscadas.some((palavra) =>
            topicoMinusculo.includes(palavra)
        );

        if (encontrouPalavra) {
            encontrou = true;
            comentarios.innerHTML += criarHtmlDenuncia(dados, true);
        }
    });

    let mensagem = document.getElementById("nao-encontrado");

    if (!mensagem) {
        mensagem = document.createElement("p");
        mensagem.id = "nao-encontrado";
        comentarios.parentNode.insertBefore(mensagem, comentarios);
    }

    if (!encontrou) {
        mensagem.textContent = `Nenhuma denúncia encontrada para "${termo}".`;
    } else {
        mensagem.textContent = "";
    }

    paginaAtual = 1;
    aplicarPaginacao();
}


function aplicarPaginacao() {
    const artigos = comentarios.querySelectorAll("article");
    const totalDeArtigos = artigos.length;
    const totalPaginas = Math.ceil(totalDeArtigos / ITENS_POR_PAGINA) || 1;

    if (paginaAtual > totalPaginas) {
        paginaAtual = totalPaginas;
    }

    artigos.forEach((artigo, index) => {
        const paginaDesseItem = Math.floor(index / ITENS_POR_PAGINA) + 1;

        if (paginaDesseItem === paginaAtual) {
            artigo.style.display = "";
        } else {
            artigo.style.display = "none";
        }
    });

    renderizarBotoesPaginacao(totalPaginas, totalDeArtigos);
}


function renderizarBotoesPaginacao(totalPaginas, totalItens) {
    containerPaginacao.innerHTML = "";

    if (totalItens === 0 || totalPaginas <= 1) {
        return;
    }

    const anteriorDesativado = paginaAtual === 1 ? "disabled" : "";
    const proximaDesativada = paginaAtual === totalPaginas ? "disabled" : "";

    containerPaginacao.innerHTML = `
        <button type="button" id="btnAnterior" ${anteriorDesativado}>Anterior</button>
        <span class="info-pagina">Página ${paginaAtual} de ${totalPaginas}</span>
        <button type="button" id="btnProxima" ${proximaDesativada}>Próxima</button>
    `;

    document.getElementById("btnAnterior").addEventListener("click", () => {
        paginaAtual = paginaAtual - 1;
        aplicarPaginacao();
    });

    document.getElementById("btnProxima").addEventListener("click", () => {
        paginaAtual = paginaAtual + 1;
        aplicarPaginacao();
    });
}


const termoSalvo = localStorage.getItem("pesquisaDenuncia");

if (termoSalvo) {
    pesquisa.value = termoSalvo;
    localStorage.removeItem("pesquisaDenuncia");
    buscarDenunciaFeita(termoSalvo);
} else {
    carregarHTML();
}

