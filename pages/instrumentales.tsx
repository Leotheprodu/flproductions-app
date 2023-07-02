import { useEffect, useState } from 'react';
import {
    StyleList,
    ArtistList,
    useHandleAppMusic,
    useProducciones_HTTP_Fetch,
    GenreList,
} from '../components';
import { PropsHead } from '../components/helpers/HeadMetaInfo';
import Head from 'next/head';
import AppMusic from '../components/app_music/AppMusic';

function Instrumentales({ headInfo }) {
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

    const tipo_obra_general: number = 1;
    const [producciones_HTTP_Fetch] = useProducciones_HTTP_Fetch(
        process.env.NEXT_PUBLIC_PROD_PRODUCCIONES,
        process.env.NEXT_PUBLIC_DEV_PRODUCCIONES
    );
    const produccionesArtistas = producciones_HTTP_Fetch.filter(
        (element) =>
            element.tipo_obra === tipo_obra_general && element.status === 1
    );
    const [produccioneFiltradas, setProduccioneFiltradas] =
        useState(produccionesArtistas);

    useEffect(() => {
        if (producciones_HTTP_Fetch) {
            setProduccioneFiltradas(produccionesArtistas);
        }
    }, [producciones_HTTP_Fetch]);

    const [
        playing,
        setPlaying,
        pause,
        setPause,
        infoProduccion,
        idCompActual,
        ended,
        setEnded,
        progressDuration,
        setprogressDuration,
        progress,
        setProgress,
        clickInfoButton,
        setClickInfoButton,
        selectedSong,
    ] = useHandleAppMusic();

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

            <div className="instrumentales">
                <div className="canciones__filtros contenedor-basic contenedor">
                    <StyleList
                        listadoCanciones={produccionesArtistas}
                        tipo_obra_general={tipo_obra_general}
                        setProduccioneFiltradas={setProduccioneFiltradas}
                        produccioneFiltradas={produccioneFiltradas}
                    />

                    <GenreList
                        listadoCanciones={produccionesArtistas}
                        setProduccioneFiltradas={setProduccioneFiltradas}
                        produccioneFiltradas={produccioneFiltradas}
                    />

                    <ArtistList
                        listadoCanciones={produccionesArtistas}
                        tipo_obra_general={tipo_obra_general}
                        setProduccioneFiltradas={setProduccioneFiltradas}
                        produccioneFiltradas={produccioneFiltradas}
                    />
                </div>

                <div className="contenedor-basic contenedor">
                    <AppMusic
                        songArray={produccioneFiltradas}
                        playing={playing}
                        infoProduccion={infoProduccion}
                        selectedSong={selectedSong}
                        idComp={2}
                        idCompActual={idCompActual}
                        pause={pause}
                        setPause={setPause}
                        ended={ended}
                        setEnded={setEnded}
                        setPlaying={setPlaying}
                        progressDuration={progressDuration}
                        setprogressDuration={setprogressDuration}
                        progress={progress}
                        setProgress={setProgress}
                        clickInfoButton={clickInfoButton}
                        setClickInfoButton={setClickInfoButton}
                        tipo_obra_general={tipo_obra_general}
                    />
                </div>
            </div>
        </>
    );
}

export default Instrumentales;

export const getServerSideProps = async () => {
    const headInfo = {
        imgWidth: '400',
        imgHeight: '300',
        author: 'Leonardo Serrano',
        copyright: 'FLProductions',
        title: 'Instrumentales',
        description: 'Musica de clientes del estudio FLProductions',
        type: 'website',
        url: 'https://flproductionscr.com/instrumentales',
        image: `${process.env.NEXT_PUBLIC_PROD_LINK}/build_main/img/header-main.png`,
        keywords: 'musica, artistas, destacados, producciones, music',
        robots: 'index, follow',
    };

    return {
        props: {
            headInfo,
        },
    };
};
