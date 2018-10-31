import * as Tokens from '@uleen/tokens';
import styled, { css, keyframes } from 'styled-components';
import * as theme from 'styled-theming';

const designs = theme('design', {
    primary: css`
        background-color: #212121;
        color: #fff;

        &:hover {
            background-color: #ffed00;
            color: #000;
        }
    `,
    secondary: css`
        background-color: #fff;
        color: #000;

        &:hover {
            border-color: #000;
        }
    `,
    accent: css`
        background-color: #ffed00;
        color: #000;

        &:hover {
            background-color: #000;
            color: #fff;
        }
    `,
    danger: css`
        background-color: #d91e00;
        color: #fff;

        &:hover {
            background-color: #000;
        }
    `,
    'danger-outline': css`
        background-color: #fff;
        color: #d91e00;
        border-color: #d91e00;

        &:hover {
            background-color: #d91e00;
            color: #fff;
            border-color: #d91e00;
        }
    `,
});

const sizes = theme('size', {
    xs: css`
        font-size: ${Tokens.font.size.s};
        line-height: ${Tokens.font.height.xs};
        padding: 5px 7px;
    `,
    s: css`
        font-size: ${Tokens.font.size.s};
        line-height: ${Tokens.font.height.s};
        padding: 7px 11px;
    `,
    m: css`
        font-size: ${Tokens.font.size.m};
        line-height: ${Tokens.font.height.m};
        padding: 7px 15px;
    `,
    l: css`
        font-size: ${Tokens.font.size.m};
        line-height: ${Tokens.font.height.m};
        padding: 9px 19px;
    `,
    xl: css`
        font-size: ${Tokens.font.size.m};
        line-height: ${Tokens.font.height.m};
        padding: 13px 23px;
    `,
});

const width = theme('grid', Tokens.layout.grid);
const height = theme('size', Tokens.layout.height.control);

const rotate360 = keyframes`
    100% {
        transform: rotate(360deg);
    }
`;

export const Container = styled.button`
    background-color: transparent;
    font-family: ${Tokens.font.family.base};
    text-decoration: none;
    vertical-align: middle;
    position: relative;
    width: ${(props) => props.theme.square ? height : width};
    height: ${height};
    border: 1px solid rgba(0, 0, 0, .2);
    border-radius: 1px;
    display: inline-block;
    box-sizing: border-box;
    white-space: nowrap;
    user-select: none;
    appearance: none;
    cursor: pointer;
    outline: 0;

    ${designs}
    ${sizes}

    ${(props) => props.theme.square && `
        padding: 0;
    `}

    ${(props) => props.disabled && `
        background-color: #f5f5f5;
        color: rgba(0, 0, 0, .4);
        border-color: rgba(0, 0, 0, .2);
        pointer-events: none;
        cursor: default;
    `}

    ${(props) => props.theme.loading && `
        background-color: #f5f5f5;
        color: transparent !important;
        border-color: rgba(0, 0, 0, .2);
        pointer-events: none;
        cursor: default;

        &::after {
            background-image: url(${require('./resources/spinner.svg')});
            background-repeat: no-repeat;
            background-position: center;
            background-size: 20px 20px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin: -10px 0 0 -10px;
            width: 20px;
            height: 20px;
            animation: ${rotate360} 1s infinite linear;
            content: '';
        }
    `}
`;
