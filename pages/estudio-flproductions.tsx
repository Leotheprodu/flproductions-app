import { IconVideo, IconMicrophone, IconZoomMoney } from '@tabler/icons';
import {
    GaleriaDeImagenes,
    PalabrasDelEquipo,
    InfoCard,
    SimpleText,
    Testimonio,
    NuestrasCaracteristicas,
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
    const InfoCardSize: number = 40;
    const infoCardStroke: number = 2;
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
        <main>
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
                <div className="inicio_info1_servicios-cards">
                    <InfoCard
                        icon={
                            <IconMicrophone
                                size={InfoCardSize}
                                stroke={infoCardStroke}
                            />
                        }
                        titulo="Grabaciones y Producción Musical de Alta Calidad en FLProductions"
                        texto="Nuestra experiencia de más de 10 años en la industria musical se traduce en grabaciones profesionales de alta calidad, producción de instrumentales, mezclas y masterizaciones cristalinas y potentes. Mantenemos nuestros equipos y procesos actualizados para garantizar resultados sobresalientes en cada proyecto, independientemente del género musical. Eleve su música al siguiente nivel con FLProductions."
                    />
                    <InfoCard
                        icon={
                            <IconZoomMoney
                                size={InfoCardSize}
                                stroke={infoCardStroke}
                            />
                        }
                        titulo="Marketing y Publicidad Musical para impulsar tu carrera"
                        texto={
                            'En FLProductions, le brindamos asesoramiento y apoyo en la distribución de tu música en plataformas virtuales, para que llegue a un público más amplio. Además, te ayudamos a alcanzar tus metas en redes sociales y generar ingresos con tu música. Te brindamos todo lo que necesitas para impulsar su carrera musical y alcanzar el éxito.'
                        }
                    />
                    <InfoCard
                        icon={
                            <IconVideo
                                size={InfoCardSize}
                                stroke={infoCardStroke}
                            />
                        }
                        titulo="Fotografía y Producción Audiovisual de Alta Calidad"
                        texto="Contamos con un equipo de profesionales altamente capacitados en fotografía y producción audiovisual. Nuestros equipos modernos graban en 4K y contamos con luces, maquina de humo, estabilizadores, lentes, drone y un equipo de personas que trabajan con excelencia. Le aseguramos que lucirás como el artista que realmente eres."
                    />
                </div>
                <SimpleText
                    tipo={1}
                    titulo="Algo de Historia"
                    texto={
                        <>
                            <p>
                                ¿Te has preguntado cómo algunas de las mejores
                                canciones de la música vienen a la vida? en
                                FLProductions, estamos seguros de estar detrás
                                de ese proceso creativo y artístico, nuestro
                                trabajo es basicamente hacer realidad tus ideas,
                                envueltas en nuestro propio estilo, trayendo a
                                la vida producciones, de alta calidad. El
                                estudio fue fundado por Leo Serrano en el 2009,
                                nuestro estudio de grabación ha sido testigo de
                                cómo la tecnología, conocimiento y el disfrute
                                del proceso ha impulsado la creación musical.
                            </p>

                            <p>
                                vamos un poco mas atras... El productor musical
                                o mejor dicho yo, Leo Serrano, un músico
                                apasionado, buscaba una manera de hacer de vivir
                                de esto (la música). Fue así como descubrí
                                AudioJungle (una pagina web para vender música
                                royalty free). viendo que la cosa
                                funcionaba...renuncié al trabajo y decidí
                                intentarlo con mas fuerza, poco a poco logré
                                obtener algunos ingresos y en su momento me
                                llegaron unos vecinos raperos y me pidieron que
                                grabara sus canciones...Y este fue el inicio de
                                una aventura que nunca ha dejado de crecer.
                            </p>

                            <p>
                                A lo largo de los años, hemos trabajado con
                                artistas de todos los géneros y hemos ayudado a
                                crear algunas canciones increíbles. Aunque ha
                                pasado más de una década, seguimos motivados por
                                la misma pasión que nos llevó a empezar. ¡Ven y
                                forma parte de la historia de FLProductions!
                            </p>
                        </>
                    }
                />
                <PalabrasDelEquipo
                    titulo={'Algo sobre mi...'}
                    texto="Soy 100% Tico, cedula 7, Siquirreño de Corazón, aprendí a tocar oficialmente mi primer instrumento a los 11 (la Batería),
                    toco algunos instrumentos más como el bajo, la guitarra eléctrica y acústica, piano, estuve en algunas bandas de rock y de iglesia,
                    me encanta producir musica, y más cuando lo hago para alguien que le apasiona hacerlo tambien. por otro lado, estudie administracion de Empresas,
                    y trabajé por 5 años en una empresa, (trabajos de administración), pero prefiero la música, seguro al 1000%... me encanta aprender
                    a diario lo hago, por ejemplo me ha dado por aprender a desarrollar aplicaciones web, y esta pagina es la prueba de eso jaja, pero bueno aqui lo importante
                    es que soy una persona común, con muchas ganas de salir adelante, con estas ganas de hacer musica que nunca termina, y quiero trabajar con usted. 
                    "
                    nombre="Leo Serrano"
                    puesto="Productor Musical"
                    foto="https://flproductionscr.com/build_main/img/leo-serrano1.png"
                    firma="https://flproductionscr.com/build_main/img/leoserrano-signature.png"
                />
            </div>

            <div className="inicio__Caracteristicas">
                <NuestrasCaracteristicas />
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
        </main>
    );
}
export default AboutPage;

export const getServerSideProps = async () => {
    const headInfo = {
        imgWidth: '400',
        imgHeight: '300',
        author: 'Leonardo Serrano',
        copyright: 'FLProductions',
        title: 'Estudio',
        description:
            'Estudio de grabación y producción musical en Costa Rica. Ofrecemos un enfoque personalizado y profesional para ayudar a artistas y músicos a realizar sus proyectos. Visítanos para saber más',
        type: 'website',
        url: 'https://flproductionscr.com/nosotros',
        image: 'https://flproductionscr.com/build_main/img/header-main.png',
        keywords:
            'musica, artistas, estudio de grabacion, produccion musical, acerca de nosotros, nosotros, instrumentales, beats',
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
