import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

interface Props {
    children: React.ReactNode;
}

function Layout({ children }: Props) {
    return (
        <div className="root-container">
            <Header />

            <main className="contenedor-main">{children}</main>

            <Footer />
        </div>
    );
}

export default Layout;
