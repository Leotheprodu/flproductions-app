import React from 'react';
import '../styles/globals.css';
import '../styles/app.css';
import { NextUIProvider } from '@nextui-org/react';
import RootLayout from '../components/layout/RootLayout';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app'; // Importar el tipo AppProps
import store from '../components/redux/store';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <NextUIProvider>
                <RootLayout>
                    <Component {...pageProps} />
                </RootLayout>
            </NextUIProvider>
        </Provider>
    );
}
