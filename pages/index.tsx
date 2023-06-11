import React from 'react';
import { BannerSlider, SimpleText, InicioLinkCards } from '../components';
import { mainBannerSlider } from '../components/database_temp/database';
import { PropsHead } from '../components/helpers/HeadMetaInfo';
import Head from 'next/head';

function Home({ headInfo }) {
    const {
        imgWidth,
        imgHeight,
        author,
        copyright,
        title,
        description,
        type,
        url,
        image,
        keywords,
        robots,
    }: PropsHead = headInfo;
    return (
        <>
            <Head>
                <title>{`${title} | FLProductions`}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="robots" content={robots} />
                <meta name="author" content={author} />
                <meta name="copyright" content={copyright} />
                <meta property="og:description" content={description} />
                <meta
                    property="og:title"
                    content={`${title} | FLProductions`}
                />
                <meta property="og:type" content={type} />
                <meta property="og:url" content={url} />
                <meta property="og:image" content={image} />
                <meta property="og:image:width" content={imgWidth} />
                <meta property="og:image:height" content={imgHeight} />
            </Head>
            <BannerSlider datos={mainBannerSlider} />

            <div className="contenedor">
                <SimpleText
                    tipo={1}
                    titulo="FLProductions, la app para Artistas y Productores musicales de Costa Rica!"
                    texto={
                        <p>
                            Bienvenidos a Flproductions, la app para musicos,
                            Artista, DJs, Productores de Costa Rica. Una
                            comunidad creada para conectar el talento musical de
                            Costa Rica.
                        </p>
                    }
                />
                <InicioLinkCards />
            </div>
            {/* info1 */}
        </>
    );
}

export default Home;

export const getServerSideProps = async () => {
    const headInfo = {
        imgWidth: '400',
        imgHeight: '300',
        author: 'Leonardo Serrano',
        copyright: 'FLProductions',
        title: 'Inicio',
        description:
            'FLProductions tu app para artistas y productores de Costa Rica, comparte, escucha, mira los videos, aprende con tutoriales, instrumentales, stream de sesiones, etc',
        type: 'website',
        url: 'https://flproductionscr.com/',
        image: 'https://flproductionscr.com/build_main/img/header-main.png',
        keywords:
            'musica, artistas, estudio de grabacion, produccion musical, beats, costa rica',
        robots: 'index, follow',
    };

    return {
        props: {
            headInfo,
        },
    };
};
