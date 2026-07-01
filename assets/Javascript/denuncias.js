import { db, collection, auth, onAuthStateChanged } from './firebaseconfig.js';
import { getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

let idUsuario = null;

const form = document.getElementById('pesquisa');
const pesquisa = document.getElementById('pesquisaUsuario');
const comentarios = document.querySelector(".comentarios");

const ITENS_POR_PAGINA = 5;
let paginaAtual = 1;

const containerPaginacao = document.createElement("div");
containerPaginacao.classList.add("paginacao");
comentarios.insertAdjacentElement("afterend", containerPaginacao);


onAuthStateChanged(auth, (usuario) => {
    if (usuario) {
        idUsuario = usuario.uid;
    } else {
        idUsuario = null;
        sessionStorage.setItem("paginaAnterior", window.location.href);
        window.location.href = "../pages/login.html";
    }
});


form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const termo = pesquisa.value.trim();

    if (termo === "") {
        return;
    }

    buscarDenunciaFeita(termo);
});


async function pegarDenuncias() {
    try {
        const resultado = await getDocs(collection(db, "denuncias"));
        return resultado;
    } catch (erro) {
        console.error(erro);
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

                    <button class="denunciar">
                        <img src="../assets/icones/icone-denunciar-primario.svg">
                    </button>
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


async function buscarDenunciaFeita(termo) {
    comentarios.innerHTML = "";

    const resultado = await pegarDenuncias();

    if (!resultado) {
        return;
    }

    resultado.forEach((doc) => {
        const dados = doc.data();

        if (dados.topico === termo) {
            const htmlDoCard = criarHtmlDenuncia(dados, true);
            comentarios.innerHTML += htmlDoCard;
        }
    });

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

carregarHTML();



// async function buscarSimplificado(termoDigitado) {
//     if (!termoDigitado) return [];

//     // 1. Transforma o que foi digitado em um array de palavras minúsculas
//     // Ex: "camisa azul" vira ["camisa", "azul"]
//     const palavrasBuscadas = termoDigitado.toLowerCase().trim().split(/\s+/);

//     // Busca os dados no Firebase
//     const querySnapshot = await getDocs(collection(db, "produtos"));
//     const resultados = [];

//     querySnapshot.forEach((doc) => {
//         const produto = doc.data();
//         const nomeProduto = produto.nome.toLowerCase();

//         // 2. Verifica se pelo menos uma das palavras buscadas está no nome do produto
//         const encontrou = palavrasBuscadas.some(palavra => nomeProduto.includes(palavra));

//         if (encontrou) {
//             resultados.push(produto);
//         }
//     });

//     return resultados;
// }