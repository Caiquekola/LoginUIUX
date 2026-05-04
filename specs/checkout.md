Aqui está o detalhamento do PRD específico para o Fluxo de Checkout (Pagamento Simulado), focado em garantir uma excelente experiência do usuário e aderência às Heurísticas de Nielsen, conforme exigido no seu trabalho de IHC[cite: 1].

---

# 📄 Detalhamento do PRD: Módulo de Checkout (Pagamento Simulado)

## 1. Objetivo do Módulo
O módulo de Checkout tem como objetivo simular o processo de pagamento de um ingresso selecionado[cite: 1]. Como se trata de um protótipo de front-end, não haverá processamento real de transações ou integração com gateways de pagamento (como Stripe ou Pagar.me). O foco total é na interface (UI), na experiência do usuário (UX) e na prevenção e tratamento de erros durante a entrada de dados do cartão de crédito[cite: 1].

## 2. Requisitos Funcionais (RF) - Checkout
*   **RF04.1 - Resumo da Compra:** O sistema deve exibir de forma clara o ingresso selecionado (Nome do Evento, Data, Categoria, Assento e Valor Total) antes e durante o preenchimento dos dados de pagamento[cite: 1].
*   **RF04.2 - Formulário de Pagamento:** O sistema deve fornecer um formulário simulado para inserção de dados de cartão de crédito (Número do Cartão, Nome do Titular, Validade e CVV).
*   **RF04.3 - Validação de Máscaras (Front-end):** O formulário deve aplicar máscaras automáticas nos campos (ex: `0000 0000 0000 0000` para o cartão, `MM/AA` para validade) para guiar o usuário.
*   **RF04.4 - Simulação de Processamento:** Ao clicar em "Pagar", o sistema deve exibir um estado de carregamento (loading) simulado (ex: 2 segundos) antes de apresentar o resultado.
*   **RF04.5 - Tela de Confirmação (Sucesso):** Após o processamento simulado, o sistema deve exibir uma mensagem de sucesso clara e um botão para "Visualizar Ingresso" (que redirecionará para o Perfil)[cite: 1].

## 3. Aplicação das Heurísticas de Nielsen (IHC) no Checkout
O checkout é o momento mais crítico para a aplicação das heurísticas. No seu relatório de IHC, estas serão as justificativas[cite: 1]:

| Heurística | Aplicação no Código/Interface |
| :--- | :--- |
| **#1 Visibilidade do status do sistema** | Exibir um *spinner* (ícone giratório) ou botão em estado de "Processando..." durante os 2 segundos da simulação de pagamento[cite: 1]. O usuário nunca deve clicar em "Pagar" e não ver uma mudança imediata na tela. |
| **#3 Controle e liberdade do usuário** | Inclusão de um botão visível de "Voltar" ou "Cancelar Compra", permitindo ao usuário retornar ao mapa de assentos caso tenha escolhido o lugar errado ou desistido da compra[cite: 1]. |
| **#5 Prevenção de erros** | 1. O botão "Pagar" inicia desabilitado (`disabled`) e só é ativado quando todos os campos obrigatórios têm o tamanho correto (ex: cartão com 16 dígitos)[cite: 1]. <br> 2. Uso do atributo `type="number"` e `maxlength` no HTML para impedir a digitação de letras no campo de cartão de crédito[cite: 1]. |
| **#6 Reconhecer em vez de relembrar** | Manter o "Resumo do Pedido" fixo na lateral ou no topo da tela. O usuário não precisa "lembrar" qual assento escolheu enquanto digita os dados do cartão[cite: 1]. |
| **#9 Ajudar os usuários a reconhecer, diagnosticar e recuperar-se de erros** | Se a simulação de pagamento falhar (ex: criar uma regra onde um número específico de cartão simula erro), a mensagem deve ser amigável: "Ops! O pagamento foi recusado. Verifique os dados ou tente outro cartão", e não um erro técnico como `Erro 500: Transação Recusada`[cite: 1]. |

## 4. Estrutura de Dados e Lógica (Mock)
A lógica não precisará de vetores complexos, apenas o acesso ao ingresso que está na "sessão" atual.

```javascript
// O "estado" atual da compra (vindo da tela de assentos)
const compraAtual = {
    eventoTitulo: "Workshop de Sistemas de Informação (WSI)",
    categoria: "Área VIP",
    assento: "B2",
    valor: 120.00
};
```

