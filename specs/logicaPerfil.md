Excelente. A separação entre eventos futuros e passados no perfil do usuário é um requisito direto do seu trabalho de IHC[cite: 1] e uma ótima oportunidade para aplicar a **Heurística #7 (Flexibilidade e eficiência de uso)** e a **Heurística #8 (Estética e design minimalista)**[cite: 1].

Abaixo está a implementação de como organizar e exibir os ingressos do usuário, garantindo também a ordenação cronológica[cite: 1].

### 1. Estrutura HTML (`perfil.html`)
Vamos criar abas (Tabs) para separar as categorias de forma clara, o que facilita a navegação.

```html
<section class="user-profile">
    <h2>Meus Ingressos</h2>
    
    <!-- Controles de Navegação (Tabs) - Heurística #7 -->
    <div class="tabs">
        <button class="tab-btn active" onclick="filtrarIngressos('futuros')">Próximos Eventos</button>
        <button class="tab-btn" onclick="filtrarIngressos('passados')">Eventos Passados</button>
    </div>

    <!-- Lista de Ingressos -->
    <div id="lista-ingressos" class="tickets-container">
        <!-- Ingressos serão renderizados aqui pelo JS -->
    </div>
</section>
```

### 2. Estilização CSS (`css/components.css`)
Estilização simples e responsiva para os Cards de ingresso, utilizando as variáveis do Material Design que criamos.

```css
/* Tabs de Navegação */
.tabs {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    border-bottom: 1px solid var(--outline);
}

.tab-btn {
    background: transparent;
    border: none;
    padding: 12px 24px;
    font-size: 16px;
    color: var(--secondary);
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease;
}

.tab-btn.active {
    color: var(--primary);
    border-bottom: 2px solid var(--primary);
    font-weight: 500;
}

/* Card de Ingresso */
.tickets-container {
    display: grid;
    gap: 16px;
    /* Grid responsivo (RNF02) */
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
}

.ticket-card {
    background: white;
    border-radius: 12px;
    padding: 16px;
    border-left: 6px solid var(--primary);
    box-shadow: var(--shadow-1);
    display: flex;
    justify-content: space-between;
}

.ticket-card.past-event {
    border-left-color: var(--outline);
    opacity: 0.8;
}

.ticket-info h4 { margin-bottom: 8px; color: #1C1B1F; }
.ticket-info p { margin-bottom: 4px; font-size: 14px; color: var(--secondary); }

.ticket-qr {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.ticket-qr img {
    width: 60px;
    height: 60px;
    margin-bottom: 4px;
}
```

### 3. Lógica JavaScript (`js/perfil.js`)
Esta é a lógica principal para filtrar e ordenar os dados. Lembre-se que precisamos dos dados do arquivo `data.js` para isso funcionar.

```javascript
// js/perfil.js

// Mock expandido para testar a funcionalidade (adicione isso ou similar ao seu data.js)
const eventosMock = {
    1: { titulo: "Workshop de Sistemas de Informação (WSI)", data: "2026-05-15T19:00:00" }, // Futuro
    2: { titulo: "Festival Barreiros Rievers", data: "2026-06-20T20:00:00" }, // Futuro
    3: { titulo: "Campeonato de Robótica", data: "2025-10-10T14:00:00" }  // Passado
};

const meusIngressosMock = [
    { idCompra: "A1", eventoId: 1, categoria: "Área VIP", assento: "B2", qrCode: "assets/mock-qr.png" },
    { idCompra: "A2", eventoId: 2, categoria: "Normal", assento: "Livre", qrCode: "assets/mock-qr.png" },
    { idCompra: "A3", eventoId: 3, categoria: "Competidor", assento: "Bancada", qrCode: "assets/mock-qr.png" }
];

function filtrarIngressos(tipoFiltro) {
    // 1. Atualizar UI das Tabs (Heurística #1 - Visibilidade do status)
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    const container = document.getElementById('lista-ingressos');
    container.innerHTML = '';

    const dataAtual = new Date(); // A referência é o momento atual

    // 2. Filtrar e processar os ingressos
    let ingressosFiltrados = meusIngressosMock.map(ingresso => {
        const eventoInfo = eventosMock[ingresso.eventoId];
        return {
            ...ingresso,
            eventoTitulo: eventoInfo.titulo,
            dataEvento: new Date(eventoInfo.data) // Converte a string de data para objeto Date
        };
    }).filter(ingresso => {
        // Separa os eventos futuros dos passados[cite: 1]
        if (tipoFiltro === 'futuros') {
            return ingresso.dataEvento >= dataAtual;
        } else {
            return ingresso.dataEvento < dataAtual;
        }
    });

    // 3. Ordenar em ordem cronológica[cite: 1]
    ingressosFiltrados.sort((a, b) => {
        // Se for futuro, o mais próximo aparece primeiro. Se passado, o mais recente aparece primeiro.
        return tipoFiltro === 'futuros' ? a.dataEvento - b.dataEvento : b.dataEvento - a.dataEvento;
    });

    // 4. Renderizar na tela
    if (ingressosFiltrados.length === 0) {
        container.innerHTML = `<p style="color: var(--outline);">Você não possui ingressos nesta categoria.</p>`;
        return;
    }

    ingressosFiltrados.forEach(ingresso => {
        const dataFormatada = ingresso.dataEvento.toLocaleDateString('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        // Ingresso Digital com QR-Code[cite: 1]
        const card = document.createElement('div');
        card.className = `ticket-card ${tipoFiltro === 'passados' ? 'past-event' : ''}`;
        card.innerHTML = `
            <div class="ticket-info">
                <h4>${ingresso.eventoTitulo}</h4>
                <p><strong>Data:</strong> ${dataFormatada}</p>
                <p><strong>Categoria:</strong> ${ingresso.categoria}</p>
                <p><strong>Assento:</strong> ${ingresso.assento}</p>
            </div>
            <div class="ticket-qr">
                <img src="${ingresso.qrCode}" alt="QR Code do Ingresso" />
                <span style="font-size: 10px; color: var(--secondary);">${ingresso.idCompra}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// Inicializa a página carregando os eventos futuros
window.onload = () => {
    // Simula o clique na primeira aba para carregar a lista inicial
    document.querySelector('.tab-btn.active').click(); 
};
```

### Justificativas para o Relatório de IHC

*   **Heurística #7 (Flexibilidade e eficiência de uso):** O uso de abas (Tabs) para separar "Futuros" de "Passados" permite que o usuário encontre rapidamente o que precisa, evitando a sobrecarga de informações ao listar tudo em uma única página longa[cite: 1].
*   **Heurística #8 (Estética e design minimalista):** Os cards de eventos passados (`.past-event`) possuem menor opacidade e uma borda cinza, comunicando visualmente, sem poluir a interface, de que aquela ação não está mais ativa, enquanto os eventos futuros mantêm a cor primária (roxo)[cite: 1].

Com isso, resolvemos a filtragem, a ordenação e a exibição do QR Code digital[cite: 1]. 
