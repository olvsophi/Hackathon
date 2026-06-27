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
    async function enviarDenuncia() {
        
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

    // Enviar pro banco de dados

    // dps ele limpa os campos sem recarregar a pagina e alerta o usuario
    
    const denuncia = {
        topico: topico,
        problema: problema,
        resolvido: resolvido,
        naoResolvido: naoResolvido,
    };
    
    document.getElementById("topico").value = "";
    document.getElementById("problema").value = "";
    resolvido = false;
    naoResolvido = false;

}
