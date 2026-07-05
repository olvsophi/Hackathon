import { auth, googleProvider} from "./firebaseconfig.js";
import { createUserWithEmailAndPassword, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const form = document.getElementById("formCadastro");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");

const btnGoogle = document.getElementById("btnGoogle");

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