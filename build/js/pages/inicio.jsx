import React from 'react';
import { renderRoot } from "../main";
import { Header } from '../components/header';
import { InfoCard } from '../components/info-card';
import { IconVideo, IconMicrophone, IconZoomMoney } from '@tabler/icons';

const tamano = 40
const grosor = 2


export function InicioRender() {

  renderRoot.render(

    <React.StrictMode>
  
      <Header imgName="header-main.png" pagina="inicio"/>
  
      <div className='contenedor'>
        <div className='inicio_info1'>
          <h1>Estudio de grabación y producción musical</h1>

          <p>Desde Siquirres de Limón, Costa Rica, ofrecemos un servicio profesional de grabación y producción musical, queremos ofrecerte todo lo que necesitas para que tu proyecto musical sea todo un éxito.</p>
        </div>

        

        <div className='inicio_info1_servicios-cards'>
          <InfoCard 
            icon={
              <IconMicrophone 
              className='inicio_info1_servicios-cards_icon' 
              size={tamano} 
              stroke={grosor}
              />
            }
            titulo='GRABACIÓN Y PRODUCCIÓN MUSICAL'
            
            texto='Con mas de 10 años de experiencia ofreciendo grabaciones profesionales, producción de instrumentales, mezcla y masterización cristalina, potente, siempre actualizada, al máximo volumen y de alta calidad. Hacemos que cada proyecto siempre llegue al próximo nivel. Trabajamos de todo tipo de género musical.'

          />
          <InfoCard 
            icon={
              <IconZoomMoney 
              className='inicio_info1_servicios-cards_icon' 
              size={tamano} 
              stroke={grosor}
              />
            }
            titulo='MARKETING Y PUBLICIDAD MUSICAL'
            
            texto={'Te asesoramos y ayudamos a: Distribuir tu musica en plataformas virtuales, que tu música llegue a miles de personas, alcanzar tus metas en redes sociales, generar ingresos con tu música, mucho más.'}

          />
              <InfoCard 
                icon={
                  <IconVideo 
                    className='inicio_info1_servicios-cards_icon' 
                    size={tamano} 
                    stroke={grosor}
                  />
                }
                titulo='FOTOGRAFÍA Y PRODUCCIÓN AUDIOVISUAL'
                
                texto='Contamos con equipos modernos que graban en 4K, luces, maquina de humo, estabilizadores, lentes, drone y un equipo de personas que trabajan con excelencia, además contamos con fotógrafos apasionados que te harán lucir como el artista que eres.'
    
              />
          
        </div>{/* cards */}
      </div>{/* info1 */}

      <div className='contenedor'>
        <div className='inicio_info1'>
          <h3>Acerca de Nosotros</h3>

          <p>
            Somos algo más que sólo un estudio de grabación en Costa Rica, no nos limitamos a hacer únicamente nuestro trabajo, queremos que en cada proyecto, cada canción lleve nuestro ADN, damos siempre lo mejor de nosotros y definitivamente hacer esto, es nuestra misión de vida.
          </p>

        </div>
        <div className='inicio_mensaje-leo'>
          <div className='inicio_mensaje-leo_foto'>

            <img src="build\img\leo-serrano1.png" alt="leotheprodu" />

          </div>
          <div>
            <h4>¡Hola!</h4>
            <p className='inicio_mensaje-leo_parrafo-principal'>
              "Éste soy yo, Leo, soy el productor y fundador del estudio FLProductions. A través de los años me he dado cuenta que lo que hace diferente al estudio de todos los demás, definitivamente no es el hardware, ni las instalaciones, es el conocimiento que continuamente lo estoy actualizando y con mas de 15 años de experiencia siempre tratamos de emplearlo de la mejor manera en cada proyecto, cada canción se hace con amor, dandole la importancia que se merece y eso es lo que quiero que ustedes obtengan de mi."
            </p>

            <p>
              Gracias por motivarme a ser mejor cada día y siempre a dar lo mejor de mí.        
            </p>

            <div className='inicio_mensaje-leo_firma'>
              <img className='inicio_mensaje-leo_firma-firma' src="build\img\leoserrano-signature.png" alt="leofirma" />
              <div>
                <p>Leo Serrano</p>

                <p className='inicio_mensaje-leo_firma_titulo'>Productor Musical</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      
  
    </React.StrictMode>
  )

}