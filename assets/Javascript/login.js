import { auth, googleProvider} from "./firebaseconfig.js";
import { signInWithEmailAndPassword, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const email = document.querySelector('#email');
const senha = document.querySelector('#senha');
const formulario = document.querySelector('.login-cadastro');

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

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (email.value.trim() && senha.value.trim()) {
        try {
            await signInWithEmailAndPassword(
                auth,
                email.value.trim(),
                senha.value.trim()
            );

            alert("Login realizado com sucesso!");
            voltarParaPaginaAnterior();

        } catch (error) {
            console.error(error);
            alert("Erro ao fazer login.");
        }
    } else {
        alert("Preencha email e senha.");
    }
});

btnGoogle.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
        await signInWithPopup(auth, googleProvider);

        alert("Login com Google realizado!");
        voltarParaPaginaAnterior();

    } catch (error) {
        alert("Erro no login Google.");
    }
});