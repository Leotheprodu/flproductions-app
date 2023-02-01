import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { SimpleText } from '../components';
import { ListadoProducciones } from "../components";
import { useProduccionesArtistasBD } from '../components/hooks/useFetchBD';
import ReactPlayer from 'react-player';
import { useRef } from 'react';


export function Musica() {

    const {produccionesArtistas} = useProduccionesArtistasBD('http://localhost:5000/api/artistas/producciones');



    const produccionesDestacadas = produccionesArtistas.filter(element => element.destacado === 1);
    const [infoProduccion, setInfoProduccion ] = useState({});
    const [onClick, setonClick] = useState(false);
    
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const playerRef = useRef(null);

    const selectedSong = (song) => {
        const {id, nombre, descripcion, nombre_artista, instagram, spotify_link, youtube_id} = song
        setonClick(true);

        setInfoProduccion({
            nombre,
            descripcion,
            spotify_link,
            youtube_id,
            nombre_artista,
            instagram,
            id
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
                            playing = {playing}
                            ref={playerRef}
                            onProgress={({ played }) => setProgress(played)}
                            
                        />
                        
                        
                    </div>
                }
                

                <div className='contenedor-basic'>
                    <div>
                    <h2>Destacados</h2>
                    </div>
                    <ListadoProducciones 
                        songArray={produccionesDestacadas} 
                        selectedSong={selectedSong} 
                        selectedSongId ={infoProduccion.id}
                        playing={playing} 
                        setPlaying={setPlaying} 
                        progress={progress} 
                        playerRef={playerRef}
                    />
                    <div>
                    <h2>Toda la Musica</h2>

                    </div>
                    <ListadoProducciones 
                        songArray={produccionesArtistas} 
                        selectedSong={selectedSong} 
                        selectedSongId ={infoProduccion.id}
                        playing={playing} 
                        setPlaying={setPlaying} 
                        progress={progress} 
                        playerRef={playerRef}
                    />
                </div>

                <div className='Informacion-adicional-musicapage'>
                    <SimpleText titulo='Conoce Algunos de nuestros Clientes'/>
                </div>



            </HelmetProvider>


        </>
    )

}