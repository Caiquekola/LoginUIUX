# 📄 Product Requirements Document (PRD)
**Projeto:** Plataforma Web de Venda de Ingressos para Eventos (IHC)
**Tecnologias:** HTML5, CSS3, JavaScript (Vanilla)
**Design System:** Material Design (Google)

## 1. Visão Geral do Produto
O objetivo deste projeto é implementar o front-end de um sistema web dedicado à venda de ingressos para eventos[cite: 1]. A interface será desenvolvida com foco em usabilidade, aplicando rigorosamente todas as Heurísticas de Nielsen[cite: 1]. O sistema dispensará integração com banco de dados real, utilizando vetores e objetos JavaScript para simular o armazenamento e o fluxo de dados[cite: 1]. 

## 2. Escopo Técnico e Restrições
*   **Pilha Tecnológica:** Uso exclusivo de HTML, CSS e JavaScript puro (sem frameworks como React, Vue ou Angular).
*   **Design e UI:** Baseado no Material Design (uso de *Cards*, sombras, *Floating Action Buttons*, tipografia limpa como *Roboto* ou *Google Sans* e feedback visual tátil).
*   **Autenticação:** O módulo de login (autenticação) já é considerado pronto e não fará parte do esforço principal de desenvolvimento desta etapa, embora o requisito de login exista no sistema[cite: 1].
*   **Persistência:** Não haverá persistência em Banco de Dados[cite: 1]. Os dados devem ser simulados em vetores (arrays) simples no front-end[cite: 1].

## 3. Requisitos Funcionais (RF)
Com base nas regras de negócio da disciplina, o sistema deve contemplar as seguintes funcionalidades:

*   **RF01 - Catálogo de Eventos:** O usuário deve ser capaz de visualizar e escolher eventos disponíveis para a compra de ingressos[cite: 1].
*   **RF02 - Seleção de Categorias:** Dentro da página do evento, o usuário deve poder escolher entre diferentes categorias de ingressos (ex: Normal, Área VIP, Meia-Entrada, etc.)[cite: 1].
*   **RF03 - Mapa de Assentos:** O sistema deve fornecer uma interface visual onde o usuário possa escolher seu lugar[cite: 1]. O mapa deve diferenciar claramente os assentos disponíveis dos assentos já ocupados[cite: 1].
*   **RF04 - Fluxo de Checkout:** O sistema deve simular o fluxo de pagamento e apresentar uma tela de confirmação de compra após a conclusão[cite: 1].
*   **RF05 - Perfil do Usuário (Meus Ingressos):** Deve existir uma área restrita que liste todos os eventos e ingressos adquiridos pelo usuário[cite: 1].
*   **RF06 - Ordenação e Filtro de Ingressos:** Na listagem do perfil, os ingressos devem ser mostrados em ordem cronológica[cite: 1]. O sistema deve separar visualmente os eventos futuros dos eventos que já passaram[cite: 1].
*   **RF07 - Emissão de Ingresso Digital:** O ingresso adquirido deve ser disponibilizado em formato digital, contendo obrigatoriamente um QR-Code para simular a validação na portaria[cite: 1].

## 4. Requisitos Não Funcionais (RNF) e Usabilidade
*   **RNF01 - Heurísticas de Nielsen:** A interface deve aplicar e evidenciar todas as 10 Heurísticas de Engenharia de Usabilidade de Nielsen (ex: Visibilidade do status do sistema durante o carregamento de assentos, prevenção de erros no formulário de pagamento, correspondência com o mundo real no mapa de assentos)[cite: 1].
*   **RNF02 - Responsividade:** A interface deve adaptar-se graciosamente a diferentes tamanhos de tela (Mobile, Tablet e Desktop) utilizando CSS Grid e Flexbox.
*   **RNF03 - Acessibilidade:** O layout deve garantir alto contraste (padrões WCAG), navegação por teclado e uso de tags semânticas do HTML5, essenciais para uma boa avaliação em IHC.

## 5. Estrutura de Dados Simulada (Mock)
Como os dados serão estáticos[cite: 1], a aplicação iniciará com um arquivo `data.js` populando vetores com temas variados para testar a interface. Sugestões de eventos para popular a base:
*   *Workshop de Sistemas de Informação (WSI)*
*   *Festival Barreiros Rievers - Edição de Inverno*
*   *Campeonato de Robótica: Mini Sumô 500g*

O mock dos assentos será um array bidimensional (matriz) representando as fileiras, onde valores booleanos indicarão se a cadeira está `livre` (true) ou `ocupada` (false)[cite: 1].

## 6. Entregáveis do Projeto
Para garantir a nota total (25 pts) até o prazo estabelecido (04/05), o desenvolvimento guiará a geração dos seguintes artefatos[cite: 1]:
*   **Código Fonte:** Estrutura de pastas contendo os arquivos `.html`, `.css` e `.js`[cite: 1].
*   **Relatório PDF:** Documento contendo identificação da dupla/estudante, objetivos do sistema e, para cada heurística de Nielsen, imagens (screenshots) das telas com explicações de como a heurística foi aplicada[cite: 1].
*   **Vídeo de Demonstração:** Gravação do sistema em funcionamento com link hospedado, percorrendo o fluxo do login até a visualização do QR-Code (áudio explicativo não é obrigatório)[cite: 1].