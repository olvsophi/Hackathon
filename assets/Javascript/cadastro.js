import { auth } from "./firebaseconfig.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const form = document.getElementById("formCadastro");

const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    if (!email) {
        alert("Digite o email");
        return;
    }

    if (senha.length < 6) {
        alert("Senha precisa ter no mínimo 6 caracteres");
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, senha);

        alert("Conta criada com sucesso!");

        window.location.href = "login.html";

    } catch (error) {

        alert(error.message);

    }
});