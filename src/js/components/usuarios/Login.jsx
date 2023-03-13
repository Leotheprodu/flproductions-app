import { IconUserCheck, IconLogout, IconUserPlus } from "@tabler/icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setSession } from "../redux/userActions";

function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const isLoggedIn = useSelector(state => state.user.session.isLoggedIn);
    const userInfo = useSelector(state => state.user.session.user);

    useEffect(() => {
        checkLoggedIn();
    }, []);

    const checkLoggedIn = () => {
        fetch(`${process.env.NODE_ENV==='production' ? 'https://flproductionscr.com/' : 'http://localhost:5000/'}api/check-session`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if(data.isLoggedIn) {
                    dispatch(setSession(data));

                }
                
            
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const handleLogin = (e) => {
        e.preventDefault();
        fetch(`${process.env.NODE_ENV==='production' ? 'https://flproductionscr.com/' : 'http://localhost:5000/'}api/login`, {
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
                    dispatch(setSession(data));
                } else {
                    alert("Lo sentimos, para poder Iniciar Sesión debes estar registrado(a)")
                }

            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleLogout = (e) => {
        e.preventDefault();
        fetch(`${process.env.NODE_ENV==='production' ? 'https://flproductionscr.com/' : 'http://localhost:5000/'}api/logout`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch(setSession(data));
            })
            .catch((error) => {
                 console.log(error);
            })
    };

    if (isLoggedIn) {
        return (
            <div className="login_container">
                <p> {userInfo.username}, sesión iniciada</p>
                <div className="login_buttons">

                    <button title="Cerrar Sesión" onClick={handleLogout}>{<IconLogout />}</button>


                </div>
            </div>
        );
    } else {
        return (
            <form className="login_container" onSubmit={handleLogin}>
                <div className="login__form">

                    <div className="login_container_input">
                        <label htmlFor="email">
                            Correo electrónico:
                        </label>
                        <input
                            type="email"
                            
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>
                    <div className="login_container_input">
                        <label htmlFor="password">
                            Contraseña:
                        </label>
                        <input
                        
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>
                </div>
                <div className="login_buttons">

                    <button type="submit" title="Iniciar Sesión">{<IconUserCheck />}</button>

                    <a href="/registro-usuario">
                        <button type="button" title="Registrarse">{<IconUserPlus />}</button>
                    </a>
                </div>
            </form>
        );
    }
}

export default Login;