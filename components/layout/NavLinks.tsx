import React from 'react';
import NavLink from '../helpers/NavLink';
import SessionPanel from '../users/SessionPanel';
export const MainNavLinks = () => {
    return (
        <nav className="header__links">
            <div className="header__submenu-parent">
                <p className="header__links__link__musica">Nosotros</p>

                <nav className="header__submenu">
                    <NavLink href="/estudio" className="header__links__link">
                        Estudio
                    </NavLink>
                    <NavLink href="/contacto" className="header__links__link">
                        Contacto
                    </NavLink>
                </nav>
            </div>

            <div className="header__submenu-parent">
                <p className="header__links__link__musica">Musica</p>

                <nav className="header__submenu">
                    <NavLink href="/canciones" className="header__links__link">
                        Canciones
                    </NavLink>
                    <NavLink
                        href="/instrumentales"
                        className="header__links__link"
                    >
                        Instrumentales
                    </NavLink>
                </nav>
            </div>
        </nav>
    );
};

export const MovilNavLinks = ({ onClickMovilUser, setOnClickMovilUser }) => {
    return (
        <nav
            className={` p-6 flex flex-col gap-4 justify-center items-center absolute  top-32 inset-x-0 bg-gris backdrop-blur ${
                onClickMovilUser ? 'visible opacity-100' : 'invisible opacity-0'
            }`}
        >
            <div onClick={() => setOnClickMovilUser(false)}>
                <NavLink href="/estudio" className="header__links__link">
                    Estudio
                </NavLink>
            </div>
            <div onClick={() => setOnClickMovilUser(false)}>
                <NavLink href="/contacto" className="header__links__link">
                    Contacto
                </NavLink>
            </div>
            <div onClick={() => setOnClickMovilUser(false)}>
                <NavLink href="/canciones" className="header__links__link">
                    Canciones
                </NavLink>
            </div>
            <div onClick={() => setOnClickMovilUser(false)}>
                <NavLink href="/instrumentales" className="header__links__link">
                    Instrumentales
                </NavLink>
            </div>

            <div className="bg-terciario w-full m-0 p-4 rounded-3xl ">
                <SessionPanel />
            </div>
        </nav>
    );
};
