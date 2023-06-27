import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setSessionMusic } from '../';

export const useHandleAppMusic = () => {
    const [playing, setPlaying] = useState<boolean>(true);
    const [pause, setPause] = useState<boolean>(false);
    const [infoProduccion, setInfoProduccion] = useState<any>(null);
    const [idCompActual, setidCompActual] = useState<number>(null);
    const [ended, setEnded] = useState<boolean>(false);
    const [progressDuration, setprogressDuration] = useState<string>('0:00');
    const [progress, setProgress] = useState<number>(0);
    const [clickInfoButton, setClickInfoButton] = useState<boolean>(false);
    const music = useSelector((state: RootState) => state.user.session.music);
    const dispatch = useDispatch();
    const selectedSong = (song: any, idComp: number) => {
        if (infoProduccion) {
            if (infoProduccion.id === song.id) {
                dispatch(
                    setSessionMusic({
                        ...music,
                        produccionActual: null,
                    })
                );
            }
        }
        const {
            id,
            nombre,
            descripcion,
            artista,
            youtube_id,
            id_artista,
            estilo,
            genero,
            fecha_lanzamiento,
            key,
            bpm,
        } = song;
        const { nombre_artista, instagram, spotify_link } = artista;
        setInfoProduccion({
            nombre,
            descripcion,
            spotify_link,
            youtube_id,
            nombre_artista,
            instagram,
            id,
            id_artista,
            estilo,
            genero,
            fecha_lanzamiento,
            key,
            bpm,
        });
        setidCompActual(idComp);
    };

    useEffect(() => {
        if (infoProduccion) {
            dispatch(
                setSessionMusic({
                    ...music,
                    produccionActual: infoProduccion,
                })
            );
        }
    }, [infoProduccion]);

    return [
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
    ];
};
