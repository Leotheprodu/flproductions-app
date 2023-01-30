import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ProduccionesDestacadasNosotros, GaleriaDeImagenes, PalabrasDelEquipo, SimpleText, Testimonio } from '../components';
import { DetalleProducciones, ListadoProducciones } from "../components";
import { useArtistasBD, useProduccionesArtistasBD } from '../components/hooks/useFetchBD';
import ReactPlayer from 'react-player';
export function Musica() {

    const {produccionesArtistas} = useProduccionesArtistasBD('http://localhost:5000/api/artistas/producciones');
    const {artistas} = useArtistasBD('http://localhost:5000/api/artistas');



    const produccionesDestacadas = produccionesArtistas.filter(element => element.destacado === 1);
    const [infoProduccion, setInfoProduccion ] = useState({});
    const [onClick, setonClick] = useState(false);
    

    const selectedSong = (song) => {
        const {nombre, descripcion, id_artista, spotify_link, youtube_id} = song
        setonClick(true);
        const artistaItem = artistas.find(element => element.id === id_artista).nombre;
        const instagramLink = artistas.find(element => element.id === id_artista).instagram;

        setInfoProduccion({
            nombre,
            descripcion,
            spotify_link,
            youtube_id,
            artistaItem,
            instagramLink
        });

        
        
    };

    return (
        
        <>
            <HelmetProvider>

                <Helmet>
                    <title>FLProductions | Musica</title>
                    <meta name="description" content="Musica de Clientes del estudio FLProductions." />
                    <meta property="og:title" content="FLProductions | Musica" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://flproductionscr.com/musica" />
                    <meta property="og:image" content="https://flproductionscr.com/build_main/img/header-main.png" />
                    <meta property="og:image:width" content="400" />
                    <meta property="og:image:height" content="300" />
                </Helmet>

                <div className='contenedor-basic center'>
                    <SimpleText
                        tipo={1}
                        titulo='Musica de nuestros clientes'

                    />
                    
                    <p>Encuentra aqui toda la musica que graban nuestros clientes.</p>
                    
                </div>
                { onClick &&
                    <div className='player-wrapper reproductor-musica'>
                        <ReactPlayer 
                            className='react-player'
                            width='100%'
                            height='100%'
                            url= {`https://www.youtube.com/watch?v=${infoProduccion.youtube_id}`}
                            controls = 'true'
                            
                        />
                    </div>
                }
                

                <div className='contenedor-basic'>
                    <h2>Destacados</h2>
                <ListadoProducciones songArray={produccionesDestacadas} selectedSong={selectedSong}/>

                <h2>Toda la Musica</h2>
                <ListadoProducciones songArray={produccionesArtistas} selectedSong={selectedSong}/>
                </div>

                <div className='nosotros__testimonios'>

                    
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#ffffff" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>





            </HelmetProvider>


        </>
    )

}