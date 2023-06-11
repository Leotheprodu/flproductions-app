import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    setSessionArtista,
    useFetchAPI,
    fetchAPI,
    Spinner,
    setSessionUserMessage,
} from '../../components';

export const CrearArtistaForm = ({ tipo }) => {
    const [sujeto, setSujeto] = useState(null);
    useEffect(() => {
        setSujeto(() => {
            if (tipo === 1) return 'Artista';
            if (tipo === 0) return 'Productor Musical';
            return null;
        });
    }, [tipo]);
    const [formulario, setFormulario] = useState({
        nombre_artista: '',
        spotify: '',
        instagram: '',
        info: '',
        imagen: undefined,
        tipo,
    });
    const [dataFetch, setDataFetch, isRequested, setIsRequested] =
        useFetchAPI();
    const dispatch = useDispatch();
    const apiUrl =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_ARTISTAS_NEW_ARTIST
            : process.env.NEXT_PUBLIC_DEV_ARTISTAS_NEW_ARTIST;
    const handleSubmit = async (e) => {
        const form = e;
        form.preventDefault();
        setIsRequested(true);
        const formData = new FormData(form.currentTarget);
        formData.set('tipo', formulario.tipo);

        const { data, error } = await fetchAPI({
            method: 'POST',
            url: apiUrl,
            body: formData,
            isFormData: true,
        });
        if (data) {
            setDataFetch(data);
            dispatch(setSessionArtista(data));
            console.log(data);
            dispatch(
                setSessionUserMessage({
                    message: `${sujeto} creado exitosamente`,
                    messageType: 'warning',
                })
            );
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
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormulario((prev) => ({ ...prev, [name]: value }));
    };
    const handleOnChangeImagen = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFormulario((prev) => ({ ...prev, imagen: selectedFile }));
        } else {
            setFormulario((prev) => ({ ...prev, imagen: undefined }));
        }
    };

    return (
        <>
            <form className="CrearArtistaForm" onSubmit={handleSubmit}>
                <h3>Crear {sujeto}</h3>
                <div className="CrearArtistaForm__form__input">
                    <label className="mb-3" htmlFor="name">
                        Nombre:
                    </label>
                    <input
                        tabIndex={1}
                        type="text"
                        className="mb-3"
                        name="nombre_artista"
                        value={formulario.nombre_artista}
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <div className="CrearArtistaForm__form__input">
                    <label className="mb-3" htmlFor="name">
                        Link del perfil de Spotify:
                    </label>
                    <input
                        tabIndex={2}
                        type="text"
                        className="mb-3"
                        name="spotify"
                        value={formulario.spotify}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="CrearArtistaForm__form__input">
                    <label className="mb-3" htmlFor="name">
                        Link del perfil de Instagram:
                    </label>
                    <input
                        tabIndex={3}
                        type="text"
                        className="mb-3"
                        name="instagram"
                        value={formulario.instagram}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="CrearArtistaForm__form__input">
                    <label className="mb-3" htmlFor="name">
                        Imagen:
                    </label>
                    <input
                        tabIndex={4}
                        type="file"
                        accept="image/*"
                        className="mb-3"
                        name="imagen"
                        onChange={handleOnChangeImagen}
                    />
                </div>
                <div className="CrearArtistaForm__form__input">
                    <label className="mb-3" htmlFor="name">
                        Descripcion:
                    </label>
                    <textarea
                        tabIndex={5}
                        className="mb-3"
                        name="info"
                        value={formulario.info}
                        onChange={handleOnChange}
                        required
                    />
                </div>

                {!dataFetch && !isRequested && (
                    <button tabIndex={6} type="submit">
                        Crear
                    </button>
                )}
                {!dataFetch && isRequested && <Spinner />}
            </form>
        </>
    );
};
