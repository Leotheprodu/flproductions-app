import { IconDotsVertical, IconMicrophone, IconPlayerPause, IconPlayerPlay, IconPlayerStop, IconPlaylist } from "@tabler/icons";
import { useEffect, useRef } from "react";
import { useState } from "react";
import ReactPlayer from 'react-player';
import { Link } from "react-router-dom";




export const ListadoProducciones = ({songArray, playing, infoProduccion, selectedSong, idComp, idCompActual, pause, setPause, ended, setEnded, setPlaying, progressDuration, setprogressDuration, progress, setProgress, clickInfoButton, setClickInfoButton }) => {
    


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
    const handleFullScreen = () => {

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
                                        config={{
                                            youtube: {
                                                playerVars: { fs: 1 }
                                            },}}
                                        playing = {playing}
                                        onPause = { () => setPause(true) }
                                        onPlay = { handlePlay }
                                        onEnded = {() => setEnded(true) }
                                        onDuration = { handleDuration }
                                        ref={playerRef}
                                        onProgress={handleProgress}
                                        volume={volume}

                                        
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
                                        {
                                            clickInfoButton && 
                                            <div className="elementos-info-reproductor" >
                                                <ul>
                                                    <li>
                                                    <IconPlaylist color="#1ab5e6"/>
                                                        <Link to={`producciones/${infoProduccion.id}`}>informacion de la cancion</Link>
                                                    </li>
                                                    <li>
                                                    <IconMicrophone color="#1ab5e6"/>
                                                        <Link to={`artistas/${infoProduccion.nombre_artista}`}>informacion del artista</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        }
                                        <button
                                            onClick={handleInfoButton}
                                            className="boton-info-reproductor"
                                        >

                                        <IconDotsVertical />
                                        </button>
                                        <button 
                                            className="boton-stop-listadoproducciones"
                                            onClick={handleStopButtonClick}
                                            
                                        >
                                            <IconPlayerStop  />
                                        </button>
                                        <input
                                            type="range"
                                            min={0}
                                            max={1}
                                            step={0.25}
                                            value={volume}
                                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                                            className= "control-volumen-listadoproducciones"
                                        />
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
                                            className ="barra-de-despazamiento-listadoproducciones"
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