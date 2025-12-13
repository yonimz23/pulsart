const plansData = {
    basico: {
        name: '🟡 Plan Básico',
        idealFor: 'Para artistas en etapa de exploración.',
        prices: { founder: 350000, regular: 450000 },
        saving: 770000,
        planKey: 'basico',
        features: [
            '1 asesoría de orientación de venta/imagen semestral (Valor real: 400.000 Gs)',
            '1 sesión fotográfica de estudio - 50 fotos (Valor real: 500.000 Gs)',
            '2 horas de Estudio de grabación (Valor real: 220.000 Gs)',
            '10% de descuento en talleres y servicios adicionales'
        ]
    },
    desarrollo: {
        name: '🟠 Plan Desarrollo',
        idealFor: 'Para artistas que buscan desarrollar y lanzar su propuesta.',
        prices: { founder: 550000, regular: 650000 },
        saving: 2380000,
        planKey: 'desarrollo',
        features: [
            '1 asesoría de orientación de venta/imagen semestral (Valor real: 600.000 Gs)',
            'Registro de obras - hasta 2 expedientes/trimestre (Valor real: 1.000.000 Gs)',
            '3 horas de Estudio de grabación (Valor real: 330.000 Gs)',
            '1 asesoría sobre redes sociales e identidad visual (Valor real: 1.000.000 Gs)',
            '15% de descuento en talleres y servicios seleccionados'
        ]
    },
    pro: {
        name: '🔴 Plan Pro',
        idealFor: 'Para profesionales que buscan consolidar su carrera.',
        prices: { founder: 950000, regular: 1100000 },
        saving: 3490000,
        planKey: 'pro',
        features: [
            'Asesoría integral trimestral + seguimiento mensual (Valor real: 1.000.000 Gs)',
            'Registro de hasta 3 expedientes mensuales (Valor real: 1.500.000 Gs)',
            '1 Sesión fotográfica y creación de contenido trimestral (Valor real: 1.000.000 Gs)',
            '4 horas de Estudio de grabación (Valor real: 440.000 Gs)',
            'Asesoría y gestión para distribución en plataformas (Valor real: 500.000 Gs)',
            'Acceso gratuito a networking y co-creación',
            '15% de descuento en servicios y talleres',
            'Acceso preferencial a shows y circuitos (Músicos)'
        ]
    },
    premium: {
        name: '⚫ Plan Premium',
        idealFor: 'Para proyectos con actividad constante y listos para seguir.',
        prices: { founder: 1500000, regular: 1850000 },
        saving: 8080000,
        planKey: 'premium',
        features: [
            'Asesoría integral trimestral + acompañamiento semanal (Valor real: 1.500.000 Gs)',
            'Registro de hasta 4 expedientes mensuales (Valor real: 1.700.000 Gs)',
            'Uso de estudio/espacio creativo: 2 horas semanales (Valor real: 880.000 Gs)',
            'Sesión audiovisual completa y fotos para campaña (Valor real: 3.500.000 Gs)',
            'Asesoría permanente de redes y distribución digital (Valor real: 2.000.000 Gs)',
            '20% de descuento en servicios y talleres',
            'Participación prioritaria en eventos',
            'Acceso preferencial a programaciones y shows'
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
                    label: 'Tu Inversión Mensual',
                    data: investmentData,
                    backgroundColor: '#FF6600', 
                    borderColor: '#e65c00', 
                    borderWidth: 1,
                    borderRadius: 5
                },
                {
                    label: 'Tu Ahorro Estimado (Valor Real)',
                    data: savingsData,
                    backgroundColor: '#1a1a1a', 
                    borderColor: '#000000', 
                    borderWidth: 1,
                    borderRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            if (value >= 1000000) return (value/1000000) + 'M';
                            if (value >= 1000) return (value/1000) + 'k';
                            return value;
                        },
                        font: { family: "'Montserrat', sans-serif" }
                    },
                    grid: { color: '#f0f0f0' }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { family: "'Montserrat', sans-serif", weight: 'bold' } }
                }
            },
            plugins: {
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleFont: { family: "'Montserrat', sans-serif", size: 14 },
                    bodyFont: { family: "'Montserrat', sans-serif", size: 13 },
                    padding: 10,
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
                    position: 'bottom',
                    labels: {
                        font: { family: "'Montserrat', sans-serif", size: 12 },
                        usePointStyle: true,
                        boxWidth: 8
                    }
                }
            }
        }
    });
};

