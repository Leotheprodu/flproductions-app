import { useSelector } from 'react-redux';
import { LinksPanel, useUserMovilDeviceChecker, RootState } from '..';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from '@nextui-org/react';

interface Props {
    children: React.ReactNode;
}

export const ControlPanel = ({ children }: Props) => {
    const router = useRouter();
    const isLoggedIn =
        useSelector((state: RootState) => state.user.session.isLoggedIn) ||
        false;
    const [isMovilUser, onClickMovilUser, setOnClickMovilUser] =
        useUserMovilDeviceChecker();
    const handleClickMovilUser = () => {
        if (typeof setOnClickMovilUser === 'function') {
            setOnClickMovilUser(!onClickMovilUser);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className=" vh100 contenedor flex flex-col items-center">
                <p className="my-20 contact-form__mensaje-status__signup">
                    Debes iniciar sesión para entrar al panel de control
                </p>
                <div className=" flex flex-col gap-4">
                    <Button
                        className="text-3xl w-[20rem] "
                        color="danger"
                        type="button"
                        title="Iniciar Sesión"
                        onClick={() => {
                            router.push('/iniciar-sesion');
                        }}
                    >
                        Iniciar Sesión
                    </Button>

                    <Button
                        className="text-3xl w-[20rem] "
                        color="danger"
                        type="button"
                        title="Registro de Usuario"
                        onClick={() => {
                            router.push('/registro-de-usuario');
                        }}
                    >
                        Registrarse
                    </Button>

                    <Button
                        className="text-3xl w-[20rem] "
                        color="danger"
                        onClick={() => {
                            router.back;
                        }}
                        type="button"
                        title="Volver atrás"
                    >
                        Atrás
                    </Button>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <div className="panel-de-control">
                    <div
                        className={`panel-de-control__menu normal ${
                            onClickMovilUser ? 'selected' : ''
                        }`}
                    >
                        <LinksPanel
                            handleClickMovilUser={handleClickMovilUser}
                            isMovilUser={isMovilUser}
                        />
                    </div>
                    <div className="panel-de-control__contenedor-Pages">
                        {children}
                    </div>
                </div>
            </>
        );
    }
};
