import { IconUser, IconMenu2 } from '@tabler/icons';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Link from 'next/link';
import SessionPanel from '../users/SessionPanel';
import { MainNavLinks, MovilNavLinks, UserAvatar, fetchAPI } from '../';
import { IconLogin } from '@tabler/icons-react';
export function Header() {
    const [UserButton, setUserButton] = useState<boolean>(false);
    const [isMovilUser, setIsMovilUser] = useState<boolean>(false);
    const [onClickMovilUser, setOnClickMovilUser] = useState<boolean>(false);
    const isLoggedIn = useSelector(
        (state: RootState) => state.user.session.isLoggedIn
    );

    const user = useSelector((state: RootState) => state.user.session.user);
    const [mainMensaje, setMainMensaje] = useState<string>('');
    const apiUrl =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_USER_GENERAL_MESSAGES
            : process.env.NEXT_PUBLIC_DEV_USER_GENERAL_MESSAGES;

    useEffect(() => {
        window.innerWidth <= 768 ? setIsMovilUser(true) : setIsMovilUser(false);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await fetchAPI({ url: apiUrl });
            if (data) {
                const mensaje_General_Todos = data.filter(
                    (item) => item.tipo_de_mensaje === 'mainTop'
                );

                setMainMensaje(mensaje_General_Todos[0].mensaje);

                if (isLoggedIn) {
                    setMainMensaje(`${mensaje_General_Todos[0].mensaje}`);
                }
            } else {
                setMainMensaje('Bienvenid(a) a FLProductions');
            }
        };
        fetchData();
    }, [isLoggedIn]);

    return (
        <>
            <div className="contenedor__header__nav">
                <div className="header__nav__top-main-message">
                    <p>{mainMensaje}</p>
                </div>
                <div className="header__nav">
                    <div className="header__nav__titulo-links">
                        <Link
                            tabIndex={-1}
                            href="/"
                            className="header__web-tittle"
                        >
                            FLProductions
                        </Link>
                    </div>

                    <div className="header__nav_boton_usuarios">
                        <div
                            title="Opciones de Sesión"
                            onClick={() => {
                                setUserButton(!UserButton);
                            }}
                            className="header__nav_boton"
                        >
                            <div style={{ opacity: '1' }}>
                                {!isLoggedIn ? (
                                    <IconLogin size={20} />
                                ) : (
                                    <UserAvatar user_id={user.id} size={3} />
                                )}
                            </div>

                            <p className="header__nav_boton__text">
                                {isLoggedIn ? null : 'Acceder'}
                            </p>
                        </div>

                        <div
                            className={`header__nav_boton_usuarios_login ${
                                UserButton ? 'selected' : ''
                            }`}
                        >
                            <SessionPanel setUserButton={setUserButton} />
                        </div>
                    </div>
                    {!isMovilUser && <MainNavLinks />}

                    {isMovilUser && (
                        <div className="menu_celular">
                            <button
                                onClick={() => {
                                    setOnClickMovilUser(!onClickMovilUser);
                                }}
                            >
                                <IconMenu2 />
                            </button>
                            <p>menu</p>
                        </div>
                    )}
                    <MovilNavLinks
                        onClickMovilUser={onClickMovilUser}
                        setOnClickMovilUser={setOnClickMovilUser}
                    />
                </div>
            </div>
        </>
    );
}