import { IconBan, IconCircleCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSessionUserMessage, setSessionUser } from '../redux/userActions';
import { RootState } from '../redux/store';
import { fetchAPI } from '../helpers/fetchAPI';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';

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
    const inputConfig = {
        label: 'text-3xl p-2',
        input: ['text-3xl p-2 rounded-xl'],
        innerWrapper: 'bg-transparent',
        errorMessage: 'text-2xl absolute',
        inputWrapper: [
            'h-20',
            'shadow-xl',
            'bg-default-200/50',
            'dark:bg-default/60',
            'backdrop-blur-xl',
            'backdrop-saturate-200',
            'hover:bg-default-200/70',
            'dark:hover:bg-default/70',
            'group-data-[focused=true]:bg-default-200/50',
            'dark:group-data-[focused=true]:bg-default/60',
            '!cursor-text',
        ],
    };
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
            <div className="md:w-[30rem] container my-[6rem] flex flex-col rounded-xl border-1 border-gris p-4 shadow-md">
                <div>
                    <h3 className="mb-20 text-center text-cuaternario text-3xl">
                        Actualizar datos de usuario
                    </h3>
                </div>
                <form className="" onSubmit={handleSubmit}>
                    <div className="mb-16">
                        <Input
                            label="Nombre de Usuario"
                            labelPlacement="outside"
                            variant="faded"
                            classNames={inputConfig}
                            tabIndex={1}
                            className=""
                            type="text"
                            value={username}
                            onChange={handleOnChangeNombreUsuario}
                            required
                        />
                    </div>
                    <div className="">
                        <div className="mb-12">
                            <Input
                                labelPlacement="outside"
                                variant="faded"
                                classNames={inputConfig}
                                label="Correo Electronico"
                                tabIndex={-1}
                                type="email"
                                value={email}
                                className="mb-3"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {userRoles.includes(1) && (
                                <div className="flex items-center">
                                    <IconCircleCheck
                                        size={30}
                                        stroke={1}
                                        color="green"
                                    />
                                    <p>Correo electrónico verificado</p>
                                </div>
                            )}

                            {!userRoles.includes(1) && (
                                <div className="flex flex-row gap-2 mt-14 justify-center items-center">
                                    <IconBan size={30} stroke={1} color="red" />
                                    No Verificado
                                    <Button
                                        className="text-2xl"
                                        color="secondary"
                                        tabIndex={-1}
                                        onClick={handleVerificarEmail}
                                        type="button"
                                        disabled={statusenviado}
                                    >
                                        Verificar
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mb-16">
                        <Input
                            labelPlacement="outside"
                            variant="faded"
                            classNames={inputConfig}
                            label="Nueva Contraseña"
                            tabIndex={3}
                            type="password"
                            className={`mb-3 ${clasePass}`}
                            value={password1}
                            onChange={(e) => setPassword1(e.target.value)}
                        />
                    </div>
                    <div className="mb-16">
                        <Input
                            labelPlacement="outside"
                            variant="faded"
                            classNames={inputConfig}
                            label="Confirmar Contraseña"
                            type="password"
                            className={`mb-3 ${clasePass}`}
                            tabIndex={4}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={hanldeOnBlurPassword}
                        />
                    </div>
                    <div className=" flex items-center justify-center">
                        <Button
                            color="primary"
                            className="text-2xl uppercase"
                            isDisabled={statusenviado}
                            tabIndex={5}
                            type="submit"
                        >
                            Guardar
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};
