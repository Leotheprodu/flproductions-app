
import { DetalleProducciones, AppMusic, useHandleAppMusic, useProducciones_HTTP_Fetch } from "..";

export function ProduccionesDestacadasNosotros() {
    const [producciones_HTTP_Fetch] = useProducciones_HTTP_Fetch('http://localhost:5000/api/artistas/producciones');
    const produccionesDestacadas = producciones_HTTP_Fetch.filter(element => element.destacado === 1);
    
    const [playing, setPlaying, pause, setPause, infoProduccion, idCompActual, ended, setEnded, progressDuration, setprogressDuration, progress, setProgress, clickInfoButton, setClickInfoButton, selectedSong] = useHandleAppMusic();
    
    return(
        <div className="algunas-producciones">

            <h2>Algunas producciones hechas por nosotros</h2>

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
                    

            { playing &&
                <DetalleProducciones infoProduccion={infoProduccion}/>
            }
            

        </div>

    )


}