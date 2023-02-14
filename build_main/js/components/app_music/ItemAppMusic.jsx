
import ReactPlayer from 'react-player';
import { BotonesAppMusic } from '..';

export const ItemAppMusic = ({ playing, infoProduccion, selectedSong, idComp, idCompActual, pause, setPause, ended, setEnded, progressDuration, progress, clickInfoButton, song, handlePlay, handleDuration, playerRef, handleProgress, volume, handleInfoButton, handleStopButtonClick, setVolume, handlePlayButtonClick, handleonChangeRange, duration }) => {

    return (


        <div onClick={() => selectedSong(song, idComp, ended)} className={`algunas-producciones__boton ${song.id === infoProduccion.id && idComp === idCompActual && !ended ? "selected" : ""}`}>
            {
                song.id === infoProduccion.id && idComp === idCompActual && !ended &&

                <div className='player-wrapper'>

                    <ReactPlayer
                        className='react-player'
                        width='100%'
                        height='100%'
                        url={`https://www.youtube.com/watch?v=${infoProduccion.youtube_id}`}
                        config={{
                            youtube: {
                                playerVars: { fs: 1 }
                            },
                        }}
                        playing={playing}
                        onPause={() => setPause(true)}
                        onPlay={handlePlay}
                        onEnded={() => setEnded(true)}
                        onDuration={handleDuration}
                        ref={playerRef}
                        onProgress={handleProgress}
                        volume={volume}


                    />
                </div>

            }
            {(song.id !== infoProduccion.id || (song.id === infoProduccion.id && idComp !== idCompActual) || (song.id === infoProduccion.id && idComp === idCompActual && ended)) && 
            <img src={`https://img.youtube.com/vi/${song.youtube_id}/mqdefault.jpg`} alt={`imagen de ${song.nombre}`} />}

            <div className="algunas-producciones__texto">


                <p className="texto-1">{song.nombre}</p>
                <p className="texto-2">{song.nombre_artista}</p>




                {
                    song.id === infoProduccion.id && idComp === idCompActual && !ended &&
                    <BotonesAppMusic 
                        clickInfoButton={clickInfoButton}
                        infoProduccion={infoProduccion}
                        handleInfoButton={handleInfoButton}
                        handleStopButtonClick={handleStopButtonClick}
                        volume={volume}
                        setVolume={setVolume}
                        handlePlayButtonClick={handlePlayButtonClick}
                        pause={pause}
                        progressDuration={progressDuration}
                        progress={progress}
                        handleonChangeRange={handleonChangeRange}
                        duration={duration}
                    />
                    
                }



            </div>
        </div>
    )

}