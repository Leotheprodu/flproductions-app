import React from 'react';
import NavLink from '../helpers/NavLink';
export const MainNavLinks = () => {
    return (
        <nav className="header__links">
            <NavLink href="/" className="header__links__link">
                Inicio
            </NavLink>
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
            className={`header__links__movil ${
                onClickMovilUser ? 'selected' : ''
            }`}
        >
            <div onClick={() => setOnClickMovilUser(false)}>
                <NavLink href="/" className="header__links__link">
                    Inicio
                </NavLink>
            </div>
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
        </nav>
    );
};
