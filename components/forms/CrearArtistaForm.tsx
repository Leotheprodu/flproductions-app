import { useState, Suspense } from 'react';
import { HttpComponent } from '../helpers/HttpComponent';
import { Spinner } from '../helpers/Spinner';
export const CrearArtistaForm = () => {
    const [formulario, setFormulario] = useState({
        nombre_artista: '',
        spotify: '',
        instagram: '',
        info: '',
        imagen: undefined,
        tipo: '1',
    });
    const [errorFetch, setErrorFetch] = useState(null);
    const [dataFetch, setDataFetch] = useState(null);
    const apiUrl =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_ARTISTAS_NEW_ARTIST
            : process.env.NEXT_PUBLIC_DEV_ARTISTAS_NEW_ARTIST;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.set('tipo', formulario.tipo);
        const { data, error } = await HttpComponent({
            method: 'POST',
            url: apiUrl,
            body: formData,
            isFormData: true,
        });
        setDataFetch(data);
        setErrorFetch(error);
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
    {
        if (errorFetch)
            return (
                <div>
                    <p>Error: {errorFetch}</p>
                    <button onClick={() => setErrorFetch(null)}>
                        Volver a intentar
                    </button>
                </div>
            );
    }
    return (
        <div className="CrearArtistaForm">
            <h3>Crear Artista</h3>
            <form className="CrearArtistaForm" onSubmit={handleSubmit}>
                <div className="CrearArtistaForm__form__input">
                    <label className="mb-3" htmlFor="name">
                        Nombre de Artista:
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
                        Perfil de Spotify:
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
                        Perfil de Instagram:
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

                <Suspense fallback={<Spinner />}>
                    {!dataFetch && (
                        <button tabIndex={6} type="submit">
                            Crear
                        </button>
                    )}
                    {dataFetch && (
                        <div>
                            <p className="contact-form__mensaje-status">
                                {dataFetch.artist.nombre_artista} creado con
                                exito
                            </p>
                        </div>
                    )}
                </Suspense>
            </form>
        </div>
    );
};
