import React from 'react';
import { HeadMetaInfo } from '../components/helpers/HeadMetaInfo';
import { IconVideo, IconMicrophone, IconZoomMoney } from '@tabler/icons';
import { BannerSlider, PalabrasDelEquipo, SimpleText, InfoCard, NuestrasCaracteristicas } from '../components';
import { mainBannerSlider } from '../components/database_temp/database';

const InfoCardSize: number = 40
const infoCardStroke: number = 2

function Index() {

    return (
        <>
            <HeadMetaInfo
                title='Inicio'
                description='Estudio de grabación y producción musical en Costa Rica. Ofrecemos un enfoque personalizado y profesional para ayudar a artistas y músicos a realizar sus proyectos. Visítanos para saber más'
                type='website'
                url='https://flproductionscr.com/'
                image='https://flproductionscr.com/build_main/img/header-main.png'
                keywords='musica, artistas, estudio de grabacion, produccion musical, beats, costa rica'
                robots='index, follow'
            />
            <BannerSlider
                datos={mainBannerSlider}
            />

            <div className='contenedor'>
                <SimpleText
                    tipo={1}
                    titulo='FLProductions: Tu Destino para Grabaciones y Producción Musical de Alta Calidad'
                    texto={<p>Bienvenida a FLProductions, su estudio de grabación musical de alta calidad dirigido por LeotheProdu. Ofrecemos una amplia gama de servicios musicales, incluyendo la producción de instrumentales, grabaciones, mezclas y masterizaciones con la tecnología de vanguardia y un equipo altamente capacitado. Nuestros ingenieros de sonido, compositores y productores son expertos en lograr un sonido profesional único y de alta calidad. Reserva su sesión de grabación con LeotheProdu y experimenta la diferencia en calidad en FLProductions.</p>}
                />

                <div className='inicio_info1_servicios-cards'>
                    <InfoCard
                        icon={
                            <IconMicrophone
                                size={InfoCardSize}
                                stroke={infoCardStroke} />
                        }
                        titulo='Grabaciones y Producción Musical de Alta Calidad en FLProductions'
                        texto='Nuestra experiencia de más de 10 años en la industria musical se traduce en grabaciones profesionales de alta calidad, producción de instrumentales, mezclas y masterizaciones cristalinas y potentes. Mantenemos nuestros equipos y procesos actualizados para garantizar resultados sobresalientes en cada proyecto, independientemente del género musical. Eleva tu música al siguiente nivel con FLProductions.'

                    />
                    <InfoCard
                        icon={
                            <IconZoomMoney
                                size={InfoCardSize}
                                stroke={infoCardStroke} />
                        }
                        titulo='Marketing y Publicidad Musical para impulsar tu carrera'
                        texto={'En FLProductions, te brindamos asesoramiento y apoyo en la distribución de tu música en plataformas virtuales, para que llegue a un público más amplio. Además, te ayudamos a alcanzar tus metas en redes sociales y generar ingresos con tu música. Te brindamos todo lo que necesitas para impulsar tu carrera musical y alcanzar el éxito.'}

                    />
                    <InfoCard
                        icon={
                            <IconVideo
                                size={InfoCardSize}
                                stroke={infoCardStroke}
                            />}
                        titulo='Fotografía y Producción Audiovisual de Alta Calidad'
                        texto='Contamos con un equipo de profesionales altamente capacitados en fotografía y producción audiovisual. Nuestros equipos modernos graban en 4K y contamos con luces, maquina de humo, estabilizadores, lentes, drone y un equipo de personas que trabajan con excelencia. Te aseguramos que lucirás como el artista que eres.'

                    />

                </div>{/* cards */}
            </div>{/* info1 */}

            <div className='contenedor acerca-de-nosotros'>
                <SimpleText
                    tipo={2}
                    titulo='Acerca de Nosotros - Más que un estudio de grabación'
                    texto={<p>Somos un equipo apasionado por la música y la producción de audio. En FLProductions, nos dedicamos a hacer más que sólo grabaciones en Costa Rica. Para nosotros, cada proyecto es una oportunidad para dejar nuestra huella en la música y dar lo mejor de nosotros. Queremos que cada canción lleve nuestro ADN y transmita nuestro compromiso con la calidad y la excelencia. Es nuestra misión de vida, y es con este espíritu que trabajamos para brindar a nuestros clientes la confianza de saber que están en buenas manos.</p>}
                />

                <PalabrasDelEquipo
                    titulo={'¡Bienvenidos a FLProductions!'}

                    texto='Soy Leo, el apasionado productor y fundador de FLProductions. Con más de 15 años de experiencia en el mundo musical, he descubierto que lo que nos hace únicos no son solo nuestro hardware o software, sino nuestra pasión por el arte de la música y la dedicación a aplicar todo lo que hemos aprendido en cada proyecto. Aquí en FLProductions, amamos lo que hacemos y eso se siente en cada nota que producimos. Gracias por inspirarnos a ser mejores cada día y por permitirnos dar lo mejor de nosotros en cada canción. ¡Estamos emocionados de trabajar contigo y dar vida a tus visiones musicales!'
                    nombre='Leo Serrano'
                    puesto='Productor Musical'
                    foto='https://flproductionscr.com/build_main/img/leo-serrano1.webp'
                    firma='https://flproductionscr.com/build_main/img/leoserrano-signature.webp'
                />

            </div>{/* seccion 2 Acerca de Nosotros */}
            <div className='inicio__Caracteristicas'>
                <NuestrasCaracteristicas />
            </div>
        </>

    )
}

export default Index;