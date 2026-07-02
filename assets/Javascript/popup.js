const btnEntendi = document.getElementById("btnFecharPopup");
const popUp = document.getElementById("popUpDenuncie");

btnEntendi.addEventListener('click' , (e) => {
    popUp.remove();
});
