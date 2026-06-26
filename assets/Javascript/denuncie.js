import { db, collection, addDoc } from './firebaseconfig.js'    

const btnEnviar = document.querySelector('.botao-envio')

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


btnEnviar.addEventListener('click', async (e) => {
    e.preventDefault()

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

    console.log('tudo certo')

    try {
         const denuncia = {
             topico: topico,
             problema: problema,
             resolvido: resolvido,
             naoResolvido: naoResolvido,
         };
 
        const denunciaRef = await addDoc(collection(db,"denuncias"),{
             topico: topico,
             problema: problema,
             resolvido: resolvido,
        })

        console.log("tudo certo mestrao")
 
        
    } catch (e) {
        console.error(e)
    }
    
    document.getElementById("topico").value = "";
    document.getElementById("problema").value = "";
    resolvido = false;
    naoResolvido = false;

})