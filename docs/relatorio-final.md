# TicketMaster IFMG - Plataforma de Venda de Ingressos

## Trabalho I de IHC - 2026

**Tema:** Engenharia de Usabilidade e Desenvolvimento Front-end

---

## Identificação dos Estudantes

| Nome | Curso | Instituição |
|------|-------|-------------|
| **Caique Augusto** | Sistemas de Informação | IFMG |
| **Caio Rievers** | Sistemas de Informação | IFMG |

---

## 1. Objetivos do Sistema

O **TicketMaster IFMG** é uma plataforma web de venda de ingressos para eventos, desenvolvida com foco em usabilidade e aplicação rigorosa das Heurísticas de Nielsen. O sistema foi construído utilizando tecnologias modernas de front-end, seguindo o design system Material Design.

### 1.1 Objetivos Principais

- Implementar uma interface intuitiva e acessível para compra de ingressos
- Aplicar todas as 10 Heurísticas de Engenharia de Usabilidade de Nielsen
- Garantir acessibilidade conforme diretrizes WCAG
- Demonstrar domínio de conceitos de IHC através de uma aplicação prática

### 1.2 Requisitos Funcionais Implementados

| Requisito | Descrição | Status |
|-----------|-----------|--------|
| RF01 | Realizar login na plataforma | ✅ Implementado |
| RF02 | Escolher eventos para comprar ingressos | ✅ Implementado |
| RF03 | Escolher entre diferentes categorias de ingressos (Normal, VIP, Camarote) | ✅ Implementado |
| RF04 | Escolher lugar com assentos ocupados marcados | ✅ Implementado |
| RF05 | Realizar pagamento e confirmação simulados | ✅ Implementado |
| RF06 | Listar eventos e ingressos adquiridos no perfil | ✅ Implementado |
| RF07 | Mostrar em ordem cronológica | ✅ Implementado |
| RF08 | Separar eventos que já passaram | ✅ Implementado |
| RF09 | Disponibilizar ingresso digital com QR-Code | ✅ Implementado |

### 1.3 Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Angular | 19.x | Framework front-end |
| TypeScript | 5.x | Linguagem de programação |
| Angular Material | 19.x | Componentes UI (Material Design) |
| SCSS | - | Estilização avançada |
| RxJS | 7.x | Programação reativa |
| QRCode.js | - | Geração de QR-Codes |

---

## 2. Heurísticas de Nielsen

### H1: Visibilidade do Status do Sistema

> *"O sistema deve sempre manter os usuários informados sobre o que está acontecendo, através de feedback apropriado dentro de um tempo razoável."*

#### Como foi abordado

O sistema fornece feedback visual constante ao usuário em todas as etapas:

**Implementações:**

1. **Spinner de carregamento** durante processamento do pagamento
2. **Mensagem de status da busca** ("3 eventos encontrados")
3. **Feedback visual ao selecionar assento** (destaque com borda e escala)
4. **Alerta de sucesso** após compra realizada
5. **Indicador de processamento** no botão de confirmação

**Telas para screenshot:**

| Screenshot | Elemento | Arquivo |
|------------|----------|---------|
| Catálogo de eventos | Mensagem "X eventos encontrados" | `h1_1_busca.png` |
| Seleção de assentos | Assento selecionado com destaque | `h1_2_assento.png` |
| Checkout | Spinner durante processamento | `h1_3_spinner.png` |
| Perfil | Alerta "Compra realizada com sucesso" | `h1_4_sucesso.png` |

**Código relevante:**

```typescript
// checkout.component.ts - Spinner durante processamento
<button [disabled]="isProcessing">
  <mat-spinner *ngIf="isProcessing" diameter="20"></mat-spinner>
  <span>{{ isProcessing ? 'Processando...' : 'Confirmar pagamento' }}</span>
</button>
```

---

### H2: Correspondência entre o Sistema e o Mundo Real

> *"O sistema deve falar a linguagem dos usuários, com palavras, frases e conceitos familiares, em vez de termos orientados ao sistema."*

#### Como foi abordado

O mapa de assentos utiliza metáforas do mundo real para tornar a interface intuitiva:

**Implementações:**

1. **Formato de poltronas** nos assentos (borda arredondada simulando cadeira)
2. **Labels alfabéticos** (A1, B2, C3) como em cinemas e teatros
3. **Corredores visuais** no mapa para separar seções
4. **Linguagem natural** em mensagens de erro ("E-mail ou senha incorretos")
5. **Categorias familiares** (Pista, Camarote, Área VIP)

