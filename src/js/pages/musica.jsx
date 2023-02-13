
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { SimpleText, AppMusic, useHandleAppMusic, useProducciones_HTTP_Fetch } from '../components';

export function Musica() {

    // IMPORTAMOS LAS PRODUCCIONES DE LA BASE DE DATOS

    const {producciones_HTTP_Fetch} = useProducciones_HTTP_Fetch('http://localhost:5000/api/artistas/producciones' );
    const produccionesArtistas = producciones_HTTP_Fetch.filter(element => element.tipo_obra === 0);
    const produccionesDestacadas = produccionesArtistas.filter(element => element.destacado === 1);

    //ESTE HOOK MANEJA EL REPRODUCTOR DE AUDIO PARA QUE REPRODUZCA UNA CANCION A LA VEZ
    const [playing, setPlaying, pause, setPause, infoProduccion, idCompActual, ended, setEnded, progressDuration, setprogressDuration, progress, setProgress, clickInfoButton, setClickInfoButton, selectedSong] = useHandleAppMusic();
    
    return (
        
        <>
            <HelmetProvider>

                <Helmet>
                    <title>FLProductions | Musica</title>
                    <meta name="description" content="Musica de Clientes del estudio FLProductions." />
                    <meta property="og:description" content="Musica de Clientes del estudio FLProductions." />
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
                    <AppMusic 
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
                        clickInfoButton ={clickInfoButton}
                        setClickInfoButton ={setClickInfoButton}
                        
                        
                        />
                    <div>
                    <h2>Toda la Musica</h2>

                    </div>
                    <AppMusic 
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
                        clickInfoButton ={clickInfoButton}
                        setClickInfoButton ={setClickInfoButton}
                    />
                </div>

                <div className='Informacion-adicional-musicapage'>
                    <SimpleText titulo='Conoce Algunos de nuestros Clientes'/>
                </div>



            </HelmetProvider>


        </>
    )

}