import { useState, useEffect } from 'react';
import { DetalleProducciones, useHandleAppMusic } from '../../components';
import { PropsHead } from '../../components/helpers/HeadMetaInfo';
import Head from 'next/head';
import AppMusic from '../../components/app_music/AppMusic';

function InstrumentalDetail({ headInfo, producciones }) {
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
    const [produccionActual, setproduccionActual] = useState(null);
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
        if (producciones) {
            setproduccionActual(producciones);
        }
    }, [producciones]);

    if (!produccionActual) {
        return (
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        );
    }

    if (!produccionActual.length) {
        return <div>Lo sentimos, No se encontraron datos</div>;
    }

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
            <div className="contenedor songDetail__appmusic">
                <div>
                    <AppMusic
                        songArray={produccionActual}
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
                <DetalleProducciones
                    infoProduccion={produccionActual[0]}
                    tipo_obra_general={1}
                />
            </div>
        </>
    );
}

export default InstrumentalDetail;

export const getServerSideProps = async ({ query }) => {
    const { id } = query;
    const tipo_obra_general: number = 1;
    const res = await fetch(
        `${
            process.env.NODE_ENV === 'production'
                ? process.env.NEXT_PUBLIC_PROD_PRODUCCIONES
                : process.env.NEXT_PUBLIC_DEV_PRODUCCIONES
        }`
    );
    const data = await res.json();
    const producciones = data.producciones.filter(
        (element) =>
            element.tipo_obra === tipo_obra_general &&
            element.id === parseInt(id)
    );
    const produccion = producciones[0];
    const headInfo = {
        imgWidth: '400',
        imgHeight: '300',
        author: 'Leonardo Serrano',
        copyright: 'FLProductions',
        title: produccion.nombre + ' - ' + produccion.artista.nombre_artista,
        description: produccion.descripcion,
        type: 'website',
        url: `https://flproductionscr.com/instrumental/${id}`,
        image:
            `https://img.youtube.com/vi/${produccion.youtube_id}/mqdefault.jpg` ||
            'https://flproductionscr.com/build_main/img/header-main.png',
        keywords: `musica, artistas, destacados, producciones, music, ${produccion.nombre}, ${produccion.artista.nombre_artista}`,
        robots: 'index, follow',
    };

    return {
        props: {
            producciones,
            headInfo,
        },
    };
};
