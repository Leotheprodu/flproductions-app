import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconEdit } from '@tabler/icons-react';
import { fetchAPI, useFetchAPI, setSessionUserMessage, RootState } from '../';
import { FormMusicControl } from './FormMusicControl';
const apiUrl_Producciones =
    process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_PROD_PRODUCCIONES_ARTIST
        : process.env.NEXT_PUBLIC_DEV_PRODUCCIONES_ARTIST;

interface NewDataState {
    nombre_artista: string;
    info: string;
    instagram: string;
    spotify: string;
}
export const ArtistMusicHandle = () => {
    const [
        errorFetch,
        setErrorFetch,
        dataFetch,
        setDataFetch,
        isRequested,
        setIsRequested,
    ] = useFetchAPI();
    const dispatch = useDispatch();
    const artista = useSelector(
        (state: RootState) => state.user.session.artista
    );

    const [isEditing, setIsEditing] = useState({
        status: false,
        song: {
            id: null,
            nombre: '',
            descripcion: '',
            spotify_link: '',
            youtube_id: '',
            estilo: '',
            genero: '',
            fecha_lanzamiento: '',
        },
    });
    const [newData, setNewData] = useState<NewDataState>({
        nombre_artista: artista.nombre_artista,
        info: artista.info,
        instagram: artista.instagram,
        spotify: artista.spotify,
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
    }, []);

    const handleElementEdit = (element) => {
        setIsEditing({
            status: true,
            song: {
                id: element.id,
                nombre: element.nombre,
                descripcion: element.descripcion,
                spotify_link: element.spotify_link,
                youtube_id: element.youtube_id,
                estilo: element.estilo,
                genero: element.genero,
                fecha_lanzamiento: element.fecha_lanzamiento,
            },
        });
    };

    return (
        <div className="ArtistMusicHandle">
            {dataFetch &&
                dataFetch.map((element) => (
                    <div
                        className="ArtistMusicHandle__song"
                        onClick={() => handleElementEdit(element)}
                        key={element.id}
                    >
                        <img
                            src={`https://img.youtube.com/vi/${element.youtube_id}/mqdefault.jpg`}
                            alt={`imagen de ${element.nombre}`}
                        />
                        <p>{element.nombre}</p>
                        <p>id: {element.id}</p>
                        {/* <p className="ArtistMusicHandle__table__descripcion">
                            {element.descripcion}
                        </p>
                        <p>{element.spotify_link}</p>
                        <p>{element.youtube_id}</p>
                        <p>{element.estilo}</p>
                        <p>{element.genero}</p>
                        <p>{element.fecha_lanzamiento}</p> */}
                    </div>
                ))}

            {isEditing.status && (
                <div className="ArtistMusicHandle__UpdateArtist__container">
                    <div className="ArtistMusicHandle__UpdateArtist__difuminado"></div>
                    <div className="ArtistMusicHandle__UpdateArtist">
                        <FormMusicControl isEditing={isEditing} />
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
        </div>
    );
};
