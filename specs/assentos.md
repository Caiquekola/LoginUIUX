O mapa de assentos é um dos pontos altos do seu trabalho de IHC, pois permite aplicar diretamente diversas Heurísticas de Nielsen, como a **Correspondência com o Mundo Real (#2)** e a **Prevenção de Erros (#5)**[cite: 1].

Abaixo está a implementação modular para esta funcionalidade, integrada ao padrão Material Design que definimos.

### 1. Estrutura HTML (`evento.html`)
Adicione este container onde o mapa será renderizado. Incluir uma legenda é essencial para a **Heurística #10 (Ajuda e Documentação)**[cite: 1].

```html
<section class="seat-selection">
    <h3>Selecione seu Assento</h3>
    
    <!-- Legenda (Heurística #10) -->
    <div class="legend">
        <div class="legend-item"><span class="seat available"></span> Disponível</div>
        <div class="legend-item"><span class="seat occupied"></span> Ocupado</div>
        <div class="legend-item"><span class="seat selected"></span> Selecionado</div>
    </div>

    <!-- Container do Mapa -->
    <div id="mapa-container" class="map-grid"></div>

    <!-- Status da Seleção (Heurística #1) -->
    <div id="selection-status" class="card" style="margin-top: 20px; display: none;">
        <p>Assento Selecionado: <strong id="seat-label">-</strong></p>
        <button id="btn-confirmar" class="btn btn-primary" disabled>Confirmar Assento</button>
    </div>
</section>
```

### 2. Estilização CSS (`css/layouts.css`)
O segredo do Material Design aqui é o uso de estados visuais claros e bordas arredondadas suaves.

```css
.map-grid {
    display: grid;
    /* Define o número de colunas baseado na sua matriz de dados */
    grid-template-columns: repeat(5, 40px); 
    gap: 12px;
    justify-content: center;
    padding: 24px;
    background: var(--surface-variant);
    border-radius: 16px;
}

.seat {
    width: 40px;
    height: 40px;
    border-radius: 8px 8px 4px 4px; /* Formato que lembra uma poltrona */
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: bold;
}

.seat.available {
    background-color: var(--primary-container);
    border: 1px solid var(--primary);
    color: var(--primary);
}

.seat.occupied {
    background-color: var(--outline);
    cursor: not-allowed; /* Prevenção de erros (#5) */
    opacity: 0.5;
}

.seat.selected {
    background-color: var(--primary);
    color: white;
    transform: scale(1.1);
    box-shadow: var(--shadow-2);
}

.seat.corredor {
    visibility: hidden; /* Espaço vazio para simular corredores (#2) */
}

.legend {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-bottom: 16px;
}
```

### 3. Lógica JavaScript (`js/main.js`)
Esta função transforma a matriz de dados em elementos interativos, garantindo a **Visibilidade do Status do Sistema (#1)**[cite: 1].

```javascript
// Simulando o ID do evento selecionado
const eventoAtual = eventos[0]; 
let assentoSelecionado = null;

function renderizarMapa() {
    const container = document.getElementById('mapa-container');
    container.innerHTML = ''; // Limpa antes de renderizar

    eventoAtual.mapaAssentos.forEach((fila, i) => {
        fila.forEach((status, j) => {
            const assento = document.createElement('div');
            const label = `${String.fromCharCode(65 + i)}${j + 1}`; // Ex: A1, B2

            if (status === null) {
                assento.className = 'seat corredor';
            } else {
                assento.className = `seat ${status ? 'available' : 'occupied'}`;
                assento.textContent = label;

                if (status) { // Se estiver disponível
                    assento.onclick = () => selecionarAssento(label, assento);
                }
            }
            container.appendChild(assento);
        });
    });
}

function selecionarAssento(label, elemento) {
    // Remove seleção anterior
    document.querySelectorAll('.seat.selected').forEach(el => el.classList.remove('selected'));
    
    // Aplica nova seleção
    elemento.classList.add('selected');
    assentoSelecionado = label;

    // Atualiza interface (Heurística #1)
    const statusDiv = document.getElementById('selection-status');
    const labelSpan = document.getElementById('seat-label');
    const btn = document.getElementById('btn-confirmar');

    statusDiv.style.display = 'block';
    labelSpan.textContent = label;
    btn.disabled = false;
}

// Inicializa o mapa ao carregar a página
window.onload = renderizarMapa;
```

### Por que isso atende ao seu trabalho de IHC?
1.  **Correspondência com o mundo real (#2):** O uso de nomes de assentos como "A1", "B2" e a criação de "corredores" visuais (espaços `null`) ajudam o usuário a se localizar espacialmente[cite: 1].
2.  **Prevenção de Erros (#5):** Ao usar `cursor: not-allowed` e remover o evento de clique dos assentos ocupados, você impede que o usuário tente comprar um lugar indisponível antes mesmo dele cometer o erro[cite: 1].
3.  **Visibilidade do Status (#1):** A mudança imediata de cor para o assento "selecionado" e o surgimento do painel de confirmação confirmam que o sistema recebeu o comando do usuário[cite: 1].