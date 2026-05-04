// js/checkout.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obter dados da URL (Heurística #6 - manter contexto)
    const params = new URLSearchParams(window.location.search);
    const eventIdParam = params.get('eventId');
    const seat = params.get('seat');
    const categoryId = params.get('categoryId');

    if (!eventIdParam || !seat || !categoryId) {
        alert('Dados da compra incompletos. Retornando à página inicial.');
        window.location.href = '/';
        return;
    }

    const eventId = parseInt(eventIdParam);
    const eventoAtual = eventos.find(e => e.id === eventId);

    if (!eventoAtual) {
        alert('Evento não encontrado!');
        window.location.href = '/';
        return;
    }

    const categoriaSelecionada = eventoAtual.categorias.find(c => c.id === categoryId) || eventoAtual.categorias[0];

    // Configurar Botão Voltar (Heurística #3 - Controle e liberdade do usuário)
    const btnVoltar = document.getElementById('btn-voltar');
    btnVoltar.addEventListener('click', () => {
        window.location.href = `/pages/evento.html?id=${eventoAtual.id}`;
    });

    // Estado Atual da Compra
    const compraAtual = {
        eventoId: eventoAtual.id,
        eventoTitulo: eventoAtual.titulo,
        categoria: categoriaSelecionada.nome,
        assento: seat,
        valor: categoriaSelecionada.preco
    };

    // Renderizar Resumo
    function renderSummary() {
        const summaryContent = document.getElementById('summary-content');
        const btnPagar = document.getElementById('btn-pagar');
        
        summaryContent.innerHTML = `
            <div class="summary-item">
                <span style="color: var(--secondary);">Evento</span>
                <span style="font-weight: 500; text-align: right; max-width: 60%;">${compraAtual.eventoTitulo}</span>
            </div>
            <div class="summary-item">
                <span style="color: var(--secondary);">Categoria</span>
                <span style="font-weight: 500;">${compraAtual.categoria}</span>
            </div>
            <div class="summary-item">
                <span style="color: var(--secondary);">Assento</span>
                <span style="font-weight: 500; color: var(--primary);">${compraAtual.assento}</span>
            </div>
            <div class="summary-total">
                <span>Total a pagar</span>
                <span>R$ ${compraAtual.valor.toFixed(2).replace('.', ',')}</span>
            </div>
        `;

        btnPagar.textContent = `Pagar R$ ${compraAtual.valor.toFixed(2).replace('.', ',')}`;
    }

    renderSummary();

    // 2. Máscaras e Validações do Formulário (Heurística #5 - Prevenção de Erros)
    const inputs = {
        nome: document.getElementById('card-name'),
        cartao: document.getElementById('card-number'),
        validade: document.getElementById('card-expiry'),
        cvv: document.getElementById('card-cvv')
    };
    const btnPagar = document.getElementById('btn-pagar');

    // Elementos de mensagem de erro
    const errorElements = {
        nome: document.createElement('span'),
        cartao: document.createElement('span'),
        validade: document.createElement('span'),
        cvv: document.createElement('span')
    };

    // Configurar elementos de erro
    Object.keys(errorElements).forEach(key => {
        errorElements[key].className = 'error-message';
        errorElements[key].style.cssText = 'color: var(--error); font-size: 0.75rem; display: none; margin-top: 4px;';
        inputs[key].parentNode.insertBefore(errorElements[key], inputs[key].nextSibling);
        inputs[key].style.borderColor = '';
    });

    // Função para exibir/ocultar erro
    function showError(field, message) {
        errorElements[field].textContent = message;
        errorElements[field].style.display = message ? 'block' : 'none';
        inputs[field].style.borderColor = message ? 'var(--error)' : 'var(--outline)';
    }

    // Máscara para Número do Cartão (0000 0000 0000 0000)
    inputs.cartao.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
        value = value.replace(/(\d{4})(?=\d)/g, '$1 '); // Adiciona espaço a cada 4 dígitos
        e.target.value = value;
        validarFormulario();
    });

    inputs.cartao.addEventListener('blur', () => {
        const cartaoLimpo = inputs.cartao.value.replace(/\s/g, '');
        if (inputs.cartao.value && cartaoLimpo.length < 16) {
            showError('cartao', 'Número do cartão deve conter 16 dígitos');
        } else {
            showError('cartao', '');
        }
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

    inputs.validade.addEventListener('blur', () => {
        const value = inputs.validade.value;
        if (value && value.length === 5) {
            const [mes, ano] = value.split('/');
            const mesNum = parseInt(mes, 10);
            const anoNum = parseInt('20' + ano, 10);
            
            const hoje = new Date();
            const dataValidade = new Date(anoNum, mesNum - 1); // Mês é 0-indexed
            
            if (mesNum < 1 || mesNum > 12) {
                showError('validade', 'Mês deve ser entre 01 e 12');
            } else if (dataValidade < hoje) {
                showError('validade', 'Cartão expirado. A validade deve ser superior à data atual');
            } else {
                showError('validade', '');
            }
        } else if (inputs.validade.value) {
            showError('validade', 'Formato inválido. Use MM/AA');
        } else {
            showError('validade', '');
        }
    });

    // Máscara para CVV (Apenas números e limite de 4 dígitos)
    inputs.cvv.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
        validarFormulario();
    });

    inputs.cvv.addEventListener('blur', () => {
        if (inputs.cvv.value && inputs.cvv.value.length < 3) {
            showError('cvv', 'CVV deve conter 3 ou 4 dígitos');
        } else {
            showError('cvv', '');
        }
    });

    // Validação Nome
    inputs.nome.addEventListener('input', validarFormulario);

    inputs.nome.addEventListener('blur', () => {
        const nomeCompleto = inputs.nome.value.trim();
        const palavras = nomeCompleto.split(/\s+/);
        
        if (inputs.nome.value && palavras.length < 2) {
            showError('nome', 'Nome impresso deve conter nome e sobrenome');
        } else if (inputs.nome.value && nomeCompleto.length < 3) {
            showError('nome', 'Nome muito curto');
        } else {
            showError('nome', '');
        }
    });

    function validarFormulario() {
        const cartaoLimpo = inputs.cartao.value.replace(/\s/g, '');
        const cartaoValido = cartaoLimpo.length === 16;
        
        // Validade - verificar formato e se é futura
        let validadeValida = false;
        if (inputs.validade.value.length === 5) {
            const [mes, ano] = inputs.validade.value.split('/');
            const mesNum = parseInt(mes, 10);
            const anoNum = parseInt('20' + ano, 10);
            const hoje = new Date();
            const dataValidade = new Date(anoNum, mesNum - 1);
            validadeValida = mesNum >= 1 && mesNum <= 12 && dataValidade >= hoje;
        }
        
        const cvvValido = inputs.cvv.value.length >= 3;
        
        // Nome - deve ter pelo menos 2 palavras
        const nomeCompleto = inputs.nome.value.trim();
        const palavras = nomeCompleto.split(/\s+/);
        const nomeValido = palavras.length >= 2 && nomeCompleto.length >= 3;

        // Ativa o botão apenas se tudo estiver preenchido corretamente
        btnPagar.disabled = !(cartaoValido && validadeValida && cvvValido && nomeValido);
    }

    // 2.5 Carregar Cartões Salvos (Heurística #7 - Eficiência)
    const usuarioLogado = JSON.parse(localStorage.getItem('sessao_ativa'));
    let cartoesGlobais = JSON.parse(localStorage.getItem('cartoes_salvos')) || [];
    let meusCartoes = usuarioLogado ? cartoesGlobais.filter(c => c.usuarioId === usuarioLogado.id) : [];

    if (meusCartoes.length > 0) {
        document.getElementById('saved-cards-container').style.display = 'block';
        const select = document.getElementById('saved-cards-select');
        meusCartoes.forEach((cartao, index) => {
            const finalCartao = cartao.numero.substring(cartao.numero.length - 4);
            const opt = document.createElement('option');
            opt.value = index;
            opt.textContent = `Cartão final ${finalCartao} (${cartao.nome})`;
            select.appendChild(opt);
        });

        document.getElementById('btn-use-saved-card').addEventListener('click', () => {
            const idx = select.value;
            if (idx !== "") {
                const cartao = meusCartoes[idx];
                inputs.nome.value = cartao.nome;
                inputs.cartao.value = cartao.numero;
                inputs.validade.value = cartao.validade;
                inputs.cvv.value = cartao.cvv;
                validarFormulario();
            }
        });
    }

    // 3. Simulação de Processamento (Heurística #1 - Visibilidade do status do sistema)
    function processarPagamento() {
        // Altera o estado do botão para visualização de carregamento
        btnPagar.disabled = true;
        const textoOriginal = btnPagar.innerHTML;
        btnPagar.innerHTML = `<span class="spinner"></span> Processando...`;

        // Simulação de comunicação com o banco (2 segundos)
        setTimeout(() => {
            // Regra mockada de erro: Se o CVV for 000 (Heurística #9 - Diagnóstico de erro)
            if (inputs.cvv.value === '000') {
                alert("Ops! O pagamento foi recusado pela administradora. Verifique os dados ou tente outro cartão.");
                btnPagar.innerHTML = textoOriginal;
                btnPagar.disabled = false;
                return;
            }

            // Simulação de Sucesso
            const idCompra = 'TKT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
            const sessao = JSON.parse(localStorage.getItem('sessao_ativa'));
            
            const novoIngresso = {
                idCompra: idCompra,
                eventoId: compraAtual.eventoId,
                categoria: compraAtual.categoria,
                assento: compraAtual.assento,
                dataCompra: new Date().toISOString().split('T')[0],
                qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
                usuarioId: sessao ? sessao.id : null
            };

            // Atualiza ingressos globais
            let ingressos_globais = JSON.parse(localStorage.getItem('ingressos_globais')) || [];
            ingressos_globais.push(novoIngresso);
            localStorage.setItem('ingressos_globais', JSON.stringify(ingressos_globais));
            
            // Atualiza assentos ocupados
            let mapas_assentos_alterados = JSON.parse(localStorage.getItem('mapas_assentos_alterados')) || {};
            if (!mapas_assentos_alterados[compraAtual.eventoId]) {
                mapas_assentos_alterados[compraAtual.eventoId] = [];
            }
            if (!mapas_assentos_alterados[compraAtual.eventoId].includes(compraAtual.assento)) {
                mapas_assentos_alterados[compraAtual.eventoId].push(compraAtual.assento);
            }
            localStorage.setItem('mapas_assentos_alterados', JSON.stringify(mapas_assentos_alterados));

            // Salvar no localStorage temporário (opcional, mantendo compatibilidade)
            localStorage.setItem('ultimoIngressoComprado', JSON.stringify(novoIngresso));

            // Salvar cartão para compras futuras (Heurística #7)
            if (sessao) {
                let cartoes = JSON.parse(localStorage.getItem('cartoes_salvos')) || [];
                const cartaoAtual = inputs.cartao.value;
                // Evita duplicar se já existir esse cartão salvo pro usuário
                if (!cartoes.find(c => c.usuarioId === sessao.id && c.numero === cartaoAtual)) {
                    cartoes.push({
                        usuarioId: sessao.id,
                        nome: inputs.nome.value,
                        numero: cartaoAtual,
                        validade: inputs.validade.value,
                        cvv: inputs.cvv.value
                    });
                    localStorage.setItem('cartoes_salvos', JSON.stringify(cartoes));
                }
            }

            // Redirecionamento
            window.location.href = '/pages/perfil.html?success=true';
        }, 2000);
    }

    btnPagar.addEventListener('click', processarPagamento);
});
