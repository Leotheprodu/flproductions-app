import { IconBan, IconCircleCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSessionUserMessage, setSessionUser } from '../redux/userActions';
import { RootState } from '../redux/store';
import { fetchAPI } from '../helpers/fetchAPI';

export const UserBasicInfo = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.user.session.user);
    const userRoles = useSelector(
        (state: RootState) => state.user.session.roles
    );
    const [username, setUserName] = useState(userInfo.username);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [statusenviado, setStatusEnviado] = useState(false);
    const [clasePass, setClasePass] = useState('');
    const apiUrlUpdateUser = `${
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_USER_UPDATE_USERS_ID
            : process.env.NEXT_PUBLIC_DEV_USER_UPDATE_USERS_ID
    }${userInfo.id}`;
    const apiUrlVerifyEmail = `${
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_USER_VERIFY_EMAIL_EMAIL
            : process.env.NEXT_PUBLIC_DEV_USER_VERIFY_EMAIL_EMAIL
    }${email}`;
    const handleSubmit = async (e) => {
        e.preventDefault();
        //Validaciones
        if (password !== password1) {
            dispatch(
                setSessionUserMessage({
                    message: 'Las contraseñas deben coincidir',
                    messageType: 'error',
                })
            );

            return;
        }
        if (username.length > 15) {
            dispatch(
                setSessionUserMessage({
                    message:
                        'el nombre de usuario debe tener maximo 15 caracteres',
                    messageType: 'error',
                })
            );
            return;
        }
        const password2 =
            password === password1 && password !== null ? password : null;
        const datosActualizadosDeUsuario = {
            username: username,
            email: email,
            password: password2 !== null ? password2 : null,
        };
        //Fetch de Datos
        const { data, error, status } = await fetchAPI({
            url: apiUrlUpdateUser,
            method: 'PUT',
            body: datosActualizadosDeUsuario,
        });
        if (status === 429) {
            dispatch(
                setSessionUserMessage({
                    message: 'Muchos intentos, intentelo de nuevo en mas tarde',
                    messageType: 'error',
                })
            );
            return;
        }
        if (data) {
            dispatch(
                setSessionUserMessage({
                    message: 'Se han actualizado los datos correctamente',
                    messageType: 'notification',
                })
            );
            dispatch(setSessionUser(data.user));

            setStatusEnviado(true);
        } else {
            dispatch(
                setSessionUserMessage({
                    message: error,
                    messageType: 'error',
                })
            );
        }
    };

    const hanldeOnBlurPassword = () => {
        if (password !== password1) {
            setClasePass('UserBasicInfo__Error');
            dispatch(
                setSessionUserMessage({
                    message: 'Las contraseñas deben coincidir',
                    messageType: 'error',
                })
            );
        } else {
            setClasePass('');
        }
    };
    const handleOnChangeNombreUsuario = (e) => {
        setUserName(e.target.value.trim());
        if (e.target.value.length > 15) {
            dispatch(
                setSessionUserMessage({
                    message:
                        'No esta permitido tener mas de 15 caracteres en el nombre de usuario',
                    messageType: 'error',
                })
            );
        }
    };
    const handleVerificarEmail = async () => {
        const fechaultimaModificacion: any = new Date(
            userInfo.ultima_actualizacion
        );
        const fechaActual: any = new Date();
        // 2. Restar la fecha actual con la fecha de la tabla de SQL
        const diferenciaEnMilisegundos = fechaActual - fechaultimaModificacion;

        // 3. Convertir la diferencia en milisegundos a horas
        const diferenciaEnHoras = diferenciaEnMilisegundos / 3600000;
        // 4. Comparar la cantidad de horas con 1
        if (diferenciaEnHoras >= 0.25) {
            apiUrlVerifyEmail;
            const { error, status } = await fetchAPI({
                url: apiUrlVerifyEmail,
            });
            if (status === 200) {
                dispatch(
                    setSessionUserMessage({
                        message:
                            'Hemos reenviado el correo de verificacion, ve a revisarlo y verifica tu correo',
                        messageType: 'warning',
                    })
                );
                setStatusEnviado(true);
            } else if (error) {
                dispatch(
                    setSessionUserMessage({
                        message: error,
                        messageType: 'error',
                    })
                );
                setStatusEnviado(true);
                return;
            }
        } else {
            dispatch(
                setSessionUserMessage({
                    message:
                        'Para volver a enviar el correo de verificacion, debe haber pasado 15 minutos desde el ultimo cambio',
                    messageType: 'error',
                })
            );
            setStatusEnviado(true);
            return;
        }
    };

    return (
        <>
            <div className="contenedor__UserBasicInfo">
                <div>
                    <h3>Configuracion Basica</h3>
                </div>
                <form className="UserBasicInfo__form" onSubmit={handleSubmit}>
                    <div className="UserBasicInfo__form__input">
                        <label className="mb-3" htmlFor="name">
                            Nombre de Usuario:
                        </label>
                        <input
                            tabIndex={1}
                            type="text"
                            className="mb-3"
                            value={username}
                            onChange={handleOnChangeNombreUsuario}
                            required
                        />
                    </div>
                    <div className=" UserBasicInfo__form__input">
                        <label className="mb-3" htmlFor="email">
                            Correo Electronico:
                        </label>
                        <div className="UserBasicInfo__form__input__verified">
                            <input
                                tabIndex={-1}
                                type="email"
                                value={email}
                                className="mb-3"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {userRoles.includes(1) && (
                                <div>
                                    <IconCircleCheck
                                        size={30}
                                        stroke={1}
                                        color="green"
                                    />
                                    Verificado
                                </div>
                            )}

                            {!userRoles.includes(1) && (
                                <div className="UserBasicInfo__Email-No-verificado">
                                    <IconBan size={30} stroke={1} color="red" />
                                    No Verificado
                                    {!statusenviado && (
                                        <button
                                            tabIndex={-1}
                                            onClick={handleVerificarEmail}
                                            type="button"
                                        >
                                            Verificar?
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="UserBasicInfo__form__input">
                        <label className="mb-3" htmlFor="password">
                            Nueva Contraseña:
                        </label>
                        <input
                            tabIndex={3}
                            type="password"
                            className={`mb-3 ${clasePass}`}
                            value={password1}
                            onChange={(e) => setPassword1(e.target.value)}
                        />
                    </div>
                    <div className="UserBasicInfo__form__input">
                        <label className="mb-3" htmlFor="password">
                            Nueva Contraseña:
                        </label>
                        <input
                            type="password"
                            className={`mb-3 ${clasePass}`}
                            tabIndex={4}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={hanldeOnBlurPassword}
                        />
                    </div>
                    <div className="UserBasicInfo__form__submit">
                        {!statusenviado && (
                            <button tabIndex={5} type="submit">
                                Guardar
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
};
