
import { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { StyleList,GenreList, AppMusic, useHandleAppMusic, useProducciones_HTTP_Fetch, MetaInjector, ArtistList } from '../components';

export function Canciones() {
    const tipo_obra_general = 0
    // IMPORTAMOS LAS PRODUCCIONES DE LA BASE DE DATOS

    const [producciones_HTTP_Fetch] = useProducciones_HTTP_Fetch('api/artistas/producciones');
    const produccionesArtistas = producciones_HTTP_Fetch.filter(element => element.tipo_obra === tipo_obra_general);
    const produccionesDestacadas = produccionesArtistas.filter(element => element.destacado === 1);
    const [produccioneFiltradas, setProduccioneFiltradas] = useState(produccionesArtistas);

    useEffect(() => {
        if (producciones_HTTP_Fetch) {
            setProduccioneFiltradas(produccionesArtistas);
        }
      }, [producciones_HTTP_Fetch]);

    //ESTE HOOK MANEJA EL REPRODUCTOR DE AUDIO PARA QUE REPRODUZCA UNA CANCION A LA VEZ
    const [playing, setPlaying, pause, setPause, infoProduccion, idCompActual, ended, setEnded, progressDuration, setprogressDuration, progress, setProgress, clickInfoButton, setClickInfoButton, selectedSong] = useHandleAppMusic();
    
    return (
        
        
        <HelmetProvider>

            <MetaInjector
                title='Canciones'
                description='Musica de clientes del estudio FLProductions'
                type='website'
                url='https://flproductionscr.com/musica'
                image='https://flproductionscr.com/build_main/img/header-main.png'
                keywords='musica, artistas, destacados, producciones, music'
                robots='index, follow'
            />

            

                <div className='instrumentales__destacados'>

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
                    tipo_obra_general = {tipo_obra_general}
                    
                    
                />
                </div>
            <div className='contenedor-basic instrumentales'>

                <div className='canciones__filtros contenedor-basic center'>
                    <StyleList listadoCanciones={produccionesArtistas} tipo_obra_general={tipo_obra_general} setProduccioneFiltradas = {setProduccioneFiltradas} produccioneFiltradas={produccioneFiltradas}/>

                    <GenreList listadoCanciones={produccionesArtistas} tipo_obra_general={tipo_obra_general} setProduccioneFiltradas = {setProduccioneFiltradas} produccioneFiltradas={produccioneFiltradas}/>

                    <ArtistList listadoCanciones={produccionesArtistas} tipo_obra_general={tipo_obra_general} setProduccioneFiltradas = {setProduccioneFiltradas} produccioneFiltradas={produccioneFiltradas} />
                    
                </div>
                <div>

                    <h2>Toda la Musica</h2>

                </div>

                <AppMusic 
                    songArray={produccioneFiltradas}
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
                    tipo_obra_general = {tipo_obra_general}
                />
            </div>

        </HelmetProvider>


        
    )

}