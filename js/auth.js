// js/auth.js

// Verifica se há uma sessão ativa
function estaLogado() {
    return localStorage.getItem('sessao_ativa') !== null;
}

function getUsuarioLogado() {
    const sessao = localStorage.getItem('sessao_ativa');
    return sessao ? JSON.parse(sessao) : null;
}

// Realiza o login
function login(email, senha) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    console.log(usuarios);
    const usuario = usuarios.find(u => u.email === email && u.password === senha);
    console.log(usuario);
    if (usuario) {
        localStorage.setItem('sessao_ativa', JSON.stringify({ id: usuario.id, nome: usuario.name, email: usuario.email }));
        return true;
    }
    return false;
}

// Realiza o cadastro
function cadastrar(nome, email, senha) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    if (usuarios.find(u => u.email === email)) {
        return { sucesso: false, mensagem: "E-mail já cadastrado." };
    }
    
    const novoUsuario = {
        id: 'usr_' + Date.now().toString(),
        nome,
        email,
        senha
    };
    
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    // Auto login
    localStorage.setItem('sessao_ativa', JSON.stringify({ id: novoUsuario.id, nome: novoUsuario.nome, email: novoUsuario.email }));
    return { sucesso: true };
}

// Realiza logout
function logout() {
    localStorage.removeItem('sessao_ativa');
    window.location.href = '/pages/login.html';
}

// Simula recuperação de senha
function recuperarSenha(email) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (usuarios.find(u => u.email === email)) {
        return true; // Simula sucesso
    }
    return false; // Usuário não encontrado
}

// Proteção de Rotas e UI Global
function verificarProtecaoRota() {
    const paginaAtual = window.location.pathname;
    const paginasLivres = ['/pages/login.html', '/pages/cadastro.html', '/pages/recuperar-senha.html'];
    
    // Se a página atual é raiz (/), não é classificada como "livre"
    const isLivre = paginasLivres.some(p => paginaAtual.includes(p));
    
    if (!isLivre && !estaLogado()) {
        window.location.href = '/pages/login.html';
        return;
    }
    
    if (isLivre && estaLogado() && (paginaAtual.includes('login') || paginaAtual.includes('cadastro'))) {
        window.location.href = '/';
        return;
    }
    
    // Atualizar Header se estiver logado
    if (estaLogado() && !isLivre) {
        const headerContent = document.querySelector('.header-content');
        if (headerContent) {
            const usuario = getUsuarioLogado();
            // Evitar sobrescrever o logo/título, substituir a parte direita
            console.log(usuario);
            const btnOld = headerContent.querySelector('.icon-btn');
            // Remove o botão antigo de perfil ou div antiga
            const rightSide = headerContent.lastElementChild;
            if (rightSide && (rightSide.tagName === 'BUTTON' || rightSide.tagName === 'DIV')) {
                rightSide.remove();
            }
            
            const divInfo = document.createElement('div');
            divInfo.style.display = 'flex';
            divInfo.style.alignItems = 'center';
            divInfo.style.gap = '8px';
            divInfo.innerHTML = `
                <span style="font-weight: 500; cursor: pointer;" onclick="window.location.href='/pages/perfil.html'">Olá, ${usuario.nome}!</span>
                <button class="icon-btn" aria-label="Sair" onclick="logout()">
                    <span class="material-symbols-outlined">logout</span>
                </button>
            `;
            headerContent.appendChild(divInfo);
        }
    }
}

// Executar verificação ao carregar a página
document.addEventListener('DOMContentLoaded', verificarProtecaoRota);
