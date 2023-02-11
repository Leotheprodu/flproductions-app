import { useRef } from "react";
import { useState } from "react";
import { ItemAppMusic } from "./ItemAppMusic";

export const AppMusic = ({songArray, playing, infoProduccion, selectedSong, idComp, idCompActual, pause, setPause, ended, setEnded, setPlaying, progressDuration, setprogressDuration, progress, setProgress, clickInfoButton, setClickInfoButton }) => {
    


    const [duration, setDuration] = useState('0:00');
    const playerRef = useRef(null);
    const [volume, setVolume] = useState(0.5);


    const handleStopButtonClick = (e) => {
        e.preventDefault()
        setPlaying(false);
        setEnded(true);
        setClickInfoButton(false);
    };

    const handlePlayButtonClick = (e) => {
        e.preventDefault()
        setPlaying(!playing);
        setEnded(false);
    };
    const handlePlay = () => {
        setPause(false)
        setEnded(false)

    }

    const handleDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = (seconds % 60) - 1;
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
        setDuration(`${minutes}:${formattedSeconds}`);

    }
    const handleonChangeRange = (e) => {
        playerRef.current.seekTo(e.target.value * playerRef.current.getDuration())
    }

    const handleProgress = ({played, playedSeconds}) => {
        setProgress(played);
        let minutes = 0;
        const remainingSeconds = Math.ceil(playedSeconds % 60) % 60;
        if (playedSeconds < 59 && minutes === 0) {
        minutes = Math.floor(playedSeconds / 60);
        } else if (remainingSeconds === 0 && minutes === 0 && playedSeconds > 0) {
            minutes = Math.floor(playedSeconds / 60) + 1;
        }else if (remainingSeconds === 0 && playedSeconds >= 60) {
            minutes = Math.floor(playedSeconds / 60) + 1;
        } else {
            minutes = Math.floor(playedSeconds / 60);
        }
        
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

        setprogressDuration(`${minutes}:${formattedSeconds}`);
        

    }
    const handleInfoButton = () => {
        setClickInfoButton(!clickInfoButton)

    }


    return (
        
        <div className="algunas-producciones__botones">

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