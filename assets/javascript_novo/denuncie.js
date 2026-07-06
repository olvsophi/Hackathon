import { db, collection, addDoc, onAuthStateChanged, auth } from './firebaseconfig.js';
import { getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { mostrarCarregamento, esconderCarregamento } from "./geral.js";

let idUsuario = null;
let resolvido = false;

const regex = /www|http|https/i;

const btnEnviarDenuncia = document.querySelector('.botao-envio');
const btnLike = document.querySelector('.like');
const btnDislike = document.querySelector('.dislike');
const imgLike = document.querySelector("#like img");
const imgDislike = document.querySelector("#dislike img");

const comentarios = document.querySelector(".comentarios");

const ITENS_POR_PAGINA = 5;
let paginaAtual = 1;

const containerPaginacao = document.createElement("div");
containerPaginacao.classList.add("paginacao");
comentarios.insertAdjacentElement("afterend", containerPaginacao);


onAuthStateChanged(auth, (usuario) => {
    if (!usuario) {
        sessionStorage.setItem("paginaAnterior", window.location.href);
        window.location.href = "../pages/login.html";
    } else {
        idUsuario = usuario.uid;
    }
});


btnLike.addEventListener('click', () => {
    resolvido = true;
    imgLike.src = "../assets/icones/botao-like.svg";
    imgDislike.src = "../assets/icones/botao-dislike-neutro.svg";
});

btnDislike.addEventListener('click', () => {
    resolvido = false;
    imgLike.src = "../assets/icones/botao-like-neutro.svg";
    imgDislike.src = "../assets/icones/botao-dislike.svg";
});


btnEnviarDenuncia.addEventListener('click', async () => {
    const topico = document.getElementById("topico").value.trim();
    const problema = document.getElementById("problema").value.trim();

    if (topico === "" || problema === "") {
        mostrarPopup("Preencha todos os campos!");
        return;
    }

    if (regex.test(topico) || regex.test(problema)) {
        mostrarPopup("Não é permitido enviar links!");
        return;
    }

    try {
        const denunciaRef = collection(db, "denuncias");

        await addDoc(denunciaRef, {
            topico: topico,
            problema: problema,
            resolvido: resolvido,
            idUsuario: idUsuario
        });

        document.getElementById("topico").value = "";
        document.getElementById("problema").value = "";
        resolvido = false;

        mostrarPopup("Denúncia enviada com sucesso!");
        carregarHTML();
    } catch (e) {
        console.error(e);
    }
});


async function pegarDenunciasDoFirebase() {

    try {
        const denuncias = await getDocs(collection(db, "denuncias"));
        const resultado = [];

        for (let denuncia of denuncias.docs) {
            const dados = denuncia.data();

            if (dados.idUsuario === idUsuario) {
                dados.id = denuncia.id;
                resultado.push(dados);
            }
        }

        return resultado;
    } catch (e) {
        mostrarPopup("Erro ao buscar denúncias.");
        console.error(e);
        return null;
    }
}


function criarHtmlDenuncia(dados) {
    const icone = dados.resolvido
        ? "../assets/icones/botao-like.svg"
        : "../assets/icones/botao-dislike.svg";

    return `
        <article class="denuncia-denuncie">
            <div class="perfis">
                <img src="../assets/icones/icone-de-perfil.svg" alt="Foto de perfil">
                <p>Anônimo</p>
            </div>
            <div class="container-comentario">
                <div class="comentario">
                    <h3>${dados.topico}</h3>
                    <p>${dados.problema}</p>
                </div>
                <div class="botoes">
                    <div>
                        <p class="resultado">A denúncia foi resolvida?</p>
                        <img src="${icone}" alt="like">
                    </div>
                    <button class="lixeira" data-id="${dados.id}">
                        <img src="../assets/icones/lixeira.png" alt="deletar">
                    </button>
                </div>
            </div>
        </article>
    `;
}

async function carregarHTML() {
    const mensagemVazia = document.getElementById("semDenuncias");
    mostrarCarregamento ();
    comentarios.innerHTML = "";

    const resultado = await pegarDenunciasDoFirebase();
    esconderCarregamento();

    if (!resultado) {
        return;
    }

    if (mensagemVazia) {
        if (resultado.length === 0) {
            mensagemVazia.style.display = "block";
        } else {
            mensagemVazia.style.display = "none";
        }
    }

    resultado.forEach((dados) => {
        comentarios.innerHTML += criarHtmlDenuncia(dados);
    });

    document.querySelectorAll(".lixeira").forEach((botao) => {
        botao.addEventListener("click", async () => {
            const confirmar = await confirmarAcao("Deseja apagar esta denúncia?");
            if (!confirmar) return;

            try {
                await deleteDoc(doc(db, "denuncias", botao.dataset.id));
                carregarHTML();
            } catch (e) {
                console.error(e);
                mostrarPopup("Erro ao apagar denúncia.");
            }
        });
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