Para garantir que a aplicação seja funcional e que os dados persistam entre sessões sem a necessidade de um servidor, utilizaremos o `localStorage` do navegador. Esta abordagem é perfeita para um trabalho de IHC, pois permite demonstrar o estado do sistema mesmo após o refresh da página (Heurística #1)[cite: 1].

---

# 📄 Atualização do PRD: Autenticação e Persistência Local

## 1. Novos Requisitos Funcionais (RF)
*   **RF00.1 - Cadastro de Perfil:** O usuário deve poder criar uma conta com nome, e-mail e senha. Os dados devem ser salvos no `localStorage`.
*   **RF00.2 - Login:** O sistema deve validar as credenciais contra os dados salvos no `localStorage`.
*   **RF00.3 - Recuperação de Senha:** Fluxo simulado onde o usuário informa o e-mail e o sistema exibe uma mensagem de "Instruções enviadas" (Heurística #10)[cite: 1].
*   **RF00.4 - Persistência de Sessão:** Uma vez logado, o nome do usuário deve aparecer no cabeçalho de todas as páginas. O logout deve limpar a sessão atual, mas manter os dados globais[cite: 1].

## 2. Estratégia de Refatoração de Dados
Para integrar a autenticação, a estrutura do `data.js` deixará de ser estática e passará a usar funções de "Getter/Setter" no `localStorage`:

*   **Chave `usuarios`**: Vetor de objetos contendo perfis criados.
*   **Chave `sessao_ativa`**: Objeto do usuário logado no momento.
*   **Chave `ingressos_globais`**: Vetor com todos os ingressos comprados, filtrados no perfil pelo ID do usuário logado[cite: 1].
*   **Chave `mapas_assentos_alterados`**: Objeto que armazena apenas os assentos que foram ocupados durante a execução, sobrepondo o mock inicial (para simular que um assento comprado por um usuário aparece como ocupado para outro)[cite: 1].

## 3. Heurísticas de Nielsen Aplicadas à Autenticação
*   **#5 Prevenção de Erros:** Validar se o e-mail já existe no cadastro durante a criação de conta[cite: 1].
*   **#10 Ajuda e Documentação:** Incluir dicas de "requisitos de senha" na tela de cadastro[cite: 1].
*   **#1 Visibilidade do Status:** Mostrar mensagens de erro claras ("Senha incorreta" ou "Usuário não encontrado") na tela de login[cite: 1].


### O que muda na sua estrutura atual:
1.  **Cabeçalho Dinâmico:** Em todas as páginas, o canto superior direito deve agora mostrar "Olá, [Nome]" e um botão de "Sair", em vez de um link genérico[cite: 1].
2.  **Checkout:** Os dados do cartão (últimos 4 dígitos) podem ser salvos no perfil do usuário no `localStorage` para facilitar compras futuras (Heurística #7 - Eficiência)[cite: 1].
3.  **Perfil:** A função `filtrarIngressos()` agora deve obrigatoriamente buscar apenas os ingressos onde `ingresso.usuarioId === usuarioLogado.id`[cite: 1].