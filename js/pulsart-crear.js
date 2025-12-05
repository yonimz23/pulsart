const plansData = {
    basico: {
        name: '🟡 Plan Básico',
        idealFor: 'Para artistas en etapa de exploración.',
        prices: { founder: 350000, regular: 450000 },
        saving: 650000,
        planKey: 'basico',
        features: [
            '1 asesoría de orientación de proyecto semestral',
            '1 sesión fotográfica de estudio por semestre (30 fotos)',
            '1 hora de uso de sala o estudio por mes',
            '10% de descuento en servicios y talleres EC + PA'
        ]
    },
    desarrollo: {
        name: '🟠 Plan Desarrollo',
        idealFor: 'Para artistas que buscan desarrollar y lanzar su propuesta.',
        prices: { founder: 550000, regular: 650000 },
        saving: 1150000,
        planKey: 'desarrollo',
        features: [
            '1 asesoría integral del proyecto por semestre',
            '1 sesión fotográfica de estudio por semestre (hasta 80 fotos)',
            'Registro de obras de 1 expediente por mes (10 obras)',
            '2 horas de uso de sala o estudio',
            '1 asesoría sobre redes sociales o identidad visual por semestre',
            '15% de descuento en servicios EC + PA'
        ]
    },
    pro: {
        name: '🔴 Plan Pro',
        idealFor: 'Para artistas activos que buscan consolidar su carrera.',
        prices: { founder: 950000, regular: 1100000 },
        saving: 2550000,
        planKey: 'pro',
        features: [
            'Asesoría integral semestral + seguimiento mensual',
            'Registro de hasta 2 expedientes mensuales (20 obras)',
            'Sesión fotográfica + video promocional por semestre',
            '3 horas de uso de sala o estudio por mes',
            'Asesoría sobre redes y estrategia digital',
            'Acceso a encuentros de networking y co-creación',
            'Para músicos: acceso preferencial a programaciones y shows',
            '15% de descuento en servicios EC + PA'
        ]
    },
    premium: {
        name: '⚫ Plan Premium',
        idealFor: 'Para artistas profesionales, colectivos o proyectos con actividad constante.',
        prices: { founder: 1500000, regular: 1850000 },
        saving: 7100000,
        planKey: 'premium',
        features: [
            'Asesoría integral trimestral + acompañamiento semanal',
            'Registro de hasta 4 expedientes de obras mensuales (40 obras)',
            '4 horas de uso de sala o estudio mensual',
            'Sesión audiovisual o fotográfica (3h) trimestral',
            'Representación para eventos y booking, mercados musicales',
            'Asesoría permanente sobre redes y distribución digital',
            'Participación prioritaria en convocatorias y eventos',
            '20% de descuento en servicios EC + PA'
        ]
    }
};

let myChart;
let currentPriceType = 'founder';

const formatCurrency = (value) => new Intl.NumberFormat('es-PY', { style: 'currency', currency: 'PYG', maximumFractionDigits: 0 }).format(value);

const renderChart = (priceType) => {
    const ctx = document.getElementById('plansChart').getContext('2d');
    const labels = Object.values(plansData).map(p => p.name.split(' ')[2]); 
    const investmentData = Object.values(plansData).map(p => p.prices[priceType]);
    const savingsData = Object.values(plansData).map(p => p.saving);

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Inversión Mensual',
                    data: investmentData,
                    backgroundColor: '#FF6600', 
                    borderColor: '#e65c00', 
                    borderWidth: 1
                },
                {
                    label: 'Ahorro Estimado',
                    data: savingsData,
                    backgroundColor: '#333333', 
                    borderColor: '#000000', 
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return new Intl.NumberFormat('es-PY').format(value);
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += formatCurrency(context.parsed.y);
                            }
                            return label;
                        }
                    }
                },
                legend: {
                    position: 'top',
                }
            }
        }
    });
};

const renderPlanDetails = (planKey) => {
    const plan = plansData[planKey];
    const contentEl = document.getElementById('details-content');
    
    // AQUÍ ESTABA EL ERROR: Se usaban clases de Tailwind (bg-white, p-6, etc.)
    // CORRECCIÓN: Ahora usamos la clase .details-card que definimos en tu CSS.
    
    contentEl.innerHTML = `
        <div class="details-card">
            <h3 style="font-size: 1.8rem; color: #FF6600; font-weight: 700; margin-bottom: 10px;">${plan.name}</h3>
            <p style="font-style: italic; color: #666; margin-bottom: 20px;">${plan.idealFor}</p>
            
            <div class="text-center" style="margin-bottom: 25px;">
                <p style="font-size: 0.9rem; color: #666;">Precio Lanzamiento</p>
                <p style="font-size: 2.5rem; font-weight: 900; color: #000; line-height: 1.2;">
                    ${formatCurrency(plan.prices.founder)}
                    <span style="font-size: 1rem; font-weight: 400; color: #888;">/mes</span>
                </p>
                <p style="font-size: 0.9rem; color: #888;">Precio Regular: ${formatCurrency(plan.prices.regular)}</p>
            </div>

            <ul class="feature-list">
                ${plan.features.map(feature => `
                    <li>
                        <span class="check-icon">✓</span>
                        <span>${feature}</span>
                    </li>
                `).join('')}
            </ul>
            
             <div class="saving-box">
                <p>Ahorras en este plan aprox. ${formatCurrency(plan.saving)}</p>
            </div>
        </div>
    `;
};

document.addEventListener('DOMContentLoaded', () => {
    renderChart(currentPriceType);
    renderPlanDetails('basico');

    const founderBtn = document.getElementById('founderPriceBtn');
    const regularBtn = document.getElementById('regularPriceBtn');
    const planTabs = document.querySelectorAll('.plan-tab');
    const form = document.getElementById('pre-registration-form');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error'); 
    
    const spotsLeftEl = document.getElementById('spots-left');
    let spots = 20;
    const interval = setInterval(() => {
        if (spots > 14) {
            spots--;
            spotsLeftEl.textContent = spots;
        } else {
            clearInterval(interval);
        }
    }, 5000);

    founderBtn.addEventListener('click', () => {
        currentPriceType = 'founder';
        renderChart(currentPriceType);
        founderBtn.classList.add('active');
        regularBtn.classList.remove('active');
    });

    regularBtn.addEventListener('click', () => {
        currentPriceType = 'regular';
        renderChart(currentPriceType);
        regularBtn.classList.add('active');
        founderBtn.classList.remove('active');
    });
    
    planTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            planTabs.forEach(t => t.classList.remove('tab-active'));
            tab.classList.add('tab-active');
            const planKey = tab.getAttribute('data-plan');
            renderPlanDetails(planKey);
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');
        
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                form.classList.add('hidden');
                successMessage.classList.remove('hidden');
            } else {
                errorMessage.classList.remove('hidden');
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        } catch (error) {
            console.error('Error al enviar formulario:', error);
            errorMessage.classList.remove('hidden');
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });

    // BOTÓN VOLVER ARRIBA (Lógica duplicada si ya está en script.js, pero inofensiva)
    const btnBackToTop = document.getElementById("btn-back-to-top");

    if(btnBackToTop) {
        window.onscroll = function() {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                btnBackToTop.style.display = "block";
            } else {
                btnBackToTop.style.display = "none";
            }
        };

        btnBackToTop.addEventListener("click", function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    // Select elements to animate
    const elementsToAnimate = document.querySelectorAll('.bloque-inicio, .summary-card, .persona, .proyecto-card, section h2, .membership-content, .hero-box, .chart-card, .details-card, .benefit-item, .aliado-item');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in-section');
        observer.observe(el);
    });
});