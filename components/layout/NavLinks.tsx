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
                    <NavLink
                        href="/estudio-flproductions"
                        className="header__links__link"
                    >
                        Estudio FLProductions
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

export const MovilNavLinks = ({ onClickMovilUser }) => {
    return (
        <nav
            className={`header__links__movil ${
                onClickMovilUser ? 'selected' : ''
            }`}
        >
            <NavLink href="/" className="header__links__link">
                Inicio
            </NavLink>
            <NavLink
                href="/estudio-flproductions"
                className="header__links__link"
            >
                Estudio Flproductions
            </NavLink>
            <NavLink href="/contacto" className="header__links__link">
                Contacto
            </NavLink>
            <NavLink href="/canciones" className="header__links__link">
                Canciones
            </NavLink>
            <NavLink href="/instrumentales" className="header__links__link">
                Instrumentales
            </NavLink>
        </nav>
    );
};
