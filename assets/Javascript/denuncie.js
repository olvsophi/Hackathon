import { db, getDatabase, ref, set } from './firebaseconfig'

/* exemplo 

let teste = {
    nome:'',
    topico:'',
    comentario: ''
}
*/

function enviarDenuncia() {

    const topico = document.getElementById("topico").value;
    const problema = document.getElementById("problema").value;

    const regex = /www|http|https/i;

    if (regex.test(topico) || regex.test(problema)) {
        alert("Não é permtido enviar links!")
        return;
    }

    const denuncias = {
        topico = null,
        problema = null,
        like = null,
        dislike = null,
    }
}