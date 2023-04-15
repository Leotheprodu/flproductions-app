import { LinksPanel } from '..';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { IconSettingsFilled } from '@tabler/icons-react';
import { setSession } from '../redux/userActions';
import { RootState } from '../redux/store';
import { HeadMetaInfo } from '../helpers/HeadMetaInfo';
import { useRouter } from 'next/router'


interface Props {
    children: React.ReactNode;
}

export const ControlPanel = ({ children }: Props) => {

    const router = useRouter()
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.user.session.isLoggedIn);
    const user = useSelector((state: RootState) => state.user.session.user);
    const [isMovilUser, setIsMovilUser] = useState<boolean>(false);
    const [onClickMovilUser, setOnClickMovilUser] = useState<boolean>(false);

    useEffect(() => {
        if (isLoggedIn) {
            refreshUserSession();
        }
    }, [isLoggedIn])

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

    const refreshUserSession = () => {
        fetch(`${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PROD_USER_RECUPERAR_USER_ID : process.env.NEXT_PUBLIC_DEV_USER_RECUPERAR_USER_ID}${user.id}`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.isLoggedIn) {
                    dispatch(setSession(data));

                }


            })
            .catch((error) => {
                console.log(error);
            })
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
                    <button className="login_buttons__button__registrar" onClick={() => { router.back; }} type="button" title="Volver atrás">Atrás</button>
                </div>

            </div>

        )
    } else {
        return (
            <>

                <HeadMetaInfo
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
                    <div className='panel-de-control__contenedor-Pages'>
                        {children}
                    </div>
                </div>


            </>
        )
    }
}
