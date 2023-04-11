import { useState } from "react";
import { useRef } from "react";

interface Props{
    setPlaying: Function
    setEnded: Function
    setClickInfoButton: Function
    playing: boolean
    setPause: Function
    setProgress: Function
    setprogressDuration: Function
    clickInfoButton: any
}



export const useHandleItemAppMusic = ({setPlaying, setEnded, setClickInfoButton, playing, setPause, setProgress, setprogressDuration, clickInfoButton}: Props) => {

    const [duration, setDuration] = useState<string>('0:00');
    const playerRef = useRef(null);
    const [volume, setVolume] = useState<number>(0.5);

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
        setPlaying(true);

    }
    const handleDuration = (seconds:number) => {

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
    const handleInfoButton = (e) => {
        e.preventDefault();
        setClickInfoButton(!clickInfoButton)

    }

    return {
        duration,
        volume, setVolume,
        playerRef, 
        handleStopButtonClick, handlePlayButtonClick, handlePlay, handleDuration, handleonChangeRange, handleProgress, handleInfoButton
    }
}