import { FC, ReactElement, useEffect, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { useAppDispatch, useAppSelector } from './redux/hooks/reduxHooks';
import { switchTheme } from './redux/themeSlide';

import { darkTheme, lightTheme } from './Theme';

const ThemeProviderComponent: FC<ReactNode> = ({ children }) => {
    const theme = useAppSelector((state) => state.theme);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const t = localStorage.getItem('theme');
        if (t !== null) {
            dispatch(switchTheme(t === 'dark' ? darkTheme : lightTheme));
        }
    }, [dispatch]);
    return (
        <ThemeProvider theme={theme}>
            {/* @ts-ignore */}
            {children}
        </ThemeProvider>
    );
};

export default ThemeProviderComponent;
