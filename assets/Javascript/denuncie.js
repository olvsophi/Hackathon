import { db, getDatabase, ref, set } from './firebaseconfig'

// Quem pegou pra ver esse Js agora, provavelmente ele tá
// incompleto pq eu não aprendi enviar pro banco de dados ainda.

let resolvido = false;
let naoResolvido = false;
const regex = /www|http|https/i;

function marcarResolvido(){
    resolvido = true;
    NaoResolvido = false;
}

function marcarNaoResolvido(){
    resolvido = false;
    naoResolvido = true;
}

function enviarDenuncia(){
    const topico = document.getElementById("topico").value.trim();
    const problema = document.getElementById("problema").value.trim();

    if (topico === "" || problema === ""){
        alert("Preencha todos os campos!")
        return;
    }
    if (regex.test(topico) || regex.test(problema)) {
        alert("Não é permtido enviar links!")
        return;
    }
    if (resolvido === false && NaoResolvido === false){
        alert("Marque se o problema foi resolvido ou não!")
        return;
    }
    const denuncia = {
        topico: topico,
        problema: problema,
        resolvido: resolvido,
        naoResolvido: naoResolvido,
    };

    console.log(denuncia);

    /*
    Aqui vai ficar as coisas do banco de dados
    que eu falei que não sei fazer porém irei
    aprender

    NÂO ME EXPULSEM PLISSS
    */

    // Dps de enviar ele limpa os campos
    document.getElementById("topico").value ="";
    document.getElementById("problema").value ="";
    resolvido = false;
    naoResolvido = false;

}
