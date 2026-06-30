import { db, collection, addDoc, onAuthStateChanged, auth } from './firebaseconfig.js'

onAuthStateChanged(auth, (usuario) =>{
    if(!usuario) {
        window.location.href = "../pages/login.html";
    }
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
        })

        document.getElementById("topico").value = "";
        document.getElementById("problema").value = "";
        resolvido = false;

        alert('Denuncia enviada')
    } catch (e) {
        console.error(e)
    }
})


