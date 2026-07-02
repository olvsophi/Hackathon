const menu = document.querySelector(".menu");
const navMobile = document.querySelector(".celular");

if (menu && navMobile) {
    menu.addEventListener("click", () => {
        navMobile.classList.toggle("ativo");
    });
}

import { signOut, auth, onAuthStateChanged } from "./firebaseconfig.js";

let estaLogado = false;

const divsComputador = document.querySelectorAll(".computador, .somente-deslogado");
const btnsSair = document.querySelectorAll(".sair");
const navGeral = document.querySelector(".nav-geral");

onAuthStateChanged(auth, (usuario) => {
    if (usuario) {
        estaLogado = true;
    } else {
        estaLogado = false;
    }

    alternarClasseLogado();
});

function alternarClasseLogado() {
    if (estaLogado) {
        btnsSair.forEach((btn) => btn.classList.add("mostrar-botao-sair"));

        divsComputador.forEach((div) => {
            if (div !== navGeral) {
                div.classList.add("logado");
            }
        });
    } else {
        btnsSair.forEach((btn) => btn.classList.remove("mostrar-botao-sair"));

        divsComputador.forEach((div) => {
            if (div !== navGeral) {
                div.classList.remove("logado");
            }
        });
    }
}

btnsSair.forEach((btn) => {
    btn.addEventListener("click", async () => {
        try {
            await signOut(auth);
            estaLogado = false;
            alternarClasseLogado();
        } catch (error) {
            alert("Não foi possível sair da conta");
        }
    });
});

document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href*="login.html"]');

  if (link) {
    sessionStorage.setItem("paginaAnterior", window.location.href);
  }
});