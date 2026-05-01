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
    <article class="slide ${i === 0 ? 'active' : ''}" aria-hidden="${i !== 0}">
      <div class="slide-text">
        <div class="text-card title-card">
          <span class="card-label">${s.category}</span>
          <h2 class="card-title">${s.title}</h2>
        </div>
        <div class="text-card desc-card">
          <p class="card-desc">${s.description}</p>
        </div>
        <a href="${s.link}" class="see-more-btn" tabindex="${i === 0 ? 0 : -1}">
          Veja mais
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
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
    el.setAttribute("aria-hidden", i !== index);
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
