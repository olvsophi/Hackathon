import { db, collection, addDoc } from './firebaseconfig.js'

let resolvido = true;
let naoResolvido = false;
const regex = /www|http|https/i;

function marcarResolvido() {
    resolvido = true;
    NaoResolvido = false;
    // da pra colocar animação
}

function marcarNaoResolvido() {
    resolvido = false;
    naoResolvido = true;
    // da pra colocar animation
}

const btnEnviarDenuncia = document.querySelector('.botao-envio')

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
