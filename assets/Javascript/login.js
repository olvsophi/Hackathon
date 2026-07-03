import { auth, googleProvider} from "./firebaseconfig.js";
import { signInWithEmailAndPassword, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const email = document.querySelector('#email');
const senha = document.querySelector('#senha');
const formulario = document.getElementById('formLogin');

const botoesRedesSociais = document.querySelectorAll('.contas button');
const btnGoogle = botoesRedesSociais[0];

function voltarParaPaginaAnterior() {
    // Pega a página que foi salva na memória
    const paginaAnterior = sessionStorage.getItem("paginaAnterior");

    // Limpa a memória para não bugar futuros logins
    sessionStorage.removeItem("paginaAnterior");

    // Se existir uma página salva e não for a própria página de login, volta pra lá
    if (paginaAnterior && !paginaAnterior.includes("login.html")) {
        window.location.href = paginaAnterior;
    } else {
        // Se não tiver nada salvo, vai para a home
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