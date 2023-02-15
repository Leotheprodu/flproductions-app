
import { HelmetProvider } from 'react-helmet-async';
import { SimpleText, AppMusic, useHandleAppMusic, useProducciones_HTTP_Fetch, MetaInjector } from '../components';

export function Musica() {

    // IMPORTAMOS LAS PRODUCCIONES DE LA BASE DE DATOS

    const [producciones_HTTP_Fetch] = useProducciones_HTTP_Fetch('https://flproductionscr.com/api/artistas/producciones' );
    const produccionesArtistas = producciones_HTTP_Fetch.filter(element => element.tipo_obra === 0);
    const produccionesDestacadas = produccionesArtistas.filter(element => element.destacado === 1);

    //ESTE HOOK MANEJA EL REPRODUCTOR DE AUDIO PARA QUE REPRODUZCA UNA CANCION A LA VEZ
    const [playing, setPlaying, pause, setPause, infoProduccion, idCompActual, ended, setEnded, progressDuration, setprogressDuration, progress, setProgress, clickInfoButton, setClickInfoButton, selectedSong] = useHandleAppMusic();
    
    return (
        
        
        <HelmetProvider>

            <MetaInjector
                title='Musica'
                description='Musica de clientes del estudio FLProductions'
                type='website'
                url='https://flproductionscr.com/musica'
                image='https://flproductionscr.com/build_main/img/header-main.png'
                keywords='musica, artistas, destacados, producciones, music'
                robots='index, follow'
            />

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

        </HelmetProvider>


        
    )

}