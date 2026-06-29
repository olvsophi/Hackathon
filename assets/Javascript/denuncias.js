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

async function buscarDenunciaFeita(termoPesquisa){
    console.log(`Buscando por: ${termoPesquisa}`);
    
    try {
        const resultado = await getDocs(collection(db, "denuncias"));
        
        resultado.forEach((denuncia) => {
            const dados = denuncia.data();
            if (dados.topico === termoPesquisa) {
                console.log(dados);
                // AQUI VAI ENTRAR O INNERHTML
            }
        });

    } catch (erro) {
        console.error(erro);
    }
};

// Coisas a fazer aqui
/*
Barra de pesquisa
innerHTML - pras denuncias
mostrar oq o usuario pesquisou na barra de pesquisa
*/
