// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    const eventsGrid = document.getElementById('eventsGrid');
    const searchInput = document.getElementById('searchInput');
    const chipsContainer = document.getElementById('chipsContainer');
    const statusMessage = document.getElementById('statusMessage');

    let currentCategory = 'Todos';
    let currentSearchTerm = '';

    // Categorias disponíveis baseadas no data.js ou mockadas
    const availableCategories = [
        'Todos',
        ...new Set(eventos.map(evento => evento.categoria).filter(Boolean))
    ];
    function init() {
        renderChips();
        renderEvents();
        setupEventListeners();
    }

    function setupEventListeners() {
        // Implementar delay de busca (debounce) para efeito suave (ponto extra)
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                currentSearchTerm = e.target.value.toLowerCase().trim();
                renderEvents();
            }, 300); // 300ms delay para feedback visual suave
        });
    }

    function renderChips() {
        chipsContainer.innerHTML = '';
        availableCategories.forEach(category => {
            const chip = document.createElement('button');
            chip.className = `chip ${category === currentCategory ? 'active' : ''}`;
            chip.textContent = category;
            chip.onclick = () => {
                currentCategory = category;
                renderChips(); // update active state
                renderEvents(); // filter events
            };
            chipsContainer.appendChild(chip);
        });
    }

    function getPrecoMinimo(evento) {
        if (!evento.categorias || evento.categorias.length === 0) return 0;
        return Math.min(...evento.categorias.map(c => c.preco));
    }

    function formatDate(dateString) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    }

    function renderEvents() {
        // Filtrar eventos
        const filteredEvents = eventos.filter(evento => {
            const matchSearch = evento.titulo.toLowerCase().includes(currentSearchTerm);
            const matchCategory = currentCategory === 'Todos' || evento.categoria === currentCategory;
            return matchSearch && matchCategory;
        });

        // Limpar grid
        eventsGrid.innerHTML = '';

        // Feedback visual de status (Heurística #1)
        if (filteredEvents.length === 0) {
            statusMessage.textContent = 'Nenhum evento corresponde à sua busca.';
            statusMessage.style.color = 'var(--error)';
        } else {
            statusMessage.textContent = `${filteredEvents.length} evento(s) encontrado(s).`;
            statusMessage.style.color = 'var(--secondary)';
        }

        // Renderizar cards
        filteredEvents.forEach(evento => {
            const card = document.createElement('div');
            card.className = 'card event-card fade-in';
            card.onclick = () => {
                // Redirecionamento para a página de detalhes
                window.location.href = `/pages/evento.html?id=${evento.id}`;
            };

            const precoMin = getPrecoMinimo(evento);
            const priceFormatted = precoMin > 0 ? `A partir de R$ ${precoMin.toFixed(2).replace('.', ',')}` : 'Gratuito';

            // Usando imagem placeholder se não encontrar (ou a do mock)
            const imgSrc = evento.imagem || 'https://picsum.photos/300/180?random=50';

            card.innerHTML = `
                <img src="${imgSrc}" alt="Capa do evento ${evento.titulo}" class="event-card-img" onerror="this.src='https://picsum.photos/300/180?random=50'">
                <div class="event-card-content">
                    <h3 class="event-card-title">${evento.titulo}</h3>
                    
                    <div class="event-info">
                        <span class="material-symbols-outlined">calendar_today</span>
                        <span>${formatDate(evento.data)}</span>
                    </div>
                    
                    <div class="event-info">
                        <span class="material-symbols-outlined">location_on</span>
                        <span>${evento.local}</span>
                    </div>

                    <div class="event-price">
                        ${priceFormatted}
                    </div>
                </div>
            `;

            eventsGrid.appendChild(card);
        });
    }

    init();
});
