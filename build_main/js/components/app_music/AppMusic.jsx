import { useHandleItemAppMusic, ItemAppMusic } from "..";

export const AppMusic = ({songArray, playing, infoProduccion, selectedSong, idComp, idCompActual, pause, setPause, ended, setEnded, setPlaying, progressDuration, setprogressDuration, progress, setProgress, clickInfoButton, setClickInfoButton }) => {
    
const [duration, volume, setVolume, playerRef, handleStopButtonClick, handlePlayButtonClick, handlePlay, handleDuration, handleonChangeRange, handleProgress, handleInfoButton] = useHandleItemAppMusic(setPlaying, setEnded, setClickInfoButton, playing, setPause, setProgress, setprogressDuration, clickInfoButton)

    return (
        
        <div className="AppMusic">

            {
                
                
                songArray.map(song => (

                    <ItemAppMusic
                        playing = {playing}
                        infoProduccion = {infoProduccion}
                        selectedSong = {selectedSong}
                        idComp = {idComp}
                        idCompActual = {idCompActual}
                        pause = {pause}
                        setPause = {setPause}
                        ended = {ended}
                        setEnded = {setEnded}
                        progressDuration = {progressDuration}
                        progress = {progress}
                        clickInfoButton = {clickInfoButton}
                        song = {song}
                        handlePlay = {handlePlay}
                        handleDuration = {handleDuration}
                        playerRef = {playerRef}
                        handleProgress = {handleProgress}
                        volume = {volume}
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