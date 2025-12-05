document.addEventListener('DOMContentLoaded', () => {
    
    // MENÚ RESPONSIVE
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            const spans = hamburger.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // ACORDEÓN DE SERVICIOS
    const serviceHeaders = document.querySelectorAll('.servicio-header');
    serviceHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isOpen = content.style.maxHeight;
            document.querySelectorAll('.servicio-content').forEach(c => {
                c.style.maxHeight = null;
                c.classList.remove('open');
            });
            if (!isOpen) {
                content.style.maxHeight = content.scrollHeight + "px";
                content.classList.add('open');
            }
        });
    });

    // VALIDACIÓN FORMULARIO
    const contactForm = document.getElementById('sugerencia-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            const successMsg = document.getElementById('form-success');
            const errorMsg = document.getElementById('form-error');
            const emailInput = document.getElementById('email');

            if (emailInput && !emailInput.value.includes('@')) {
                alert('Por favor ingresa un correo válido.');
                return;
            }

            btn.disabled = true;
            btn.textContent = 'Enviando...';
            successMsg.style.display = 'none';
            errorMsg.style.display = 'none';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    contactForm.reset();
                    successMsg.style.display = 'block';
                } else {
                    errorMsg.style.display = 'block';
                }
            } catch (error) {
                errorMsg.style.display = 'block';
            } finally {
                btn.disabled = false;
                btn.innerHTML = originalText;
            }
        });
    }

    // VOLVER ARRIBA
    const backToTopBtn = document.getElementById("btn-back-to-top");
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ANIMACIONES
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.card, .bloque-inicio');
    animatedElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});