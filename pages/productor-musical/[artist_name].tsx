import { useState, useEffect } from 'react';
import { useHandleAppMusic, SocialIcons } from '../../components';
import { PropsHead } from '../../components/helpers/HeadMetaInfo';
import Head from 'next/head';
import AppMusic from '../../components/app_music/AppMusic';

function ProducerDetail({ artistafiltrado, headInfo, producciones }) {
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
    const [artistaActual, setArtistaActual] = useState(null);
    const produccionesArtista = producciones;

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

    useEffect(() => {
        if (artistafiltrado) {
            setArtistaActual(artistafiltrado);
        }
    }, [artistafiltrado]);

    if (!artistaActual) {
        return (
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        );
    }

    if (!artistaActual.length) {
        return <div>Lo sentimos, No se encontraron datos</div>;
    }

    const { nombre_artista, instagram, spotify, info } = artistaActual[0];

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
            <div className="contenedor">
                <div className="artist-detail__title">
                    <h1>{nombre_artista}</h1>

                    <SocialIcons
                        instagram={instagram}
                        claseCSS="artistdetail__socialicons"
                        size={35}
                        spotify={spotify}
                        stroke={1}
                        facebook=""
                        youtube=""
                        twitch=""
                    />
                </div>

                <div className="artistdetail__info">
                    <p>{info}</p>
                </div>

                <div className="artistdetail__music contenedor-basic">
                    <AppMusic
                        songArray={produccionesArtista}
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
                        tipo_obra_general={1}
                    />
                </div>
            </div>
        </>
    );
}

export default ProducerDetail;

export const getServerSideProps = async ({ query }) => {
    const { artist_name } = query;
    const res = await fetch(
        `${
            process.env.NODE_ENV === 'production'
                ? process.env.NEXT_PUBLIC_PROD_ARTISTAS
                : process.env.NEXT_PUBLIC_DEV_ARTISTAS
        }`
    );
    const data = await res.json();
    const artistafiltrado = data.artistas.filter(
        (element) =>
            element.nombre_artista.toLowerCase().replace(/\s+/g, '-') ===
            artist_name
    );
    const artista = artistafiltrado[0];
    const tipo_obra_general: number = 1;
    const res2 = await fetch(
        `${
            process.env.NODE_ENV === 'production'
                ? process.env.NEXT_PUBLIC_PROD_PRODUCCIONES
                : process.env.NEXT_PUBLIC_DEV_PRODUCCIONES
        }`
    );
    const data2 = await res2.json();
    const producciones = data2.producciones.filter(
        (element) =>
            element.tipo_obra === tipo_obra_general &&
            element.artista.id === artista.id
    );

    const headInfo = {
        imgWidth: '400',
        imgHeight: '300',
        author: 'Leonardo Serrano',
        copyright: 'FLProductions',
        type: 'website',
        url: `https://flproductionscr.com/productor-musical/${artist_name}`,
        title: artista.nombre_artista,
        description: artista.info,
        image:
            artista.imagen ||
            'https://flproductionscr.com/build_main/img/header-main.png',
        keywords: `musica, artistas,artista, cantante, Costa Rica, music, ${artista.nombre_artista}`,
        robots: 'index, follow',
    };

    return {
        props: {
            artistafiltrado,
            headInfo,
            producciones,
        },
    };
};
