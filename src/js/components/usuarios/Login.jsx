import { IconUserCheck, IconLogout, IconUserPlus } from "@tabler/icons";
import { useState, useEffect } from "react";
import { useEnvLink } from "../hooks/UseEnvLink";
import { useDispatch } from 'react-redux';
import { setRoles, setUser } from "../redux/userActions";

function Login() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [infoSession, setInfoSession] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [envLink] = useEnvLink(process.env.NODE_ENV);

    useEffect(() => {
        if (isLoggedIn) {
            fetch(`${envLink}api/usuarios/${infoSession.userId}`, {
                credentials: "include",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data) {
                        setUserInfo(data.user_data);

                    }
                })
                .catch((error) => {
                    /*  console.log(error); */
                });
        }
    }, [isLoggedIn])

    useEffect(() => {
        checkLoggedIn();
    }, [envLink]);

    const checkLoggedIn = () => {
        fetch(`${envLink}api/check-session`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.isLoggedIn) {
                    setIsLoggedIn(true);
                    setInfoSession(data);
                    dispatch(setUser(data.userId));
                    dispatch(setRoles(data.roles));
                }
            })
            .catch((error) => {
                /* console.log(error); */
            });
    };

    const handleLogin = () => {
        fetch(`${envLink}api/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.isLoggedIn) {
                    setIsLoggedIn(true);
                    setInfoSession(data);
                    dispatch(setUser(data.userId));
                    dispatch(setRoles(data.roles));
                } else {
                    alert("Lo sentimos, para poder Iniciar Sesión debes estar registrado(a)")
                }

            })
            .catch((error) => {
                /* console.log(error); */
            });
    };

    const handleLogout = () => {
        fetch(`${envLink}api/logout`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then(() => {
                setIsLoggedIn(false);
            })
            .catch((error) => {
                /*  console.log(error); */
            });
    };

    if (isLoggedIn) {
        return (
            <div className="login_container">
                <p> Hola, {userInfo.username} que bueno tenerte de vuelta</p>
                <div className="login_buttons">

                    <button title="Cerrar Sesión" onClick={handleLogout}>{<IconLogout />}</button>


                </div>
            </div>
        );
    } else {
        return (
            <div className="login_container">
                <div className="login__form">

                    <div className="login_container_input">
                        <label htmlFor="email">
                            Correo electrónico:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>
                    <div className="login_container_input">
                        <label htmlFor="password">
                            Contraseña:
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>
                </div>
                <div className="login_buttons">

                    <button title="Iniciar Sesión" onClick={handleLogin}>{<IconUserCheck />}</button>
                    <a href="/registro-usuario">
                        <button title="Registrarse">{<IconUserPlus />}</button>
                    </a>

                </div>
            </div>
        );
    }
}

export default Login;