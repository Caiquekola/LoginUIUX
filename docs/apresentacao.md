# 🎫 TicketMaster IFMG - Documentação de Apresentação

## Projeto de IHC - Interface Humano-Computador

**Instituição:** IFMG  
**Disciplina:** Interação Humano-Computador  
**Data:** Maio/2026

---

## 1. Visão Geral do Projeto

O **TicketMaster IFMG** é uma plataforma web de venda de ingressos para eventos, desenvolvida com foco em usabilidade e aplicação rigorosa das Heurísticas de Nielsen. O sistema foi construído utilizando apenas tecnologias web puras (HTML, CSS, JavaScript), seguindo o design system Material Design do Google.

### 1.1 Objetivos

- Implementar uma interface intuitiva e acessível para compra de ingressos
- Aplicar todas as 10 Heurísticas de Engenharia de Usabilidade de Nielsen
- Garantir acessibilidade conforme diretrizes WCAG
- Demonstrar domínio de conceitos de IHC

### 1.2 Tecnologias Utilizadas

| Tecnologia | Uso |
|------------|-----|
| HTML5 | Estrutura semântica e acessível |
| CSS3 | Estilização Material Design, responsividade |
| JavaScript (Vanilla) | Lógica de negócio, manipulação DOM |
| localStorage | Persistência de dados simulada |
| Google Fonts (Roboto) | Tipografia |
| Material Symbols | Iconografia |

---

## 2. Estrutura do Projeto

```
LoginUIUX/
├── 📁 css/
│   ├── main.css          # Variáveis CSS, reset, componentes base
│   ├── components.css    # Cards, botões, assentos, tickets
│   └── layouts.css       # Grids, responsividade
├── 📁 docs/
│   └── apresentacao.md   # Esta documentação
├── 📁 js/
│   ├── auth.js           # Autenticação e proteção de rotas
│   ├── checkout.js       # Fluxo de pagamento
│   ├── data.js           # Dados mockados (eventos, ingressos)
│   ├── evento.js         # Seleção de assentos
│   ├── main.js           # Catálogo de eventos, busca, filtros
│   ├── perfil.js         # Gerenciamento de ingressos do usuário
│   └── utils.js          # Funções utilitárias
├── 📁 pages/
│   ├── cadastro.html     # Criação de conta
│   ├── checkout.html     # Pagamento
│   ├── evento.html       # Detalhes e assentos
│   ├── login.html        # Autenticação
│   ├── perfil.html       # Meus ingressos
│   └── recuperar-senha.html # Recuperação de senha
├── 📁 public/
│   └── imgs/             # Imagens dos eventos
├── 📁 specs/
│   └── [documentação técnica]
├── index.html            # Landing page / Catálogo
└── README.md             # Instruções do projeto
```

---

## 3. Funcionalidades Implementadas

### 3.1 Requisitos Funcionais (RF)

| RF | Funcionalidade | Status |
|----|----------------|--------|
| RF01 | Catálogo de Eventos | ✅ Implementado |
| RF02 | Seleção de Categorias (Normal, VIP, Camarote) | ✅ Implementado |
| RF03 | Mapa de Assentos Interativo | ✅ Implementado |
| RF04 | Fluxo de Checkout com Pagamento | ✅ Implementado |
| RF05 | Perfil do Usuário (Meus Ingressos) | ✅ Implementado |
| RF06 | Ordenação e Filtro de Ingressos | ✅ Implementado |
| RF07 | Ingresso Digital com QR-Code | ✅ Implementado |

### 3.2 Requisitos Não Funcionais (RNF)

| RNF | Requisito | Status |
|-----|-----------|--------|
| RNF01 | Heurísticas de Nielsen | ✅ Aplicado |
| RNF02 | Responsividade (Mobile, Tablet, Desktop) | ✅ Implementado |
| RNF03 | Acessibilidade (WCAG, navegação por teclado) | ✅ Implementado |

---

## 4. Fluxo de Navegação

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Login     │────▶│  Catálogo   │────▶│   Evento    │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Cadastro   │     │   Perfil    │     │  Checkout   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
       ▼                   ▼
