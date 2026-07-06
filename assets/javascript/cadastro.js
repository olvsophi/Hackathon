import { auth, googleProvider} from "./firebaseconfig.js";
import { createUserWithEmailAndPassword, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const form = document.getElementById("formCadastro");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const alternarSenha = document.getElementById("alternarSenha");

const btnGoogle = document.getElementById("btnGoogle");

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
    const tipoAtual = senhaInput.getAttribute('type');
    const mostrando = tipoAtual === 'password';

    senhaInput.setAttribute('type', mostrando ? 'text' : 'password');
    alternarSenha.innerHTML = mostrando ? olhoFechado : olhoAberto;
});

function voltarParaPaginaAnterior() {
    const paginaAnterior = sessionStorage.getItem("paginaAnterior");

    sessionStorage.removeItem("paginaAnterior");

    if (paginaAnterior && !paginaAnterior.includes("login.html") && !paginaAnterior.includes("cadastro.html")) {
        window.location.href = paginaAnterior;
    } else {
        window.location.href = "../index.html";
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    if (!email) {
        mostrarPopup("Digite o email");
        return;
    }

    if (senha.length < 8) {
        mostrarPopup("Senha precisa ter no mínimo 8 caracteres");
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, senha);

        mostrarPopup("Conta criada com sucesso!");
        setTimeout(voltarParaPaginaAnterior, 1200);

    } catch (error) {
        tratarErros(error);
    }
});

btnGoogle.addEventListener("click", async () => {
    try {
        await signInWithPopup(auth, googleProvider);

        mostrarPopup("Autenticado com o Google com sucesso!");
        setTimeout(voltarParaPaginaAnterior, 1200);

    } catch (error) {
        tratarErros(error);
    }
});

function tratarErros(error) {
    console.error(error);

    if (error.code === "auth/email-already-in-use") {
        mostrarPopup("Este email já está cadastrado.");
    } else if (error.code === "auth/invalid-email") {
        mostrarPopup("Formato de email inválido.");
    } else {
        mostrarPopup("Ocorreu um erro: " + error.message);
    }
}