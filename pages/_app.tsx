import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';
import { store } from '../redux/store';
import ThemeProviderComponent from '../ThemeProviderComponent';
import GlobalStyle from '../styles/Global';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <ThemeProviderComponent>
                {/* @ts-ignore */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '1200px',
                        margin: '0 auto',
                    }}
                >
                    <Component {...pageProps} />
                </div>

                <GlobalStyle />
            </ThemeProviderComponent>
        </Provider>
    );
}

export default MyApp;
