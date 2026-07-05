
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