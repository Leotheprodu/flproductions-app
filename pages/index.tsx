import React from 'react';
import { BannerSlider, SimpleText, InicioLinkCards } from '../components';
import { mainBannerSlider } from '../components/database_temp/database';
import { PropsHead } from '../components/helpers/HeadMetaInfo';
import Head from 'next/head';
import Link from 'next/link';

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
                    titulo="FLProductions, Estudio de Grabación y Producción Musical en Costa Rica"
                    texto={
                        <p>
                            Bienvenidos a FLProductions, somos un estudio de
                            Grabación y producción Musical de Costa Rica, con
                            mas de 15 años de experiencia,{' '}
                            <Link href={'/estudio'}>
                                click aqui para mas información
                            </Link>
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
            'Somos un estudio de Grabación y producción Musical de Costa Rica, con mas de 15 años de experiencia',
        type: 'website',
        url: 'https://flproductionscr.com/',
        image: `${process.env.NEXT_PUBLIC_PROD_LINK}/build_main/img/header-main.png`,
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
