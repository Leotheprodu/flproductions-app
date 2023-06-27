import React, { useState } from 'react';
import {
    IconDeviceTv,
    IconDeviceTvOff,
    IconPlayerPause,
    IconPlayerPlayFilled,
} from '@tabler/icons-react';
import ReactPlayer from 'react-player';
import { useHandleAppMusic, useHandleItemAppMusic } from '..';
import { useSelector } from 'react-redux';
import { RootState } from '../';
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
export const MusicPlayer = () => {
    const music = useSelector((state: RootState) => state.user.session.music);
    const [showVideo, setShowVideo] = useState(false);
    const [
        playing,
        setPlaying,
        pause,
        setPause,
        infoProduccion,
        idCompActual,
        ended,
        setEnded,
        progressDuration,
        setprogressDuration,
        progress,
        setProgress,
        clickInfoButton,
        setClickInfoButton,
        selectedSong,
    ] = useHandleAppMusic();
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
        <div className="MusicPlayer">
            <div
                className={`MusicPlayer__Reproductor ${
                    showVideo ? 'selected' : ''
                }`}
            >
                <ReactPlayer
                    className={`MusicPlayer__react-player`}
                    width="100%"
                    height="100%"
                    url={`https://www.youtube.com/watch?v=${music.produccionActual.youtube_id}`}
                    config={{
                        youtube: {
                            playerVars: { fs: 1 },
                        },
                    }}
                    ref={playerRef}
                    playing={playing}
                    onPause={() => setPause(true)}
                    onPlay={handlePlay}
                    onEnded={() => setEnded(true)}
                    onDuration={handleDuration}
                    onProgress={handleProgress}
                    volume={volume}
                />
            </div>
            <div className="MusicPlayer__Reproductor__buttoms">
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.25}
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="MusicPlayer__Reproductor__buttoms-volumen"
                />
                <button
                    type="button"
                    className="MusicPlayer__Reproductor__buttoms-playstop"
                    onClick={handlePlayButtonClick}
                >
                    {!pause && playing && !ended ? (
                        <IconPlayerPause />
                    ) : (
                        <IconPlayerPlayFilled />
                    )}
                </button>
                <div
                    className="MusicPlayer__Reproductor__buttoms__showVideo"
                    onClick={() => setShowVideo(!showVideo)}
                >
                    {showVideo ? <IconDeviceTvOff /> : <IconDeviceTv />}
                </div>
                <div className="MusicPlayer__Reproductor__buttoms-barra-de-progreso">
                    <div
                        className="MusicPlayer__Reproductor__buttoms-barra-de-progreso-fill"
                        style={{ width: `${progress * 100}%` }}
                    />
                    <div
                        className="MusicPlayer__Reproductor__buttoms-barra-de-progreso-derecha"
                        style={{ width: `${(1 - progress) * 100}%` }}
                    />
                    <p className="MusicPlayer__Reproductor__buttoms-progressduration">
                        {progressDuration}
                    </p>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={progress}
                        onChange={handleonChangeRange}
                        className="MusicPlayer__Reproductor__buttoms-barra-de-despazamiento"
                    />
                    <p className="MusicPlayer__Reproductor__buttoms-duration">
                        {duration}
                    </p>
                </div>
            </div>
        </div>
    );
};
