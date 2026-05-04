// js/perfil.js

document.addEventListener('DOMContentLoaded', () => {
    // Verificar mensagem de sucesso da compra
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
        const alertBox = document.getElementById('success-alert');
        if (alertBox) alertBox.style.display = 'block';
        
        // Remove param da URL para não mostrar em refresh futuro
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Tentar recuperar ingresso recém comprado do localStorage
    // (Pois em um sistema real isso viria do backend)
    const ultimoIngresso = localStorage.getItem('ultimoIngressoComprado');
    if (ultimoIngresso) {
        try {
            const ingressoParsed = JSON.parse(ultimoIngresso);
            // Verifica se o ingresso já existe para não duplicar em refresh
            const existe = meusIngressos.find(i => i.idCompra === ingressoParsed.idCompra);
            if (!existe) {
                meusIngressos.push(ingressoParsed);
            }
        } catch (e) {
            console.error("Erro ao fazer parse do ingresso", e);
        }
    }

    // Iniciar na aba de eventos futuros
    filtrarIngressos('futuros');
});

function filtrarIngressos(tipoFiltro) {
    // 1. Atualizar UI das Tabs (Heurística #1 - Visibilidade do status)
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    const targetTab = document.getElementById(`tab-${tipoFiltro}`);
    if (targetTab) {
        targetTab.classList.add('active');
    }

    const container = document.getElementById('lista-ingressos');
    container.innerHTML = '';

    // Data atual como referência
    const dataAtual = new Date();

    // 2. Filtrar e processar os ingressos
    let ingressosFiltrados = meusIngressos.map(ingresso => {
        // Encontra o evento associado
        const eventoInfo = eventos.find(e => e.id === ingresso.eventoId);
        
        if (!eventoInfo) return null;

        // Tenta usar data da simulação ou fallback para data do evento
        let dataEventoStr = eventoInfo.data;
        return {
            ...ingresso,
            eventoTitulo: eventoInfo.titulo,
            eventoLocal: eventoInfo.local,
            dataEvento: new Date(dataEventoStr)
        };
    }).filter(ingresso => {
        if (!ingresso) return false;
        
        // Separa os eventos futuros dos passados
        if (tipoFiltro === 'futuros') {
            return ingresso.dataEvento >= dataAtual;
        } else {
            return ingresso.dataEvento < dataAtual;
        }
    });

    // 3. Ordenar em ordem cronológica
    ingressosFiltrados.sort((a, b) => {
        // Se for futuro, o mais próximo aparece primeiro (ascendente). 
        // Se passado, o mais recente aparece primeiro (descendente).
        return tipoFiltro === 'futuros' ? a.dataEvento - b.dataEvento : b.dataEvento - a.dataEvento;
    });

    // 4. Renderizar na tela
    if (ingressosFiltrados.length === 0) {
        const emptyStateMsg = tipoFiltro === 'futuros' 
            ? 'Você ainda não possui ingressos para próximos eventos. <br><br> <a href="/" class="btn btn-primary" style="text-decoration: none; display: inline-block;">Explorar Eventos</a>'
            : 'Você ainda não possui eventos passados no seu histórico.';
            
        container.innerHTML = `
            <div style="text-align: center; padding: 48px 24px; color: var(--secondary); grid-column: 1 / -1;">
                <span class="material-symbols-outlined" style="font-size: 48px; opacity: 0.5; margin-bottom: 16px;">confirmation_number</span>
                <p>${emptyStateMsg}</p>
            </div>
        `;
        return;
    }

    ingressosFiltrados.forEach(ingresso => {
        const dataFormatada = ingresso.dataEvento.toLocaleDateString('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        // Heurística #8 - Eventos passados em cinza
        const isPast = tipoFiltro === 'passados' ? 'past-event' : '';
        
        const card = document.createElement('div');
        card.className = `ticket-card fade-in ${isPast}`;
        card.innerHTML = `
            <div class="ticket-info">
                <h4>${ingresso.eventoTitulo}</h4>
                <p><span class="material-symbols-outlined" style="font-size: 14px; vertical-align: middle;">calendar_today</span> ${dataFormatada}</p>
                <p><span class="material-symbols-outlined" style="font-size: 14px; vertical-align: middle;">location_on</span> ${ingresso.eventoLocal}</p>
                <div style="margin-top: 12px; display: inline-block; background-color: var(--surface-variant); padding: 4px 12px; border-radius: 16px;">
                    <span style="font-size: 0.875rem; font-weight: 500;">
                        ${ingresso.categoria} • Assento: ${ingresso.assento}
                    </span>
                </div>
            </div>
            <div class="ticket-qr">
                <img src="${ingresso.qrCode}" alt="QR Code para validação na entrada" title="Apresente este QR Code na portaria" />
                <span style="font-size: 0.7rem; color: var(--secondary); margin-top: 4px; font-family: monospace;">ID: ${ingresso.idCompra}</span>
                ${tipoFiltro === 'futuros' ? '<button class="btn btn-primary" style="padding: 4px 8px; font-size: 0.75rem; margin-top: 8px;">Baixar PDF</button>' : ''}
            </div>
        `;
        container.appendChild(card);
    });
}
