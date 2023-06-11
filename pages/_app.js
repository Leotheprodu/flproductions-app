import '../styles/app.css';
import RootLayout from '../components/layout/RootLayout';
import { Provider } from 'react-redux';
import store from '../components/redux/store';

export default function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <RootLayout>
                <Component {...pageProps} />
            </RootLayout>
        </Provider>
    );
}
