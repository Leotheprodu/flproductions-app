import { useState } from "react";



export const useHandleAppMusic = () => {
    const [playing, setPlaying] = useState(false);
    const [pause, setPause] = useState(false);
    const [infoProduccion, setInfoProduccion ] = useState({});
    const [idCompActual, setidCompActual ] = useState(null);
    const [ended, setEnded] = useState(false);
    const [progressDuration, setprogressDuration] = useState('0:00');
    const [progress, setProgress] = useState(0);
    const [clickInfoButton, setClickInfoButton] = useState(false);

    const selectedSong = (song, idComp) => {
        const {id, nombre, descripcion, nombre_artista, instagram, spotify_link, youtube_id, id_artista, estilo, genero, fecha_lanzamiento, key, bpm} = song
        /* playing && setPlaying(false) */
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
            bpm
        });
        setidCompActual(idComp);
        /* playing && setEnded(false); */
        clickInfoButton && setClickInfoButton(!clickInfoButton);

        
        
    };
    return [
        playing, setPlaying, 
        pause, setPause,
        infoProduccion,
        idCompActual,
        ended, setEnded,
        progressDuration, setprogressDuration,
        progress, setProgress,
        clickInfoButton, setClickInfoButton,
        selectedSong
    ]
}