**Telas para screenshot:**

| Screenshot | Elemento | Arquivo |
|------------|----------|---------|
| Mapa de assentos | Visão geral com formato de poltronas e corredor | `h2_1_mapa.png` |
| Mapa de assentos | Close nos labels A1, B2, C3 | `h2_2_labels.png` |
| Login | Mensagem de erro em linguagem natural | `h2_3_erro.png` |

**Código relevante:**

```scss
// event-detail.component.scss - Formato de poltrona
.seat {
  width: 40px;
  height: 40px;
  border-radius: 8px 8px 4px 4px; // Formato que lembra uma poltrona
}
```

---

### H3: Controle e Liberdade do Usuário

> *"Os usuários devem ser capazes de sair de situações indesejadas sem ter que passar por um diálogo extenso."*

#### Como foi abordado

O usuário nunca fica "preso" em uma tela, podendo navegar livremente:

**Implementações:**

1. **Botão "Voltar"** em todas as páginas
2. **Possibilidade de alterar assento** selecionado a qualquer momento
3. **Navegação livre** entre Login/Cadastro/Recuperação de senha
4. **Logout explícito** no header
5. **Botão "Cancelar"** no checkout

**Telas para screenshot:**

| Screenshot | Elemento | Arquivo |
|------------|----------|---------|
| Evento | Botão "← Voltar" no topo | `h3_1_voltar_evento.png` |
| Checkout | Botão "Voltar para eventos" | `h3_2_voltar_checkout.png` |
| Login | Links "Criar conta" e "Esqueci senha" | `h3_3_login_opcoes.png` |
| Header | Botão de logout | `h3_4_logout.png` |

**Código relevante:**

```typescript
// checkout.component.ts
goBack(): void {
  this.router.navigate(['/events']);
}
```

---

### H4: Consistência e Padrões

> *"Os usuários não devem ter que se perguntar se palavras, situações ou ações diferentes significam a mesma coisa."*

#### Como foi abordado

O Design System Material Design é aplicado consistentemente em toda a aplicação:

**Implementações:**

