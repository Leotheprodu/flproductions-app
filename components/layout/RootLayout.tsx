import React from 'react';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { Footer } from "./Footer";
import { Header } from "./Header";

interface Props {
    children: React.ReactNode;
}

function Layout({ children }: Props) {
    return (
        <div className='root-container'>
            <Header />


            <main className='contenedor-main'>

                {children}

            </main>
            {/* <div>
        <TawkMessengerReact
            propertyId="5803024f304e8e75855baa7f"
            widgetId="default" />
        </div> */}
            <Footer />
        </div>

    );
}

export default Layout;