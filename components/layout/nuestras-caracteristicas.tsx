import {
    IconBulb,
    IconThumbUp,
    IconHeartHandshake,
    IconPigMoney,
    IconGuitarPick,
    IconHeart,
} from '@tabler/icons';
import { useRef } from 'react';
import { InfoCard } from '..';

const InfoCardSize: number = 40;
const infoCardStroke: number = 2;

export function NuestrasCaracteristicas() {
    const ref = useRef(null);
    return (
        <div ref={ref} className="contenedor nuestras-caracteristicas">
            <div className="nuestras-caracteristicas__titulo">
                <h2>Nuestras Características</h2>
            </div>

            <div className="nuestras-caracteristicas__elemento">
                <InfoCard
                    icon={
                        <IconBulb size={InfoCardSize} stroke={infoCardStroke} />
                    }
                    titulo="CONOCIMIENTO"
                    texto="Nuestro orgullo radica en nuestro conocimiento constante e incesante en la industria musical. Gracias a él, podemos tomar decisiones precisas en la composición, mezcla, edición y selección de sonido. Además, nos encanta enseñar y compartir lo que sabemos, y siempre estamos abiertos a aprender de nuestros clientes en cada sesión"
                />
                <InfoCard
                    icon={
                        <IconThumbUp
                            size={InfoCardSize}
                            stroke={infoCardStroke}
                        />
                    }
                    titulo="SERVICIO PERSONALIZADO"
                    texto="Ofrecemos una amplia gama de servicios, pero si tienes necesidades específicas, estamos dispuestos a personalizar nuestra oferta para ajustarnos a tus requerimientos. ¡Trabajamos contigo para asegurarnos de que obtengas lo que necesitas!"
                />
                <InfoCard
                    icon={
                        <IconHeartHandshake
                            size={InfoCardSize}
                            stroke={infoCardStroke}
                        />
                    }
                    titulo="EXCELENCIA"
                    texto="En FLProductions somos fanáticos de la música y nos apasiona nuestro trabajo. Trabajamos duro en cada proyecto para crear experiencias musicales únicas y significativas para nuestros clientes. Siempre estamos buscando mejorar y encontrar nuevas ideas para seguir creando cosas especiales."
                />

                <InfoCard
                    icon={
                        <IconPigMoney
                            size={InfoCardSize}
                            stroke={infoCardStroke}
                        />
                    }
                    titulo="PRECIOS BAJOS"
                    texto="En FLProductions, nos esforzamos por ofrecer un servicio de alta calidad a precios accesibles. Nos enorgullece poder ofrecer precios competitivos, pero sin comprometer la excelencia de nuestro trabajo. ¡Te garantizamos que el resultado de nuestro servicio excederá tus expectativas, y a un precio que te sorprenderá agradablemente!"
                />
                <InfoCard
                    icon={
                        <IconGuitarPick
                            size={InfoCardSize}
                            stroke={infoCardStroke}
                        />
                    }
                    titulo="EQUIPO E INSTRUMENTOS"
                    texto="Para lograr un sonido impresionante, es fundamental tener acceso a instrumentos y equipo de alta calidad, y es aún más importante tener a alguien que sepa utilizarlos. En FLProductions, nos aseguramos de tener todo lo que necesitas para tus sesiones de grabación, incluyendo microfonos de calidad superior. Nuestro equipo de trabajo está compuesto por profesionales altamente capacitados para ayudarte a lograr el sonido perfecto, independientemente de tu género musical."
                />
                <InfoCard
                    icon={
                        <IconHeart
                            size={InfoCardSize}
                            stroke={infoCardStroke}
                        />
                    }
                    titulo="UN AMIGO MÁS"
                    texto="Nuestro estudio es más que un lugar para grabar, es un lugar donde la música y la amistad se unen. Nos encanta crear un ambiente acogedor y relajado para nuestros clientes, donde puedan sentirse cómodos y libres de expresarse. Además, nos esforzamos por ofrecer una experiencia única y divertida en cada sesión, por lo que es común que nuestros clientes se conviertan en amigos. ¡Ven a visitarnos y haz nuevos amigos mientras creamos música juntos!"
                />
            </div>
        </div>
    );
}
