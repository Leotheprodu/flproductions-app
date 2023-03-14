import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MetaInjector } from "../MetaInjector";

export const SignUp = () => {
  /* const caca= useSelector(state => state.user.user.username)
  console.log(caca); */
  /* const roles = useSelector(state => state.user.roles);

  if (!roles.includes(5)) {
    // Si el usuario no tiene el rol de administrador, no se muestra el componente
    return <div style={{ height: '100vh' }}><p>No tienes permiso de ver este contenido</p></div>;
  } */

  const isLoggedIn = useSelector(state => state.user.session.isLoggedIn)


  const navigate = useNavigate();
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
      fetch(`${process.env.NODE_ENV === 'production' ? 'https://flproductionscr.com/' : 'http://localhost:5000/'}api/signup`, {
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
    navigate(-1);
  }

  return (
    <HelmetProvider>
      <MetaInjector
        title='Registro de Usuario'
        description='Pagina de Registro de Usuario de FLProductions'
        type='website'
        url='https://flproductionscr.com/registro-de-usuario'
        image='https://flproductionscr.com/build_main/img/header-main.png'
        keywords='estudio de grabacion, produccion musical, registro, signup, usuario'
        robots='index, follow'
      />
      <div className="contenedor signUp">

        {!statusenviado &&
          <>
            <form className="signUp__form" onSubmit={handleSubmit}>
              <div className="signUp__form__input">
                <label className="mb-3" htmlFor="name">Nombre de Usuario:</label>
                <input
                  type="text"
                  className="mb-3"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className=" signUp__form__input">
                <label className="mb-3" htmlFor="email">Correo:</label>
                <input
                  type="email"
                  value={email}
                  className="mb-3"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="signUp__form__input">
                <label className="mb-3" htmlFor="password">Contraseña:</label>
                <input
                  type="password"
                  className="mb-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 recaptcha">
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
            <p>o</p>
            <div className="login_buttons__button">
              <a href="/iniciar-sesion">
                <button className="login_buttons__button__registrar" type="button" title="Registrarse">Iniciar Sesión</button>
              </a>

            </div>
          </>

        }
        {statusenviado &&
          <div className="contenedor">
            <p className="contact-form__mensaje-status__signup">{formStatus}</p>
            <div className="login_buttons__button__status">
              <button className="login_buttons__button__registrar" onClick={() => { navigate(-1) }} type="button" title="Volver atrás">Volver atrás</button>
              <a href="/panel-de-control">
                <button className="login_buttons__button__registrar" type="button" title="ir a Panel de Control">Panel de Control</button>
              </a>
            </div>

          </div>
        }
      </div>
    </HelmetProvider>
  );

}
