import { useState } from "react";



export const useHandleAppMusic = () => {

    const [playing, setPlaying] = useState<boolean>(false);
    const [pause, setPause] = useState<boolean>(false);
    const [infoProduccion, setInfoProduccion ] = useState<any>({});
    const [idCompActual, setidCompActual ] = useState<number>(null);
    const [ended, setEnded] = useState<boolean>(false);
    const [progressDuration, setprogressDuration] = useState<string>('0:00');
    const [progress, setProgress] = useState<number>(0);
    const [clickInfoButton, setClickInfoButton] = useState<boolean>(false);

    const selectedSong = (song: any, idComp: number) => {
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