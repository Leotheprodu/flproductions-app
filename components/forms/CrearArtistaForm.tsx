import React, { useState } from 'react';

export const CrearArtistaForm = () => {
    const [statusenviado, setStatusEnviado] = useState(false);
    const [formStatus, setFormStatus] = useState('');
    const [formulario, setFormulario] = useState({
        nombre_artista: '',
        spotify: '',
        instagram: '',
        info: '',
        imagen: undefined,
        tipo: '1',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.set('tipo', formulario.tipo);
        const data = Object.fromEntries(formData);

        // Aquí puedes enviar los datos del formulario a tu servidor
        fetch(
            `${
                process.env.NODE_ENV === 'production'
                    ? process.env.NEXT_PUBLIC_PROD_ARTISTAS_NEW_ARTIST
                    : process.env.NEXT_PUBLIC_DEV_ARTISTAS_NEW_ARTIST
            }`,
            {
                method: 'POST',
                credentials: 'include',
                body: formData,
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    console.log(data);
                    setFormStatus('Se han actualizado los datos correctamente');
                    setStatusEnviado(true);
                } else {
                    alert('HUBO UN ERROR');
                }
            })

            .catch((error) => {
                console.log(error);
            });
    };
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormulario((prev) => ({ ...prev, [name]: value }));
        if (name === 'nombre_artista' && value.length > 15) {
            setFormStatus(
                'No esta permitido tener mas de 15 caracteres en el nombre de Artista'
            );
        } else {
            setFormStatus('');
        }
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
                {!statusenviado && (
                    <button tabIndex={6} type="submit">
                        Crear
                    </button>
                )}
            </form>
            <div>
                <p className="contact-form__mensaje-status">{formStatus}</p>
            </div>
        </div>
    );
};
