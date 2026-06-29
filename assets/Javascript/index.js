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
      classeAtiva = "active"
    }

    const estruturaSlide = `
      <article class="slide ${classeAtiva}">
        <div class="texto-slide">
          <div class="text-card title-card">
            <span class="card-label">${slide.categoria}</span>
            <h2 class="card-title">${slide.titulo}</h2>
          </div>
          <div class="text-card desc-card">
            <p class="card-desc">${slide.descricao}</p>
          </div>
          <a href="${slide.link}" class="see-more-btn">
            Veja mais
            <svg viewBox="0 0 24 24" width="14" height="14">
              <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
        <div class="slide-media">
          <div class="media-frame">
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
  
  const todosOsSlides = trilho.querySelectorAll(".slide")
  
  todosOsSlides.forEach((slide, index) => {
    if (index === posicaoAtual) {
      slide.classList.add("active")
    } else {
      slide.classList.remove("active")
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

  setTimeout(function() {
    carregandoAnimacao = false
  }, TEMPO_ANIMACAO)
}

voltar.addEventListener("click", function() {
  mudarSlide(-1)
})

avancar.addEventListener("click", function() {
  mudarSlide(1)
})

document.addEventListener("keydown", function(evento) {
  if (evento.key === "ArrowRight") {
    mudarSlide(1)
  }
  if (evento.key === "ArrowLeft") {
    mudarSlide(-1)
  }
})

renderizarSlides()

// JS das Dicas
const tips = [
    { titulo: "Senhas fortes", texto: "Use no mínimo 12 caracteres misturando letras, números e símbolos." },
    { titulo: "Gerenciador de senhas", texto: "Guarde senhas em um cofre confiável em vez de anotá-las soltas." },
    { titulo: "Autenticação em 2 fatores", texto: "Ative o 2FA sempre que possível, de preferência por app, não SMS." },
    { titulo: "Cuidado com phishing", texto: "Desconfie de e-mails urgentes pedindo login ou dados pessoais." },
    { titulo: "Verifique o remetente", texto: "Confira o domínio do e-mail antes de clicar em qualquer link." },
    { titulo: "Atualize seus apps", texto: "Updates corrigem falhas que invasores já estão tentando explorar." },
    { titulo: "Sistema operacional em dia", texto: "Mantenha o SO atualizado para receber correções de segurança." },
    { titulo: "Wi-Fi público", texto: "Evite acessar contas sensíveis em redes abertas sem uma VPN." },
    { titulo: "Use VPN confiável", texto: "Prefira serviços pagos e auditados a opções gratuitas duvidosas." },
    { titulo: "Backups regulares", texto: "Mantenha cópias em nuvem e em um disco externo desconectado." },
    { titulo: "Cuidado com USBs", texto: "Não conecte pendrives desconhecidos ao seu computador." },
    { titulo: "Bloqueio de tela", texto: "Configure bloqueio automático em celular e notebook." },
    { titulo: "Permissões de apps", texto: "Revise quais apps acessam câmera, microfone e localização." },
    { titulo: "Antivírus ativo", texto: "Mantenha um antivírus reputável rodando e atualizado." },
    { titulo: "HTTPS sempre", texto: "Confira o cadeado e o https:// antes de digitar dados em um site." },
    { titulo: "Links encurtados", texto: "Passe o mouse para ver o destino real antes de clicar." },
    { titulo: "Downloads seguros", texto: "Baixe softwares apenas das páginas oficiais dos fabricantes." },
    { titulo: "Cuidado com extensões", texto: "Instale extensões de navegador só quando realmente precisar." },
    { titulo: "Revogue acessos antigos", texto: "Remova apps de terceiros conectados às suas contas que não usa mais." },
    { titulo: "E-mail secundário", texto: "Use um e-mail separado para cadastros pouco confiáveis." },
    { titulo: "Não reutilize senhas", texto: "Uma senha vazada não pode abrir todas as suas outras contas." },
    { titulo: "Verifique vazamentos", texto: "Cheque seu e-mail em sites como Have I Been Pwned periodicamente." },
    { titulo: "Cuidado com QR Codes", texto: "Códigos colados sobre os originais podem levar a sites falsos." },
    { titulo: "Suporte falso", texto: "Empresas reais não pedem senha por telefone ou WhatsApp." },
    { titulo: "Pix com calma", texto: "Confira nome, banco e CPF/CNPJ antes de confirmar transferências." },
    { titulo: "Compras online", texto: "Prefira cartões virtuais com limite ajustável para sites novos." },
    { titulo: "Redes sociais", texto: "Limite o que aparece publicamente no seu perfil e nas fotos." },
    { titulo: "Geolocalização", texto: "Evite postar em tempo real sua localização exata." },
    { titulo: "Dados em fotos", texto: "Cuidado com cartões, documentos e telas visíveis ao tirar fotos." },
    { titulo: "Logout em dispositivos", texto: "Saia das contas em computadores compartilhados ou emprestados." },
    { titulo: "Privacidade do navegador", texto: "Limpe cookies de sites em que não confia e bloqueie rastreadores." },
    { titulo: "Pense antes de clicar", texto: "Na dúvida, não clique. Confirme pelo canal oficial da empresa." }
];

const grid = document.getElementById("tipsGrid");
const btn = document.getElementById("shuffleBtn");

function sortear(lista, n) {
    const copia = lista.slice();
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia.slice(0, n);
}

function renderizar() {
    const escolhidas = sortear(tips, 4);
    grid.innerHTML = "";

    escolhidas.forEach((dica, i) => {
        const card = document.createElement("article");
        card.className = "tip-card fade-in";
        card.style.animationDelay = `${i * 40}ms`;

        card.innerHTML = `
      <span class="tip-num">${String(i + 1).padStart(2, "0")}</span>
      <h3>${dica.titulo}</h3>
      <p>${dica.texto}</p>
    `;

        card.addEventListener("mousemove", (e) => {
            const r = card.getBoundingClientRect();
            card.style.setProperty("--mx", `${e.clientX - r.left}px`);
            card.style.setProperty("--my", `${e.clientY - r.top}px`);
        });

        grid.appendChild(card);
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