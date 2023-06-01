import React, { useState, useEffect } from 'react';
interface IsEditingData {
    status: boolean;
    song: {
        id: number | null;
        nombre: string;
        descripcion: string;
        spotify_link: string;
        youtube_id: string;
        estilo: string;
        genero: string;
        fecha_lanzamiento: string;
    };
}
interface MyComponentProps {
    isEditing: IsEditingData;
}
export const FormMusicControl: React.FC<MyComponentProps> = ({ isEditing }) => {
    const [songData, setSongData] = useState({
        id: null,
        nombre: '',
        descripcion: '',
        spotify_link: '',
        youtube_id: '',
        estilo: '',
        genero: '',
        fecha_lanzamiento: '',
    });
    useEffect(() => {
        if (isEditing.status) {
            setSongData({
                id: isEditing.song.id,
                nombre: isEditing.song.nombre,
                descripcion: isEditing.song.descripcion,
                spotify_link: isEditing.song.spotify_link,
                youtube_id: isEditing.song.youtube_id,
                estilo: isEditing.song.estilo,
                genero: isEditing.song.genero,
                fecha_lanzamiento: isEditing.song.fecha_lanzamiento,
            });
        }
    }, [isEditing.status]);
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSongData({ ...songData, fecha_lanzamiento: e.target.value });
    };

    return (
        <form>
            <label htmlFor="fecha_lanzamiento">lanzamiento</label>
            <input
                type="date"
                name="fecha_lanzamiento"
                id="fecha_lanzamiento"
                value={songData.fecha_lanzamiento}
                onChange={handleDateChange}
            />
        </form>
    );
};
