import { useState } from "react";
import { useEnvLink } from "../hooks/UseEnvLink";


export const SignUp = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const fecha_creacion = new Date().toISOString().slice(0, 10);
  const role_id = 1;
  const [envLink] = useEnvLink(process.env.NODE_ENV);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario a tu servidor
    fetch(`${envLink}api/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({ email, password, username, fecha_creacion, role_id }),
    })
      .then(response => {
        if (response.ok) {
          // La solicitud se ha completado correctamente
          // Redireccionar a la página de inicio
          response = new Response(null, { status: 302, headers: { "Location": "/" } });
        }
        return response;
      })
      .then(response => {
        setEmail('');
        setPassword('');
        setUserName('');
      })
      .catch(error => {
        // Manejar el error aquí
        console.log(error);
      });

  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Correo:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Registrar</button>
    </form>
  );

}
