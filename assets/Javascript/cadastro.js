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
        alert("Digite o email");
        return;
    }

    if (senha.length < 8) {
        alert("Senha precisa ter no mínimo 8 caracteres");
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, senha);

        alert("Conta criada com sucesso!");

        voltarParaPaginaAnterior();

    } catch (error) {
        tratarErros(error);
    }
});

btnGoogle.addEventListener("click", async () => {
    try {
        await signInWithPopup(auth, googleProvider);

        alert("Autenticado com o Google com sucesso!");

        voltarParaPaginaAnterior();

    } catch (error) {
        tratarErros(error);
    }
});

function tratarErros(error) {
    console.error(error);

    if (error.code === "auth/email-already-in-use") {
        alert("Este email já está cadastrado.");
    } else if (error.code === "auth/invalid-email") {
        alert("Formato de email inválido.");
    } else {
        alert("Ocorreu um erro: " + error.message);
    }
}