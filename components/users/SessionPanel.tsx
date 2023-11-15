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
import { setSession } from '../redux/userActions';
import { useRouter } from 'next/router';
import { RootState } from '../redux/store';
import { fetchAPI } from '../';
import { Button } from '@nextui-org/button';
import { toast } from 'react-hot-toast';
import { Link } from '@nextui-org/react';

function SessionPanel() {
    const router = useRouter();
    const dispatch = useDispatch();
    const isLoggedIn =
        useSelector((state: RootState) => state.user.session.isLoggedIn) ||
        false;
    const music = useSelector((state: RootState) => state.user.session.music);
    const userInfo = useSelector((state: RootState) => state.user.session.user);
    const userRoles: [number] =
        useSelector((state: RootState) => state.user.session.roles) || [];
    const [botonOlvideContra, setBotonOlvideContra] = useState<boolean>(false);
    const [spinner, setSpinner] = useState<boolean>(false);
    const apiUrlCheckSession =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_AUTH_CHECK_SESSION
            : process.env.NEXT_PUBLIC_DEV_AUTH_CHECK_SESSION;

    const apiUrlLogout =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_AUTH_LOGOUT
            : process.env.NEXT_PUBLIC_DEV_AUTH_LOGOUT;
    const checkLoggedIn = async () => {
        try {
            const { data } = await fetchAPI({ url: apiUrlCheckSession });
            if (data.isLoggedIn) {
                dispatch(setSession({ ...data, music }));
                toast.success(`Bienvenido! ${data.user.username}`);
            }
        } catch (error) {
            console.log(error);
            toast.error('Debes Iniciar sesion');
        }
    };

    useEffect(() => {
        checkLoggedIn();
    }, []);
    const handleLogout = async (e) => {
        e.preventDefault();
        setSpinner(true);
        const { data } = await fetchAPI({ url: apiUrlLogout });
        if (data) {
            dispatch(setSession({ ...data, music }));
            setSpinner(false);
            toast.success(
                `Adios! ${userInfo.username}, espero que vuelvas pronto!`
            );
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
            <form className="flex flex-col justify-center items-center container gap-10 p-2 text-center">
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
                    <div className="w-[15rem]">
                        <Link
                            className="text-2xl"
                            color="primary"
                            title="Iniciar Sesión"
                            href="/iniciar-sesion"
                        >
                            <IconUserCheck />
                            Iniciar Sesión
                        </Link>
                    </div>

                    <div className="">
                        <Link
                            className="text-2xl"
                            color="primary"
                            title="Registrarse"
                            href="/registro-de-usuario"
                        >
                            <IconUserPlus />
                            Registrarse
                        </Link>
                    </div>
                </div>
            </form>
        );
    }
}

export default SessionPanel;
