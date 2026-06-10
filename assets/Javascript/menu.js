const menu = document.querySelector(".menu");
const navMobile = document.querySelector(".celular");

menu.addEventListener("click", () => {
    navMobile.classList.toggle("ativo");
});