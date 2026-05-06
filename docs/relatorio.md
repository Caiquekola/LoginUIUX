# 📸 Guia de Screenshots para Relatório de IHC

## Instruções
Tire prints das telas indicadas abaixo para ilustrar cada Heurística de Nielsen no relatório final.

---

## H1: Visibilidade do Status do Sistema

### Prints Necessários:

| # | Tela | O que capturar | Arquivo |
|---|------|----------------|---------|
| 1.1 | **Catálogo de Eventos** | Mensagem de status da busca: "3 eventos encontrados" | `print_h1_1_busca.png` |
| 1.2 | **Seleção de Assentos** | Assento selecionado com destaque visual (borda mais forte, escala maior) | `print_h1_2_assento.png` |
| 1.3 | **Checkout** | Spinner de carregamento durante processamento do pagamento | `print_h1_3_spinner.png` |
| 1.4 | **Perfil** | Alerta de sucesso: "Compra realizada com sucesso!" | `print_h1_4_sucesso.png` |

**Explicação para o relatório:**
> O sistema mantém o usuário informado sobre o que está acontecendo através de feedback visual em tempo real: contagem de resultados na busca, destaque no assento selecionado, indicador de carregamento durante pagamento e mensagens de confirmação.

---

## H2: Correspondência entre o Sistema e o Mundo Real

### Prints Necessários:

| # | Tela | O que capturar | Arquivo |
|---|------|----------------|---------|
| 2.1 | **Mapa de Assentos** | Visão geral do mapa com formato de poltronas e corredor central | `print_h2_1_mapa.png` |
| 2.2 | **Mapa de Assentos** | Close nos assentos com labels A1, B2, C3 (padrão de cinemas/teatros) | `print_h2_2_labels.png` |
| 2.3 | **Login** | Mensagem de erro com linguagem natural: "E-mail ou senha incorretos" | `print_h2_3_erro.png` |

**Explicação para o relatório:**
> O mapa de assentos utiliza metáforas do mundo real: formato que lembra poltronas, organização em fileiras alfabéticas (A, B, C) e corredores visuais, tornando a interface familiar e intuitiva.

---

## H3: Controle e Liberdade do Usuário

### Prints Necessários:

| # | Tela | O que capturar | Arquivo |
|---|------|----------------|---------|
| 3.1 | **Evento** | Botão "← Voltar" no topo da página | `print_h3_1_voltar_evento.png` |
| 3.2 | **Checkout** | Botão "← Voltar para o Evento" | `print_h3_2_voltar_checkout.png` |
| 3.3 | **Login** | Links "Criar conta" e "Esqueci minha senha" | `print_h3_3_login_opcoes.png` |
| 3.4 | **Header (qualquer página)** | Botão de logout com ícone | `print_h3_4_logout.png` |
| 3.5 | **Seleção de Assentos** | Trocar de assento (mostrar assento A1 selecionado, depois A2) | `print_h3_5_trocar.png` |

**Explicação para o relatório:**
> O usuário nunca fica "preso" em uma tela. Botões de voltar estão presentes em todas as páginas, é possível alterar a seleção de assento a qualquer momento, e a navegação entre Login/Cadastro/Recuperação é livre.

---

## H4: Consistência e Padrões

### Prints Necessários:

| # | Tela | O que capturar | Arquivo |
|---|------|----------------|---------|
| 4.1 | **Catálogo** | Cards de eventos com mesmo layout (imagem, título, data, local, preço) | `print_h4_1_cards.png` |
| 4.2 | **Comparação** | Montagem mostrando botões primários em 3 telas diferentes (mesmo estilo) | `print_h4_2_botoes.png` |
| 4.3 | **Comparação** | Header em 3 páginas diferentes (mesmo padrão) | `print_h4_3_header.png` |
| 4.4 | **Evento e Checkout** | Cards com mesmo estilo visual (sombra, bordas, padding) | `print_h4_4_cards_estilo.png` |

**Explicação para o relatório:**
> O Design System Material Design é aplicado consistentemente: cores padronizadas via variáveis CSS, botões com mesmo estilo em todas as páginas, header uniforme e cards com visual coerente.

---

## H5: Prevenção de Erros

### Prints Necessários:

| # | Tela | O que capturar | Arquivo |
|---|------|----------------|---------|
| 5.1 | **Mapa de Assentos** | Assento ocupado (cinza, cursor not-allowed) | `print_h5_1_ocupado.png` |
| 5.2 | **Checkout** | Botão "Finalizar Pagamento" desabilitado (cinza) | `print_h5_2_btn_desabilitado.png` |
| 5.3 | **Checkout** | Validação de cartão: erro "Número do cartão deve conter 16 dígitos" | `print_h5_3_validacao.png` |
| 5.4 | **Checkout** | Validação de validade: erro "Cartão expirado" | `print_h5_4_expirado.png` |
| 5.5 | **Cadastro** | Erro "E-mail já cadastrado" | `print_h5_5_email_existe.png` |

**Explicação para o relatório:**
> O sistema previne erros antes que aconteçam: assentos ocupados são desabilitados, botões só ativam com dados válidos, validações em tempo real impedem entradas incorretas.

---

## H6: Reconhecimento em Vez de Memorização

### Prints Necessários:

| # | Tela | O que capturar | Arquivo |
|---|------|----------------|---------|
| 6.1 | **Catálogo** | Cards com imagens dos eventos (reconhecimento visual) | `print_h6_1_catalogo.png` |
| 6.2 | **Evento** | Legenda de cores: Standard, VIP/Camarote, Ocupado, Selecionado | `print_h6_2_legenda.png` |
| 6.3 | **Evento** | Dropdown de categorias com preços visíveis | `print_h6_3_categorias.png` |
| 6.4 | **Checkout** | Seção "Usar cartão salvo" (se houver) | `print_h6_4_cartao_salvo.png` |

