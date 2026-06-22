import { auth, googleProvider} from "./firebaseconfig.js";
import { signInWithEmailAndPassword, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const email = document.querySelector('#email');
const senha = document.querySelector('#senha');
const formulario = document.querySelector('.login-cadastro');

const botoesRedesSociais = document.querySelectorAll('.contas button');
const btnGoogle = botoesRedesSociais[0];

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();


    if (email.value.trim() && senha.value.trim()) {
        try {

            await signInWithEmailAndPassword(auth, email.value.trim(), senha.value.trim());
            alert("Login realizado com sucesso!");
            

            window.location.href = "index.html"; 
            
        } catch (error) {
            console.error(error);

            if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                alert("Email ou senha incorretos.");
            } else {
                alert("Erro ao fazer login: " + error.message);
            }
        }
    } else {

        alert('Por favor, preencha o email e a senha.');
    }
});


btnGoogle.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        await signInWithPopup(auth, googleProvider);
        alert("Login com Google realizado!");
        window.location.href = "../index.html";
    } catch (error) {
        alert("Erro no login com Google: " + error.message);
    }
});
