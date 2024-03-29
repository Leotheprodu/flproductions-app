import React, { useEffect, useState } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { MessageComponent, MusicPlayer } from '../';
import { Toaster } from 'react-hot-toast';
import SessionPanel from '../users/SessionPanel';

interface Props {
    children: React.ReactNode;
}
function Layout({ children }: Props) {
    const produccionActual = useSelector(
        (state: RootState) => state.user.session.music.produccionActual
    );
    return (
        <div className="root-container">
            <Toaster />
            <Header />

            <main className="contenedor-main dark:bg-negro dark:text-blanco">
                {children}
            </main>
            <MessageComponent />
            {produccionActual && <MusicPlayer />}
            <Footer />
        </div>
    );
}

export default Layout;
