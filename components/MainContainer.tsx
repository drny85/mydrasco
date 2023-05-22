import { Fab, Hidden } from '@mui/material';
import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { switchTheme } from '../redux/themeSlide';
import { darkTheme, lightTheme } from '../Theme';
import Head from 'next/head';
import { auth } from '../firebase';

interface PageProps {
    children: React.ReactNode;
    title?: string;
}

const MainContainer: FC<PageProps> = ({ children, title }) => {
    const theme = useAppSelector((state) => state.theme);
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    return (
        <div
            style={{
                backgroundColor: theme.BACKGROUND_COLOR,
                height: '100vh',
                width: '100vw',
                overflow: 'scroll',
                scrollBehavior: 'smooth',
                overscrollBehavior: 'contain',
            }}
        >
            <div
                style={{
                    backgroundColor: theme.BACKGROUND_COLOR,
                    display: 'flex',
                    maxWidth: '1440px',
                    scrollBehavior: 'smooth',
                    margin: '0 auto',
                    overscrollBehavior: 'contain',
                }}
            >
                <Head>{title}</Head>
                {children}
                <footer style={{ display: 'flex' }}>
                    {user && (
                        <div>
                            {' '}
                            <Fab
                                onClick={() =>
                                    dispatch(
                                        switchTheme(
                                            theme.mode === 'dark'
                                                ? lightTheme
                                                : darkTheme
                                        )
                                    )
                                }
                                style={{
                                    position: 'fixed',
                                    left: '30px',
                                    bottom: '30px',
                                    zIndex: 9999,
                                    backgroundColor: theme.TEXT_COLOR,
                                }}
                            >
                                {theme.mode === 'light' ? (
                                    <DarkModeIcon
                                        color="secondary"
                                        style={{
                                            backgroundColor: theme.TEXT_COLOR,
                                        }}
                                    />
                                ) : (
                                    <LightModeIcon
                                        style={{
                                            backgroundColor: theme.TEXT_COLOR,
                                        }}
                                    />
                                )}
                            </Fab>
                            <Fab
                                onClick={() => {
                                    auth.signOut();
                                }}
                                style={{
                                    position: 'fixed',
                                    left: '30px',
                                    bottom: '100px',
                                    zIndex: 9999,
                                    backgroundColor: theme.TEXT_COLOR,
                                }}
                            >
                                <ExitToAppIcon color="primary" />
                            </Fab>
                        </div>
                    )}
                </footer>
            </div>
        </div>
    );
};

export default MainContainer;
