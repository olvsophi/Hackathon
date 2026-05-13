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