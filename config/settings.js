/* 
   ==========================================================================
   PAINEL DE CONTROLE - TILMAN CLÍNICA
   ==========================================================================
   Altere as informações abaixo para atualizar o site automaticamente.
*/

const SITE_CONFIG = {
    // --- Informações Gerais ---
    info: {
        name: "Tilman Clínica",
        phone: "+258 84 446 5042",
        phoneDisplay: "+258 84 446 5042", // Como aparece na tela
        email: "clinicambilo@gmail.com",
        address: "Av. Julius Nyerere, Maputo - Moçambique",
        addressShort: "Av. Julius Nyerere, Maputo",
        whatsappMessage: "Olá! Gostaria de agendar uma consulta na Tilman Clínica."
    },

    // --- Links (Redes Sociais e Botões) ---
    links: {
        // O link do WhatsApp é gerado automaticamente no script.js usando o número acima
        instagram: "#",
        facebook: "#",
        linkedin: "#",
        maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3587.2625727092926!2d32.58988691502476!3d-25.9589639835478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ee69a4e0c4b2b1b%3A0x4a4a4a4a4a4a4a4a!2sAv.%20Julius%20Nyerere%2C%20Maputo%2C%20Mozambique!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
    },

    // --- Imagens (Troque as URLs aqui) ---
    images: {
        // Nota: A imagem de fundo principal (Hero) está no arquivo style.css -> :root
        
        // Serviços
        pediatria: "https://images.unsplash.com/photo-1516574187841-693083f69802?auto=format&fit=crop&q=80&w=600",
        ginecologia: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600",
        cardiologia: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=600",
        
        // Equipe
        medico1: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
        medico2: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300"
    }
};

// Evita erros se carregado antes do script principal
window.SITE_CONFIG = SITE_CONFIG;