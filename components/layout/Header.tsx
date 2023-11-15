import { IconMenu2 } from '@tabler/icons';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Link from 'next/link';
import { MainNavLinks, MovilNavLinks, fetchAPI } from '../';
export function Header() {
    const [isMovilUser, setIsMovilUser] = useState<boolean>(false);
    const [onClickMovilUser, setOnClickMovilUser] = useState<boolean>(false);
    const isLoggedIn = useSelector(
        (state: RootState) => state.user.session.isLoggedIn
    );
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
            <div className="contenedor__header__nav dark:text-blanco dark:bg-terciario/75 bg-blanco/75 ">
                <div className="header__nav__top-main-message">
                    <p>{mainMensaje}</p>
                </div>
                <div className="header__nav">
                    <div className="header__nav__titulo-links">
                        <Link
                            tabIndex={-1}
                            href="/"
                            className="header__web-tittle dark:text-secundario"
                        >
                            FLProductions
                        </Link>
                    </div>

                    {!isMovilUser && <MainNavLinks />}

                    {isMovilUser && (
                        <>
                            <div className="menu_celular">
                                <button
                                    onClick={() => {
                                        setOnClickMovilUser(!onClickMovilUser);
                                    }}
                                >
                                    <IconMenu2 />
                                </button>
                                <p>Menu</p>
                            </div>
                            <MovilNavLinks
                                onClickMovilUser={onClickMovilUser}
                                setOnClickMovilUser={setOnClickMovilUser}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
