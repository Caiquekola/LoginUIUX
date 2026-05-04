Este PRD foca no ponto de entrada do sistema: a **Landing Page / Listagem Geral**. O objetivo aqui é garantir que o usuário encontre o evento desejado com o mínimo de esforço cognitivo, aplicando a **Heurística #8 (Estética e Design Minimalista)** e a **Heurística #6 (Reconhecimento em vez de lembrança)**[cite: 1].

---

# 📄 Detalhamento do PRD: Listagem Geral de Eventos (Landing Page)

## 1. Objetivo do Módulo
A Landing Page serve como o catálogo principal da plataforma. Ela deve apresentar os eventos de forma organizada e atraente, permitindo que o usuário identifique rapidamente as informações essenciais (nome, data, local e preço inicial) para decidir pela compra[cite: 1].

## 2. Requisitos Funcionais (RF) - Listagem
*   **RF01.1 - Galeria de Eventos:** Exibir uma grade (grid) de cards contendo a imagem de capa, título, data, local e uma breve descrição de cada evento disponível[cite: 1].
*   **RF01.2 - Barra de Busca:** Permitir que o usuário digite o nome de um evento para filtrar a lista em tempo real.
*   **RF01.3 - Filtro por Categoria:** Disponibilizar "Chips" (botões de filtro rápido do Material Design) para categorias como "Tecnologia", "Robótica", "Música" e "Acadêmico".
*   **RF01.4 - Navegação para Detalhes:** Ao clicar em um card, o usuário deve ser redirecionado para a página específica do evento para iniciar o processo de escolha de ingressos[cite: 1].
*   **RF01.5 - Cabeçalho Proeminente (Hero Section):** Uma seção de destaque no topo com o evento principal ou uma mensagem de boas-vindas.

## 3. Aplicação das Heurísticas de Nielsen (IHC) na Listagem
Para o seu relatório acadêmico, estes são os pontos de destaque nesta tela[cite: 1]:

| Heurística | Aplicação no Código/Interface |
| :--- | :--- |
| **#1 Visibilidade do status** | Exibir o número de resultados encontrados após uma busca (ex: "4 eventos encontrados")[cite: 1]. Se nenhum evento for encontrado, mostrar uma mensagem clara de "Nenhum evento corresponde à sua busca". |
| **#2 Correspondência com o mundo real** | Uso de ícones universais (Material Symbols): um calendário para a data, um marcador de mapa para o local e uma lupa para a busca[cite: 1]. |
| **#4 Consistência e padrões** | Seguir o padrão de "Cards" do Material Design 3, com bordas arredondadas (12px) e sombras suaves para indicar interatividade[cite: 1]. |
| **#6 Reconhecer em vez de relembrar** | Informações críticas (preço "a partir de" e data) devem estar visíveis no card. O usuário não deve precisar clicar no evento apenas para saber o dia em que ele ocorrerá[cite: 1]. |
| **#8 Estética e design minimalista** | Evitar excesso de texto nos cards. Usar hierarquia visual: título em negrito e maior, informações secundárias em cinza e menor tamanho[cite: 1]. |

## 4. Estrutura de Dados (Mock)
A página consumirá o array `eventos` do seu `data.js`. Para garantir a diversidade e testar os filtros, os objetos devem seguir este padrão:

```javascript
// Exemplo de item no vetor data.js
{
    id: 1,
    titulo: "Workshop de Sistemas de Informação (WSI)",
    categoria: "Acadêmico",
    data: "2026-05-15T19:00:00",
    local: "IFMG - Campus Ouro Branco",
    precoMin: 50.00,
    imagem: "assets/eventos/wsi.jpg"
}
```

## 5. Layout e Interface (Material Design)

### Componentes Chave:
1.  **Barra de Pesquisa (Search Bar):**
    *   Campo de texto com ícone de lupa à esquerda.
    *   Borda arredondada (28px) e fundo levemente acinzentado (`--surface-variant`).
2.  **Chips de Filtro:**
    *   Pequenas pílulas horizontais que mudam de cor quando ativas (Heurística #1).
3.  **Grid de Cards (Responsividade RNF02):**
    *   **Desktop:** 3 ou 4 colunas.
    *   **Tablet:** 2 colunas.
    *   **Mobile:** 1 coluna (card ocupando a largura total).

### Feedback Visual:
*   **Hover Effect:** Ao passar o mouse sobre um card, a elevação (sombra) deve aumentar de `var(--shadow-1)` para `var(--shadow-2)`, indicando que o elemento é clicável[cite: 1].

---
