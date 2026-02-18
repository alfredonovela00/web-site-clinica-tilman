document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       0. Content Loader (Maintenance Helper)
       ========================================================================== */
    const initContentLoader = () => {
        // Ensure Config is loaded
        if (typeof SITE_CONFIG === 'undefined') {
            console.warn('SITE_CONFIG not found. Check if settings.js is imported.');
            return;
        }

        const cfg = SITE_CONFIG;

        // 1. Text Replacements (Phone, Email, Address)
        const textElements = document.querySelectorAll('[data-key]');
        textElements.forEach(el => {
            const key = el.getAttribute('data-key');
            // Logic to find nested keys (e.g., info.phone)
            if (key === 'phone') el.innerText = cfg.info.phoneDisplay;
            if (key === 'email') el.innerText = cfg.info.email;
            if (key === 'address') el.innerText = cfg.info.address;
            if (key === 'address-short') el.innerText = cfg.info.addressShort;
        });

        // 2. Link Replacements (WhatsApp, Maps)
        const linkElements = document.querySelectorAll('[data-link]');
        linkElements.forEach(el => {
            const type = el.getAttribute('data-link');
            if (type === 'whatsapp') {
                // Generate clean phone number
                const cleanPhone = cfg.info.phone.replace(/\D/g, '');
                el.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(cfg.info.whatsappMessage)}`;
            }
            if (type === 'maps') {
                // For iframes
                if(el.tagName === 'IFRAME') el.src = cfg.links.maps;
            }
        });

        // 3. Image Replacements
        const imgElements = document.querySelectorAll('[data-img]');
        imgElements.forEach(el => {
            const imgKey = el.getAttribute('data-img');
            if (cfg.images[imgKey]) {
                el.src = cfg.images[imgKey];
            }
        });
    };

    // Run loader
    initContentLoader();


    /* ==========================================================================
       0.1 Mobile Navbar Toggler (Hamburger to X)
       ========================================================================== */
    const navToggler = document.querySelector('.navbar-toggler');
    const navIcon = navToggler ? navToggler.querySelector('i') : null;
    const navCollapse = document.getElementById('navbarNav');

    if (navToggler && navIcon && navCollapse) {
        // Listen for Bootstrap collapse events
        navCollapse.addEventListener('show.bs.collapse', () => {
            navIcon.classList.remove('fa-bars');
            navIcon.classList.add('fa-times');
            navToggler.classList.add('active'); // for extra CSS if needed
        });

        navCollapse.addEventListener('hide.bs.collapse', () => {
            navIcon.classList.remove('fa-times');
            navIcon.classList.add('fa-bars');
            navToggler.classList.remove('active');
        });
    }


    /* ==========================================================================
       1. Smart Modal System (Dashboard Style)
       ========================================================================== */
    const modalOverlay = document.getElementById('dashboardModal');
    const closeBtn = document.getElementById('closeModal');
    const views = document.querySelectorAll('.modal-view');
    const navBtns = document.querySelectorAll('.nav-btn');

    // Expose functions globally for HTML onclick attributes
    window.openModal = (tabName) => {
        modalOverlay.classList.add('active');
        switchTab(tabName);
    };

    window.closeModal = () => {
        modalOverlay.classList.remove('active');
    };

    window.switchTab = (tabName) => {
        // 1. Update Navigation State
        navBtns.forEach(btn => {
            if (btn.dataset.target === tabName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // 2. Hide all views then show target
        views.forEach(view => {
            view.classList.remove('active');
        });
        
        // Slight delay to allow CSS transition to reset for slide effect logic if needed
        // but here we just toggle active class which has transition
        const targetView = document.getElementById(`view-${tabName}`) || document.getElementById('view-whatsapp');
        
        // If switching to service detail (which has no nav button), clear nav active states
        if (tabName === 'service-detail') {
            navBtns.forEach(btn => btn.classList.remove('active'));
        }

        setTimeout(() => {
            targetView.classList.add('active');
        }, 50);
    };

    // Close Events
    if (closeBtn) {
        closeBtn.addEventListener('click', window.closeModal);
    }
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) window.closeModal();
    });

    /* ==========================================================================
       2. Input Clear Buttons Logic
       ========================================================================== */
    const initClearButtons = () => {
        const inputs = document.querySelectorAll('.input-wrapper input, .input-wrapper textarea');
        
        inputs.forEach(input => {
            const wrapper = input.parentElement;
            const clearBtn = wrapper.querySelector('.clear-input');
            
            if (clearBtn) {
                // Show/Hide on type
                input.addEventListener('input', () => {
                    if (input.value.length > 0) {
                        clearBtn.classList.remove('d-none');
                    } else {
                        clearBtn.classList.add('d-none');
                    }
                });

                // Clear action
                clearBtn.addEventListener('click', () => {
                    input.value = '';
                    clearBtn.classList.add('d-none');
                    input.focus();
                });
            }
        });
    };
    initClearButtons();

    /* ==========================================================================
       3. Service Details Injection
       ========================================================================== */
    const serviceData = {
        'pediatria': {
            title: 'Pediatria',
            icon: 'fa-baby',
            desc: 'Nosso departamento de pediatria oferece um ambiente acolhedor e tecnologia de ponta para o cuidado dos seus filhos. Realizamos check-ups completos, vacinação e acompanhamento do desenvolvimento.',
            benefits: ['Atendimento 24h', 'Especialistas em neonatologia', 'Sala de espera infantil']
        },
        'ginecologia': {
            title: 'Ginecologia',
            icon: 'fa-venus',
            desc: 'Cuidado integral à saúde da mulher em todas as fases da vida. Oferecemos exames preventivos, pré-natal de alto risco e tratamentos de fertilidade.',
            benefits: ['Ultrassonografia 4D', 'Mamografia digital', 'Cirurgia minimamente invasiva']
        },
        'cardiologia': {
            title: 'Cardiologia',
            icon: 'fa-heart-pulse',
            desc: 'Diagnóstico preciso e tratamento de doenças cardiovasculares. Nossa equipe utiliza os métodos mais modernos para garantir a saúde do seu coração.',
            benefits: ['Ecocardiograma', 'Holter 24h', 'Reabilitação cardíaca']
        }
    };

    window.openServiceDetail = (serviceKey) => {
        const data = serviceData[serviceKey];
        if (!data) return;

        const container = document.getElementById('service-content-injection');
        
        // Build HTML
        let benefitsHtml = '';
        data.benefits.forEach(b => {
            benefitsHtml += `<li class="mb-2"><i class="fas fa-check-circle text-success me-2"></i>${b}</li>`;
        });

        container.innerHTML = `
            <div class="service-detail-header">
                <div class="detail-icon">
                    <i class="fas ${data.icon}"></i>
                </div>
                <h2 class="fw-bold mb-2">${data.title}</h2>
                <div class="d-inline-block bg-white px-3 py-1 rounded-pill text-primary fw-bold small shadow-sm">
                    EXCELÊNCIA MÉDICA
                </div>
            </div>
            <p class="text-muted mb-4 lead" style="font-size: 1rem;">${data.desc}</p>
            <div class="bg-light p-3 rounded mb-4 border border-light">
                <h6 class="fw-bold text-dark mb-3">Destaques do Serviço:</h6>
                <ul class="list-unstyled mb-0 small text-muted">
                    ${benefitsHtml}
                </ul>
            </div>
        `;

        window.openModal('service-detail');
    };

    /* ==========================================================================
       4. Form Logic (WhatsApp/Email)
       ========================================================================== */
    const waForm = document.getElementById('whatsappForm');
    if (waForm) {
        waForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = waForm.querySelector('button');
            const originalContent = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
            
            const formData = new FormData(waForm);
            const msg = `Olá! Me chamo ${formData.get('name')}. Gostaria de agendar ${formData.get('specialty')} para ${formData.get('date') || 'data a combinar'}.`;
            
            // Use config if available, else fallback
            const phone = (typeof SITE_CONFIG !== 'undefined') 
                          ? SITE_CONFIG.info.phone.replace(/\D/g, '') 
                          : "258844465042";

            const link = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
            
            setTimeout(() => {
                window.open(link, '_blank');
                btn.innerHTML = originalContent;
                window.closeModal();
            }, 800);
        });
    }

    /* ==========================================================================
       5. Counters Animation
       ========================================================================== */
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = +el.getAttribute('data-target');
                let count = 0;
                const inc = target / 50; 
                const update = () => {
                    count += inc;
                    if (count < target) {
                        el.innerText = Math.ceil(count);
                        requestAnimationFrame(update);
                    } else {
                        el.innerText = target + (target > 90 ? '%' : '+');
                    }
                };
                update();
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(c => observer.observe(c));

    /* ==========================================================================
       6. Navbar Scroll
       ========================================================================== */
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            nav.classList.add('shadow');
        } else {
            nav.classList.remove('shadow');
        }
    });

});