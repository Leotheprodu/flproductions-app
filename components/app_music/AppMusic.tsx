import { useHandleItemAppMusic, ItemAppMusic } from '..';

interface Props {
    songArray: any;
    playing: boolean;
    infoProduccion: any;
    selectedSong: any;
    idComp: number;
    idCompActual: number;
    pause: boolean;
    setPause: Function;
    ended: boolean;
    setEnded: Function;
    setPlaying: Function;
    progressDuration: number;
    setprogressDuration: Function;
    progress: number;
    setProgress: Function;
    clickInfoButton: any;
    setClickInfoButton: Function;
    tipo_obra_general: number;
}

interface HookItem {
    duration: string;
    volume: number;
    setVolume: Function;
    playerRef: any;
    handlePlayButtonClick: any;
    handlePlay: any;
    handleDuration: any;
    handleonChangeRange: any;
    handleProgress: any;
    handleInfoButton: any;
}

export const AppMusic = ({
    songArray,
    playing,
    infoProduccion,
    selectedSong,
    idComp,
    idCompActual,
    pause,
    setPause,
    ended,
    setEnded,
    setPlaying,
    progressDuration,
    setprogressDuration,
    progress,
    setProgress,
    clickInfoButton,
    setClickInfoButton,
    tipo_obra_general,
}: Props) => {
    const {
        duration,
        volume,
        setVolume,
        playerRef,
        handlePlayButtonClick,
        handlePlay,
        handleDuration,
        handleonChangeRange,
        handleProgress,
        handleInfoButton,
    }: HookItem = useHandleItemAppMusic({
        setPlaying,
        setEnded,
        setClickInfoButton,
        playing,
        setPause,
        setProgress,
        setprogressDuration,
        clickInfoButton,
    });
    return (
        <div className="AppMusic contenedor">
            {songArray.map((song) => (
                <ItemAppMusic
                    infoProduccion={infoProduccion}
                    /* cosas para el video */
                    playing={playing}
                    handlePlay={handlePlay}
                    handleDuration={handleDuration}
                    playerRef={playerRef}
                    handleProgress={handleProgress}
                    volume={volume}
                    setPause={setPause}
                    tipo_obra_general={tipo_obra_general}
                    selectedSong={selectedSong}
                    idComp={idComp}
                    idCompActual={idCompActual}
                    pause={pause}
                    ended={ended}
                    setEnded={setEnded}
                    progressDuration={progressDuration}
                    progress={progress}
                    clickInfoButton={clickInfoButton}
                    song={song}
                    handleInfoButton={handleInfoButton}
                    setVolume={setVolume}
                    handlePlayButtonClick={handlePlayButtonClick}
                    handleonChangeRange={handleonChangeRange}
                    duration={duration}
                    key={song.id}
                />
            ))}
        </div>
    );
};
