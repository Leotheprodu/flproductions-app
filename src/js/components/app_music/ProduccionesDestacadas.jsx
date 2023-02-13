
import { useState } from "react";
import { DetalleProducciones, AppMusic } from "..";
import { useProducciones_HTTP_Fetch } from "../hooks/useFetchBD";


export function ProduccionesDestacadasNosotros() {
    const {producciones_HTTP_Fetch} = useProducciones_HTTP_Fetch('http://localhost:5000/api/artistas/producciones');
    const produccionesDestacadas = producciones_HTTP_Fetch.filter(element => element.destacado === 1);
    const [playing, setPlaying] = useState(false);
    const [pause, setPause] = useState(false);
    

    const [infoProduccion, setInfoProduccion ] = useState({});
    const [idCompActual, setidCompActual ] = useState(null);
    const [ended, setEnded] = useState(false);
    const [progressDuration, setprogressDuration] = useState('0:00');
    const [progress, setProgress] = useState(0);
    const [clickInfoButton, setClickInfoButton] = useState(false);

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
        clickInfoButton && setClickInfoButton(!clickInfoButton);

        
        
    };
    
    
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