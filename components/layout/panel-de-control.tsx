import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    LinksPanel,
    fetchAPI,
    useUserMovilDeviceChecker,
    setSession,
    RootState,
} from '..';
import { IconSettingsFilled } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
    children: React.ReactNode;
}

export const ControlPanel = ({ children }: Props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(
        (state: RootState) => state.user.session.isLoggedIn
    );
    const [isMovilUser, onClickMovilUser, setOnClickMovilUser] =
        useUserMovilDeviceChecker();
    const apiUrl =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_AUTH_CHECK_SESSION
            : process.env.NEXT_PUBLIC_DEV_AUTH_CHECK_SESSION;
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await fetchAPI({ url: apiUrl });
            if (data) {
                dispatch(setSession(data));
            }
        };
        fetchData();
    }, [isLoggedIn]);
    const handleClickMovilUser = () => {
        if (typeof setOnClickMovilUser === 'function') {
            setOnClickMovilUser(!onClickMovilUser);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="vh100 contenedor">
                <p className="contact-form__mensaje-status__signup">
                    Debes iniciar sesión para entrar al panel de control
                </p>
                <div className="login_buttons__button__status">
                    <Link href="/iniciar-sesion">
                        <button
                            className="login_buttons__button__registrar"
                            type="button"
                            title="Iniciar Sesión"
                        >
                            Iniciar Sesión
                        </button>
                    </Link>
                    <Link href="/registro-de-usuario">
                        <button
                            className="login_buttons__button__registrar"
                            type="button"
                            title="Registro de Usuario"
                        >
                            Registrarse
                        </button>
                    </Link>
                    <button
                        className="login_buttons__button__registrar"
                        onClick={() => {
                            router.back;
                        }}
                        type="button"
                        title="Volver atrás"
                    >
                        Atrás
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <div className="panel-de-control">
                    <div
                        className={`panel-de-control__menu ${
                            onClickMovilUser ? 'selected' : ''
                        } ${!isMovilUser ? 'normal' : ''}`}
                    >
                        <LinksPanel />
                    </div>
                    {isMovilUser && (
                        <div className="panel-de-control__menu_celular">
                            <button onClick={handleClickMovilUser}>
                                <IconSettingsFilled />
                            </button>
                        </div>
                    )}
                    <div className="panel-de-control__contenedor-Pages">
                        {children}
                    </div>
                </div>
            </>
        );
    }
};
