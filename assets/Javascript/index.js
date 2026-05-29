// JS do Slider
const slides = [
  {
    category: "Tecnologia",
    title: "IA brasileira atinge marco inédito em redes neurais",
    description: "Pesquisadores de São Paulo apresentaram um modelo capaz de processar informações 40% mais rápido que os concorrentes globais, abrindo caminho para nova geração de assistentes.",
    image: "assets/slide-1.jpg",
    link: "#noticia-1"
  },
  {
    category: "Ciência",
    title: "Material líquido autorreparável surpreende cientistas",
    description: "Substância desenvolvida em laboratório reconstrói sua própria estrutura em segundos após ser danificada — promessa para telas, próteses e dispositivos vestíveis.",
    image: "assets/slide-2.jpg",
    link: "#noticia-2"
  },
  {
    category: "Inovação",
    title: "Cubo de cristal armazena 500 anos de dados",
    description: "Nova tecnologia óptica grava informações dentro de cristais de quartzo com durabilidade estimada em séculos. Empresas já correm para adotar o método.",
    image: "assets/slide-3.jpg",
    link: "#noticia-3"
  },
  {
    category: "Design",
    title: 'Tendência "Liquid Glass" domina interfaces em 2026',
    description: "Apple, Google e startups de design adotam o estilo translúcido com profundidade. Veja por que o glassmorphism voltou com força — e desta vez fluido.",
    image: "assets/slide-4.jpg",
    link: "#noticia-4"
  },
  {
    category: "Energia",
    title: "Anel magnético gera energia limpa sem combustível",
    description: 'Protótipo desenvolvido na Europa usa indução contínua para produzir eletricidade silenciosa. Cientistas chamam o invento de "loop infinito energético".',
    image: "assets/slide-5.jpg",
    link: "#noticia-5"
  }
];

const ANIMATION_MS = 800;
const track = document.getElementById("slidesTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let index = 0;
let locked = false;

function renderSlides() {
  track.innerHTML = slides.map((s, i) => `
    <article class="slide ${i === 0 ? 'active' : ''}">
      <div class="slide-text">
        <div class="text-card title-card">
          <span class="card-label">${s.category}</span>
          <h2 class="card-title">${s.title}</h2>
        </div>
        <div class="text-card desc-card">
          <p class="card-desc">${s.description}</p>
        </div>
        <a href="${s.link}" class="see-more-btn">
          Veja mais
          <svg viewBox="0 0 24 24" width="14" height="14">
            <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
      <div class="slide-media">
        <div class="media-frame">
          <img src="${s.image}" alt="${s.title}" loading="${i === 0 ? 'eager' : 'lazy'}" />
        </div>
      </div>
    </article>
  `).join("");
}

function update() {
  track.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
  const slideEls = track.querySelectorAll(".slide");
  slideEls.forEach((el, i) => {
    el.classList.toggle("active", i === index);
    el.setAttribute(i !== index);
    const link = el.querySelector(".see-more-btn");
    if (link) link.tabIndex = i === index ? 0 : -1;
  });
}

function guard(fn) {
  if (locked) return;
  locked = true;
  fn();
  update();
  setTimeout(() => { locked = false; }, ANIMATION_MS);
}

function next() { guard(() => { index = (index + 1) % slides.length; }); }
function prev() { guard(() => { index = (index - 1 + slides.length) % slides.length; }); }

prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
});

renderSlides();

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
    const escolhidas = sortear(tips, 8);
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