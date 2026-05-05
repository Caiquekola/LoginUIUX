# 🎤 Guia de Apresentação - TicketMaster IFMG

## 📋 Roteiro de Demonstração (10-15 minutos)

---

### 1. Introdução (2 min)

**Fale sobre:**
- Este é um projeto da disciplina de IHC
- Objetivo: aplicar heurísticas de Nielsen e Material Design
- Plataforma completa de venda de ingressos

**Mostre:**
- Tela de login com design Material Design 3
- Destaque o gradiente de fundo e o card centralizado

---

### 2. Sistema de Autenticação (3 min)

#### Login
```
E-mail: admin@admin.com
Senha: admin123
```

**Demonstre:**
1. Campo de e-mail com validação visual
2. Toggle de visibilidade da senha (ícone de olho)
3. Feedback de erro se credenciais incorretas
4. Redirecionamento automático após login

**Heurísticas aplicadas:**
- **H5 - Prevenção de erros**: Validação em tempo real
- **H9 - Ajuda com erros**: Mensagens claras

#### Cadastro (opcional)
1. Clique em "Criar conta"
2. Mostre os campos: Nome, E-mail, Senha, Confirmar Senha
3. Validação de força da senha

---

### 3. Listagem de Eventos (2 min)

**Demonstre:**
1. Cards de eventos com imagens
2. Separação entre "Próximos Eventos" e "Eventos Passados"
3. Ordenação cronológica
4. Hover nos cards (elevação)

**Heurísticas aplicadas:**
- **H6 - Reconhecimento sobre memória**: Cards visuais
- **H8 - Design minimalista**: Interface limpa

---

### 4. Detalhes do Evento e Seleção de Assentos (4 min)

**Passo a passo:**
1. Clique em um evento (ex: Workshop WSI)
2. Mostre a imagem, descrição completa, local e data
3. **Destaque o mapa de assentos interativo:**
   - Assentos VIP com borda dourada
   - Assentos Standard normais
   - Assentos ocupados (cinza, não clicáveis)
   - Corredores representados visualmente
4. Selecione uma categoria (Normal ou VIP)
5. Clique em um assento disponível
6. Mostre o feedback visual (assento fica roxo)
7. Clique em "Adicionar ao Carrinho"

**Heurísticas aplicadas:**
- **H1 - Visibilidade do status**: Cores indicam disponibilidade
- **H2 - Correspondência com mundo real**: Metáfora de assentos físicos
- **H4 - Consistência**: Padrão visual em todos eventos

---

### 5. Checkout e Pagamento (3 min)

**Demonstre:**
1. Carrinho com item selecionado
2. Formulário de pagamento:
   - Nome no cartão
   - Número do cartão
   - Validade
   - CVV
3. Resumo do pedido ao lado
4. Clique em "Finalizar Pagamento"
5. Mostre o indicador de progresso
6. Feedback de sucesso com snack-bar

**Heurísticas aplicadas:**
- **H3 - Controle do usuário**: Botão de voltar
- **H5 - Prevenção de erros**: Validação de campos

---

### 6. Perfil e Ingresso Digital (3 min)

**Demonstre:**
1. Acesse o perfil (ícone no header)
2. Mostre a lista de ingressos comprados
3. Separação: ingressos futuros vs passados
4. Clique em "Ver Ingresso"
5. **Destaque o QR Code:**
   - Gerado dinamicamente
   - Contém: ID, evento, assento, categoria, usuário
   - Design com gradiente e padrão decorativo

**Heurísticas aplicadas:**
- **H1 - Visibilidade do status**: Status do ingresso claro
- **H7 - Flexibilidade**: Acesso rápido ao QR Code

---

### 7. Acessibilidade (2 min)

**Demonstre:**
1. Navegação por teclado (Tab)
2. Foco visível em elementos interativos
3. Skip link (aperte Tab na tela de eventos)
4. Contraste de cores adequado

**Destaque:**
- Conformidade com WCAG 2.1 nível AA
- Todos os campos têm labels associados
- Semântica HTML5 correta

---

## 🎯 Pontos-Chave para Destacar

### Tecnologias Modernas
- Angular 18 com Standalone Components
- Material Design 3 (versão mais recente)
- TypeScript com tipagem forte
- Lazy Loading para performance

### Arquitetura
- Separação de responsabilidades
- Services para lógica de negócio
- Models para tipagem de dados
- Componentes independentes

### Persistência
- LocalStorage para dados simulados
- Sessão mantida entre recarregamentos
- Banco de dados em memória

---

## ❓ Perguntas Frequentes

**P: Por que usar LocalStorage?**
> R: O projeto é acadêmico e não requer backend. Em produção, usaria API REST com banco de dados real.

**P: Como o QR Code é gerado?**
> R: Usamos a biblioteca `qrcode` que gera um canvas SVG com os dados do ingresso em JSON.

**P: As heurísticas de Nielsen são aplicadas onde?**
> R: Em todo o sistema: feedback visual, prevenção de erros, consistência, controle do usuário, etc.

**P: Por que Angular e não React/Vue?**
> R: Angular oferece uma estrutura completa com Material Design integrado, ideal para projetos enterprise.

**P: Como é o sistema de assentos?**
> R: Uma matriz 2D onde cada posição pode ser um assento ou corredor. Os assentos têm categoria e disponibilidade.

---

## 📊 Checklist de Demonstração

- [ ] Login com credenciais válidas
- [ ] Navegar pela lista de eventos
- [ ] Acessar detalhes de um evento
- [ ] Selecionar categoria e assento
- [ ] Adicionar ao carrinho
- [ ] Preencher formulário de pagamento
- [ ] Finalizar compra
- [ ] Ver ingresso com QR Code
- [ ] Demonstrar navegação por teclado
- [ ] Logout

---

## 🎨 Slides Sugeridos

### Slide 1: Título
```
TicketMaster IFMG
Plataforma de Venda de Ingressos
IHC 2026
```

### Slide 2: Objetivos
- Aplicar Heurísticas de Nielsen
- Implementar Material Design 3
- Demonstrar boas práticas de IHC
- Criar experiência completa de compra

### Slide 3: Tecnologias
- Angular 18
- Angular Material
- TypeScript
- SCSS

### Slide 4: Arquitetura
[Diagrama da arquitetura em camadas]

### Slide 5: Heurísticas de Nielsen
[Tabela com as 10 heurísticas e implementações]

### Slide 6: Demonstração
[QR Code para acessar a aplicação]

### Slide 7: Conclusão
- Projeto cumpre todos os requisitos
- Interface intuitiva e acessível
- Código bem estruturado

---

## 🔗 Links Úteis

- **Aplicação**: http://localhost:4200
- **Repositório**: https://github.com/Caiquekola/LoginUIUX
- **Documentação**: DOCUMENTATION.md
- **README**: README.md

---

**Tempo total estimado**: 15 minutos
**Tempo de setup**: 2 minutos (iniciar servidor)
