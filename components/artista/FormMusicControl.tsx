import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAPI, useFetchAPI, setSessionUserMessage, RootState } from '../';
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
    setIsEditing: any;
}
export const FormMusicControl: React.FC<MyComponentProps> = ({
    isEditing,
    setIsEditing,
}) => {
    const dispatch = useDispatch();
    const { status, song } = isEditing;
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
    const apiUrl_Producciones =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_PRODUCCIONES_HANDLE
            : process.env.NEXT_PUBLIC_DEV_PRODUCCIONES_HANDLE;
    useEffect(() => {
        if (status) {
            setSongData({
                id: song.id || undefined,
                nombre: song.nombre || undefined,
                descripcion: song.descripcion || undefined,
                spotify_link: song.spotify_link || undefined,
                youtube_id: song.youtube_id || undefined,
                estilo: song.estilo || undefined,
                genero: song.genero || undefined,
                fecha_lanzamiento: song.fecha_lanzamiento || undefined,
            });
        }
    }, []);
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setSongData({ ...songData, [name]: value });
    };
    const handleBlurYoutubeId = (e) => {
        function obtenerIdDeYouTube(url) {
            // Verificar si la entrada es un ID válido de YouTube
            let idValido = /^[a-zA-Z0-9_-]{11}$/.test(url);

            if (idValido) {
                return url; // Devolver el ID válido tal cual
            }

            // Patrones de expresión regular para extraer el ID del enlace de YouTube
            let patron1 = /youtube\.com\/watch\?v=([^&]+)/;
            let patron2 = /youtu\.be\/([^&]+)/;
            let patron3 = /youtube\.com\/embed\/([^&]+)/;

            // Intentar extraer el ID utilizando los patrones
            let match =
                url.match(patron1) || url.match(patron2) || url.match(patron3);

            if (match) {
                return match[1]; // El ID del video se encuentra en el primer grupo de captura
            }

            return null; // Si no se encuentra el ID del video, devolver null
        }
        setSongData({
            ...songData,
            youtube_id: obtenerIdDeYouTube(songData.youtube_id),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error, status } = await fetchAPI({
            url: apiUrl_Producciones,
            method: 'POST',
            body: songData,
        });

        if (data) {
            dispatch(
                setSessionUserMessage({
                    message: data.message,
                    messageType: 'notification',
                })
            );
            setIsEditing({ ...isEditing, status: false });
        }
        if (error) {
            dispatch(
                setSessionUserMessage({
                    message: error,
                    messageType: 'error',
                })
            );
        }
    };

    return (
        <form className="FormMusicControl" onSubmit={handleSubmit}>
            <div className="FormMusicControl__element">
                <label htmlFor="FormMusicControl_nombre">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    id="FormMusicControl_nombre"
                    value={songData.nombre}
                    onChange={handleFormChange}
                />
            </div>
            <div className="FormMusicControl__element">
                <label htmlFor="FormMusicControl_descripcion">
                    Descripcion
                </label>
                <textarea
                    name="descripcion"
                    id="FormMusicControl_descripcion"
                    value={songData.descripcion}
                    onChange={handleFormChange}
                />
            </div>
            <div className="FormMusicControl__element">
                <label htmlFor="FormMusicControl_spotify_link">Spotify</label>
                <textarea
                    name="spotify_link"
                    id="FormMusicControl_spotify_link"
                    value={songData.spotify_link}
                    onChange={handleFormChange}
                />
            </div>
            <div className="FormMusicControl__element">
                <label htmlFor="FormMusicControl_youtube_id">Youtube ID</label>
                <input
                    type="text"
                    name="youtube_id"
                    id="FormMusicControl_youtube_id"
                    value={songData.youtube_id}
                    onChange={handleFormChange}
                    onBlur={handleBlurYoutubeId}
                />
            </div>
            <div className="FormMusicControl__element">
                <label htmlFor="FormMusicControl_estilo">Estilo</label>
                <input
                    type="text"
                    name="estilo"
                    id="FormMusicControl_estilo"
                    value={songData.estilo}
                    onChange={handleFormChange}
                />
            </div>
            <div className="FormMusicControl__element">
                <label htmlFor="FormMusicControl_genero">Genero Musical</label>
                <input
                    type="text"
                    name="genero"
                    id="FormMusicControl_genero"
                    value={songData.genero}
                    onChange={handleFormChange}
                />
            </div>

            <div className="FormMusicControl__element">
                <label htmlFor="FormMusicControl_fecha_lanzamiento">
                    lanzamiento
                </label>
                <input
                    type="date"
                    name="fecha_lanzamiento"
                    id="FormMusicControl_fecha_lanzamiento"
                    value={songData.fecha_lanzamiento}
                    onChange={handleFormChange}
                />
            </div>

            <button tabIndex={6} type="submit">
                Guardar
            </button>
        </form>
    );
};
