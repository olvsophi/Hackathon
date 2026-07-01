// JS do Slider
const slides = [
  {
    categoria: "Tecnologia",
    titulo: "IA brasileira atinge marco inédito em redes neurais",
    descricao: "Pesquisadores de São Paulo apresentaram um modelo capaz de processar informações 40% mais rápido que os concorrentes globais, abrindo caminho para nova geração de assistentes.",
    imagem: "assets/images/slide-1.jpg",
    link: "#noticia-1"
  },
  {
    categoria: "Ciência",
    titulo: "Material líquido autorreparável surpreende cientistas",
    descricao: "Substância desenvolvida em laboratório reconstrói sua própria estrutura em segundos após ser danificada — promessa para telas, próteses e dispositivos vestíveis.",
    imagem: "assets/images/slide-2.jpg",
    link: "#noticia-2"
  },
  {
    categoria: "Inovação",
    titulo: "Cubo de cristal armazena 500 anos de dados",
    descricao: "Nova tecnologia óptica grava informações dentro de cristais de quartzo com durabilidade estimada em séculos. Empresas já correm para adotar o método.",
    imagem: "assets/images/slide-3.jpg",
    link: "#noticia-3"
  },
  {
    categoria: "Design",
    titulo: 'Tendência "Liquid Glass" domina interfaces em 2026',
    descricao: "Apple, Google e startups de design adotam o estilo translúcido com profundidade. Veja por que o glassmorphism voltou com força — e desta vez fluido.",
    imagem: "assets/images/slide-4.jpg",
    link: "#noticia-4"
  },
  {
    imagem: "assets/images/slide-5.jpg",
    categoria: "Energia",
    titulo: "Anel magnético gera energia limpa sem combustível",
    descricao: 'Protótipo desenvolvido na Europa usa indução contínua para produzir eletricidade silenciosa. Cientistas chamam o invento de "loop infinito energético".',
    link: "#noticia-5"
  }
]

const TEMPO_ANIMACAO = 800
const trilho = document.getElementById("trilhoSlider")
const voltar = document.getElementById("voltar")
const avancar = document.getElementById("avancar")

let posicaoAtual = 0
let carregandoAnimacao = false

function renderizarSlides() {
  trilho.innerHTML = ""

  slides.forEach((slide, index) => {
    let classeAtiva = ""

    if (index === 0) {
      classeAtiva = "ativo"
    }

    const estruturaSlide = `
      <article class="slides ${classeAtiva}">
        <div class="textos-slide">
          <div class="texto titulo-slide">
            <span class="topico-da-noticia">${slide.categoria}</span>
            <h2 class="titulo">${slide.titulo}</h2>
          </div>
          <div class="texto texto-noticia">
            <p class="noticia">${slide.descricao}</p>
          </div>
          <a href="${slide.link}" class="veja-mais-botao">
            Veja mais
            <svg viewBox="0 0 24 24" width="14" height="14">
              <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
        <div class="imagem-slide">
          <div class="imagem-noticia">
            <img src="${slide.imagem}" alt="${slide.titulo}" />
          </div>
        </div>
      </article>
    `
    trilho.innerHTML += estruturaSlide
  })
}

function atualizarSlider() {
  trilho.style.transform = "translate3d(-" + (posicaoAtual * 100) + "%, 0, 0)"

  const todosOsSlides = trilho.querySelectorAll(".slides")

  todosOsSlides.forEach((slide, index) => {
    if (index === posicaoAtual) {
      slide.classList.add("ativo")
    } else {
      slide.classList.remove("ativo")
    }
  })
}

function mudarSlide(direcao) {
  if (carregandoAnimacao === true) {
    return
  }

  carregandoAnimacao = true
  posicaoAtual = posicaoAtual + direcao

  if (posicaoAtual >= slides.length) {
    posicaoAtual = 0
  }

  if (posicaoAtual < 0) {
    posicaoAtual = slides.length - 1
  }

  atualizarSlider()

  setTimeout(function () {
    carregandoAnimacao = false
  }, TEMPO_ANIMACAO)
}

voltar.addEventListener("click", function () {
  mudarSlide(-1)
})

avancar.addEventListener("click", function () {
  mudarSlide(1)
})

document.addEventListener("keydown", function (evento) {
  if (evento.key === "ArrowRight") {
    mudarSlide(1)
  }
  if (evento.key === "ArrowLeft") {
    mudarSlide(-1)
  }
})

renderizarSlides()

