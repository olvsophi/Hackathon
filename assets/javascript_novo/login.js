import { auth, googleProvider} from "./firebaseconfig.js";
import { signInWithEmailAndPassword, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const email = document.querySelector('#email');
const senha = document.querySelector('#senha');
const formulario = document.getElementById('formLogin');
const alternarSenha = document.getElementById('alternarSenha');

const botoesRedesSociais = document.querySelectorAll('.contas button');
const btnGoogle = botoesRedesSociais[0];

const olhoAberto = `
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
`;

const olhoFechado = `
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
`;

alternarSenha.innerHTML = olhoAberto;

alternarSenha.addEventListener('click', () => {
    const tipoAtual = senha.getAttribute('type');
    const mostrando = tipoAtual === 'password';

    senha.setAttribute('type', mostrando ? 'text' : 'password');
    alternarSenha.innerHTML = mostrando ? olhoFechado : olhoAberto;
});

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