
import { IconPlayerPlayFilled } from '@tabler/icons-react';
import ReactPlayer from 'react-player';
import { BotonesAppMusic } from '..';

export const ItemAppMusic = ({ playing, infoProduccion, selectedSong, idComp, idCompActual, pause, setPause, ended, setEnded, progressDuration, progress, clickInfoButton, song, handlePlay, handleDuration, playerRef, handleProgress, volume, handleInfoButton, handleStopButtonClick, setVolume, handlePlayButtonClick, handleonChangeRange, duration, tipo_obra_general }) => {

    return (


        <div onClick={() => selectedSong(song, idComp, ended)} className={`ItemAppMusic ${song.id === infoProduccion.id && idComp === idCompActual && !ended ? "selected" : ""}`}>
            {
                song.id === infoProduccion.id && idComp === idCompActual && !ended &&

                <div className='ItemAppMusic__player-wrapper'>

                    <ReactPlayer
                        className='ItemAppMusic__react-player'
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
            <div className='ItemAppMusic__imagen'>
                <div className='ItemAppMusic__playboton'>
                    <IconPlayerPlayFilled size={60}/>
                </div>
                <img src={`https://img.youtube.com/vi/${song.youtube_id}/mqdefault.jpg`} alt={`imagen de ${song.nombre}`} />
            </div>}
            <div className="ItemAppMusic__texto">

                <div className='ItemAppMusic__texto__titulo'>
                    <p className="ItemAppMusic__texto-1">{song.nombre}</p>
                    {
                    tipo_obra_general === 0 &&
                    <p className="ItemAppMusic__texto-2">{`${song.nombre_artista}`}</p>
                }
                    
                </div>
                {
                    tipo_obra_general === 1 &&
                    <p className="ItemAppMusic__texto-3">{song.genero}</p>
                }


            </div>

            {
                song.id === infoProduccion.id && idComp === idCompActual && !ended &&
                <div className='ItemAppMusic__botones'>
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
                        tipo_obra_general={tipo_obra_general}
                        />
                </div>
                
            }



            
        </div>
    )

}