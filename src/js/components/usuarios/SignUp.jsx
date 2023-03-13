import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector } from 'react-redux';




export const SignUp = () => {
/* const caca= useSelector(state => state.user.user.username)
console.log(caca); */
  /* const roles = useSelector(state => state.user.roles);

  if (!roles.includes(5)) {
    // Si el usuario no tiene el rol de administrador, no se muestra el componente
    return <div style={{ height: '100vh' }}><p>No tienes permiso de ver este contenido</p></div>;
  } */

  const isLoggedIn = useSelector(state => state.user.session.isLoggedIn)
  
  
  
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const fecha_creacion = new Date().toISOString().slice(0, 10);
  const captcha = useRef(null);
  const [formStatus, setFormStatus] = useState('')
  const [statusenviado, setStatusEnviado] = useState(false);
  
  const onChange = () => {
    if (captcha.current.getValue()) {
      setFormStatus('');
    }
  }
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('...registrando');
    if (captcha.current.getValue()) {
      // Aquí puedes enviar los datos del formulario a tu servidor
      fetch(`${process.env.NODE_ENV==='production' ? 'https://flproductionscr.com/' : 'http://localhost:5000/'}api/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({ email, password, username, fecha_creacion }),
      })
      .then(response => {
        if (response.status === 200) {
          setEmail('');
          setPassword('');
          setUserName('');
          setFormStatus('Usuario Registrado con exito');
          setStatusEnviado(true);
          
        } else if (response.status === 403) {
          setFormStatus('El correo ya existe en el sistema, usa un nuevo correo');
          return;
        }
        
      })
      .catch(error => {
        // Manejar el error aquí
        console.log(error);
      });
    } else setFormStatus('Por favor acepta el captcha');
  };
  
  if (isLoggedIn) {
  return <div style={{ height: '100vh' }}><p>Ya estas registrado y has iniciado sesion, no puedes volver a registrarte</p></div>;
  }

  return (
    <div className="contenedor signUp">

      {!statusenviado &&
        <form className="signUp__form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
              />
          </div>
          <div>
            <label htmlFor="email">Correo:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="recaptcha">
            <ReCAPTCHA
              ref={captcha}
              sitekey="6LdqhcAiAAAAAE8hwgEptpxIcQHsW_c2S_AfkFmw"
              onChange={onChange}
            />
          </div>
          <div>
                <p className="contact-form__mensaje-status">{formStatus}</p>
              </div>
          <button type="submit">Registrar</button>
        </form>
      }
      {statusenviado &&
        <div className="contenedor">
          <p className="contact-form__mensaje-status">{formStatus}, ir a <a href="/">inicio</a></p>
        </div>
      }
    </div>
  );

}