**Explicação para o relatório:**
> O usuário não precisa memorizar informações: eventos são reconhecidos por imagens, a legenda explica as cores do mapa, categorias mostram preços explicitamente, e cartões salvos eliminam redigitação.

---

## H7: Eficiência e Flexibilidade

### Prints Necessários:

| # | Tela | O que capturar | Arquivo |
|---|------|----------------|---------|
| 7.1 | **Catálogo** | Campo de busca em ação (digitando + resultados filtrados) | `print_h7_1_busca.png` |
| 7.2 | **Evento** | Seleção de assento via teclado (mostrar foco com outline) | `print_h7_2_teclado.png` |
| 7.3 | **Checkout** | Dropdown de cartões salvos para preenchimento rápido | `print_h7_3_cartoes.png` |
| 7.4 | **Evento** | Sincronização: assento VIP selecionado + categoria atualizada automaticamente | `print_h7_4_sync.png` |

**Explicação para o relatório:**
> Atalhos e automações aumentam a eficiência: debounce na busca, navegação por teclado (Tab, Enter, Space), cartões salvos e sincronização automática entre assento e categoria.

---

## H8: Estética e Design Minimalista

### Prints Necessários:

| # | Tela | O que capturar | Arquivo |
|---|------|----------------|---------|
| 8.1 | **Login** | Interface limpa, centralizada, com espaçamento generoso | `print_h8_1_login.png` |
| 8.2 | **Catálogo** | Grid de cards com hierarquia visual clara | `print_h8_2_catalogo.png` |
| 8.3 | **Evento** | Seção de assentos sem elementos desnecessários | `print_h8_3_assentos.png` |
| 8.4 | **Perfil** | Cards de ingressos com informação essencial apenas | `print_h8_4_perfil.png` |

**Explicação para o relatório:**
> A interface segue o princípio de "less is more": espaçamento generoso, sombras discretas, hierarquia clara e apenas informações essenciais visíveis.

---

## H9: Ajuda no Reconhecimento, Diagnóstico e Recuperação de Erros

### Prints Necessários:

| # | Tela | O que capturar | Arquivo |
|---|------|----------------|---------|
| 9.1 | **Checkout** | Erro de validade: "Mês deve ser entre 01 e 12" | `print_h9_1_mes_invalido.png` |
| 9.2 | **Checkout** | Erro de CVV: "CVV deve conter 3 ou 4 dígitos" | `print_h9_2_cvv.png` |
| 9.3 | **Checkout** | Tooltip de ajuda no CVV (ícone de ajuda com explicação) | `print_h9_3_tooltip.png` |
| 9.4 | **Login** | Erro "E-mail ou senha incorretos" (mensagem clara, não técnica) | `print_h9_4_login_erro.png` |

**Explicação para o relatório:**
> Mensagens de erro são claras, específicas e sugerem soluções. Não há códigos de erro técnicos. Tooltips oferecem ajuda contextual.

---

## H10: Ajuda e Documentação

### Prints Necessários:

| # | Tela | O que capturar | Arquivo |
|---|------|----------------|---------|
| 10.1 | **Evento** | Legenda completa do mapa de assentos | `print_h10_1_legenda.png` |
| 10.2 | **Checkout** | Labels descritivos em todos os campos do formulário | `print_h10_2_labels.png` |
| 10.3 | **Checkout** | Tooltip de ajuda no campo CVV | `print_h10_3_tooltip.png` |
| 10.4 | **Login** | Links de ajuda: "Esqueci minha senha" | `print_h10_4_ajuda.png` |

**Explicação para o relatório:**
> Documentação contextual está presente através de labels claros, legendas visuais e tooltips de ajuda, permitindo que usuários entendam o sistema sem necessidade de manual externo.

---

## 📋 Checklist de Prints

### Resumo por Tela

| Tela | Quantidade de Prints |
|------|---------------------|
| Login | 3 prints |
| Cadastro | 1 print |
| Catálogo (Home) | 4 prints |
| Evento (Detalhes + Assentos) | 8 prints |
| Checkout | 10 prints |
| Perfil | 2 prints |
| Header | 2 prints |

**Total estimado: ~30 screenshots**

---

## 🎯 Dicas para os Prints

1. **Resolução**: Use resolução nativa do monitor (1920x1080 ou superior)
2. **Formato**: PNG para melhor qualidade
3. **Navegador**: Chrome ou Firefox em modo janela (não tela cheia)
4. **Destaque**: Use setas ou círculos vermelhos para indicar o elemento relevante
5. **Zoom**: Para detalhes pequenos, faça close-ups separados
6. **Dados**: Use dados realistas (não "lorem ipsum")

---

## 📝 Estrutura Sugerida para o Relatório PDF

```
1. Capa
   - Título do projeto
   - Identificação dos estudantes
   - Instituição e data

2. Sumário

3. Introdução
   - Objetivos do sistema
   - Tecnologias utilizadas

4. Heurísticas de Nielsen (para cada uma):
   - Título da heurística
   - Explicação teórica breve
   - Prints com legendas
   - Explicação de como foi abordada no sistema

5. Conclusão
   - Resumo das implementações
   - Dificuldades encontradas
   - Aprendizados

6. Link do vídeo

7. Referências
```

---

**Bom trabalho! 🎫**
