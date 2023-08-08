import Link from 'next/link';
import React from 'react';

export const InicioLinkCards = () => {
    return (
        <div className="contenedor InicioLinkCards">
            <Link href="/canciones">
                <div className="InicioLinkCards__Card">
                    <img
                        src={`${process.env.NEXT_PUBLIC_PROD_LINK}/build_main/img/perfil/avatar/6.webp`}
                        alt="imagen de tarjeta para escuchar musica"
                    />
                    <p>Música</p>
                </div>
            </Link>
            <Link href="/instrumentales">
                <div className="InicioLinkCards__Card">
                    <img
                        src={`${process.env.NEXT_PUBLIC_PROD_LINK}/build_main/img/banners/pages/panel-de-control.webp`}
                        alt="imagen de tarjeta para escuchar musica"
                    />
                    <p>Beats</p>
                </div>
            </Link>
            <Link href="/panel-de-control">
                <div className="InicioLinkCards__Card">
                    <img
                        src={`${process.env.NEXT_PUBLIC_PROD_LINK}/build_main/img/Portada-pagina-leotheprodu.webp`}
                        alt="imagen de tarjeta para escuchar musica"
                    />
                    <p>Ingresar</p>
                </div>
            </Link>
        </div>
    );
};