const renderPlanDetails = (planKey) => {
    const plan = plansData[planKey];
    const contentEl = document.getElementById('details-content');
    
    // Cálculo del Valor Real Total para mostrar la comparativa
    const price = currentPriceType === 'founder' ? plan.prices.founder : plan.prices.regular;
    const realValue = price + plan.saving;

    contentEl.innerHTML = `
        <div class="details-card">
            <h3 style="font-size: 1.8rem; color: #FF6600; font-weight: 700; margin-bottom: 5px;">${plan.name}</h3>
            <p style="font-style: italic; color: #666; margin-bottom: 20px; font-size: 0.95rem;">${plan.idealFor}</p>
            
            <div style="background: #fafafa; border-radius: 10px; padding: 20px; margin-bottom: 25px; border: 1px solid #eee;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
                    <span style="color: #666; font-size: 0.9rem;">Valor Real de Servicios:</span>
                    <span style="color: #666; font-weight: 700; text-decoration: line-through;">${formatCurrency(realValue)}</span>
                </div>
                
                <div style="text-align: center;">
                    <p style="font-size: 0.9rem; color: #FF6600; font-weight: 700; text-transform: uppercase; margin-bottom: 5px;">
                        ${currentPriceType === 'founder' ? 'Precio Lanzamiento 🚀' : 'Precio Regular'}
                    </p>
                    <p class="price-text-large">
                        ${formatCurrency(price)}
                        <span style="font-size: 1rem; font-weight: 400; color: #888;">/mes</span>
                    </p>
                </div>
            </div>

            <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 15px; color: #333;">Lo que incluye:</h4>
            <ul class="feature-list">
                ${plan.features.map(feature => `
                    <li>
                        <span class="check-icon">✓</span>
                        <span style="font-size: 0.95rem; color: #444;">${feature}</span>
                    </li>
                `).join('')}
            </ul>
            
             <div class="saving-box">
                <i class="fas fa-piggy-bank" style="margin-right: 5px;"></i>
                Ahorras aprox. ${formatCurrency(plan.saving)} al mes
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
    
    // Contador de cupos (Visual)
    const spotsLeftEl = document.getElementById('spots-left');
    let spots = 20;

    if(founderBtn && regularBtn) {
        founderBtn.addEventListener('click', () => {
            currentPriceType = 'founder';
            renderChart(currentPriceType);
            const activeTab = document.querySelector('.plan-tab.tab-active');
            if(activeTab) renderPlanDetails(activeTab.getAttribute('data-plan'));
            
            founderBtn.classList.add('active');
            regularBtn.classList.remove('active');
        });

        regularBtn.addEventListener('click', () => {
            currentPriceType = 'regular';
            renderChart(currentPriceType);
            const activeTab = document.querySelector('.plan-tab.tab-active');
            if(activeTab) renderPlanDetails(activeTab.getAttribute('data-plan'));

            regularBtn.classList.add('active');
            founderBtn.classList.remove('active');
        });
    }
    
    planTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            planTabs.forEach(t => t.classList.remove('tab-active'));
            tab.classList.add('tab-active');
            const planKey = tab.getAttribute('data-plan');
            renderPlanDetails(planKey);
        });
    });

    if(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            const formData = new FormData(form);
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = "Quiero Pre-inscribirme";

            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            
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
                    form.style.display = 'none'; 
                    successMessage.style.display = 'block';
                    form.reset();
                } else {
                    errorMessage.style.display = 'block';
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                }
            } catch (error) {
                console.error('Error al enviar formulario:', error);
                errorMessage.style.display = 'block';
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }

    // BOTÓN VOLVER ARRIBA
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
    
    // ANIMACIONES
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.bloque-inicio, .chart-card, .details-card, .benefit-item, .aliado-item');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in-section');
        observer.observe(el);
    });
});