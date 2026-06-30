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
  { titulo: "Combata Fake News", texto: "Não compartilhe conteúdos sem verificar se são verdadeiros." },
  { titulo: "Cuidado com phishing", texto: "Desconfie de e-mails urgentes pedindo login ou dados pessoais." },
  { titulo: "Privacidade Digital", texto: "Respeite sua privacidade e a das outras pessoas." },
  { titulo: "Verifique o remetente", texto: "Confira o domínio do e-mail antes de clicar em qualquer link." },
  { titulo: "Empatia Online", texto: "Lembre-se de que existe uma pessoa por trás de cada perfil." },
  { titulo: "Atualize seus apps", texto: "As atualizações corrigem falhas de segurança importantes." },
  { titulo: "Direitos Autorais", texto: "Valorize o trabalho dos criadores e dê os devidos créditos." },
  { titulo: "Sistema em dia", texto: "Mantenha seu sistema operacional sempre atualizado." },
  { titulo: "Pense Antes de Postar", texto: "Tudo o que você publica pode permanecer na internet." },
  { titulo: "Wi-Fi público", texto: "Evite acessar contas importantes em redes abertas." },
  { titulo: "Boa Convivência", texto: "Respeite opiniões diferentes sem recorrer a ofensas." },
  { titulo: "Use VPN confiável", texto: "Prefira serviços confiáveis ao acessar redes públicas." },
  { titulo: "Proteja seus Dados", texto: "Evite divulgar informações pessoais sem necessidade." },
  { titulo: "Backups regulares", texto: "Mantenha cópias de segurança dos seus arquivos." },
  { titulo: "Denuncie Abusos", texto: "Denuncie casos de cyberbullying e conteúdos ofensivos." },
  { titulo: "Cuidado com USBs", texto: "Não conecte dispositivos desconhecidos ao computador." },
  { titulo: "Inclusão Digital", texto: "Use a tecnologia para colaborar e ajudar outras pessoas." },
  { titulo: "Permissões de apps", texto: "Revise o acesso à câmera, localização e microfone." },
  { titulo: "Antivírus ativo", texto: "Mantenha um antivírus confiável sempre atualizado." },
  { titulo: "Uso Responsável", texto: "Utilize a internet de forma ética e consciente." },
  { titulo: "HTTPS sempre", texto: "Confira o cadeado antes de inserir dados em um site." },
  { titulo: "Cuidado com Links", texto: "Desconfie de links recebidos por mensagens inesperadas." },
  { titulo: "Downloads seguros", texto: "Baixe programas apenas de sites oficiais." },
  { titulo: "Respeito à Diversidade", texto: "Valorize as diferenças e combata o preconceito online." },
  { titulo: "Revogue acessos", texto: "Remova aplicativos que você não utiliza mais." }
]

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
    card.style.animationDelay = `${i * 40}ms`;

    card.innerHTML = `
      <span class="numero-dica">${String(i + 1).padStart(2, "0")}</span>
      <h3>${dica.titulo}</h3>
      <p>${dica.texto}</p>
    `;

    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });

    gradeDicas.appendChild(card); 
  });
}

btn.addEventListener("click", renderizar);
renderizar();

const formularioPesquisa = document.getElementById("pesquisa");
const campoPesquisa = document.getElementById("pesquisaUsuario");

if (formularioPesquisa) {
  formularioPesquisa.addEventListener("submit", function (evento) {
    evento.preventDefault();

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