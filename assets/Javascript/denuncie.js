import { db, collection, addDoc, onAuthStateChanged, auth} from './firebaseconfig.js'
import { query, where, getDocs, deleteDoc ,doc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
let idUsuario = null

onAuthStateChanged(auth, (usuario) =>{
    if(!usuario) {
        window.location.href = "../pages/login.html";
    }
    idUsuario = usuario.uid
});

let resolvido = false;
const regex = /www|http|https/i;

const btnEnviarDenuncia = document.querySelector('.botao-envio')
const btnLike = document.querySelector('.like')
const btnDislike = document.querySelector('.dislike')
const imgLike = document.querySelector("#like img");
const imgDislike = document.querySelector("#dislike img");

btnLike.addEventListener('click', () => {
    resolvido = true;
    imgLike.src = "../assets/icones/botao-like.svg";
    imgDislike.src = "../assets/icones/botao-dislike-neutro.svg";

    console.log("ta dando like")
    // animation on pliss
});

btnDislike.addEventListener('click', () => {
    resolvido = false;
    imgLike.src = "../assets/icones/botao-like-neutro.svg";
    imgDislike.src = "../assets/icones/botao-dislike.svg";

    console.log("ta dando dislike")
    // Coloquem uma animação ae plis
});

btnEnviarDenuncia.addEventListener('click', async () => {
    const topico = document.getElementById("topico").value.trim();
    const problema = document.getElementById("problema").value.trim();

    if (topico === "" || problema === "") {
        alert("Preencha todos os campos!")
        return;
    }
    if (regex.test(topico) || regex.test(problema)) {
        alert("Não é permtido enviar links!")
        return;
    }

    // Não mexer
    try {
        const denunciaRef = collection(db, "denuncias");


        await addDoc((denunciaRef), {
            topico: topico,
            problema: problema,
            resolvido: resolvido,
            idUsuario: idUsuario
        })

        document.getElementById("topico").value = "";
        document.getElementById("problema").value = "";
        resolvido = false;

        alert('Denuncia enviada')
    } catch (e) {
        console.error(e)
    }
})

const comentarios = document.querySelector(".comentarios")

async function carregarHTML() {
    comentarios.innerHTML = ""
    const resultado = await pegarDenunciasDoFirebase()
    if(!resultado) return
    resultado.forEach((dados) =>  {
        let url = ''
        if(dados.resolvido){
            url = '../assets/icones/botao-like.svg'
        } else {
            url = '../assets/icones/botao-dislike.svg'
        }

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
                            <p class="resultado">A denúncia foi resolvida?<p>
                                <img src="${url}" alt="like">
                        </div>

                        <button class="lixeira" data-id="${dados.id}">
                            <img src="../assets/icones/lixeira.png" alt="deletar">
                            </button>`



                    });

                document.querySelectorAll(".lixeira").forEach(botao => {
                botao.addEventListener("click", async () => {
                    if (!confirm("Deseja apagar esta denúncia?")) return;

                    try {
                    await deleteDoc(doc(db, "denuncias", botao.dataset.id));
                    carregarHTML();
                } catch (e) {
                    console.error(e);
                    alert("Erro ao apagar denúncia.");
                }
            });
});
}
carregarHTML()

async function pegarDenunciasDoFirebase(){
    try {
    
        const resultado = []
        const denuncias = await getDocs(collection(db, "denuncias"));
        for(let denuncia of denuncias.docs){
            if (denuncia.data().idUsuario == idUsuario){
                resultado.push(denuncia.data())
                resultado[resultado.length - 1].id = denuncia.id;
            }
        } 
        return resultado 
    }catch(e){
        alert("erro ao buscar denuncias")
        console.error(e)
    }
           
}