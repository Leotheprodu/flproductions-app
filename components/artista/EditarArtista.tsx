import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../';
import { IconEdit } from '@tabler/icons-react';

export const EditarArtista = () => {
    const fileInputRef = useRef(null);
    const artista = useSelector(
        (state: RootState) => state.user.session.artista
    );
    const [imageUrl, setImageUrl] = useState(
        'https://flproductionscr.com/build_main/img/perfil/avatar/10.webp'
    );
    const [isEditing, setIsEditing] = useState({
        imagen: false,
        nombre_artista: false,
        info: false,
        instagram: false,
        spotify: false,
    });
    const [newData, setNewData] = useState({
        nombre_artista: artista.nombre_artista,
        info: artista.info,
        instagram: artista.instagram,
        spotify: artista.spotify,
    });
    useEffect(() => {
        artista.imagen && setImageUrl(artista.imagen);
    }, []);

    const handleInputBlur = (e) => {
        const { name } = e.target;
        setIsEditing((prevData) => ({
            ...prevData,
            [name]: false,
        }));
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('imagen', file);
        // Aquí puedes procesar el archivo seleccionado, por ejemplo, cargarlo al servidor
    };
    return (
        <div className="EditarArtista">
            <div>
                <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <div
                    className="EditarArtista_imagen_container"
                    onClick={() => fileInputRef.current.click()}
                >
                    <div className="EditarArtista_imagen_iconEdit">
                        <IconEdit size={50} />
                    </div>
                    <img
                        src={imageUrl}
                        alt={`imagen del artista ${artista.nombre_artista}`}
                    />
                </div>
            </div>
            <div className="EditarArtista_BloqueInformacion">
                <div className="EditarArtista_texto">
                    {isEditing.nombre_artista ? (
                        <input
                            type="text"
                            className="EditarArtista_input_nombre_artista"
                            name="nombre_artista"
                            value={newData.nombre_artista}
                            onChange={(e) =>
                                setNewData({
                                    ...newData,
                                    nombre_artista: e.target.value,
                                })
                            }
                            onBlur={handleInputBlur}
                            autoFocus
                        />
                    ) : (
                        <div
                            onClick={() =>
                                setIsEditing({
                                    ...isEditing,
                                    nombre_artista: true,
                                })
                            }
                            className="EditarArtista_texto_element"
                        >
                            <div className="EditarArtista_texto_Text">
                                <h4>{newData.nombre_artista}</h4>
                                <div className="EditarArtista_texto_iconEdit">
                                    <IconEdit />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="EditarArtista_texto">
                    {isEditing.info ? (
                        <textarea
                            className="EditarArtista_input_info"
                            name="info"
                            value={newData.info}
                            onChange={(e) =>
                                setNewData({
                                    ...newData,
                                    info: e.target.value,
                                })
                            }
                            onBlur={handleInputBlur}
                            autoFocus
                        />
                    ) : (
                        <div
                            onClick={() =>
                                setIsEditing({
                                    ...isEditing,
                                    info: true,
                                })
                            }
                            className="EditarArtista_texto_element"
                        >
                            <div className="EditarArtista_texto_Text">
                                <p
                                    style={{
                                        marginRight: '1rem',
                                        fontWeight: '700',
                                    }}
                                >
                                    Descripcion:
                                </p>
                                <p>{newData.info}</p>
                                <div className="EditarArtista_texto_iconEdit">
                                    <IconEdit />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="EditarArtista_texto">
                    {isEditing.spotify ? (
                        <input
                            type="text"
                            className="EditarArtista_input_generic"
                            name="spotify"
                            value={newData.spotify}
                            onChange={(e) =>
                                setNewData({
                                    ...newData,
                                    spotify: e.target.value,
                                })
                            }
                            onBlur={handleInputBlur}
                            autoFocus
                        />
                    ) : (
                        <div
                            onClick={() =>
                                setIsEditing({
                                    ...isEditing,
                                    spotify: true,
                                })
                            }
                            className="EditarArtista_texto_element"
                        >
                            <div className="EditarArtista_texto_Text">
                                <p
                                    style={{
                                        marginRight: '1rem',
                                        fontWeight: '700',
                                    }}
                                >
                                    Spotify:
                                </p>
                                <p className="EditarArtista_link">
                                    {newData.spotify}
                                </p>
                                <div className="EditarArtista_texto_iconEdit">
                                    <IconEdit />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="EditarArtista_texto">
                    {isEditing.instagram ? (
                        <input
                            type="text"
                            className="EditarArtista_input_generic"
                            name="instagram"
                            value={newData.instagram}
                            onChange={(e) =>
                                setNewData({
                                    ...newData,
                                    instagram: e.target.value,
                                })
                            }
                            onBlur={handleInputBlur}
                            autoFocus
                        />
                    ) : (
                        <div
                            onClick={() =>
                                setIsEditing({
                                    ...isEditing,
                                    instagram: true,
                                })
                            }
                            className="EditarArtista_texto_element"
                        >
                            <div className="EditarArtista_texto_Text">
                                <p
                                    style={{
                                        marginRight: '1rem',
                                        fontWeight: '700',
                                    }}
                                >
                                    Instagram:
                                </p>
                                <p className="EditarArtista_link">
                                    {newData.instagram}
                                </p>
                                <div className="EditarArtista_texto_iconEdit">
                                    <IconEdit />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