1. **Cores padronizadas** via variáveis SCSS (primária: #6750A4)
2. **Botões com mesmo estilo** em todas as páginas
3. **Header uniforme** com navegação consistente
4. **Cards com visual coerente** (sombra, bordas, padding)
5. **Tipografia consistente** (Roboto em todos os textos)

**Telas para screenshot:**

| Screenshot | Elemento | Arquivo |
|------------|----------|---------|
| Catálogo | Cards de eventos com mesmo layout | `h4_1_cards.png` |
| Comparação | Botões primários em 3 telas diferentes | `h4_2_botoes.png` |
| Comparação | Header em 3 páginas diferentes | `h4_3_header.png` |

**Código relevante:**

```scss
// _variables.scss
$primary: #6750A4;
$primary-container: #EADDFF;
$on-primary: #FFFFFF;
```

---

### H5: Prevenção de Erros

> *"Um design cuidadoso que previne problemas de acontecer é melhor que mensagens de erro."*

#### Como foi abordado

O sistema previne erros antes que aconteçam:

**Implementações:**

1. **Assentos ocupados desabilitados** (cursor: not-allowed, opacidade reduzida)
2. **Botão desabilitado** até formulário válido
3. **Validação em tempo real** nos campos
4. **Máscaras de input** (cartão de crédito, validade MM/AA)
5. **Impedimento de e-mail duplicado** no cadastro

**Telas para screenshot:**

| Screenshot | Elemento | Arquivo |
|------------|----------|---------|
| Mapa de assentos | Assento ocupado (cinza, cursor bloqueado) | `h5_1_ocupado.png` |
| Checkout | Botão "Confirmar" desabilitado | `h5_2_btn_desabilitado.png` |
| Checkout | Erro "Número do cartão deve conter 16 dígitos" | `h5_3_validacao.png` |
| Checkout | Erro "Cartão vencido" | `h5_4_expirado.png` |
| Cadastro | Erro "E-mail já cadastrado" | `h5_5_email_existe.png` |

**Código relevante:**

```typescript
// checkout.component.ts - Validação de validade
private validateCardExpiry(): void {
  const [month, year] = this.cardExpiry.split('/');
  const expirationYear = 2000 + Number(year);
  const today = new Date();
  
  if (expirationYear < today.getFullYear()) {
    this.cardExpiryError = 'Cartão vencido.';
  }
}
```

---

### H6: Reconhecimento em Vez de Memorização

> *"Minimize a carga de memória do usuário tornando objetos, ações e opções visíveis."*

#### Como foi abordado

O usuário não precisa memorizar informações:

**Implementações:**

1. **Catálogo visual** com imagens dos eventos
2. **Legenda de cores** do mapa de assentos
3. **Dropdown de categorias** com preços visíveis
4. **Cartões salvos** para compras futuras
5. **Resumo do pedido** sempre visível no checkout

**Telas para screenshot:**

| Screenshot | Elemento | Arquivo |
|------------|----------|---------|
| Catálogo | Cards com imagens dos eventos | `h6_1_catalogo.png` |
| Evento | Legenda: Standard, VIP, Ocupado, Selecionado | `h6_2_legenda.png` |
| Evento | Dropdown com categorias e preços | `h6_3_categorias.png` |
| Checkout | Seção "Usar cartão salvo" | `h6_4_cartao_salvo.png` |

**Código relevante:**

```html
<!-- event-detail.component.html - Legenda -->
<div class="legend">
  <div class="legend-item">
    <span class="seat standard"></span> Standard
  </div>
  <div class="legend-item">
    <span class="seat vip"></span> VIP/Camarote
  </div>
  <div class="legend-item">
    <span class="seat occupied"></span> Ocupado
  </div>
</div>
```

---

### H7: Eficiência e Flexibilidade

> *"Aceleradores — frequentemente usados pelos usuários avançados — podem tornar as interações mais eficientes."*

#### Como foi abordado

Atalhos e automações aumentam a eficiência:

**Implementações:**

1. **Debounce na busca** (300ms para evitar requisições excessivas)
2. **Navegação por teclado** (Tab, Enter, Space para selecionar assentos)
3. **Auto-preenchimento** de cartões salvos
4. **Sincronização automática** entre assento e categoria
5. **Filtros por categoria** de eventos

**Telas para screenshot:**

| Screenshot | Elemento | Arquivo |
|------------|----------|---------|
| Catálogo | Campo de busca em ação | `h7_1_busca.png` |
| Evento | Foco em assento via teclado (outline) | `h7_2_teclado.png` |
| Checkout | Dropdown de cartões salvos | `h7_3_cartoes.png` |

**Código relevante:**

```typescript
// events.component.ts - Debounce na busca
private searchSubject = new Subject<string>();

ngOnInit() {
  this.searchSubject.pipe(
    debounceTime(300),
    distinctUntilChanged()
  ).subscribe(term => this.filterEvents(term));
}
```

---

### H8: Estética e Design Minimalista

> *"Diálogos não devem conter informação irrelevante ou raramente necessária."*

#### Como foi abordado

A interface segue o princípio de "less is more":

**Implementações:**

1. **Espaçamento generoso** (padding, margin)
2. **Sombras discretas** (Material Design elevation)
3. **Hierarquia visual clara** (títulos, subtítulos, corpo)
4. **Cards com bordas suaves** (border-radius: 24px)
5. **Cores harmoniosas** (paleta Material Design 3)

**Telas para screenshot:**

| Screenshot | Elemento | Arquivo |
|------------|----------|---------|
| Login | Interface limpa e centralizada | `h8_1_login.png` |
| Catálogo | Grid de cards com hierarquia clara | `h8_2_catalogo.png` |
| Evento | Seção de assentos sem elementos desnecessários | `h8_3_assentos.png` |
| Perfil | Cards de ingressos com informação essencial | `h8_4_perfil.png` |

**Código relevante:**

```scss
// styles.scss
.surface-card {
  border-radius: 24px;
  box-shadow: 0 18px 45px rgba(31, 31, 31, 0.08);
  padding: 24px;
}
```

---

### H9: Ajuda no Reconhecimento, Diagnóstico e Recuperação de Erros

> *"Mensagens de erro devem ser expressas em linguagem simples, indicar o problema e sugerir uma solução."*

#### Como foi abordado

Mensagens de erro são claras, específicas e orientam o usuário:

**Implementações:**

1. **Mensagens em português** sem jargões técnicos
2. **Indicação específica** do campo com erro
3. **Sugestão de correção** ("Use o formato MM/AA")
4. **Tooltips de ajuda** em campos complexos
5. **Destaque visual** no campo com erro (borda vermelha)

**Telas para screenshot:**

| Screenshot | Elemento | Arquivo |
|------------|----------|---------|
| Checkout | Erro "Mês deve ser entre 01 e 12" | `h9_1_mes_invalido.png` |
| Checkout | Erro "CVV deve ter 3 dígitos" | `h9_2_cvv.png` |
| Checkout | Tooltip de ajuda no CVV | `h9_3_tooltip.png` |
| Login | Erro "E-mail ou senha incorretos" | `h9_4_login_erro.png` |

**Código relevante:**

```typescript
// checkout.component.ts
private validateCvv(): void {
  if (digits.length !== 3) {
    this.cardCvvError = 'CVV deve ter 3 dígitos.';
    return;
  }
  this.cardCvvError = '';
}
```

---

### H10: Ajuda e Documentação

> *"O sistema deve fornecer documentação e ajuda contextual."*

#### Como foi abordado

Documentação contextual está presente em toda a interface:

**Implementações:**

1. **Labels descritivos** em todos os campos
2. **Tooltips de ajuda** em ícones de informação
3. **Legenda visual** do mapa de assentos
4. **Hints nos campos** ("Digite como aparece no cartão")
5. **Mensagens de orientação** ("Use apenas números. A máscara é aplicada automaticamente")

**Telas para screenshot:**

| Screenshot | Elemento | Arquivo |
|------------|----------|---------|
| Evento | Legenda completa do mapa | `h10_1_legenda.png` |
| Checkout | Labels e hints nos campos | `h10_2_labels.png` |
| Checkout | Tooltip de ajuda no CVV | `h10_3_tooltip.png` |
| Login | Link "Esqueci minha senha" | `h10_4_ajuda.png` |

**Código relevante:**

```html
<!-- checkout.component.html -->
<mat-form-field>
  <mat-label>Número do cartão</mat-label>
  <input matInput placeholder="0000 0000 0000 0000">
  <mat-hint>Use apenas números. A máscara é aplicada automaticamente.</mat-hint>
</mat-form-field>
```

---

## 3. Acessibilidade (WCAG)

O sistema implementa as seguintes práticas de acessibilidade:

| Critério | Implementação |
|----------|---------------|
| **Contraste** | Cores primárias com alto contraste (#6750A4 sobre branco) |
| **Navegação por teclado** | tabindex, Enter/Space para seleção |
| **ARIA Labels** | aria-label em botões e inputs |
| **Roles Semânticos** | role="main", role="banner" |
| **Foco Visível** | outline destacado em :focus-visible |

---

## 4. Estrutura do Projeto

```
angular-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── checkout/         # Pagamento
│   │   │   ├── event-detail/     # Detalhes + assentos
│   │   │   ├── events/           # Catálogo
│   │   │   ├── forgot-password/  # Recuperação
│   │   │   ├── login/            # Autenticação
│   │   │   ├── profile/          # Meus ingressos
│   │   │   └── register/         # Cadastro
│   │   ├── services/             # Auth, Data, Cart
│   │   └── models/               # Interfaces TypeScript
│   └── styles.scss               # Estilos globais
```

---

## 5. Link do Vídeo

**[Inserir link do vídeo de demonstração aqui]**

O vídeo demonstra o fluxo completo:
1. Login na plataforma
2. Navegação pelo catálogo de eventos
3. Seleção de evento e categoria
4. Escolha de assento
5. Processo de checkout
6. Visualização do ingresso com QR-Code

---

## 6. Conclusão

O projeto TicketMaster IFMG demonstra a aplicação prática de conceitos fundamentais de IHC:

- ✅ **Todas as 10 Heurísticas de Nielsen** foram implementadas e documentadas
- ✅ **Acessibilidade WCAG** garantida através de ARIA e navegação por teclado
- ✅ **Responsividade** para diferentes tamanhos de tela
- ✅ **Design System Material Design** aplicado consistentemente
- ✅ **Fluxo completo** de compra de ingressos com feedback visual

O desenvolvimento utilizou Angular 19 com TypeScript, demonstrando domínio de tecnologias modernas de front-end e aplicação de boas práticas de usabilidade.

---

**Desenvolvido para a disciplina de IHC - IFMG**

**Maio/2026**
