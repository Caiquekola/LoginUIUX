/**
 * ============================================================
 * SISTEMA DE AUTENTICAÇÃO - LoginUIUX
 * Aplicação com HTML, CSS e JavaScript puro
 * ============================================================
 */

// ============================================================
// BANCO DE DADOS EM MEMÓRIA
// ============================================================
const users = [
  { name: 'Admin', email: 'admin@admin.com', password: 'admin123' }
];

// ============================================================
// ELEMENTOS DO DOM
// ============================================================
const screens = {
  login: document.getElementById('screen-login'),
  register: document.getElementById('screen-register'),
  forgot: document.getElementById('screen-forgot'),
  welcome: document.getElementById('screen-welcome')
};

const forms = {
  login: document.getElementById('form-login'),
  register: document.getElementById('form-register'),
  forgot: document.getElementById('form-forgot')
};

// ============================================================
// FUNÇÕES UTILITÁRIAS
// ============================================================

/**
 * Valida formato de e-mail
 * @param {string} email 
 * @returns {boolean}
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Exibe mensagem de erro em um campo
 * @param {HTMLElement} fieldContainer 
 * @param {string} message 
 */
function showFieldError(fieldContainer, message) {
  if (!fieldContainer) return;
  fieldContainer.classList.add('field--error');
  const errorElement = fieldContainer.querySelector('.field__error');
  if (errorElement) {
    errorElement.textContent = message;
  }
}

/**
 * Limpa erro de um campo
 * @param {HTMLElement} fieldContainer 
 */
function clearFieldError(fieldContainer) {
  if (!fieldContainer) return;
  fieldContainer.classList.remove('field--error');
  const errorElement = fieldContainer.querySelector('.field__error');
  if (errorElement) {
    errorElement.textContent = '';
  }
}

/**
 * Exibe mensagem global do formulário
 * @param {HTMLElement} container 
 * @param {string} message 
 * @param {string} type - 'error' ou 'success'
 */
function showFormMessage(container, message, type) {
  if (!container) return;
  container.textContent = message;
  container.className = `form-message form-message--${type}`;
  
  // Anuncia para leitores de tela
  const liveRegion = document.getElementById('live-region');
  if (liveRegion) {
    liveRegion.textContent = message;
  }
}

/**
 * Limpa mensagem global do formulário
 * @param {HTMLElement} container 
 */
function clearFormMessage(container) {
  if (!container) return;
  container.textContent = '';
  container.className = 'form-message';
}

/**
 * Limpa todos os erros e mensagens de um formulário
 * @param {HTMLFormElement} form 
 */
function clearFormErrors(form) {
  const fields = form.querySelectorAll('.field');
  fields.forEach(field => clearFieldError(field));
  
  const messageContainer = form.querySelector('.form-message');
  clearFormMessage(messageContainer);
}

/**
 * Alterna entre telas
 * @param {string} screenName - 'login', 'register', 'forgot', 'welcome'
 */
function showScreen(screenName) {
  // Esconde todas as telas
  Object.values(screens).forEach(screen => {
    if (screen) {
      screen.classList.remove('screen--active');
      screen.setAttribute('aria-hidden', 'true');
    }
  });

  // Mostra a tela desejada
  const targetScreen = screens[screenName];
  if (targetScreen) {
    targetScreen.classList.add('screen--active');
    targetScreen.setAttribute('aria-hidden', 'false');
    
    // Foca no primeiro campo de input para acessibilidade
    const firstInput = targetScreen.querySelector('input');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }
}

/**
 * Animação de ripple no botão
 * @param {Event} event 
 */
function createRipple(event) {
  const button = event.currentTarget;
  const ripple = button.querySelector('.btn__ripple');
  
  if (ripple) {
    ripple.classList.remove('ripple-active');
    void ripple.offsetWidth; // Força reflow
    ripple.classList.add('ripple-active');
  }
}

// ============================================================
// HANDLERS DE FORMULÁRIO
// ============================================================

/**
 * Processa login
 * @param {Event} event 
 */
function handleLogin(event) {
  event.preventDefault();
  
  const form = event.target;
  clearFormErrors(form);
  
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  
  let hasError = false;
  
  // Valida e-mail
  if (!email) {
    showFieldError(document.getElementById('field-login-email'), 'E-mail é obrigatório');
    hasError = true;
  } else if (!validateEmail(email)) {
    showFieldError(document.getElementById('field-login-email'), 'E-mail inválido');
    hasError = true;
  }
  
  // Valida senha
  if (!password) {
    showFieldError(document.getElementById('field-login-password'), 'Senha é obrigatória');
    hasError = true;
  }
  
  if (hasError) return;
  
  // Busca usuário no banco de dados
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Login bem-sucedido
    const welcomeName = document.getElementById('welcome-name');
    if (welcomeName) {
      welcomeName.textContent = user.name;
    }
    
    // Limpa formulário
    form.reset();
    
    // Mostra tela de boas-vindas
    showScreen('welcome');
  } else {
    // Login falhou
    showFormMessage(
      document.getElementById('login-message'),
      'E-mail ou senha incorretos. Verifique suas credenciais.',
      'error'
    );
  }
}

/**
 * Processa criação de conta
 * @param {Event} event 
 */