### Lógica de Simulação (`js/checkout.js`)
*   **Ação:** Usuário preenche formulário e clica no botão "Finalizar Pagamento".
*   **Passo 1:** Botão muda para o texto `Processando...` e o ícone de carregamento (spinner) aparece. O botão é desabilitado para evitar duplo clique (Heurística #5 e #1)[cite: 1].
*   **Passo 2:** A função `setTimeout` do JavaScript aguarda 2000 milissegundos.
*   **Passo 3:** Após o tempo, uma função `simularPagamento()` é chamada. Ela retornará sempre `true` (sucesso), a menos que para fins de demonstração (Heurística #9), o usuário digite um código de erro específico (ex: um cartão final `0000` gera erro simulado)[cite: 1].
*   **Passo 4 (Sucesso):** O objeto `compraAtual` recebe um ID único gerado (`ABC-123`) e a string do QR Code mockado, sendo empurrado (`push`) para o array `meusIngressos` (definido no `data.js`)[cite: 1]. O sistema redireciona para `perfil.html`.

## 5. Mockup Visual (Wireframe/Layout Textual)

A tela será dividida em duas colunas (em telas maiores) ou empilhada (em mobile):

**Lado Esquerdo (Formulário de Pagamento)**
*   Cabeçalho: "Pagamento Seguro" (com ícone de cadeado para passar confiança).
*   Campo: Nome Impresso no Cartão (`<input type="text">`).
*   Campo: Número do Cartão (`<input type="text" maxlength="19">` com máscara via JS).
*   Linha com dois campos: Validade (`MM/AA`) e CVV (com botão/ícone de interrogação `?` com *tooltip* explicando o que é o CVV - Heurística #10)[cite: 1].

**Lado Direito (Resumo do Pedido)**
*   Card com destaque (sombra mais forte - `shadow-2`).
*   Imagem/Miniatura do Evento.
*   Itens listados: Evento, Assento, Categoria.
*   Linha de Total: **Total a pagar: R$ 120,00**.
*   Botão Largo: **[ Pagar R$ 120,00 ]** (verde/primária, bem destacado).
*   Botão Secundário: **[ Voltar para Seleção de Assentos ]** (texto ou botão fantasma/outline).

---

Este PRD detalha o "o quê" e o "por quê" das decisões de design focadas em IHC para o checkout.

Para implementar a lógica de checkout, focaremos em transformar a experiência de pagamento em algo fluido e seguro (mesmo sendo uma simulação), aplicando as **Heurísticas de Nielsen #1 (Visibilidade do Status)** e **#5 (Prevenção de Erros)**[cite: 1].

Aqui está a implementação em JavaScript puro para as máscaras e a simulação de processamento.

---

### 1. Lógica de Máscaras de Input
As máscaras ajudam a prevenir erros de digitação e facilitam a leitura dos dados pelo usuário[cite: 1].

```javascript
// js/checkout.js

const inputs = {
    cartao: document.getElementById('card-number'),
    validade: document.getElementById('card-expiry'),
    cvv: document.getElementById('card-cvv'),
    nome: document.getElementById('card-name')
};

const btnPagar = document.getElementById('btn-pagar');

// Máscara para Número do Cartão (0000 0000 0000 0000)
inputs.cartao.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    value = value.replace(/(\d{4})(?=\d)/g, '$1 '); // Adiciona espaço a cada 4 dígitos
    e.target.value = value;
    validarFormulario();
});

// Máscara para Validade (MM/AA)
inputs.validade.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
    validarFormulario();
});

// Máscara para CVV (Apenas números e limite de 3/4 dígitos)
inputs.cvv.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
    validarFormulario();
});
```

---

### 2. Validação e Prevenção de Erros (#5)
O botão de pagamento deve permanecer desabilitado até que os dados pareçam corretos, evitando que o usuário submeta o formulário incompleto[cite: 1].

```javascript
function validarFormulario() {
    const cartaoValido = inputs.cartao.value.replace(/\s/g, '').length === 16;
    const validadeValida = inputs.validade.value.length === 5;
    const cvvValido = inputs.cvv.value.length >= 3;
    const nomeValido = inputs.nome.value.trim().length > 3;

    // Ativa o botão apenas se tudo estiver preenchido corretamente
    btnPagar.disabled = !(cartaoValido && validadeValida && cvvValido && nomeValido);
}
```

---

### 3. Simulação de Carregamento e Confirmação (#1)
Conforme o requisito de simular o pagamento e confirmação[cite: 1], usaremos um `setTimeout` para dar o feedback visual de processamento.

```javascript
function processarPagamento() {
    // 1. Visibilidade do Status: Altera o estado do botão
    btnPagar.disabled = true;
    const textoOriginal = btnPagar.innerHTML;
    btnPagar.innerHTML = `<span class="spinner"></span> Processando...`;

    // 2. Simulação de atraso de rede (2 segundos)
    setTimeout(() => {
        // Simulação de Sucesso
        const sucesso = true; 

        if (sucesso) {
            exibirModalSucesso();
        } else {
            // Heurística #9: Diagnóstico de erro amigável
            alert("Erro ao processar pagamento. Verifique os dados.");
            btnPagar.innerHTML = textoOriginal;
            btnPagar.disabled = false;
        }
    }, 2000);
}

function exibirModalSucesso() {
    // Aqui você pode redirecionar para a página de perfil ou mostrar um modal
    // No seu trabalho, isso prova a conclusão do fluxo[cite: 1].
    window.location.href = 'perfil.html?compra=sucesso';
}

btnPagar.addEventListener('click', processarPagamento);
```

---

### 4. CSS do Spinner (Feedback Visual)
Adicione este pequeno trecho ao seu `components.css` para o ícone de carregamento.

```css
.spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #fff;
    display: inline-block;
    animation: spin 0.8s linear infinite;
    margin-right: 8px;
    vertical-align: middle;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
```

### Resumo para o seu Relatório de IHC:
*   **Heurística #1 (Visibilidade do Status):** O usuário recebe feedback imediato ("Processando...") após clicar em pagar, evitando a incerteza se o sistema travou ou recebeu o comando[cite: 1].
*   **Heurística #5 (Prevenção de Erros):** As máscaras de entrada e o botão dinamicamente desabilitado garantem que dados mal-formatados não sejam enviados para "processamento"[cite: 1].
*   **Simulação:** O fluxo utiliza dados em memória (vetores) e funções de tempo para simular a interação com um servidor real, atendendo às exigências do enunciado[cite: 1].

Qual o próximo passo? Podemos montar o **HTML da Landing Page** ou detalhar o **Ingresso Digital com QR-Code** (outro requisito obrigatório)[cite: 1].