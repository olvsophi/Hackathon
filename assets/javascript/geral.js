const menu = document.querySelector(".menu");
const navMobile = document.querySelector(".celular");

if (menu && navMobile) {
    menu.addEventListener("click", () => {
        navMobile.classList.toggle("ativo");
    });
}

import { signOut, auth, onAuthStateChanged } from "./firebaseconfig.js";

let estaLogado = false;

const divsComputador = document.querySelectorAll(".computador,.deslogado");
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

function mostrarCarregamento() {
  document.querySelector(".carregamento-girando").classList.add("ativo");
}

function esconderCarregamento() {
  document.querySelector(".carregamento-girando").classList.remove("ativo");
}

export { mostrarCarregamento, esconderCarregamento, mostrarPopup, confirmarAcao };


const btnEntendi = document.getElementById("btnFecharPopup");
const popUp = document.getElementById("popUpDenuncie");

if (btnEntendi && popUp) {
    btnEntendi.addEventListener('click', (e) => {
        popUp.remove();
    });
}

const popupAviso = document.getElementById("popupAviso");
const popupTexto = document.getElementById("popupTexto");
const popupFechar = document.getElementById("popupFechar");

function mostrarPopup(mensagem, duracao = 3000) {
    if (!popupAviso || !popupTexto) return;

    popupTexto.textContent = mensagem;
    popupAviso.classList.add("mostrar");

    clearTimeout(popupAviso._timeout);
    popupAviso._timeout = setTimeout(() => {
        popupAviso.classList.remove("mostrar");
    }, duracao);
}

if (popupFechar && popupAviso) {
    popupFechar.addEventListener("click", () => {
        popupAviso.classList.remove("mostrar");
    });
}

const popupConfirmar = document.getElementById("popupConfirmar");
const textoConfirmar = document.getElementById("textoConfirmar");
const btnCancelarConfirmar = document.getElementById("btnCancelarConfirmar");
const btnOkConfirmar = document.getElementById("btnOkConfirmar");

function confirmarAcao(mensagem) {
    return new Promise((resolve) => {
        if (!popupConfirmar) {
            resolve(window.confirm(mensagem));
            return;
        }

        textoConfirmar.textContent = mensagem;
        popupConfirmar.classList.add("mostrar");

        function limpar(resultado) {
            popupConfirmar.classList.remove("mostrar");
            btnCancelarConfirmar.removeEventListener("click", onCancelar);
            btnOkConfirmar.removeEventListener("click", onOk);
            resolve(resultado);
        }

        function onCancelar() { limpar(false); }
        function onOk() { limpar(true); }

        btnCancelarConfirmar.addEventListener("click", onCancelar);
        btnOkConfirmar.addEventListener("click", onOk);
    });
}