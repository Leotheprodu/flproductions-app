import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import {
    ControlPanel,
    PropsHead,
    CrearArtistaForm,
    RootState,
    EditarArtista,
    ArtistMusicHandle,
} from '../../components';
import { useSelector } from 'react-redux';

function Artista({ headInfo }) {
    const [artista, setArtista] = useState(null);
    const artistas = useSelector(
        (state: RootState) => state.user.session.artista
    );

    useEffect(() => {
        if (Array.isArray(artistas)) {
            setArtista(artistas.find((artist) => artist.tipo === 0) ?? null);
        }
    }, [artistas]);
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
        <ControlPanel>
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
            <div className="Panel-de-control__Artista">
                {!artista && (
                    <div className="Panel-de-control__Artista__elemento">
                        <CrearArtistaForm tipo={0} />
                    </div>
                )}
                {artista && (
                    <div className="Panel-de-control__Artista__elemento">
                        <EditarArtista artista={artista} />
                    </div>
                )}
                <ArtistMusicHandle artista={artista} />
            </div>
        </ControlPanel>
    );
}
export default Artista;

export const getServerSideProps = async () => {
    const headInfo = {
        imgWidth: '400',
        imgHeight: '300',
        author: 'Leonardo Serrano',
        copyright: 'FLProductions',
        title: 'Configuracion de Artista',
        description:
            'Pagina de configuracion de los artistas de FLProductions Costa Rica',
        type: 'website',
        url: 'https://flproductionscr.com/panel-de-control/artista',
        image: 'https://flproductionscr.com/build_main/img/header-main.png',
        keywords:
            'panel de control, artista, usuarios, flproductions, music, Costa Rica',
        robots: 'index, follow',
    };

    return {
        props: {
            headInfo,
        },
    };
};
