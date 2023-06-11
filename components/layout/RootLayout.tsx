import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { MessageComponent } from '../';

interface Props {
    children: React.ReactNode;
}

function Layout({ children }: Props) {
    const message = useSelector(
        (state: RootState) => state.user.session.userMessage
    );
    return (
        <div className="root-container">
            <Header />

            <main className="contenedor-main">{children}</main>

            <MessageComponent
                message={message.message}
                messageType={message.messageType}
            />

            <Footer />
        </div>
    );
}

export default Layout;
