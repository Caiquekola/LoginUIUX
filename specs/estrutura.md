### 1. Arquitetura de Pastas (Vanilla Clean)
Manteremos uma estrutura modular, mesmo sem frameworks, para que você possa organizar o CSS por componente (seguindo a lógica do Material Design).

```text
/sistema-ingressos
├── /assets           # Imagens, ícones e o logotipo simulado
├── /css
│   ├── main.css      # Estilos globais e variáveis (Material Design)
│   ├── components.css # Botões, Cards, Inputs, Modais
│   └── layouts.css    # Grid do mapa de assentos e perfil
├── /js
│   ├── data.js       # O "Banco de Dados" (Vetores de eventos e assentos)[cite: 1]
│   ├── auth.js       # Simulação de estado de login (já pronto/mock)[cite: 1]
│   ├── utils.js      # Gerador de QR Code e formatadores de data/moeda[cite: 1]
│   └── main.js       # Lógica de renderização e navegação (SPA ou Multi-page)
├── index.html        # Landing page / Listagem de eventos[cite: 1]
├── evento.html       # Seleção de ingressos e assentos[cite: 1]
├── checkout.html     # Pagamento simulado[cite: 1]
└── perfil.html       # Meus ingressos (Passados e Futuros)[cite: 1]
```

---

### 2. O "Cérebro": `data.js`
Conforme o requisito de usar vetores simples[cite: 1], aqui está a estrutura que suportará a funcionalidade de escolha de assento e categorias:

```javascript
// js/data.js

const eventos = [
    {
        id: 1,
        titulo: "Workshop de Sistemas de Informação (WSI)",
        data: "2026-05-15T19:00:00",
        local: "Auditório Principal - IFMG",
        descricao: "Explorando as fronteiras da IHC e IA.",
        imagem: "assets/wsi.jpg",
        categorias: [
            { id: "std", nome: "Normal", preco: 50.00 },
            { id: "vip", nome: "Área VIP", preco: 120.00 }
        ],
        // Matriz de assentos: null = corredor, true = disponível, false = ocupado[cite: 1]
        mapaAssentos: [
            [true, true, null, true, true],
            [true, false, null, true, true],
            [true, true, null, false, false],
            [false, true, null, true, true]
        ]
    }
    // Adicionar mais eventos (passados e futuros) para o requisito de filtro[cite: 1]
];

// Ingressos comprados pelo usuário (inicialmente vazio)[cite: 1]
const meusIngressos = [
    {
        idCompra: "ABC-123",
        eventoId: 1,
        categoria: "Área VIP",
        assento: "B2",
        dataCompra: "2026-03-10",
        qrCode: "data:image/png;base64..." // Simulação do QR Code[cite: 1]
    }
];
```

---

### 3. Estratégia de Heurísticas (O "Pulo do Gato" para o Trabalho)
Para o seu relatório de IHC[cite: 1], cada escolha técnica deve ter uma justificativa. Exemplos de como vamos aplicar as heurísticas no código:

*   **Visibilidade do Status do Sistema:** Ao clicar num assento, ele deve mudar de cor instantaneamente (selecionado) e o resumo do valor deve atualizar no rodapé[cite: 1].
*   **Prevenção de Erros:** O botão "Finalizar Compra" só deve ser habilitado se um assento for selecionado[cite: 1].
*   **Correspondência com o Mundo Real:** O mapa de assentos deve parecer visualmente com a disposição de um auditório, não apenas uma lista de checkboxes[cite: 1].
