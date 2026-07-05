import { auth, googleProvider} from "./firebaseconfig.js";
import { signInWithEmailAndPassword, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const email = document.querySelector('#email');
const senha = document.querySelector('#senha');
const formulario = document.getElementById('formLogin');

const botoesRedesSociais = document.querySelectorAll('.contas button');
const btnGoogle = botoesRedesSociais[0];

function voltarParaPaginaAnterior() {

    const paginaAnterior = sessionStorage.getItem("paginaAnterior");

    sessionStorage.removeItem("paginaAnterior");

    if (paginaAnterior && !paginaAnterior.includes("login.html")) {
        window.location.href = paginaAnterior;
    } else {

        window.location.href = "../index.html";
    }
}

console.log(formulario)
formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (email.value.trim() && senha.value.trim()) {
        try {
            await signInWithEmailAndPassword(
                auth,
                email.value.trim(),
                senha.value.trim()
            );

            mostrarPopup("Login realizado com sucesso!");
            setTimeout(voltarParaPaginaAnterior, 1200);

        } catch (error) {
            console.error(error);

            if (
                error.code === "auth/invalid-credential" ||
                error.code === "auth/wrong-password" ||
                error.code === "auth/user-not-found"
            ) {
                mostrarPopup("Email ou senha incorretos.");
            } else if (error.code === "auth/invalid-email") {
                mostrarPopup("Email inválido.");
            } else if (error.code === "auth/too-many-requests") {
                mostrarPopup("Muitas tentativas. Tente novamente mais tarde.");
            } else {
                mostrarPopup("Erro ao fazer login.");
            }
        }
    } else {
        mostrarPopup("Preencha email e senha.");
    }
});

btnGoogle.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
        await signInWithPopup(auth, googleProvider);

        mostrarPopup("Login com Google realizado!");
        setTimeout(voltarParaPaginaAnterior, 1200);

    } catch (error) {
        mostrarPopup("Erro no login Google.");
    }
});