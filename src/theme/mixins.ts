import { css } from 'styled-components';

export const degreeSuffix = css`
    &::after {
        content: "°";
    }
`;

export const dashedDivider = css`
    background-image: repeating-linear-gradient(
        to right,
        var(--color-divider) 0px,
        var(--color-divider) 4px,
        transparent 4px,
        transparent 8px
    );
    background-position: bottom;
    background-size: 100% 2px;
    background-repeat: repeat-x;
`;