// JS das Dicas
const dicas = [
  { titulo: "Senhas fortes", texto: "Use no mínimo 12 caracteres misturando letras, números e símbolos." },
  { titulo: "Respeito nas Redes", texto: "Trate as pessoas na internet com educação e empatia." },
  { titulo: "Gerenciador de senhas", texto: "Guarde senhas em um cofre confiável em vez de anotá-las soltas." },
  { titulo: "Verifique a informação", texto: "Confirme a fonte antes de compartilhar qualquer notícia." },
  { titulo: "Autenticação em 2 fatores", texto: "Ative o 2FA sempre que possível, de preferência por aplicativo." },
  { titulo: "Cuidado com Links", texto: "Não clique em links suspeitos recebidos por mensagem ou e-mail." },
  { titulo: "Atualize o Sistema", texto: "Mantenha o sistema operacional e aplicativos sempre atualizados." },
  { titulo: "Privacidade Perfil", texto: "Deixe suas redes sociais privadas para pessoas que você não conhece." },
  { titulo: "Cuidado com Wi-Fi Público", texto: "Evite acessar contas bancárias ou dados sensíveis em redes públicas." },
  { titulo: "Antivírus Ativo", texto: "Tenha um bom antivírus instalado no computador e no celular." },
  { titulo: "Pense antes de postar", texto: "O que entra na internet pode ficar registrado para sempre." },
  { titulo: "Não fale com estranhos", texto: "Evite adicionar ou conversar com perfis desconhecidos." },
  { titulo: "Dispositivos bloqueados", texto: "Use biometria, PIN ou senha para bloquear a tela do seu celular." },
  { titulo: "Downloads seguros", texto: "Baixe aplicativos apenas de lojas oficiais como Play Store ou App Store." },
  { titulo: "Webcam protegida", texto: "Cubra a câmera do seu computador quando não estiver usando." },
  { titulo: "Sair das contas", texto: "Sempre faça 'Logoff' ou 'Sair' ao usar um computador público." },
  { titulo: "Backups frequentes", texto: "Guarde seus arquivos importantes na nuvem ou em um HD externo." },
  { titulo: "Combate ao Cyberbullying", texto: "Não participe de linchamentos virtuais e denuncie agressões." },
  { titulo: "Dados bancários", texto: "Nunca envie fotos do seu cartão de crédito para ninguém." },
  { titulo: "Termos de Uso", texto: "Fique atento às permissões que os aplicativos pedem ao instalar." },
  { titulo: "Phishing", texto: "Desconfie de promoções boas demais ou mensagens urgentes de bancos." },
  { titulo: "Pegada Digital", texto: "Monitore o que dizem sobre você pesquisando seu nome no Google." },
  { titulo: "Sites Seguros", texto: "Verifique se o site tem o cadeado e começa com 'https://' na barra de endereço." },
  { titulo: "Denuncie perfis falsos", texto: "Se encontrar alguém se passando por você ou por um amigo, denuncie." },
  { titulo: "Mensagens temporárias", texto: "Use recursos de mensagens que somem para conversas muito privadas." },
  { titulo: "Localização desligada", texto: "Não compartilhe sua localização em tempo real com desconhecidos." },
  { titulo: "Golpes por telefone", texto: "Não passe códigos que chegarem por SMS para ninguém." },
  { titulo: "Direitos autorais", texto: "Dê os créditos ao usar imagens, textos ou músicas de outras pessoas." },
  { titulo: "Evite superexposição", texto: "Não poste fotos que mostrem a fachada da sua casa ou uniforme da escola." },
  { titulo: "Equilíbrio de tempo", texto: "Desconecte um pouco das telas para cuidar da sua saúde mental." },
  { titulo: "Fake News de Saúde", texto: "Nunca siga dicas médicas da internet sem consultar um profissional." },
  { titulo: "Ajude quem precisa", texto: "Se vir um amigo sofrendo exposição na internet, ofereça apoio e ajuda." }
];

const gradeDicas = document.getElementById("gradeDicas");
const btn = document.getElementById("botaoSortear");


function sortear(lista, n) {
  const copia = lista.slice();
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia.slice(0, n);
}

function renderizar() {
  const escolhidas = sortear(dicas, 4);
  gradeDicas.innerHTML = "";

  escolhidas.forEach((dica, i) => {
    const card = document.createElement("article");
    card.className = "card-dicas fade-in";

    card.innerHTML = `
      <span class="numero-dica">${String(i + 1).padStart(2, "0")}</span>
      <h3>${dica.titulo}</h3>
      <p>${dica.texto}</p>
    `;

    gradeDicas.appendChild(card); 
  });
}

btn.addEventListener("click", renderizar);
renderizar();

const formularioPesquisa = document.getElementById("pesquisa");
const campoPesquisa = document.getElementById("pesquisaUsuario");

if (formularioPesquisa) {
  formularioPesquisa.addEventListener("submit", function (e) {
    e.preventDefault();

    const pesquisa = campoPesquisa.value.trim();

    if (pesquisa === "") {
      return;
    }

    localStorage.setItem("pesquisaDenuncia", pesquisa);

    window.location.href = "./pages/denuncias.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href*="login.html"]').forEach(link => {
    link.addEventListener("click", () => {
      sessionStorage.setItem("paginaAnterior", window.location.href);
    });
  });
});