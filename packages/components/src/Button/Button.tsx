import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { Container } from './Button.styles';

interface Props {
    children?: React.ReactNode;
    design?: 'primary' | 'secondary' | 'accent' | 'danger' | 'danger-outline';
    size?: 'xs' | 's' | 'm' | 'l' | 'xl';
    grid?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    loading?: boolean;
    disabled?: boolean;
    onClick?: (event: React.FormEvent) => void;
}

interface ElementProps {
    autoFocus?: boolean;
    tabIndex?: number;
    value?: string;
    type?: 'button' | 'submit' | 'reset' | 'menu';
    href?: string;
    download?: string;
    rel?: string;
    target?: '_self' | '_blank' | '_parent' | '_top';
    referrerPolicy?: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'unsafe-url';
}

const Button: React.SFC<Props & ElementProps> = (props): JSX.Element => {
    const { children, design, size, grid, loading, ...attrs } = props;

    let icons = 0;
    const count = React.Children.count(children);
    const content = React.Children.map(children, (child: any, index: number): JSX.Element => {
        if (typeof child.type === 'function' && (child.type.name || child.type.displayName) === 'Icon') {
            icons++;

            return (
                <ThemeProvider theme={{ inject: true, first: index === 0, last: index === count - 1 }}>
                    {child}
                </ThemeProvider>
            );
        }

        return child;
    });

    const tag = attrs.href ? Container.withComponent('a') : Container;

    return (
        <ThemeProvider theme={{ design, size, grid, loading, square: icons === count }}>
            {React.createElement(tag, attrs, content)}
        </ThemeProvider>
    );
};

Button.defaultProps = {
    design: 'primary',
    size: 'm',
    grid: 0,
    type: 'button',
};

export default Button;
