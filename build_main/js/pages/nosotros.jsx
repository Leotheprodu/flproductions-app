import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AlgunasProducciones, GaleriaDeImagenes, PalabrasDelEquipo, SimpleText, Testimonio } from '../components';

export function AboutPage () {

  return(

    <>
      <HelmetProvider>

        <Helmet>
          <title>FLProductions | Nosotros</title>
          <meta name="description" content="Conoce mas acerca de nosotros, el estudio de grabación y produccion musical FLProductions." />
          <meta property="og:title" content="FLProductions | Nosotros" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://flproductionscr.com/nosotros" />
          <meta property="og:image" content="https://flproductionscr.com/build_main/img/header-main.png" />
          <meta property="og:image:width" content="400" />
          <meta property="og:image:height" content="300" />
        </Helmet>

        <div className='contenedor'>
          <SimpleText 
            tipo={1} 
            titulo='Acerca de Nosotros' 
            texto={<><p>En el año 2009, Leo Serrano el fundador del estudio de grabación y la marca FLProductions estaba muy influenciado por la creación de la música a través de la tecnología computacional, para este tiempo ya tenía muchos años como músico, en aquel momento empezó a buscar la forma de ganarse el sustento de su familia, por medio de ese "hobbie" que más amaba, La música.</p> 

            <p>Buscando por internet posibilidades se encontró con a la plataforma AudioJungle, donde empezó a subir su música y donde pronto encontró un medio por el cual vender su música y se propuso hacerlo a tiempo completo, poco tiempo después, unos vecinos, raperos (Gran George, JX3, Likupatt), le hablaron de la necesidad de que alguien les grabe sus canciones y es ahí donde Leo decidió grabarlos y poco a poco fueron llegando nuevos clientes, la pasión por la música no tiene limites y hasta hoy en día, seguimos trabajando con aquella motivación como la de hace mas de 10 años.</p></> }
          
          />
          <PalabrasDelEquipo 
            titulo={'¡Que tal mi gente!'}

            texto='Éste soy yo, Leo, soy el productor y fundador del estudio FLProductions. A través de los años me he dado cuenta que lo que hace diferente al estudio de todos los demás, definitivamente no es el hardware, ni las instalaciones, es el conocimiento que continuamente lo estoy actualizando y con mas de 15 años de experiencia siempre tratamos de emplearlo de la mejor manera en cada proyecto, cada canción se hace con amor, dandole la importancia que se merece y eso es lo que quiero que ustedes obtengan de mi. ¡Gracias por motivarme a ser mejor cada día, lo que siempre me hace dar lo mejor de mí!'
            nombre='Leo Serrano'
            puesto='Productor Musical'
            foto='build_main\img\leo-serrano1.png'
            firma='build_main\img\leoserrano-signature.png'
          />
        </div>

        <div className='nosotros__testimonios'>
        
          <Testimonio />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        

        

        <div className='contenedor'>
          <AlgunasProducciones />
        </div>

        <div className='contenedor'>
          <GaleriaDeImagenes />
        </div>
          
        




      </HelmetProvider>
        
      
    </>
  )

}