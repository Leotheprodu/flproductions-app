import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAPI,
    useFetchAPI,
    setSessionUserMessage,
    RootState,
    musickeys,
    generosMusicales,
    infoCampos,
} from '../';
interface IsEditingData {
    status: boolean;
    song: {
        id: number | null;
        nombre: string;
        descripcion: string;
        id_artista: number;
        tipo_obra: number;
        spotify_link: string;
        youtube_id: string;
        estilo: string;
        genero: string;
        fecha_lanzamiento: string;
        key: string | null;
        bpm: number | null;
        status: number;
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
        id_artista: null,
        tipo_obra: null,
        estilo: 'secular',
        genero: 'pop',
        fecha_lanzamiento: '',
        key: 'indefinido',
        bpm: null,
        status: null,
    });
    const apiUrl_Producciones =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_PRODUCCIONES_HANDLE
            : process.env.NEXT_PUBLIC_DEV_PRODUCCIONES_HANDLE;
    useEffect(() => {
        if (status && song.nombre !== '') {
            setSongData({
                id: song.id || undefined,
                nombre: song.nombre || undefined,
                id_artista: song.id_artista,
                tipo_obra: song.tipo_obra,
                descripcion: song.descripcion || undefined,
                spotify_link: song.spotify_link || undefined,
                youtube_id: song.youtube_id || undefined,
                estilo: song.estilo || undefined,
                genero: song.genero || undefined,
                fecha_lanzamiento: song.fecha_lanzamiento || undefined,
                key: song.key || 'indefinido',
                bpm: song.bpm || undefined,
                status: song.status,
            });
        } else if (status && song.nombre === '') {
            setSongData({
                id: undefined,
                nombre: '',
                descripcion: undefined,
                spotify_link: undefined,
                id_artista: song.id_artista,
                tipo_obra: song.tipo_obra,
                youtube_id: '',
                estilo: 'secular',
                genero: 'reggaeton',
                fecha_lanzamiento: '',
                key: 'indefinido',
                bpm: null,
                status: song.status,
            });
        }
    }, [status, song]);
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setSongData({ ...songData, [name]: value });
    };
    const handleBlurYoutubeId = (e) => {
        function obtenerIdDeYouTube(url) {
            try {
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
                    url.match(patron1) ||
                    url.match(patron2) ||
                    url.match(patron3);

                if (match) {
                    return match[1]; // El ID del video se encuentra en el primer grupo de captura
                }

                return null; // Si no se encuentra el ID del video, devolver null
            } catch (error) {
                dispatch(
                    setSessionUserMessage({
                        message:
                            'Debes agregar un link valido de youtube o el youtube ID',
                        messageType: 'warning',
                    })
                );
            }
        }
        setSongData({
            ...songData,
            youtube_id: obtenerIdDeYouTube(songData.youtube_id),
        });
        if (songData.youtube_id !== null) {
            dispatch(
                setSessionUserMessage({
                    message:
                        'se ha obtenido el id de youtube, por medio del link que has compartido',
                    messageType: 'warning',
                })
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await fetchAPI({
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
    const handleInfoCampo = (campo) => {
        dispatch(
            setSessionUserMessage({
                message: infoCampos[campo],
                messageType: 'warning',
            })
        );
    };

    return (
        <form className="FormMusicControl" onSubmit={handleSubmit}>
            <div className="FormMusicControl__element">
                <label htmlFor="FormMusicControl_nombre">Nombre</label>
                <p
                    title="ayuda"
                    onClick={() => handleInfoCampo('nombre')}
                    className="FormMusicControl_informacionButton"
                >
                    ?
                </p>
                <input
                    tabIndex={1}
                    autoFocus
                    required
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
                <p
                    title="ayuda"
                    onClick={() => handleInfoCampo('descripcion')}
                    className="FormMusicControl_informacionButton"
                >
                    ?
                </p>
                <textarea
                    tabIndex={2}
                    required
                    name="descripcion"
                    id="FormMusicControl_descripcion"
                    value={songData.descripcion}
                    onChange={handleFormChange}
                />
            </div>
            <div className="FormMusicControl__element">
                <label htmlFor="FormMusicControl_spotify_link">Spotify</label>
                <p
                    title="ayuda"
                    onClick={() => handleInfoCampo('spotify_link')}
                    className="FormMusicControl_informacionButton"
                >
                    ?
                </p>
                <textarea
                    tabIndex={3}
                    name="spotify_link"
                    id="FormMusicControl_spotify_link"
                    value={songData.spotify_link}
                    onChange={handleFormChange}
                />
            </div>
            <div className="FormMusicControl__element">
                <label htmlFor="FormMusicControl_youtube_id">Youtube ID</label>
                <p
                    title="ayuda"
                    onClick={() => handleInfoCampo('youtube_id')}
                    className="FormMusicControl_informacionButton"
                >
                    ?
                </p>
                <input
                    tabIndex={4}
                    required
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
                <p
                    title="ayuda"
                    onClick={() => handleInfoCampo('estilo')}
                    className="FormMusicControl_informacionButton"
                >
                    ?
                </p>
                <select
                    tabIndex={5}
                    required
                    id="FormMusicControl_estilo"
                    name="estilo"
                    value={songData.estilo}
                    onChange={handleFormChange}
                >
                    <option value="secular">Secular</option>
                    <option value="cristiano">Cristiano</option>
                </select>
            </div>
            <div className="FormMusicControl__element">
                <label htmlFor="FormMusicControl_genero">Genero Musical</label>
                <p
                    title="ayuda"
                    onClick={() => handleInfoCampo('genero')}
                    className="FormMusicControl_informacionButton"
                >
                    ?
                </p>
                <select
                    tabIndex={6}
                    required
                    id="FormMusicControl_genero"
                    name="genero"
                    value={songData.genero}
                    onChange={handleFormChange}
                >
                    {generosMusicales.map((element) => (
                        <option key={element} value={element}>
                            {element}
                        </option>
                    ))}
                </select>
            </div>
            <div className="FormMusicControl__element">
                <label htmlFor="FormMusicControl_key">Escala</label>
                <p
                    title="ayuda"
                    onClick={() => handleInfoCampo('key')}
                    className="FormMusicControl_informacionButton"
                >
                    ?
                </p>
                <select
                    tabIndex={7}
                    id="FormMusicControl_key"
                    name="key"
                    value={songData.key}
                    onChange={handleFormChange}
                >
                    {musickeys.map((element) => (
                        <option key={element} value={element}>
                            {element}
                        </option>
                    ))}
                </select>
            </div>
            <div className="FormMusicControl__element">
                <label htmlFor="FormMusicControl_bpm">bpm</label>
                <p
                    title="ayuda"
                    onClick={() => handleInfoCampo('bpm')}
                    className="FormMusicControl_informacionButton"
                >
                    ?
                </p>
                <input
                    tabIndex={8}
                    type="text"
                    name="bpm"
                    id="FormMusicControl_bpm"
                    value={songData.bpm}
                    onChange={handleFormChange}
                />
            </div>

            <div className="FormMusicControl__element">
                <label htmlFor="FormMusicControl_fecha_lanzamiento">
                    Fecha de lanzamiento
                </label>
                <p
                    title="ayuda"
                    onClick={() => handleInfoCampo('fecha_lanzamiento')}
                    className="FormMusicControl_informacionButton"
                >
                    ?
                </p>
                <input
                    tabIndex={9}
                    required
                    type="date"
                    name="fecha_lanzamiento"
                    id="FormMusicControl_fecha_lanzamiento"
                    value={songData.fecha_lanzamiento}
                    onChange={handleFormChange}
                />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <button tabIndex={10} type="submit">
                    Guardar
                </button>
                <button
                    tabIndex={11}
                    onClick={() => {
                        setIsEditing({
                            ...isEditing,
                            status: false,
                        });
                    }}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
};
