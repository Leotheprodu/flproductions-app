import {
    GaleriaDeImagenes,
    PalabrasDelEquipo,
    SimpleText,
    Testimonio,
    DetalleProducciones,
    useHandleAppMusic,
    useProducciones_HTTP_Fetch,
} from '../components';
import { PropsHead } from '../components/helpers/HeadMetaInfo';
import Head from 'next/head';
import { Suspense } from 'react';
import { lazy } from 'react';
const AppMusic = lazy(() => import('../components/app_music/AppMusic'));

function AboutPage({ headInfo }) {
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
    const tipo_obra_general: number = 0;
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
    const producciones = produccionesDestacadas.filter(
        (element) => element.id === parseInt(infoProduccion.id)
    );

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
                <SimpleText
                    tipo={1}
                    titulo="Acerca de Nosotros"
                    texto={
                        <>
                            <p>
                                ¿Alguna vez te has preguntado cómo algunas de
                                las mejores canciones de la música urbana vienen
                                a la vida? En FLProductions, estamos detrás de
                                ese proceso creativo y artístico. Fundado por
                                Leo Serrano en 2009, nuestro estudio de
                                grabación ha sido testigo de cómo la tecnología
                                ha impulsado la creación musical.
                            </p>

                            <p>
                                Leo, un músico apasionado, buscaba una manera de
                                hacer de su amor por la música una carrera. Fue
                                así como descubrió AudioJungle y comenzó a
                                vender su música en línea. Pero su camino tomó
                                un giro inesperado cuando unos vecinos raperos
                                le pidieron que grabara sus canciones. Este fue
                                el inicio de una aventura que nunca ha dejado de
                                crecer.
                            </p>

                            <p>
                                A lo largo de los años, hemos trabajado con
                                artistas de todos los géneros y hemos ayudado a
                                crear algunas de las mejores canciones urbanas.
                                Y aunque ha pasado más de una década, seguimos
                                motivados por la misma pasión que nos llevó a
                                empezar. ¡Ven y forma parte de la historia de
                                FLProductions!
                            </p>
                        </>
                    }
                />
                <PalabrasDelEquipo
                    titulo={'¡Hola!'}
                    texto="Soy Leo, el creador y productor detrás de FLProductions. Después de años en la industria musical, he aprendido que lo que nos separa de los demás estudios no es el equipo o las instalaciones, sino la constante actualización de conocimiento y la experiencia de más de 15 años en el campo. Trabajamos con dedicación y amor en cada proyecto, asegurándonos de brindarle la importancia que se merece. Espero que, a través de mi trabajo, puedan sentir la pasión que pongo en cada canción. Gracias por motivarme a ser mejor cada día y por permitirme dar lo mejor de mí."
                    nombre="Leo Serrano"
                    puesto="Productor Musical"
                    foto="https://flproductionscr.com/build_main/img/leo-serrano1.png"
                    firma="https://flproductionscr.com/build_main/img/leoserrano-signature.png"
                />
            </div>

            <div className="nosotros__testimonios">
                <Testimonio />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path
                        fill="#ffffff"
                        fillOpacity="1"
                        d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </div>

            <div className="contenedor">
                <div className="algunas-producciones">
                    <h2>Algunas producciones hechas por nosotros</h2>
                    <Suspense fallback={<Loading />}>
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
                    </Suspense>

                    {!ended && playing && (
                        <DetalleProducciones
                            infoProduccion={producciones[0]}
                            tipo_obra_general={tipo_obra_general}
                        />
                    )}
                </div>
            </div>

            <div className="contenedor">
                <GaleriaDeImagenes />
            </div>
        </>
    );
}
export default AboutPage;

export const getServerSideProps = async () => {
    const headInfo = {
        imgWidth: '400',
        imgHeight: '300',
        author: 'Leonardo Serrano',
        copyright: 'FLProductions',
        title: 'Nosotros',
        description:
            'Conoce mas acerca de nosotros, el estudio de grabación y produccion musical FLProductions',
        type: 'website',
        url: 'https://flproductionscr.com/nosotros',
        image: 'https://flproductionscr.com/build_main/img/header-main.png',
        keywords:
            'musica, artistas, estudio de grabacion, produccion musical, acerca de nosotros, nosotros',
        robots: 'index, follow',
    };

    return {
        props: {
            headInfo,
        },
    };
};
function Loading() {
    return <h2>🌀 Loading...</h2>;
}
