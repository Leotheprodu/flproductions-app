import { HelmetProvider } from 'react-helmet-async';
import { LinksPanel, MetaInjector } from '../components';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { IconMenu2, IconSettingsFilled } from '@tabler/icons-react';

export const ControlPanel = () => {
    const isLoggedIn = useSelector(state => state.user.session.isLoggedIn);
    const [isMovilUser, setIsMovilUser] = useState(false);
    const [onClickMovilUser, setOnClickMovilUser] = useState(false);


    useEffect(() => {
        if (window.innerWidth <= 768) {
            setIsMovilUser(true);
        } else {
            setIsMovilUser(false);
        }
    }, [])

    const handleClickMovilUser = () => {
        setOnClickMovilUser(!onClickMovilUser)
    
    
      }

    if (!isLoggedIn) {
        return (
            <div className="vh100 contenedor">
                <p className="contact-form__mensaje-status__signup">Debes iniciar sesión para entrar al panel de control</p>
                <div className="login_buttons__button__status">
                    <a href="/iniciar-sesion">
                        <button className="login_buttons__button__registrar" type="button" title="Iniciar Sesión">Iniciar Sesión</button>
                    </a>
                    <a href="/registro-de-usuario">
                        <button className="login_buttons__button__registrar" type="button" title="Registro de Usuario">Registrarse</button>
                    </a>
                    <button className="login_buttons__button__registrar" onClick={() => { navigate(-1) }} type="button" title="Volver atrás">Volver Atrás</button>
                </div>

            </div>

        )
    } else {
        return (
            <HelmetProvider>

                <MetaInjector
                    title='Panel de Control'
                    description='Panel de control de los usuarios de FLProductions'
                    type='website'
                    url='https://flproductionscr.com/panel-de-control'
                    image='https://flproductionscr.com/build_main/img/header-main.png'
                    keywords='estudio de grabacion, produccion musical, panel de control, perfil, usuario'
                    robots='index, follow'
                />
                <div className="panel-de-control">
                    <div className={`panel-de-control__menu ${onClickMovilUser ? "selected" : ""} ${!isMovilUser ? "normal" : ""}`}>
                        <LinksPanel />
                    </div>
                    {
                        isMovilUser &&
                        <div className='panel-de-control__menu_celular'>
                            <button onClick={handleClickMovilUser}><IconSettingsFilled /></button>
                        </div>
                    }
                    <div className=''>
                        <Outlet />
                    </div>
                </div>


            </HelmetProvider>
        )
    }
}
