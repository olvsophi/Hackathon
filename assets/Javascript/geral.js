const menu = document.querySelector(".menu");
const navMobile = document.querySelector(".celular");

menu.addEventListener("click", () => {
    navMobile.classList.toggle("ativo");
});

import {signOut, auth, onAuthStateChanged} from "./firebaseconfig.js";
let estaLogado=false

onAuthStateChanged(auth,(usuario)=>{
  if(usuario){
    estaLogado=true
    alternarClasseLogado()
  }

})
const divComputador = document.querySelector(".computador")
const btnSair = document.querySelector(".sair")
function alternarClasseLogado(){
  if (estaLogado){
    divComputador.classList.add("logado")
    btnSair.classList.add("mostrar-botao-sair")
  } else{
    divComputador.classList.remove("logado")
    btnSair.classList.remove("mostrar-botao-sair")
  } 

}
btnSair.addEventListener("click" ,async ()=> {
  try {
    await signOut(auth)
    estaLogado=false
    alternarClasseLogado()
  } catch (error) {
    alert("Não Foi possível sair da conta")
  }
})
