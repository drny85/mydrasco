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
                <Component {...pageProps} />
                <GlobalStyle />
            </ThemeProviderComponent>
        </Provider>
    );
}

export default MyApp;
