const email = document.querySelector('#email');
const senha = document.querySelector('#senha');
const formulario = document.querySelector('.login-cadastro');

formulario.addEventListener("submit", (e) => {
    if (email.value && senha.value) {
        console.log('Não está vazio')
    }else{
        console.log('Está vazio')
    }
    e.preventDefault();
})