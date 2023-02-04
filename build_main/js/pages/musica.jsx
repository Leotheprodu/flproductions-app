
import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { SimpleText } from '../components';
import { ListadoProducciones } from "../components";
import { useProduccionesArtistasBD } from '../components/hooks/useFetchBD';




export function Musica() {

    const {produccionesArtistas} = useProduccionesArtistasBD('http://localhost:5000/api/artistas/producciones');
    const produccionesDestacadas = produccionesArtistas.filter(element => element.destacado === 1);
    const [playing, setPlaying] = useState(false);
    const [pause, setPause] = useState(false);

    const [infoProduccion, setInfoProduccion ] = useState({});
    const [idCompActual, setidCompActual ] = useState(null);
    const [ended, setEnded] = useState(false);
    const [progressDuration, setprogressDuration] = useState('0:00');
    const [progress, setProgress] = useState(0);
    

    const selectedSong = (song, idComp) => {
        const {id, nombre, descripcion, nombre_artista, instagram, spotify_link, youtube_id} = song
        !playing && setPlaying(true)
        setInfoProduccion({
            nombre,
            descripcion,
            spotify_link,
            youtube_id,
            nombre_artista,
            instagram,
            id,
        });
        setidCompActual(idComp);
        playing && setEnded(false);

        
        

        
        
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
                

                <div className='contenedor-basic'>
                    <div>
                    <h2>Destacados</h2>
                    </div>
                    <ListadoProducciones 
                        songArray={produccionesDestacadas}
                        playing ={playing}
                        infoProduccion={infoProduccion}
                        selectedSong = {selectedSong}
                        idComp = {1}
                        idCompActual = {idCompActual}
                        pause ={pause}
                        setPause ={setPause}
                        ended = {ended}
                        setEnded = {setEnded}
                        setPlaying = {setPlaying}
                        progressDuration = {progressDuration}
                        setprogressDuration = {setprogressDuration}
                        progress = {progress}
                        setProgress = {setProgress}
                        
                        
                        />
                    <div>
                    <h2>Toda la Musica</h2>

                    </div>
                    <ListadoProducciones 
                        songArray={produccionesArtistas}
                        playing ={playing}
                        infoProduccion={infoProduccion}
                        selectedSong = {selectedSong}
                        idComp = {2}
                        idCompActual = {idCompActual}
                        pause ={pause}
                        setPause ={setPause}
                        ended = {ended}
                        setEnded = {setEnded}
                        setPlaying = {setPlaying}
                        progressDuration = {progressDuration}
                        setprogressDuration = {setprogressDuration}
                        progress = {progress}
                        setProgress = {setProgress}
                    />
                </div>

                <div className='Informacion-adicional-musicapage'>
                    <SimpleText titulo='Conoce Algunos de nuestros Clientes'/>
                </div>



            </HelmetProvider>


        </>
    )

}