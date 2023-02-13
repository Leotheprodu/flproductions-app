import { useState } from "react";
import { useRef } from "react";

export const useHandleItemAppMusic = (setPlaying, setEnded, setClickInfoButton, setprogressDuration, setPause, playing, setProgress, clickInfoButton) => {

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

    return [
        duration, setDuration,
        volume, setVolume,
        playerRef,
        handleStopButtonClick,
        handlePlayButtonClick,
        handlePlay,
        handleDuration,
        handleonChangeRange,
        handleProgress,
        handleInfoButton,
        



    ]
}