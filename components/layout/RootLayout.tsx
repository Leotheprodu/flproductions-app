import React, { useEffect, useState } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { MessageComponent, MusicPlayer } from '../';

interface Props {
    children: React.ReactNode;
}
function Layout({ children }: Props) {
    const produccionActual = useSelector(
        (state: RootState) => state.user.session.music.produccionActual
    );

    const message = useSelector(
        (state: RootState) => state.user.session.userMessage
    );
    return (
        <div className="root-container">
            <Header />

            <main className="contenedor-main dark:bg-negro/90 dark:text-blanco">
                {children}
            </main>

            <MessageComponent
                message={message.message}
                messageType={message.messageType}
            />
            {produccionActual && <MusicPlayer />}
            <Footer />
        </div>
    );
}

export default Layout;
