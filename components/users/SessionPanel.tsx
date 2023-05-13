import {
    IconUserCheck,
    IconLogout,
    IconUserPlus,
    IconSettingsFilled,
    IconCloudLockOpen,
} from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSession } from '../redux/userActions';
import { Spinner } from '../helpers/Spinner';
import { RootState } from '../redux/store';
import Link from 'next/link';
import { fetchAPI } from '../helpers/fetchAPI';

function SessionPanel() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const isLoggedIn = useSelector(
        (state: RootState) => state.user.session.isLoggedIn
    );
    const userInfo = useSelector((state: RootState) => state.user.session.user);
    const [botonOlvideContra, setBotonOlvideContra] = useState<boolean>(false);
    const [spinner, setSpinner] = useState<boolean>(false);
    const apiUrlCheckSession =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_AUTH_CHECK_SESSION
            : process.env.NEXT_PUBLIC_DEV_AUTH_CHECK_SESSION;
    const apiUrlLogin =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_AUTH_LOGIN
            : process.env.NEXT_PUBLIC_DEV_AUTH_LOGIN;

    const apiUrlLogout =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_AUTH_LOGOUT
            : process.env.NEXT_PUBLIC_DEV_AUTH_LOGOUT;
    const checkLoggedIn = async () => {
        const { data } = await fetchAPI({ url: apiUrlCheckSession });
        data.isLoggedIn && dispatch(setSession(data));
    };

    useEffect(() => {
        checkLoggedIn();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setSpinner(true);
        const { data, status } = await fetchAPI({
            url: apiUrlLogin,
            method: 'POST',
            body: { email, password },
        });
        if (status === 429) {
            setSpinner(false);
            alert(
                'muchos intentos de inicio de sesion, espere 15 minutos para volver a intentar o puede probar cambiar la contraseña'
            );
            return;
        }
        if (data.isLoggedIn) {
            dispatch(setSession(data));
            setSpinner(false);
        } else {
            alert(
                'Datos inválidos, correo o contraseña incorrecta o regístrate'
            );
            setBotonOlvideContra(true);
            setSpinner(false);
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        setSpinner(true);
        const { data } = await fetchAPI({ url: apiUrlLogout });
        if (data) {
            dispatch(setSession(data));
            setSpinner(false);
        }
    };
    if (isLoggedIn) {
        return (
            <div className="login_container">
                <p> {userInfo.username}, sesión iniciada</p>
                <div className="login_buttons">
                    <div className="login_buttons__button">
                        <p></p>
                        <Link href="/panel-de-control">
                            <button type="button" title="Panel de Control">
                                {<IconSettingsFilled />}Panel de Control
                            </button>
                        </Link>
                    </div>
                    <div className="login_buttons__button">
                        <p></p>
                        <button title="Cerrar Sesión" onClick={handleLogout}>
                            {<IconLogout />}Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <form className="login_container" onSubmit={handleLogin}>
                <div className="login__form">
                    <div className="login_container_input">
                        <label htmlFor="email">Correo electrónico:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="login_container_input">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                {!spinner && (
                    <div className="login_buttons">
                        {botonOlvideContra && (
                            <div className="login_buttons__button">
                                <Link href="/recuperar-password">
                                    <button
                                        type="button"
                                        title="He olvidado mi contraseña"
                                    >
                                        <IconCloudLockOpen />
                                        He olvidado mi contraseña
                                    </button>
                                </Link>
                            </div>
                        )}
                        <div className="login_buttons__button">
                            <button type="submit" title="Iniciar Sesión">
                                <IconUserCheck />
                                Iniciar Sesión
                            </button>
                        </div>

                        <div className="login_buttons__button">
                            <Link href="/registro-de-usuario">
                                <button type="button" title="Registrarse">
                                    <IconUserPlus />
                                    Registrarse
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
                {spinner && (
                    <div className="login_buttons">
                        <Spinner />
                    </div>
                )}
            </form>
        );
    }
}

export default SessionPanel;
