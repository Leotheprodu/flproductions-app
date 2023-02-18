import ReactPlayer from "react-player"
import { BotonesAppMusic } from "../app_music/BotonesAppMusic"



export const BeatPlayer = ({infoProduccion,playing,handlePlay,handleDuration,playerRef,handleProgress,setPause, clickInfoButton, handleInfoButton, handleStopButtonClick, volume, setVolume, handlePlayButtonClick, pause, progressDuration, progress, handleonChangeRange, duration}) => {
    return (
        <div className="beat_player">
            <div>
            {/* <ReactPlayer
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


                    /> */}
            </div>
            <div>algun texto</div>
            {/* <BotonesAppMusic 
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
                    /> */}

        </div>
    )
}
