Para que a IA do Antigravity (ou Cursor) implemente o projeto de forma assertiva e sem alucinações, utilizaremos uma abordagem de **Spec-Driven Development (SDD)** organizada em **Milestones**.

O segredo aqui é instruir a IA a consumir os arquivos da sua pasta `specs/` como a "fonte da verdade" única. Abaixo, apresento o plano de execução dividido em 5 etapas lógicas:

---

## 🚀 Plano de Implementação: Ticket System IHC 2026

### Milestone 1: Fundação, Estilo e Dados (Core)
**Objetivo:** Criar a "espinha dorsal" do sistema e o Design System.
*   **Arquivos de Referência:** `specs/estrutura.md`, `specs/styles.md`, `specs/sistema.md`.
*   **Ações para a IA:**
    1.  Criar a estrutura de pastas conforme `estrutura.md`[cite: 1].
    2.  Implementar o `css/main.css` utilizando as variáveis do Material Design (M3) definidas em `styles.md`.
    3.  Configurar o `js/data.js` com o mock inicial de eventos (incluindo eventos passados e futuros) e a estrutura de matriz para os assentos[cite: 1].
*   **Check de Heurística:** Consistência e Padrões (#4)[cite: 1].

---

### Milestone 2: Discovery (Landing Page e Busca)
**Objetivo:** Implementar a porta de entrada do usuário.
*   **Arquivos de Referência:** `specs/landingPage.md`, `specs/nielsenHeuristics.md`.
*   **Ações para a IA:**
    1.  Criar `index.html` com o Hero Section e o Grid de Eventos.
    2.  Implementar a lógica de renderização dinâmica dos cards a partir do `data.js`[cite: 1].
    3.  Adicionar a funcionalidade de busca em tempo real e filtros por categoria (Chips).
*   **Check de Heurística:** Reconhecimento em vez de recordação (#6) e Estética Minimalista (#8)[cite: 1].

---

### Milestone 3: O Coração do IHC (Mapa de Assentos)
**Objetivo:** A funcionalidade técnica mais complexa do trabalho acadêmico.
*   **Arquivos de Referência:** `specs/assentos.md`, `specs/nielsenHeuristics.md`.
*   **Ações para a IA:**
    1.  Criar `evento.html` com os detalhes do evento e o container do mapa.
    2.  Implementar o gerador de grid dinâmico que interpreta `null` como corredor, `true` como livre e `false` como ocupado[cite: 1].
    3.  Adicionar lógica de seleção única, feedback visual de "selecionado" e atualização do preço em tempo real.
*   **Check de Heurística:** Visibilidade do Status do Sistema (#1) e Correspondência com o Mundo Real (#2)[cite: 1].

---

### Milestone 4: Fluxo de Checkout e Simulação
**Objetivo:** Garantir que o processo de compra seja seguro (simuladamente) e instrutivo.
*   **Arquivos de Referência:** `specs/checkout.md`, `specs/nielsenHeuristics.md`.
*   **Ações para a IA:**
    1.  Criar `checkout.html` com o resumo do pedido persistido da tela anterior[cite: 1].
    2.  Implementar máscaras de input para Cartão, Validade e CVV no JavaScript puro[cite: 1].
    3.  Criar a função de simulação com `setTimeout` que altera o estado do botão para "Processando..."[cite: 1].
*   **Check de Heurística:** Prevenção de Erros (#5) e Ajuda na Recuperação de Erros (#9)[cite: 1].

---

### Milestone 5: Pós-Venda e Ingresso Digital (Perfil)
**Objetivo:** Entrega do valor final e organização histórica.
*   **Arquivos de Referência:** `specs/logicaPerfil.md`, `specs/nielsenHeuristics.md`.
*   **Ações para a IA:**
    1.  Criar `perfil.html` com o sistema de abas para filtrar eventos futuros e passados[cite: 1].
    2.  Implementar a lógica de ordenação cronológica dos ingressos adquiridos[cite: 1].
    3.  Gerar o "Ingresso Digital" contendo o QR Code (usando imagem estática mockada ou biblioteca leve)[cite: 1].
*   **Check de Heurística:** Flexibilidade e Eficiência de Uso (#7)[cite: 1].