function handleRegister(event) {
  event.preventDefault();
  
  const form = event.target;
  clearFormErrors(form);
  
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const confirm = document.getElementById('reg-confirm').value;
  
  let hasError = false;
  
  // Valida nome
  if (!name) {
    showFieldError(document.getElementById('field-reg-name'), 'Nome é obrigatório');
    hasError = true;
  }
  
  // Valida e-mail
  if (!email) {
    showFieldError(document.getElementById('field-reg-email'), 'E-mail é obrigatório');
    hasError = true;
  } else if (!validateEmail(email)) {
    showFieldError(document.getElementById('field-reg-email'), 'E-mail inválido');
    hasError = true;
  } else if (users.find(u => u.email === email)) {
    showFieldError(document.getElementById('field-reg-email'), 'Este e-mail já está cadastrado');
    hasError = true;
  }
  
  // Valida senha
  if (!password) {
    showFieldError(document.getElementById('field-reg-password'), 'Senha é obrigatória');
    hasError = true;
  } else if (password.length < 6) {
    showFieldError(document.getElementById('field-reg-password'), 'Senha deve ter no mínimo 6 caracteres');
    hasError = true;
  }
  
  // Valida confirmação de senha
  if (!confirm) {
    showFieldError(document.getElementById('field-reg-confirm'), 'Confirmação de senha é obrigatória');
    hasError = true;
  } else if (password && confirm !== password) {
    showFieldError(document.getElementById('field-reg-confirm'), 'As senhas não coincidem');
    hasError = true;
  }
  
  if (hasError) return;
  
  // Cria novo usuário
  users.push({ name, email, password });
  
  // Limpa formulário
  form.reset();
  
  // Mostra mensagem de sucesso e volta para login
  showFormMessage(
    document.getElementById('login-message'),
    'Conta criada com sucesso! Faça login para continuar.',
    'success'
  );
  
  showScreen('login');
}

/**
 * Processa recuperação de senha
 * @param {Event} event 
 */
function handleForgotPassword(event) {
  event.preventDefault();
  
  const form = event.target;
  clearFormErrors(form);
  
  const email = document.getElementById('forgot-email').value.trim();
  
  let hasError = false;
  
  // Valida e-mail
  if (!email) {
    showFieldError(document.getElementById('field-forgot-email'), 'E-mail é obrigatório');
    hasError = true;
  } else if (!validateEmail(email)) {
    showFieldError(document.getElementById('field-forgot-email'), 'E-mail inválido');
    hasError = true;
  }
  
  if (hasError) return;
  
  // Simula envio de instruções
  // (Em um sistema real, enviaria um e-mail)
  
  // Limpa formulário
  form.reset();
  
  // Mostra mensagem de sucesso e volta para login
  showFormMessage(
    document.getElementById('login-message'),
    'Se o e-mail estiver cadastrado, você receberá as instruções para redefinir sua senha.',
    'success'
  );
  
  showScreen('login');
}

/**
 * Processa logout
 */
function handleLogout() {
  showScreen('login');
}

// ============================================================
// TOGGLE DE SENHA (Mostrar/Ocultar)
// ============================================================

/**
 * Alterna visibilidade da senha
 * @param {Event} event 
 */
function togglePasswordVisibility(event) {
  const button = event.currentTarget;
  const targetId = button.getAttribute('data-target');
  const input = document.getElementById(targetId);
  
  if (!input) return;
  
  const eyeShow = button.querySelector('.eye-show');
  const eyeHide = button.querySelector('.eye-hide');
  
  if (input.type === 'password') {
    input.type = 'text';
    button.setAttribute('aria-label', 'Ocultar senha');
    if (eyeShow) eyeShow.style.display = 'none';
    if (eyeHide) eyeHide.style.display = 'block';
  } else {
    input.type = 'password';
    button.setAttribute('aria-label', 'Mostrar senha');
    if (eyeShow) eyeShow.style.display = 'block';
    if (eyeHide) eyeHide.style.display = 'none';
  }
}

// ============================================================
// EVENT LISTENERS
// ============================================================

// Formulários
forms.login.addEventListener('submit', handleLogin);
forms.register.addEventListener('submit', handleRegister);
forms.forgot.addEventListener('submit', handleForgotPassword);

// Navegação entre telas
document.getElementById('go-register').addEventListener('click', () => {
  clearFormErrors(forms.login);
  forms.login.reset();
  showScreen('register');
});

document.getElementById('go-forgot').addEventListener('click', () => {
  clearFormErrors(forms.login);
  forms.login.reset();
  showScreen('forgot');
});

document.getElementById('go-login-from-register').addEventListener('click', () => {
  clearFormErrors(forms.register);
  forms.register.reset();
  showScreen('login');
});

document.getElementById('go-login-from-forgot').addEventListener('click', () => {
  clearFormErrors(forms.forgot);
  forms.forgot.reset();
  showScreen('login');
});

// Logout
document.getElementById('btn-logout').addEventListener('click', handleLogout);

// Toggle de senha
document.querySelectorAll('.field__eye').forEach(button => {
  button.addEventListener('click', togglePasswordVisibility);
});

// Ripple effect nos botões
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', createRipple);
});

// Rastreamento de foco nos campos (para barra animada)
document.querySelectorAll('.field__input').forEach(input => {
  input.addEventListener('focus', () => {
    input.closest('.field').classList.add('field--focused');
  });
  
  input.addEventListener('blur', () => {
    input.closest('.field').classList.remove('field--focused');
  });
});

// ============================================================
// INICIALIZAÇÃO
// ============================================================
console.log('🔐 Sistema de Autenticação inicializado');
console.log('👤 Usuário padrão: admin@admin.com / admin123');