┌─────────────┐     ┌─────────────┐
│ Recuperar   │     │  QR-Code    │
│   Senha     │     │  Ingresso   │
└─────────────┘     └─────────────┘
```

---

## 5. Heurísticas de Nielsen Aplicadas

### H1: Visibilidade do Status do Sistema

**Implementações:**
- Spinner de carregamento durante processamento de pagamento
- Mensagem de status de busca ("3 eventos encontrados")
- Feedback visual ao selecionar assento
- Alerta de sucesso após compra

**Arquivos:** `checkout.js:147-151`, `main.js:71-78`

---

### H2: Correspondência entre o Sistema e o Mundo Real

**Implementações:**
- Mapa de assentos com formato de poltrona (borda arredondada)
- Labels de assentos alfabéticos (A1, B2, C3...)
- Corredores visuais no mapa
- Linguagem natural em mensagens de erro

**Arquivos:** `components.css:174-178`, `evento.js:86`

---

### H3: Controle e Liberdade do Usuário

**Implementações:**
- Botão "Voltar" em todas as páginas
- Possibilidade de alterar assento selecionado
- Navegação entre Login/Cadastro/Recuperação
- Logout explícito no header

**Arquivos:** `evento.html:31-33`, `checkout.html:95-97`, `auth.js:49-53`

---

### H4: Consistência e Padrões

**Implementações:**
- Design system Material Design consistente
- Padrão de cores unificado (variáveis CSS)
- Botões com mesmo estilo em todas as páginas
- Navegação header padronizada

**Arquivos:** `main.css:1-23`, `components.css`

---

### H5: Prevenção de Erros

**Implementações:**
- Assentos ocupados desabilitados (cursor: not-allowed)
- Validação de formulário antes de submissão
- Máscaras de input (cartão de crédito, validade)
- Botão "Confirmar" desabilitado até seleção válida

**Arquivos:** `checkout.js:71-115`, `evento.js:112-115`

---

### H6: Reconhecimento em Vez de Memorização

**Implementações:**
- Catálogo visual de eventos com imagens
- Legenda de cores do mapa de assentos
- Dropdown de categorias com preços visíveis
- Cartões salvos para compras futuras

**Arquivos:** `evento.html:41-46`, `checkout.js:117-144`

---

### H7: Eficiência e Flexibilidade

**Implementações:**
- Debounce na busca (300ms)
- Auto-preenchimento de cartões salvos
- Sincronização automática categoria↔assento
- Atalhos de teclado (Enter/Space para selecionar)

**Arquivos:** `main.js:24-32`, `evento.js:106-111`

---

### H8: Estética e Design Minimalista

**Implementações:**
- Espaçamento generoso (padding, margin)
- Sombras discretas (Material Design)
- Hierarquia visual clara
- Cards com bordas suaves

**Arquivos:** `main.css:38-49`, `components.css`

---

### H9: Ajuda no Reconhecimento, Diagnóstico e Recuperação de Erros

**Implementações:**
- Mensagens de erro claras e específicas
- CVV "000" simula recusada (demonstração)
- Indicação visual de campos obrigatórios
- Tooltip explicativo no CVV

**Arquivos:** `checkout.js:155-161`, `checkout.html:133-136`

---

### H10: Ajuda e Documentação

**Implementações:**
- Labels descritivos em todos os campos
- Tooltips em ícones de ajuda
- Legenda visual do mapa de assentos
- README com instruções de uso

**Arquivos:** `evento.html:41-46`, `README.md`

---

## 6. Acessibilidade (RNF03)

### 6.1 Implementações WCAG

| Critério | Implementação |
|----------|---------------|
| **Contraste** | Cores primárias com alto contraste (#6750A4 sobre branco) |
| **Navegação por teclado** | tabindex, Enter/Space para seleção de assentos |
| **Skip Link** | Link "Pular para conteúdo principal" em todas as páginas |
| **ARIA Labels** | aria-label em botões, inputs e assentos |
| **Roles Semânticos** | role="main", role="banner", role="alert" |
| **Live Regions** | aria-live="polite" para mensagens dinâmicas |
| **Foco Visível** | :focus-visible com outline destacado |

### 6.2 Código de Exemplo - Assento Acessível

```html
<div class="seat available vip" 
     role="button" 
     tabindex="0" 
     aria-label="Assento A1, VIP/Camarote, disponível">
    A1
</div>
```

---

## 7. Diferenciação Visual de Categorias

### 7.1 Assentos VIP/Camarote

- **Cor:** Gradiente dourado (#FFD700 → #FFA500)
- **Borda:** Marrom escuro (#B8860B)
- **Ícone:** Estrela ★ no canto superior direito
- **Sombra:** Glow dourado quando selecionado

### 7.2 Assentos Standard/Comum

- **Cor:** Primária do sistema (roxo #EADDFF)
- **Borda:** Primária (#6750A4)
- **Seleção:** Fundo roxo sólido

---

## 8. Credenciais de Teste

| Usuário | E-mail | Senha |
|---------|--------|-------|
| Admin | admin@admin.com | admin123 |

---

## 9. Como Executar

1. Clone ou baixe o projeto
2. Inicie um servidor local na pasta do projeto:
   ```bash
   # Com Python
   python -m http.server 8000
   
   # Com Node.js
   npx serve
   ```
3. Acesse `http://localhost:8000`
4. Faça login com as credenciais de teste
5. Explore o fluxo completo de compra de ingressos

---

## 10. Conclusão

O projeto TicketMaster IFMG demonstra a aplicação prática de conceitos fundamentais de IHC:

- ✅ **Todas as 10 Heurísticas de Nielsen** foram implementadas e documentadas
- ✅ **Acessibilidade WCAG** garantida através de ARIA, navegação por teclado e contraste
- ✅ **Responsividade** para diferentes tamanhos de tela
- ✅ **Design System Material Design** aplicado consistentemente
- ✅ **Fluxo completo** de compra de ingressos com feedback visual

---

**Desenvolvido para a disciplina de IHC - IFMG**
