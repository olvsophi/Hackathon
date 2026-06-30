import { db, collection, auth, onAuthStateChanged } from './firebaseconfig.js';
import { query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

let idUsuario = null;

onAuthStateChanged(auth, (usuario) => {
    if (usuario) {
        idUsuario = usuario.uid;
    } else {
        idUsuario = null;
    }
});

const form = document.getElementById('pesquisa');
const pesquisa = document.getElementById('pesquisaUsuario');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const termo = pesquisa.value.trim();
    if (!termo) return;

    buscarDenunciaFeita(termo);
});

const comentarios = document.querySelector(".comentarios");

async function carregarHTML() {
    comentarios.innerHTML = "";

    const resultado = await pegarDenuncias();

    if (!resultado) return;

    resultado.forEach((doc) => {
        const dados = doc.data();

        const url = dados.resolvido
            ? "../assets/icones/botao-like.svg"
            : "../assets/icones/botao-dislike.svg";

        comentarios.innerHTML += `
        <article>
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
                        <p class="resultado">A denúncia foi resolvida?</p>
                        <img src="${url}">
                    </div>

                    <button class="denunciar">
                        <img src="../assets/icones/icone-denunciar-primario.svg">
                    </button>
                </div>
            </div>
        </article>`;
    });
}

carregarHTML();

async function pegarDenuncias() {
    try {
        return await getDocs(collection(db, "denuncias"));
    } catch (e) {
        console.error(e);
    }
}

async function buscarDenunciaFeita(termo) {
    comentarios.innerHTML = "";

    const resultado = await pegarDenuncias();

    if (!resultado) return;

    resultado.forEach((doc) => {
        const dados = doc.data();

        if (dados.topico === termo) {
            comentarios.innerHTML += `
            <article>
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
                            <button class="like">
                                <img src="../assets/icones/botao-like-neutro.svg">
                            </button>

                            <button class="dislike">
                                <img src="../assets/icones/botao-dislike-neutro.svg">
                            </button>
                        </div>

                        <button class="denunciar">
                            <img src="../assets/icones/icone-denunciar-primario.svg">
                        </button>
                    </div>
                </div>
            </article>`;
        }
    });
}

// Coisas a fazer aqui
/*
Barra de pesquisa
innerHTML - pras denuncias
mostrar oq o usuario pesquisou na barra de pesquisa
*/
