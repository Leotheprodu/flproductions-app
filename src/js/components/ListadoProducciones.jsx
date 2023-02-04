import { IconPlayerPause, IconPlayerPlay, IconPlayerStop } from "@tabler/icons";
import { useRef } from "react";
import { useState } from "react";
import ReactPlayer from 'react-player';




export const ListadoProducciones = ({songArray, playing, infoProduccion, selectedSong, idComp, idCompActual, pause, setPause, ended, setEnded, setPlaying, progressDuration, setprogressDuration, progress, setProgress, durationSeconds, setdurationSeconds}) => {

    const [duration, setDuration] = useState('');
    const playerRef = useRef(null);

    const handleStopButtonClick = (e) => {
        e.preventDefault()
        setPlaying(!playing);
        setEnded(true);
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
        setdurationSeconds(seconds);
        setDuration(`${minutes}:${formattedSeconds}`);

    }
    const handleonChangeRange = (e) => {
        playerRef.current.seekTo(e.target.value * playerRef.current.getDuration())
        const segundos = () => progress * durationSeconds
        console.log(segundos);
        const minutes = Math.floor(segundos / 60);
        const remainingSeconds = (segundos % 60) - 1;
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

        setprogressDuration(`${minutes}:${formattedSeconds}`);
    }



    return (
        <div className="algunas-producciones__botones">

            {
                
                songArray.map(song => (
                    
                    <div onClick={ () => selectedSong(song, idComp, ended) } className={`algunas-producciones__boton ${song.id === infoProduccion.id && idComp === idCompActual && !ended ? "selected" : ""}`} key={ song.id }> 
                            { 
                                song.id === infoProduccion.id && idComp === idCompActual && !ended &&
                                <div className='player-wrapper'>
                                    
                                    <ReactPlayer 
                                        className='react-player'
                                        width='100%'
                                        height='100%'
                                        url= {`https://www.youtube.com/watch?v=${infoProduccion.youtube_id}`}
                                        playing = {playing}
                                        onPause = { () => setPause(true) }
                                        onPlay = { handlePlay }
                                        onEnded = {() => setEnded(true) }
                                        onDuration = { handleDuration }
                                        ref={playerRef}
                                        onProgress={({ played }) => setProgress(played)}
                                        
                                    />
                                </div>
                                
                            } 
                            { song.id !== infoProduccion.id &&
                            <img src={`https://img.youtube.com/vi/${song.youtube_id}/mqdefault.jpg`} alt={ `imagen de ${song.nombre}` } />

                            }

                            { song.id === infoProduccion.id && idComp !== idCompActual &&
                            <img src={`https://img.youtube.com/vi/${song.youtube_id}/mqdefault.jpg`} alt={ `imagen de ${song.nombre}` } />
                            
                            }
                            { song.id === infoProduccion.id && idComp === idCompActual && ended &&
                            <img src={`https://img.youtube.com/vi/${song.youtube_id}/mqdefault.jpg`} alt={ `imagen de ${song.nombre}` } />
                            
                            }

                        <div className="algunas-producciones__texto">
                            <p className="texto-1">{ song.nombre }</p>
                            <p className="texto-2">{ song.nombre_artista }</p>


                            

                                {
                                    song.id === infoProduccion.id && idComp === idCompActual && !ended &&
                                    <div className="algunas-producciones__repbutton">
                                        <button 
                                            className="boton-stop-listadoproducciones"
                                            onClick={handleStopButtonClick}
                                            
                                        >
                                            <IconPlayerStop  />
                                        </button>
                                        <button 
                                            className="boton-playstop-listadoproducciones"
                                            onClick={handlePlayButtonClick}
                                            
                                        >

                                            {!pause ? <IconPlayerPause/> : <IconPlayerPlay/>}
                                        </button>
                                        <p className="progressduration-listadoproducciones">{progressDuration}</p>
                                        <input 
                                            type="range" 
                                            min={0} 
                                            max={1} 
                                            step={0.01} 
                                            value={progress} 
                                            onChange={handleonChangeRange} 
                                            />
                                            <p className="duration-listadoproducciones">{duration}</p>
                                    </div>
                                }
                                
                            

                        </div>
                    </div>
                    
                ))
            }
        </div>
    )
}