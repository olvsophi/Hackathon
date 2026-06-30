const menu = document.querySelector(".menu");
const navMobile = document.querySelector(".celular");

if (menu && navMobile) {
    menu.addEventListener("click", () => {
        navMobile.classList.toggle("ativo");
    });
}

import { signOut, auth, onAuthStateChanged } from "./firebaseconfig.js";

let estaLogado = false;

const divComputador = document.querySelector(".computador");
const btnSair = document.querySelector(".sair");
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
        if (btnSair) {
            btnSair.classList.add("mostrar-botao-sair");
        }

        // Só esconde a .computador se ela NÃO for o menu de navegação
        if (divComputador && divComputador !== navGeral) {
            divComputador.classList.add("logado");
        }
    } else {
        if (btnSair) {
            btnSair.classList.remove("mostrar-botao-sair");
        }

        if (divComputador && divComputador !== navGeral) {
            divComputador.classList.remove("logado");
        }
    }
}

if (btnSair) {
    btnSair.addEventListener("click", async () => {
        try {
            await signOut(auth);
            estaLogado = false;
            alternarClasseLogado();
        } catch (error) {
            alert("Não foi possível sair da conta");
        }
    });
}

document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href*="login.html"]');

  if (link) {
    sessionStorage.setItem("paginaAnterior", window.location.href);
  }
});