# 🎫 TicketMaster IFMG - Plataforma de Venda de Ingressos

![Angular](https://img.shields.io/badge/Angular-18.2-DD0031?style=flat-square&logo=angular)
![Material Design](https://img.shields.io/badge/Material%20Design-3-4285F4?style=flat-square&logo=material-design)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

> Projeto de Interface Humano-Computador (IHC) - Plataforma web para venda de ingressos de eventos acadêmicos e culturais

---

## 📋 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Heurísticas de Nielsen](#-heurísticas-de-nielsen)
- [Estrutura de Arquivos](#-estrutura-de-arquivos)
- [Screenshots](#-screenshots)
- [Autores](#-autores)

---

## 🎯 Sobre o Projeto

O **TicketMaster IFMG** é uma plataforma de venda de ingressos desenvolvida como projeto da disciplina de Interação Humano-Computador (IHC). A aplicação oferece uma experiência completa de compra de ingressos, desde a navegação por eventos até a geração de ingressos digitais com QR Code.

### Objetivos

- Aplicar os conceitos de **Material Design 3** e **Heurísticas de Nielsen**
- Demonstrar boas práticas de **usabilidade** e **acessibilidade** (WCAG)
- Implementar uma SPA (Single Page Application) moderna com Angular
- Simular um fluxo completo de e-commerce de ingressos

---

## ✨ Funcionalidades

### 🔐 Autenticação
- **Login** com validação de credenciais
- **Cadastro** de novos usuários
- **Recuperação de senha** simulada
- Toggle de visibilidade da senha
- Feedback visual de erros

### 🎪 Eventos
- **Listagem de eventos** separados por:
  - Próximos eventos (ordenados cronologicamente)
  - Eventos passados (seção separada)
- **Detalhes do evento** com:
  - Imagem, descrição, local e data
  - Seleção de categoria (Normal/VIP/Camarote)
  - **Mapa de assentos interativo**

### 💺 Mapa de Assentos
- Visualização em tempo real da disponibilidade
- Categorização visual (VIP com borda dourada)
- Estados: disponível, selecionado, ocupado
- Corredores representados visualmente

### 🛒 Checkout
- Carrinho de compras
- Formulário de pagamento simulado
- Validação de campos de cartão de crédito
- Processamento com feedback de progresso

### 👤 Perfil do Usuário
- Listagem de ingressos comprados
- Separação por eventos futuros e passados
- **Ingresso digital com QR Code**
- Logout

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Angular** | 18.2 | Framework principal |
| **Angular Material** | 18.2 | Componentes UI |
| **TypeScript** | 5.5 | Linguagem de programação |
| **SCSS** | - | Estilização |
| **QRCode** | 1.5 | Geração de QR Codes |
| **RxJS** | 7.8 | Programação reativa |

### Padrões Utilizados

- **Standalone Components** - Componentes independentes
- **Dependency Injection** - Injeção de serviços
- **Reactive Programming** - Observables e Signals
- **Lazy Loading** - Carregamento sob demanda
- **Material Design 3** - Sistema de design

---

## 🏗️ Arquitetura

```
angular-app/
├── src/
│   ├── app/
│   │   ├── components/          # Componentes visuais
│   │   │   ├── login/           # Tela de login
│   │   │   ├── register/        # Tela de cadastro
│   │   │   ├── forgot-password/ # Recuperação de senha
│   │   │   ├── events/          # Listagem de eventos
│   │   │   ├── event-detail/    # Detalhes + assentos
│   │   │   ├── checkout/        # Pagamento
│   │   │   └── profile/         # Perfil + ingressos
│   │   │       └── ticket-qr-dialog/  # Dialog QR Code
│   │   ├── services/            # Serviços de negócio
│   │   │   ├── auth.service.ts  # Autenticação
│   │   │   └── data.service.ts  # Dados e carrinho
│   │   ├── models/              # Interfaces TypeScript
│   │   │   ├── user.model.ts
│   │   │   ├── event.model.ts
│   │   │   └── ticket.model.ts
│   │   ├── app.routes.ts        # Configuração de rotas
│   │   └── app.config.ts        # Configuração global
│   ├── styles.scss              # Estilos globais + tema
│   └── index.html               # HTML principal
└── public/
    └── favicon.png              # Ícone do site
```

---

## 🚀 Instalação

### Pré-requisitos

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Angular CLI** >= 18.x

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/Caiquekola/LoginUIUX.git
cd LoginUIUX/angular-app

# 2. Instale as dependências
npm install

# 3. Execute o servidor de desenvolvimento
ng serve

# 4. Acesse no navegador
http://localhost:4200
```

---

## 📖 Como Usar

### Credenciais de Teste

```
E-mail: admin@admin.com
Senha: admin123
```

### Fluxo de Uso

1. **Login** - Acesse com as credenciais acima ou crie uma conta
2. **Navegue** pelos eventos disponíveis
3. **Selecione** um evento para ver detalhes
4. **Escolha** a categoria e assento desejado
5. **Confirme** a reserva e vá para checkout
6. **Preencha** os dados de pagamento
7. **Finalize** a compra
8. **Acesse** o perfil para ver seus ingressos
9. **Visualize** o QR Code do ingresso digital

---

## 📐 Heurísticas de Nielsen

O projeto aplica as **10 Heurísticas de Nielsen** para garantia de usabilidade:

| Heurística | Implementação |
|------------|---------------|
| **1. Visibilidade do status** | Indicadores de loading, snack-bars, status do assento |
| **2. Correspondência com o mundo real** | Linguagem natural, metáfora de assentos físicos |
| **3. Controle do usuário** | Botões de voltar, cancelar, logout |
| **4. Consistência e padrões** | Material Design 3 em toda aplicação |
| **5. Prevenção de erros** | Validação de formulários, confirmações |
| **6. Reconhecimento sobre memória** | Cards visuais, ícones conhecidos |
| **7. Flexibilidade e eficiência** | Atalhos, navegação direta |
| **8. Design estético e minimalista** | Interface limpa, hierarquia visual |
| **9. Ajuda com erros** | Mensagens claras de erro e sucesso |
| **10. Ajuda e documentação** | Labels, hints, instruções inline |

---

## 📁 Estrutura de Arquivos

### Models (Modelos de Dados)

```typescript
// user.model.ts
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// event.model.ts
interface Event {
  id: number;
  titulo: string;
  data: string;
  local: string;
  descricao: string;
  imagem: string;
  categoria: string;
  categorias: Category[];
  mapaAssentos: (Seat | null)[][];
}

// ticket.model.ts
interface Ticket {
  idCompra: string;
  eventoId: number;
  eventoTitulo: string;
  eventoData: string;
  eventoLocal: string;
  categoria: string;
  assento: string;
  preco: number;
  dataCompra: string;
  qrCode: string;
  usuarioId: number;
}
```

### Services (Serviços)

- **AuthService**: Gerencia autenticação, login, logout, registro
- **DataService**: Gerencia eventos, carrinho, compras, ingressos

---

## 🎨 Design System

### Cores (Material Design 3)

```scss
--primary: #6750A4;        // Violet
--primary-container: #EADDFF;
--secondary: #625B71;      // Gray
--surface: #FEF7FF;        // Background
--error: #B3261E;          // Red
--success: #2E7D32;        // Green
```

### Tipografia

- **Fonte**: Roboto (Google Fonts)
- **Pesos**: 300 (Light), 400 (Regular), 500 (Medium), 700 (Bold)

### Componentes Material

- Cards, Buttons, Icons, Chips
- Form Fields, Inputs, Radio Buttons
- Toolbar, Snack Bar, Dialog

---

## 📸 Screenshots

### Tela de Login
![Login](https://via.placeholder.com/800x400/6750A4/FFFFFF?text=Tela+de+Login)

### Listagem de Eventos
![Events](https://via.placeholder.com/800x400/FEF7FF/6750A4?text=Listagem+de+Eventos)

### Seleção de Assentos
![Seats](https://via.placeholder.com/800x400/EADDFF/6750A4?text=Mapa+de+Assentos)

### Ingresso Digital com QR Code
![Ticket](https://via.placeholder.com/800x400/6750A4/FFFFFF?text=Ingresso+Digital)

---

## 🔒 Acessibilidade (WCAG)

- **Skip links** para navegação por teclado
- **Focus visible** com outline destacado
- **Contraste** de cores conforme WCAG AA
- **Labels** associados a todos os campos
- **ARIA attributes** onde necessário
- **Semântica HTML5** correta

---

## 📦 Dependências

```json
{
  "dependencies": {
    "@angular/animations": "^18.2.0",
    "@angular/cdk": "^18.2.0",
    "@angular/common": "^18.2.0",
    "@angular/compiler": "^18.2.0",
    "@angular/core": "^18.2.0",
    "@angular/forms": "^18.2.0",
    "@angular/material": "^18.2.0",
    "@angular/platform-browser": "^18.2.0",
    "@angular/platform-browser-dynamic": "^18.2.0",
    "@angular/router": "^18.2.0",
    "qrcode": "^1.5.4",
    "rxjs": "^7.8.0",
    "tslib": "^2.3.0"
  }
}
```

---

## 🧪 Testes

```bash
# Testes unitários
ng test

# Testes e2e
ng e2e

# Build para produção
ng build --configuration production
```

---

## 👥 Autores

- **Caique de Souza Kola** - *Desenvolvimento e Design*
- **IFMG - Campus Formiga** - *Disciplina de IHC*

---

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🙏 Agradecimentos

- **Angular Team** pelo excelente framework
- **Google Material Design** pelo sistema de design
- **IFMG** pelo suporte acadêmico

---

**Desenvolvido com ❤️ para a disciplina de IHC - 2026**
