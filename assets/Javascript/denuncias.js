import { db, collection } from './firebaseconfig.js';
import { query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const form = document.getElementById('pesquisa');
const pesquisa = document.getElementById('pesquisaUsuario');

form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const termoPesquisa =  pesquisa.value.trim();
    
    if(termoPesquisa === ''){
        // alert("Digite algo para pesquisar!")
        return;
    }

    buscarDenunciaFeita(termoPesquisa);
});

const comentarios = document.querySelector(".comentarios")

async function carregarHTML() {
    comentarios.innerHTML = ""
    const resultado = await pegarDenunciasDoFirebase()
        resultado.forEach((denuncia) => {
            const dados = denuncia.data();


            comentarios.innerHTML += `<article>
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
                            <button class="like">
                                <img src="../assets/icones/botao-like-neutro.svg" alt="like">
                            </button>
                            <button class="dislike">
                                <img src="../assets/icones/botao-dislike-neutro.svg" alt="dislike">
                            </button>
                        </div>
                        <button class="denunciar">
                            <img src="../assets/icones/icone-denunciar-primario.svg" alt="denunciar">
                        </button>`
        });
}
carregarHTML()

async function pegarDenunciasDoFirebase(){
    try {
    
        const resultado = await getDocs(collection(db, "denuncias")); 
        return resultado 
    }catch(e){
        alert("erro ao buscar denuncias")
    }
           
}

async function buscarDenunciaFeita(termoPesquisa){

    comentarios.innerHTML = ""    
    const resultado = await pegarDenunciasDoFirebase()

    resultado.forEach((denuncia) => {
        const dados = denuncia.data();
        if (dados.topico === termoPesquisa) {
            
            comentarios.innerHTML += `<article>
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
                            <button class="like">
                                <img src="../assets/icones/botao-like-neutro.svg" alt="like">
                            </button>
                            <button class="dislike">
                                <img src="../assets/icones/botao-dislike-neutro.svg" alt="dislike">
                            </button>
                        </div>
                        <button class="denunciar">
                            <img src="../assets/icones/icone-denunciar-primario.svg" alt="denunciar">
                        </button>
                    </div>
                </div>
            </article>`

        }
    });
};

// Coisas a fazer aqui
/*
Barra de pesquisa
innerHTML - pras denuncias
mostrar oq o usuario pesquisou na barra de pesquisa
*/
