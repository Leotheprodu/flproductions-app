import { IconBulb, IconThumbUp, IconHeartHandshake, IconPigMoney, IconGuitarPick, IconHeart } from '@tabler/icons';
import { useEffect, useRef } from 'react';
import { InfoCard } from "../components";


const InfoCardSize = 40
const infoCardStroke = 2

export function NuestrasCaracteristicas() {
    
    const ref = useRef(null);

    useEffect(() => {
        const ElementWithFX = ref.current;
        

        function mostrarScroll(){
            const scrollTop = document.documentElement.scrollTop;
            const alturaElemento = ElementWithFX.offsetTop;

            if (alturaElemento - 200 < scrollTop) {
            ElementWithFX.style.opacity = 1;
            ElementWithFX.classList.add('fxMostrarSkew');
            
            }
        }     
        if (ElementWithFX !== null){
            document.addEventListener('scroll',mostrarScroll);
        }
        
        return () => {
            document.removeEventListener('scroll',mostrarScroll);
        }

        
    },[]);

    return(
        
        <div ref={ref} className="contenedor nuestras-caracteristicas fxElement">

            <div className="nuestras-caracteristicas__elemento">
                <InfoCard 
                icon={
                    <IconBulb 
                    size={InfoCardSize} 
                    stroke={infoCardStroke}/>
                }
                titulo='CONOCIMIENTO'
                texto='La experiencia de la mano con el conocimiento que aumenta continuamente hacen que cada decisión que se toma, a nivel de composición, mezcla, edición, selección de sonido, etc; sean lo mas acertadas posible, además, nos encanta enseñar y compartir lo que sabemos, de seguro que en cada sesión ¡algo nuevo vas a aprender!'

                />
                <InfoCard 
                icon={
                    <IconThumbUp 
                    size={InfoCardSize} 
                    stroke={infoCardStroke}/>
                }
                titulo='SERVICIO PERSONALIZADO'
                texto='Nosotros ofrecemos algunos servicios, pero si usted necesita algo diferente, nosotros nos ajustamos a sus necesidades sin problemas.'
                

                />
                <InfoCard 
                icon={
                    <IconHeartHandshake 
                    size={InfoCardSize} 
                    stroke={infoCardStroke}/>
                }
                titulo='EXCELENCIA'
                texto='En FLProductions esto es lo mas importante, siempre tratamos de dar lo mejor de nosotros, es gratificante cuando haces lo que amas y nosotros amamos hacer música, siempre damos el 200%, porque trabajar en esto es algo que nos apasiona.'

                />



            </div>



            <div className="nuestras-caracteristicas__titulo">

                <h2>Nuestras Características</h2>
                <p>Esto es lo que nos hace diferentes.</p>


            </div>



            <div className="nuestras-caracteristicas__elemento">
            <InfoCard 
                icon={
                    <IconPigMoney 
                    size={InfoCardSize} 
                    stroke={infoCardStroke}/>
                }
                titulo='PRECIOS BAJOS'
                texto='En precios, definitivamente somos los mas bajos del mercado, ¡son tan bajos que te vas a sorprender!'

                />
                <InfoCard 
                icon={
                    <IconGuitarPick 
                    size={InfoCardSize} 
                    stroke={infoCardStroke}/>
                }
                titulo='EQUIPO E INSTRUMENTOS'
                texto='Nada mejor que tener los instrumentos y el equipo a mano cuando mas se necesita y lo mas importante alguien que sepa manejarlos, con nosotros puedes tener la certeza que nada nos falta y lo que tenemos es de la mejor calidad posible, el equipo de trabajo es lo mas profesional posible.'

                />
                <InfoCard 
                icon={
                    <IconHeart 
                    size={InfoCardSize} 
                    stroke={infoCardStroke}/>
                }
                titulo='UN AMIGO MÁS'
                texto='Algo interesante que nos ha pasado, es que todos nuestros clientes, han terminado siendo nuestros amigos, porque se pasa tan divertido en las sesiones, se disfruta tanto que definitivamente, la buena experiencia une a las personas. ¡ven y compruébalo!'

                />

                
            </div>

        </div>
        


    )


}