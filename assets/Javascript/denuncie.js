import { db, collection, addDoc } from './firebaseconfig.js'

let resolvido = true;
let naoResolvido = false;
const regex = /www|http|https/i;

const btnEnviarDenuncia = document.querySelector('.botao-envio')
const btnLike = document.querySelector('like')
const btnDislike = document.querySelector('dislike')

btnLike.addEventListener('click', () => {
    resolvido = false;
    naoResolvido = false;
    console.log("ta dando like")
    // animation on pliss
});

btnDislike.addEventListener('click', () => {
    resolvido = false;
    naoResolvido = true;
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
    if (resolvido === false && NaoResolvido === false) {
        alert("Marque se o problema foi resolvido ou não!")
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
        naoResolvido = false;

        alert('Denuncia enviada')
    } catch (e) {
        console.error(e)
    }
})
