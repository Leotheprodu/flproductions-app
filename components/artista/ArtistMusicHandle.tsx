import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { IconEdit } from '@tabler/icons-react';
import { setSessionUserMessage } from '../redux/userActions';
import { fetchAPI } from '../helpers/fetchAPI';
import { useFetchAPI } from '../hooks/useFetchAPI';

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
        song: { id: 0, nombre: '' },
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
            song: { id: element.id, nombre: element.nombre },
        });
    };

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {dataFetch &&
                        dataFetch.map((element) => (
                            <tr
                                onClick={() => handleElementEdit(element)}
                                key={element.id}
                            >
                                <td>{element.id}</td>
                                <td>{element.nombre}</td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {isEditing.status && (
                <div>
                    <p>{`aqui va el formulario para editar el tema ${isEditing.song.nombre}`}</p>
                </div>
            )}
        </>
    );
};
