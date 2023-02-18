import { useState } from "react";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { useParams } from "react-router-dom"
import { DetalleProducciones, useProducciones_HTTP_Fetch, useHandleAppMusic, MetaInjector, AppMusic } from "..";

export const InstrumentalDetail = () => {
    const tipo_obra_general = 1
    const {id} = useParams();
    const [produccionActual, setproduccionActual] = useState(null);
    const [producciones_HTTP_Fetch] = useProducciones_HTTP_Fetch('api/artistas/producciones');
    const produccionesArtistas = producciones_HTTP_Fetch.filter(element => element.tipo_obra === tipo_obra_general);
    const [playing, setPlaying, pause, setPause, infoProduccion, idCompActual, ended, setEnded, progressDuration, setprogressDuration, progress, setProgress, clickInfoButton, setClickInfoButton, selectedSong] = useHandleAppMusic();


    useEffect(() => {
        if (produccionesArtistas) {
            setproduccionActual(produccionesArtistas.filter(element => element.id === parseInt(id)));
        }
    }, [producciones_HTTP_Fetch, id]);
    
    if (!produccionActual) {
        return <div className="lds-ring"><div></div><div></div><div></div><div></div></div>;
    }
    
    if (!produccionActual.length) {
        return <div>Lo sentimos, No se encontraron datos</div>;
    }
    
    return (
        <HelmetProvider>
            <MetaInjector

                title={`${produccionActual[0].nombre_artista} - ${produccionActual[0].nombre}`}
                description={produccionActual[0].descripcion}
                type='website'
                url={`https://flproductionscr.com/musica/artistas/${id}`}
                image='https://flproductionscr.com/build_main/img/header-main.png'
                keywords={`${produccionActual[0].nombre_artista}, ${produccionActual[0].nombre}, musica, Costa Rica`}
                robots='index, follow'

                />

            <div className="songDetail__appmusic">
                <div>

                    <AppMusic 
                            songArray={produccionActual}
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
                <DetalleProducciones infoProduccion={produccionActual[0]} tipo_obra_general={tipo_obra_general}/>
                
            </div>
        </HelmetProvider>
    );
}