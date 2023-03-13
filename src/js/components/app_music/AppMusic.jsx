import { useHandleItemAppMusic, ItemAppMusic } from "..";

export const AppMusic = ({songArray, playing, infoProduccion, selectedSong, idComp, idCompActual, pause, setPause, ended, setEnded, setPlaying, progressDuration, setprogressDuration, progress, setProgress, clickInfoButton, setClickInfoButton, tipo_obra_general }) => {

const [duration, volume, setVolume, playerRef, handleStopButtonClick, handlePlayButtonClick, handlePlay, handleDuration, handleonChangeRange, handleProgress, handleInfoButton] = useHandleItemAppMusic(setPlaying, setEnded, setClickInfoButton, playing, setPause, setProgress, setprogressDuration, clickInfoButton)

    return (
        
        <div className="AppMusic contenedor">

            {
                
                
                songArray.map(song => (

                    <ItemAppMusic
                    infoProduccion = {infoProduccion}
                        /* cosas para el video */
                        playing = {playing}
                        handlePlay = {handlePlay}
                        handleDuration = {handleDuration}
                        playerRef = {playerRef}
                        handleProgress = {handleProgress}
                        volume = {volume}
                        setPause = {setPause}
                        tipo_obra_general = {tipo_obra_general}
                        selectedSong = {selectedSong}
                        idComp = {idComp}
                        idCompActual = {idCompActual}
                        pause = {pause}
                        ended = {ended}
                        setEnded = {setEnded}
                        progressDuration = {progressDuration}
                        progress = {progress}
                        clickInfoButton = {clickInfoButton}
                        song = {song}
                        handleInfoButton = {handleInfoButton}
                        handleStopButtonClick = {handleStopButtonClick}
                        setVolume = {setVolume}
                        handlePlayButtonClick = {handlePlayButtonClick}
                        handleonChangeRange = {handleonChangeRange}
                        duration = {duration}
                        key={song.id}
                        />
                    
                ))
                
            
            }
        </div>
    )
}