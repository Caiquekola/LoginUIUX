Para um projeto de IHC focado em Material Design, a base do CSS deve ser construída sobre **Variáveis (Custom Properties)**. Isso garante a consistência visual e facilita a "Flexibilidade e Eficiência de Uso" (Heurística #7), permitindo alterações globais rápidas[cite: 1].

### 1. CSS Base: Variáveis e Reset (Material 3 Style)

Crie o arquivo `css/main.css`. Vamos focar em elevação (sombras), cores semânticas e a tipografia limpa que o Google utiliza.

```css
:root {
    /* Cores Primárias (Indigo/Deep Purple) */
    --primary: #6750A4;
    --on-primary: #FFFFFF;
    --primary-container: #EADDFF;
    
    /* Cores Secundárias (Teal) */
    --secondary: #625B71;
    --surface: #FEF7FF;
    --surface-variant: #E7E0EC;
    --outline: #79747E;

    /* Status */
    --error: #B3261E;
    --success: #2E7D32;

    /* Elevação (Material Shadows) */
    --shadow-1: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    --shadow-2: 0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12);
    
    /* Tipografia */
    --font-main: 'Roboto', system-ui, -apple-system, sans-serif;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: var(--font-main);
    background-color: var(--surface);
    color: #1C1B1F;
    line-height: 1.5;
}

/* Componente Card (Base para Eventos e Assentos) */
.card {
    background: white;
    border-radius: 12px;
    padding: 16px;
    box-shadow: var(--shadow-1);
    transition: box-shadow 0.3s ease;
}

.card:hover {
    box-shadow: var(--shadow-2);
}

/* Botão Estilo Material */
.btn {
    padding: 10px 24px;
    border-radius: 100px; /* Botões totalmente arredondados no M3 */
    border: none;
    cursor: pointer;
    font-weight: 500;
    letter-spacing: 0.1px;
    transition: filter 0.2s;
}

.btn-primary {
    background-color: var(--primary);
    color: var(--on-primary);
}

.btn-primary:disabled {
    background-color: var(--outline);
    cursor: not-allowed;
}
```
