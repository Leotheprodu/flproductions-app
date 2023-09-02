import React from 'react';
/* import { Suspense } from 'react';
import { lazy } from 'react';
const AppMusic = lazy(() => import('../components/app_music/AppMusic')); */
import { useEffect, useState } from 'react';
import {
    StyleList,
    GenreList,
    useHandleAppMusic,
    useProducciones_HTTP_Fetch,
    ArtistList,
} from '../components';
import { PropsHead } from '../components/helpers/HeadMetaInfo';
import Head from 'next/head';
import AppMusic from '../components/app_music/AppMusic';

function Canciones({ headInfo }) {
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
    // IMPORTAMOS LAS PRODUCCIONES DE LA BASE DE DATOS

    const [producciones_HTTP_Fetch] = useProducciones_HTTP_Fetch(
        process.env.NEXT_PUBLIC_PROD_PRODUCCIONES,
        process.env.NEXT_PUBLIC_DEV_PRODUCCIONES
    );
    const produccionesArtistas = producciones_HTTP_Fetch.filter(
        (element) => element.tipo_obra === tipo_obra_general
    );
    const produccionesDestacadas = produccionesArtistas.filter(
        (element) => element.destacado === 1
    );
    const [produccioneFiltradas, setProduccioneFiltradas] =
        useState(produccionesArtistas);

    useEffect(() => {
        if (producciones_HTTP_Fetch) {
            setProduccioneFiltradas(produccionesArtistas);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [producciones_HTTP_Fetch]);
    //ESTE HOOK MANEJA EL REPRODUCTOR DE AUDIO PARA QUE REPRODUZCA UNA CANCION A LA VEZ
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

            <div className="canciones contenedor">
                <div className="instrumentales__destacados ">
                    <div className="contenedor">
                        <h2>Destacados</h2>
                    </div>

                    <AppMusic
                        songArray={produccionesDestacadas}
                        playing={playing}
                        infoProduccion={infoProduccion}
                        selectedSong={selectedSong}
                        idComp={1}
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
                <div className="contenedor-basic instrumentales contenedor">
                    <div className="canciones__filtros contenedor-basic center">
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

export default Canciones;

export const getServerSideProps = async () => {
    const headInfo = {
        imgWidth: '400',
        imgHeight: '300',
        author: 'Leonardo Serrano',
        copyright: 'FLProductions',
        title: 'Canciones',
        description: 'Musica de clientes del estudio FLProductions',
        type: 'website',
        url: 'https://flproductionscr.com/canciones',
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
