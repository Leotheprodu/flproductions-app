import React from 'react';
import { Link } from '@nextui-org/link';
import NextLink from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import SessionPanel from '../users/SessionPanel';
export const MainNavLinks = () => {
    const isLoggedIn =
        useSelector((state: RootState) => state.user.session.isLoggedIn) ||
        false;
    return (
        <nav className="header__links">
            <div className="header__submenu-parent">
                <p className="header__links__link text-negro dark:text-blanco dark:hover:text-secundario hover:text-primario">
                    Nosotros
                </p>

                <div className="header__submenu dark:bg-terciario bg-gris">
                    <Link
                        href="/estudio"
                        color="primary"
                        underline="active"
                        size="lg"
                        className="text-2xl uppercase text-negro dark:text-beige hover:text-primario dark:hover:text-secundario"
                        as={NextLink}
                    >
                        Estudio
                    </Link>
                    <Link
                        href="/contacto"
                        color="primary"
                        underline="active"
                        size="lg"
                        className="text-2xl uppercase text-negro dark:text-beige hover:text-primario dark:hover:text-secundario"
                        as={NextLink}
                    >
                        Contacto
                    </Link>
                </div>
            </div>

            <div className="header__submenu-parent">
                <p className="header__links__link text-negro dark:text-blanco dark:hover:text-secundario hover:text-primario">
                    Musica
                </p>

                <div className="header__submenu bg-gris dark:bg-terciario ">
                    <Link
                        href="/canciones"
                        color="primary"
                        underline="active"
                        size="lg"
                        className="text-2xl uppercase text-negro dark:text-beige hover:text-primario dark:hover:text-secundario"
                        as={NextLink}
                    >
                        Canciones
                    </Link>
                </div>
            </div>
            <div className="header__submenu-parent">
                <p className="header__links__link text-negro dark:text-blanco dark:hover:text-secundario hover:text-primario">
                    Sesion
                </p>

                <div className="header__submenu dark:bg-terciario bg-gris">
                    <SessionPanel />
                </div>
            </div>
        </nav>
    );
};

export const MovilNavLinks = ({ onClickMovilUser, setOnClickMovilUser }) => {
    const handleCloseClick = () => {
        setTimeout(() => {
            setOnClickMovilUser(false);
        }, 1000);
    };
    return (
        <nav
            className={` dark:bg-negro p-6 flex flex-col gap-4 justify-center items-center absolute scale-105 top-32 inset-x-0 trasf bg-gris backdrop-blur ${
                onClickMovilUser ? 'visible opacity-100' : 'invisible opacity-0'
            }`}
        >
            <Link
                href="/estudio"
                color="primary"
                underline="hover"
                size="lg"
                className="text-3xl"
                as={NextLink}
                onClick={handleCloseClick}
            >
                Estudio
            </Link>

            <Link
                href="/contacto"
                color="primary"
                underline="hover"
                size="lg"
                className="text-3xl"
                as={NextLink}
                onClick={handleCloseClick}
            >
                Contacto
            </Link>

            <Link
                href="/canciones"
                color="primary"
                underline="hover"
                size="lg"
                className="text-3xl"
                as={NextLink}
                onClick={handleCloseClick}
            >
                Canciones
            </Link>

            <SessionPanel />
        </nav>
    );
};
