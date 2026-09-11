import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    :root {
        --color-page-background: #e4dfd1;
        --color-page-background-accent: #c3b78f;
        --color-card-background: #ddd4b7;
        --color-card-accent: #1f6e64;
        --color-title: #a2222b;
        --color-text-main: #212a3b;
        --color-text-muted: #656669;
        --color-divider: #9e926a;
        --font-display: Didot;
        --font-serif: Georgia;
    }

    body {
        background-color: var(--color-page-background);
        color: var(--color-text-main);
        font-family: var(--font-display);
        text-align: center;
        opacity: 0.8;
        background-image: radial-gradient(circle, var(--color-page-background-accent) 1.2px, transparent 1.2px);
        background-size: 15px 15px;
    }
`;

export default GlobalStyle;
