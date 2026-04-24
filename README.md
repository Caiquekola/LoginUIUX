Crie uma aplicação web de autenticação usando apenas HTML, CSS e JavaScript puro, sem frameworks como React, Vue ou Angular.

O objetivo é criar uma interface elegante, responsiva, acessível e inspirada no Material Design / padrões visuais do Google, adequada para um trabalho de IHC.

Requisitos principais:

1. Estrutura geral da tela
- A tela deve ser dividida em duas áreas no desktop:
  - Lado esquerdo: aproximadamente 40% da largura da tela, contendo uma imagem ou ilustração decorativa elegante relacionada a segurança, tecnologia ou acesso.
  - Lado direito: aproximadamente 60% da largura da tela, contendo o formulário de autenticação.
- A composição deve ser centralizada verticalmente e horizontalmente.
- No mobile, a imagem lateral não precisa aparecer. O formulário deve ocupar a tela de forma limpa, elegante e confortável.
- Usar espaçamento generoso, bordas suaves, sombras discretas e uma hierarquia visual clara.

2. Visual e estilo
- Seguir o estilo Material Design do Google.
- Criar inputs com efeito de Floating Label, semelhante aos campos do Material UI.
- Usar cores harmônicas, modernas e acessíveis.
- Usar uma fonte semelhante ao padrão Google, como Roboto, podendo importar via Google Fonts.
- Botões com aparência Material Design:
  - Botão primário destacado.
  - Botões secundários ou links para navegação entre telas.
  - Estados de hover, focus, active e disabled.
- Criar uma interface visualmente equilibrada, profissional e agradável.

3. Funcionalidades obrigatórias
A aplicação deve conter três telas internas, sem recarregar a página:

- Tela de Login
  - Campo de e-mail.
  - Campo de senha.
  - Botão “Entrar”.
  - Link ou botão “Criar conta”.
  - Link ou botão “Esqueci minha senha”.

- Tela de Criação de Conta
  - Campo de nome.
  - Campo de e-mail.
  - Campo de senha.
  - Campo de confirmação de senha.
  - Botão “Criar conta”.
  - Botão ou link claro para voltar ao Login.

- Tela de Recuperação de Senha
  - Campo de e-mail.
  - Botão “Enviar instruções”.
  - Botão ou link claro para voltar ao Login.

Importante:
- O usuário nunca deve ficar preso em uma tela.
- Sempre deve existir uma forma visível e acessível de voltar para o Login ou acessar outro menu.
- Se o usuário estiver na criação de conta, deve conseguir voltar para o Login.
- Se o usuário estiver em esqueci a senha, deve conseguir voltar para o Login.

4. Banco de dados em memória
- Usar um banco de dados em memória no próprio JavaScript, como um array de objetos.
- Criar um usuário padrão já cadastrado:
  - E-mail: admin@admin.com
  - Senha: admin123
- O login deve validar os dados digitados com base nesse array.
- A criação de conta deve adicionar novos usuários ao array em memória.
- Não usar banco de dados real, backend, localStorage ou API externa.
- Como é em memória, os dados podem ser perdidos ao recarregar a página.

5. Validações
- Validar se os campos obrigatórios foram preenchidos.
- Validar formato básico de e-mail.
- Validar senha com no mínimo 6 caracteres.
- Validar se senha e confirmação de senha são iguais.
- Impedir criação de conta com e-mail já cadastrado.
- Exibir mensagens claras de erro e sucesso.
- As mensagens devem ser acessíveis, visíveis e bem posicionadas.

6. Acessibilidade e IHC
- Usar HTML semântico.
- Todos os campos devem ter label acessível.
- Floating labels não devem prejudicar leitores de tela.
- Usar aria-live para mensagens de erro e sucesso.
- Garantir navegação por teclado.
- Garantir foco visível em inputs, botões e links.
- Usar contraste adequado entre texto e fundo.
- Os botões devem ter nomes claros.
- Não usar apenas cor para indicar erro ou sucesso; usar também texto e/ou ícone textual.
- Os formulários devem ser fáceis de entender, com linguagem simples.

7. Organização do código
- Entregar tudo em arquivos separados:
  - index.html
  - style.css
  - script.js
- Código limpo, bem comentado e organizado.
- Não usar bibliotecas externas além de Google Fonts, se necessário.
- Usar JavaScript puro para alternar entre Login, Criação de Conta e Recuperação de Senha.
- Criar funções separadas para:
  - renderizar telas
  - validar e-mail
  - fazer login
  - criar conta
  - recuperar senha
  - exibir mensagens
  - trocar de tela

8. Resultado esperado
- Ao abrir a aplicação, a tela inicial deve ser o Login.
- O usuário padrão deve conseguir entrar usando:
  - admin@admin.com
  - admin123
- Após login bem-sucedido, mostrar uma mensagem de sucesso ou uma tela simples de boas-vindas.
- A tela de boas-vindas deve ter um botão “Sair” para voltar ao Login.
- A interface deve parecer finalizada, elegante, harmônica e coerente com Material Design.
- Priorizar usabilidade, acessibilidade e clareza, pois é para um trabalho de IHC.

Crie uma solução completa, pronta para copiar e executar no navegador.