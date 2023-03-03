import React, { useState } from "react";

function Login() {
    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleEmailChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Enviamos la información de inicio de sesión al servidor
        fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            // Manejamos la respuesta del servidor
            if (response.ok) {
                console.log("Inicio de sesión exitoso!");
            } else {
                console.error("Inicio de sesión fallido.");
            }
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre de usuario:
                <input type="text" value={email} onChange={handleEmailChange} />
            </label>
            <label>
                Contraseña:
                <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <button type="submit">Iniciar sesión</button>
        </form>
    );
}

export default Login;