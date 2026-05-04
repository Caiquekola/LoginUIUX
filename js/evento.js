// js/evento.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Get Event ID from URL params
    const params = new URLSearchParams(window.location.search);
    const eventIdParam = params.get('id');
    const eventId = eventIdParam ? parseInt(eventIdParam) : 1; // Fallback para 1

    const eventoAtual = eventos.find(e => e.id === eventId);
    console.log(eventoAtual);
    if (!eventoAtual) {
        alert('Evento não encontrado!');
        window.location.href = '/';
        return;
    }

    let assentoSelecionado = null;
    let categoriaSelecionada = null; // null = mostrar todos, ou categoria específica

    function init() {
        renderEventDetails();
        renderCategoriaSelector();
        renderizarMapa();
        setupEventListeners();
    }

    function formatDate(dateString) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    }

    function renderEventDetails() {
        const detailsContainer = document.getElementById('event-details');
        const imgSrc = ("../"+eventoAtual.imagem) || 'https://picsum.photos/900/520?random=50';

        detailsContainer.innerHTML = `
            <img src="${imgSrc}" alt="${eventoAtual.titulo}" style="width: 100%; height: 300px; object-fit: contain ; border-radius: 8px; margin-bottom: 24px;" onerror="this.src='https://picsum.photos/800/400?random=50'">
            <h2 style="font-size: 2rem; color: var(--primary); margin-bottom: 8px;">${eventoAtual.titulo}</h2>
            <p style="font-size: 1.1rem; margin-bottom: 16px; color: var(--secondary);">${eventoAtual.descricao}</p>
            
            <div style="display: flex; gap: 24px; flex-wrap: wrap;">
                <div class="event-info" style="margin-bottom: 0;">
                    <span class="material-symbols-outlined">calendar_today</span>
                    <span>${formatDate(eventoAtual.data)}</span>
                </div>
                <div class="event-info" style="margin-bottom: 0;">
                    <span class="material-symbols-outlined">location_on</span>
                    <span>${eventoAtual.local}</span>
                </div>
                <div class="event-info" style="margin-bottom: 0;">
                    <span class="material-symbols-outlined">sell</span>
                    <span>Categoria: ${eventoAtual.categoria}</span>
                </div>
            </div>
        `;
    }

    function renderCategoriaSelector() {
        const select = document.getElementById('categoria-ingresso');
        select.innerHTML = '';
        
        // Opção para mostrar todos os assentos
        const allOption = document.createElement('option');
        allOption.value = '';
        allOption.textContent = 'Selecione uma categoria';
        select.appendChild(allOption);
        
        eventoAtual.categorias.forEach((cat, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${cat.nome} - R$ ${cat.preco.toFixed(2).replace('.', ',')}`;
            select.appendChild(option);
        });

        select.addEventListener('change', (e) => {
            // Atualiza categoria e filtra assentos
            if (e.target.value === '') {
                categoriaSelecionada = null;
            } else {
                categoriaSelecionada = eventoAtual.categorias[e.target.value];
            }
            
            // Se há assento selecionado e a categoria mudou para uma diferente do assento, limpa seleção
            if (assentoSelecionado && categoriaSelecionada && assentoSelecionado.categoriaId !== categoriaSelecionada.id) {
                assentoSelecionado = null;
            }
            
            renderizarMapa();
            updateSelectionStatus();
        });
    }

    function renderizarMapa() {
        const container = document.getElementById('mapa-container');
        container.innerHTML = ''; // Limpa antes de renderizar

        // Configura colunas dinamicamente baseado na maior fila (Heurística de Consistência e Prevenção)
        const maxCols = Math.max(...eventoAtual.mapaAssentos.map(fila => fila.length));
        container.style.gridTemplateColumns = `repeat(${maxCols}, 40px)`;

        eventoAtual.mapaAssentos.forEach((fila, i) => {
            fila.forEach((assentoData, j) => {
                const assento = document.createElement('div');
                const label = `${String.fromCharCode(65 + i)}${j + 1}`; // Ex: A1, B2

                if (assentoData === null) {
                    assento.className = 'seat corredor';
                } else {
                    const isVip = assentoData.categoriaId === 'vip';
                    const isAvailable = assentoData.disponivel;
                    
                    // Filtra por categoria se uma categoria específica está selecionada
                    const categoriaFiltro = categoriaSelecionada?.id;
                    const deveExibir = !categoriaFiltro || assentoData.categoriaId === categoriaFiltro;
                    
                    if (!deveExibir) {
                        // Assento de outra categoria - exibe como oculto/cinza
                        assento.className = 'seat hidden-seat';
                        assento.style.opacity = '0.2';
                        assento.style.cursor = 'not-allowed';
                        assento.textContent = label;
                        assento.title = `Assento ${label} - Categoria diferente`;
                        container.appendChild(assento);
                        return;
                    }
                    
                    // Classes CSS diferenciadas por categoria (Heurística #10 - Reconhecimento)
                    assento.className = `seat ${isAvailable ? 'available' : 'occupied'} ${isVip ? 'vip' : 'standard'}`;
                    assento.textContent = label;
                    
                    // Acessibilidade (RNF03 - WCAG)
                    assento.setAttribute('role', 'button');
                    assento.setAttribute('tabindex', isAvailable ? '0' : '-1');
                    assento.setAttribute('aria-label', `Assento ${label}, ${isVip ? 'VIP/Camarote' : 'Standard'}, ${isAvailable ? 'disponível' : 'ocupado'}`);

                    if (isAvailable) { // Se estiver disponível
                        assento.onclick = () => selecionarAssento(label, assento, assentoData.categoriaId);
                        // Navegação por teclado (RNF03)
                        assento.onkeydown = (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                selecionarAssento(label, assento, assentoData.categoriaId);
                            }
                        };
                    } else {
                        assento.title = "Assento Ocupado"; // Heurística #1
                        assento.setAttribute('aria-disabled', 'true');
                    }
                }
                container.appendChild(assento);
            });
        });
    }

    function selecionarAssento(label, elemento, categoriaId) {
        // Se clicou no mesmo assento já selecionado, desseleciona
        if (assentoSelecionado && assentoSelecionado.label === label) {
            elemento.classList.remove('selected');
            assentoSelecionado = null;
            updateSelectionStatus();
            return;
        }
        
        // Remove seleção anterior (Heurística #3 - Liberdade, altera sem travar)
        document.querySelectorAll('.seat.selected').forEach(el => el.classList.remove('selected'));
        
        // Aplica nova seleção
        elemento.classList.add('selected');
        assentoSelecionado = { label, categoriaId };

        // Atualiza categoria automaticamente baseada no assento selecionado (Heurística #10 - Reconhecimento)
        const categoriaIndex = eventoAtual.categorias.findIndex(c => c.id === categoriaId);
        if (categoriaIndex !== -1) {
            const select = document.getElementById('categoria-ingresso');
            select.value = categoriaIndex;
            categoriaSelecionada = eventoAtual.categorias[categoriaIndex];
            renderizarMapa();
        }

        updateSelectionStatus();
    }

    function updateSelectionStatus() {
        const statusDiv = document.getElementById('selection-status');
        const labelSpan = document.getElementById('seat-label');
        const priceSpan = document.getElementById('price-label');
        const btn = document.getElementById('btn-confirmar');

        // Só exibe e habilita botão se tiver assento E categoria selecionados
        if (!assentoSelecionado || !categoriaSelecionada) {
            statusDiv.style.display = 'none';
            btn.disabled = true;
            return;
        }

        // Atualiza interface (Heurística #1 - Visibilidade)
        statusDiv.style.display = 'block';
        labelSpan.textContent = assentoSelecionado.label;
        
        // Exibe preço baseado na categoria selecionada
        priceSpan.textContent = `R$ ${categoriaSelecionada.preco.toFixed(2).replace('.', ',')} (${categoriaSelecionada.nome})`;
        btn.disabled = false;
    }

    function setupEventListeners() {
        const btnConfirmar = document.getElementById('btn-confirmar');
        btnConfirmar.addEventListener('click', () => {
            // Requer assento E categoria para confirmar
            if (!assentoSelecionado || !categoriaSelecionada) return;
            
            // Passa os dados via URLSearchParams para o checkout
            const params = new URLSearchParams();
            params.append('eventId', eventoAtual.id);
            params.append('seat', assentoSelecionado.label);
            params.append('categoryId', categoriaSelecionada.id);
            
            window.location.href = `/pages/checkout.html?${params.toString()}`;
        });
    }

    // Inicializa
    init();
});
