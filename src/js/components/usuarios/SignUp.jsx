import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MetaInjector } from "../MetaInjector";
import { useDispatch, useSelector } from 'react-redux';
import { setSession } from "../redux/userActions";
import { Spinner } from "../helpers/Spinner";

export const SignUp = () => {

  const isLoggedIn = useSelector(state => state.user.session.isLoggedIn)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const fecha_creacion = new Date().toISOString().slice(0, 10);
  const captcha = useRef(null);
  const [formStatus, setFormStatus] = useState('');
  const [statusenviado, setStatusEnviado] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const onChange = () => {
    if (captcha.current.getValue()) {
      setFormStatus('');
    }
  }
  const loginNewUser = () => {
    fetch(`${process.env.NODE_ENV === 'production' ? 'https://flproductionscr.com/' : 'http://localhost:5000/'}api/login`, {
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
          alert("Datos inválidos, correo o contraseña incorrecta o regístrate")
        }

      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setSpinner(true);
    if (username.length > 15) {
      setFormStatus('el nombre de usuario debe tener maximo 15 caracteres');
      setSpinner(false);
      return;
    }
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
            setSpinner(false);
            setFormStatus('Listo!, te hemos enviado un correo de verificacion, porfavor verifica tu email');
            setStatusEnviado(true);
            loginNewUser();
          } else if (response.status === 403) {
            setFormStatus('El correo ya existe en el sistema, usa un nuevo correo');
            setSpinner(false);
            return;
          }

        })
        .catch(error => {
          // Manejar el error aquí
          console.log(error);
        });
    } else setFormStatus('Por favor acepta el captcha');
  };

  const handleOnChangeNombreUsuario = (e) => {
    setUserName((e.target.value).trim());
    if ((e.target.value).length > 15) {
      setFormStatus('No esta permitido tener mas de 15 caracteres en el nombre de usuario');
    } else {
      setFormStatus('');
    }

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
                  onChange={handleOnChangeNombreUsuario}
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
              {!spinner ? <button type="submit">Registrar</button> : <Spinner />}




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
              <button className="login_buttons__button__registrar" onClick={() => { navigate(-1) }} type="button" title="Volver atrás">Volver</button>
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
