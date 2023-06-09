import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconEdit } from '@tabler/icons-react';
import { fetchAPI, useFetchAPI, setSessionUserMessage, RootState } from '../';
import { FormMusicControl } from './FormMusicControl';
const apiUrl_Producciones =
    process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_PROD_PRODUCCIONES_ARTIST
        : process.env.NEXT_PUBLIC_DEV_PRODUCCIONES_ARTIST;
const apiUrl_DeleteSong =
    process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_PROD_PRODUCCIONES_DELETE
        : process.env.NEXT_PUBLIC_DEV_PRODUCCIONES_DELETE;

export const ArtistMusicHandle = () => {
    const [dataFetch, setDataFetch, isRequested, setIsRequested] =
        useFetchAPI();
    const dispatch = useDispatch();
    const artista = useSelector(
        (state: RootState) => state.user.session.artista
    );
    const usuario = useSelector((state: RootState) => state.user.session.user);

    const [isDeleting, setIsDeleting] = useState({
        status: false,
        song: {
            id: null,
            nombre: '',
        },
    });
    const [isEditing, setIsEditing] = useState({
        status: false,
        song: {
            id: null,
            nombre: '',
            descripcion: '',
            spotify_link: '',
            youtube_id: '',
            estilo: 'secular',
            genero: '',
            fecha_lanzamiento: '',
            key: 'indefinido',
            bpm: null,
        },
    });
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await fetchAPI({
                url: `${apiUrl_Producciones}${artista.id}`,
            });
            if (data) {
                setDataFetch(data);
            }
        };
        fetchData();
    }, [isEditing.status, isDeleting.status]);

    const handleElementEdit = (element) => {
        const {
            id,
            nombre,
            descripcion,
            spotify_link,
            youtube_id,
            estilo,
            genero,
            fecha_lanzamiento,
            key,
            bpm,
        } = element;
        setIsEditing({
            status: true,
            song: {
                id,
                nombre,
                descripcion,
                spotify_link,
                youtube_id,
                estilo,
                genero,
                fecha_lanzamiento,
                key,
                bpm,
            },
        });
    };
    const createSong = () => {
        setIsEditing({
            status: true,
            song: {
                id: null,
                nombre: '',
                descripcion: '',
                spotify_link: '',
                youtube_id: '',
                estilo: '',
                genero: '',
                fecha_lanzamiento: '',
                key: 'indefinido',
                bpm: null,
            },
        });
    };
    const handleDeleteItem = (element) => {
        const { id, nombre } = element;
        setIsDeleting({
            status: true,
            song: {
                id,
                nombre,
            },
        });
    };
    const handleDeleteSong = async (e) => {
        e.preventDefault();
        const songInfo = isDeleting.song;
        const { data, error } = await fetchAPI({
            url: apiUrl_DeleteSong,
            method: 'DELETE',
            body: songInfo,
        });

        if (data) {
            dispatch(
                setSessionUserMessage({
                    message: data.message,
                    messageType: 'notification',
                })
            );
            setIsDeleting({ ...isDeleting, status: false });
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
        <div className="ArtistMusicHandle">
            {!isEditing.status &&
                !isDeleting.status &&
                dataFetch &&
                dataFetch.map((element) => (
                    <div
                        className="ArtistMusicHandle__container"
                        key={element.id}
                    >
                        <div
                            title="Eliminar"
                            className="ArtistMusicHandle__deleteButtom"
                            onClick={() => handleDeleteItem(element)}
                        >
                            X
                        </div>
                        <div
                            title="Editar Elemento"
                            className="ArtistMusicHandle__song"
                            onClick={() => handleElementEdit(element)}
                        >
                            <img
                                src={`https://img.youtube.com/vi/${element.youtube_id}/mqdefault.jpg`}
                                alt={`imagen de ${element.nombre}`}
                            />
                            <p>{element.nombre}</p>
                            <p>id: {element.id}</p>
                        </div>
                    </div>
                ))}
            {!isEditing.status && !isDeleting.status && (
                <div
                    title="Nueva Cancion"
                    className="ArtistMusicHandle__createSong"
                    onClick={createSong}
                >
                    <div>
                        <p>+</p>
                    </div>
                    <p>Nueva Cancion</p>
                </div>
            )}

            {isEditing.status && (
                <div className="ArtistMusicHandle__UpdateArtist__container">
                    <div className="ArtistMusicHandle__UpdateArtist__difuminado"></div>
                    <div className="ArtistMusicHandle__UpdateArtist">
                        <FormMusicControl
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                        />
                        <div
                            className="ArtistMusicHandle__UpdateArtist-cerrar"
                            onClick={() => {
                                setIsEditing({ ...isEditing, status: false });
                            }}
                        >
                            X
                        </div>
                    </div>
                </div>
            )}
            {isDeleting.status && (
                <div className="ArtistMusicHandle__UpdateArtist__container">
                    <div className="ArtistMusicHandle__UpdateArtist__difuminado"></div>
                    <div className="ArtistMusicHandle__UpdateArtist">
                        <div>
                            <p>
                                {usuario.username}, ¿realmente quieres eliminar
                                "{isDeleting.song.nombre}"?
                            </p>
                            <div className="ArtistMusicHandle__DeleteArtist_buttons">
                                <button onClick={handleDeleteSong}>
                                    Aceptar
                                </button>
                                <button
                                    onClick={() => {
                                        setIsDeleting({
                                            ...isDeleting,
                                            status: false,
                                        });
                                    }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                        <div
                            className="ArtistMusicHandle__UpdateArtist-cerrar"
                            onClick={() => {
                                setIsDeleting({ ...isDeleting, status: false });
                            }}
                        >
                            X
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
