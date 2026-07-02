const slides = [
  {
    categoria: "Segurança Digital",
    titulo: "A importância da Segurança Digital no dia a dia",
    descricao: "Com bilhões de dados circulando na internet, proteger confidencialidade, integridade e disponibilidade das informações é essencial para evitar ataques e vazamentos.",
    imagem: "./assets/imagens/slide-1.png",
    link: "https://www.hostgator.com.br/blog/seguranca-digital/"
  },
  {
    categoria: "Cidadania Digital",
    titulo: "O que é Cidadania Digital e por que ela importa?",
    descricao: "Ser um bom cidadão digital vai além de segurança: envolve respeito, pensamento crítico, combate à desinformação e construção de um ambiente online mais saudável.",
    imagem: "./assets/imagens/slide-2.png",
    link: "https://www.malwarebytes.com/pt-br/cybersecurity/basics/digital-citizenship"
  },
  {
    categoria: "Ética Digital",
    titulo: "Ética Digital: desafios e responsabilidades legais",
    descricao: "Aplicar princípios éticos no uso da tecnologia protege privacidade, combate fake news e evita riscos legais, especialmente com a LGPD.",
    imagem: "./assets/imagens/slide-3.png",
    link: "https://www.aurum.com.br/blog/etica-digital/"
  },
  {
    categoria: "Proteção de Dados",
    titulo: "5 Dicas para Proteger seus Dados Pessoais na Internet",
    descricao: "Use senhas fortes, autenticação em dois fatores, evite links suspeitos, mantenha softwares atualizados e revise configurações de privacidade.",
    imagem: "./assets/imagens/slide-4.png",
    link: "https://axa.com.br/central-de-conteudo/detalhes/5-dicas-para-proteger-seus-dados-pessoais-na-internet"
  },
  {
    categoria: "LGPD",
    titulo: "Cuidados ao Compartilhar Dados com Terceiros",
    descricao: "Compartilhar dados exige transparência, justificativa e contrato. Envie apenas o mínimo necessário e sempre avalie a real necessidade.",
    imagem: "./assets/imagens/slide-5.png",
    link: "https://www.fsa.br/lgpd-compartilhar-dados-com-terceiros/"
  }
];
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
          <a target="_blank" href="${slide.link}" class="veja-mais-botao">
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
    card.className = "card-dicas";

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