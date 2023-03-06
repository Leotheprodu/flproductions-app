import { useState, useEffect } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        checkLoggedIn();
    }, []);
    
    const checkLoggedIn = () => {
        fetch("http://localhost:5000/api/check-session", { 
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            if (data.isLoggedIn) {
                setIsLoggedIn(true);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };
    
    const handleLogin = () => {
        fetch("http://localhost:5000/api/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                
            },
            body: JSON.stringify({ email, password }),
        })
        .then((res) => res.json())
        .then((data) => {
            setIsLoggedIn(true);
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });
    };
    
    const handleLogout = () => {
        fetch("http://localhost:5000/api/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setIsLoggedIn(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if (isLoggedIn) {
        return (
            <div>
                <p>Bienvenido, has iniciado sesión exitosamente.</p>
                <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
        );
    } else {
        return (
            <div>
                <label>
                    Correo electrónico:
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    Contraseña:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button onClick={handleLogin}>Iniciar sesión</button>
            </div>
        );
    }
}

export default Login;