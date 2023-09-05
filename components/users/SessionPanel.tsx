import {
    IconUserCheck,
    IconLogout,
    IconUserPlus,
    IconSettingsFilled,
    IconCloudLockOpen,
    IconMicrophone2,
    IconHeadphonesFilled,
} from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSession, setSessionUserMessage } from '../redux/userActions';
import { useRouter } from 'next/router';
import { RootState } from '../redux/store';
import { fetchAPI } from '../';
import { Button } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
function SessionPanel() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('');
    const validateEmail = (email) =>
        email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const validationState = React.useMemo(() => {
        if (email === '') return undefined;

        return validateEmail(email) ? 'valid' : 'invalid';
    }, [email]);
    const [password, setPassword] = useState<string>('');
    const isLoggedIn =
        useSelector((state: RootState) => state.user.session.isLoggedIn) ||
        false;
    const music = useSelector((state: RootState) => state.user.session.music);
    const userRoles: [number] =
        useSelector((state: RootState) => state.user.session.roles) || [];
    const [botonOlvideContra, setBotonOlvideContra] = useState<boolean>(false);
    const [spinner, setSpinner] = useState<boolean>(false);
    const apiUrlCheckSession =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_AUTH_CHECK_SESSION
            : process.env.NEXT_PUBLIC_DEV_AUTH_CHECK_SESSION;
    const apiUrlLogin =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_AUTH_LOGIN
            : process.env.NEXT_PUBLIC_DEV_AUTH_LOGIN;

    const apiUrlLogout =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_AUTH_LOGOUT
            : process.env.NEXT_PUBLIC_DEV_AUTH_LOGOUT;
    const checkLoggedIn = async () => {
        try {
            const { data } = await fetchAPI({ url: apiUrlCheckSession });
            if (data.isLoggedIn) {
                dispatch(setSession({ ...data, music }));
            }
        } catch (error) {
            dispatch(
                setSessionUserMessage({
                    message: 'Debes Iniciar sesion',
                    messageType: 'error',
                })
            );
        }
    };

    useEffect(() => {
        checkLoggedIn();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setSpinner(true);
        const { data, status } = await fetchAPI({
            url: apiUrlLogin,
            method: 'POST',
            body: { email, password },
        });
        if (status === 429) {
            setSpinner(false);
            dispatch(
                setSessionUserMessage({
                    message:
                        'muchos intentos de inicio de sesion, espere 15 minutos',
                    messageType: 'error',
                })
            );
            return;
        }
        if (data) {
            dispatch(setSession({ ...data, music }));
            setSpinner(false);
        } else {
            dispatch(
                setSessionUserMessage({
                    message:
                        'Datos inválidos, correo o contraseña incorrecta o regístrate',
                    messageType: 'error',
                })
            );
            setBotonOlvideContra(true);
            setSpinner(false);
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        setSpinner(true);
        const { data } = await fetchAPI({ url: apiUrlLogout });
        if (data) {
            dispatch(setSession({ ...data, music }));
            setSpinner(false);
        }
    };
    if (isLoggedIn) {
        return (
            <div className="container w-80 my-0 mx-auto">
                <div className="">
                    <div className=" flex flex-col gap-2 ">
                        <Button
                            onClick={() => {
                                router.push(
                                    '/panel-de-control/informacion-de-usuario'
                                );
                            }}
                            type="button"
                            title="Configurar Usuario"
                            className="text-2xl"
                            isLoading={spinner}
                            color="primary"
                        >
                            {<IconSettingsFilled />}Configurar Usuario
                        </Button>

                        {userRoles.includes(4) && (
                            <Button
                                onClick={() => {
                                    router.push(
                                        '/panel-de-control/productor-musical'
                                    );
                                }}
                                isLoading={spinner}
                                className="text-2xl"
                                color="primary"
                                type="button"
                                title="Configurar Productor"
                            >
                                {<IconHeadphonesFilled />}Configurar Productor
                            </Button>
                        )}
                        {userRoles.includes(3) && (
                            <Button
                                onClick={() => {
                                    router.push('/panel-de-control/artista');
                                }}
                                isLoading={spinner}
                                type="button"
                                className="text-2xl"
                                color="primary"
                                title="Configurar Artista"
                            >
                                {<IconMicrophone2 />}Configurar Artista
                            </Button>
                        )}
                        <Button
                            isLoading={spinner}
                            title="Cerrar Sesión"
                            color="warning"
                            className="text-2xl"
                            onClick={handleLogout}
                        >
                            {<IconLogout />}Cerrar Sesión
                        </Button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <form
                className="flex flex-col justify-center items-center container gap-10 p-2 text-center"
                onSubmit={handleLogin}
            >
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex items-center justify-center text-2xl md:w-[20rem]">
                        <Input
                            label="Correo Electrónico"
                            placeholder="Escribe tu correo electrónico"
                            classNames={{
                                label: 'text-2xl',
                                input: ['text-2xl'],
                                errorMessage: 'text-2xl absolute',
                                inputWrapper: 'h-20',
                            }}
                            radius="sm"
                            type="email"
                            color={
                                validationState === 'invalid'
                                    ? 'danger'
                                    : 'primary'
                            }
                            errorMessage={
                                validationState === 'invalid' &&
                                'Ingrese un correo válido'
                            }
                            validationState={validationState}
                            onValueChange={setEmail}
                            value={email}
                        />
                    </div>
                    <div className="flex items-center justify-center text-2xl md:w-[20rem]">
                        <Input
                            placeholder="Escribe tu contraseña"
                            label="Contraseña"
                            color="primary"
                            classNames={{
                                label: 'text-2xl',
                                input: ['text-2xl'],
                                errorMessage: 'text-2xl',
                                inputWrapper: 'h-20',
                            }}
                            radius="sm"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-2 flex-wrap justify-center items-center">
                    {botonOlvideContra && (
                        <div className="">
                            <Button
                                onClick={() => {
                                    router.push('/recuperar-password');
                                }}
                                className="text-2xl"
                                color="warning"
                                type="button"
                                title="He olvidado mi contraseña"
                                isLoading={spinner}
                            >
                                <IconCloudLockOpen />
                                He olvidado mi contraseña
                            </Button>
                        </div>
                    )}
                    <div className="">
                        <Button
                            className="text-2xl"
                            color="primary"
                            type="submit"
                            title="Iniciar Sesión"
                            isLoading={spinner}
                        >
                            <IconUserCheck />
                            Iniciar Sesión
                        </Button>
                    </div>

                    <div className="">
                        <Button
                            onClick={() => {
                                router.push('/registro-de-usuario');
                            }}
                            className="text-2xl"
                            color="primary"
                            type="button"
                            title="Registrarse"
                            isLoading={spinner}
                        >
                            <IconUserPlus />
                            Registrarse
                        </Button>
                    </div>
                </div>
            </form>
        );
    }
}

export default SessionPanel;
