import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setSession } from "../redux/userActions";
import { useNavigate  } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MetaInjector } from "../MetaInjector";


export const Login = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.session.isLoggedIn)
  const navigate = useNavigate();
  const formStatus = 'Ya has iniciado sesion, le vamos a dirigir a la pagina anterior.'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = (e) => {
    e.preventDefault();
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

  if (isLoggedIn) {
    setTimeout(() => {
      navigate(-1, {replace: true});
    }, 3000);

  }

  return (
    <HelmetProvider>
      <MetaInjector
        title='Inicio de Session'
        description='Incio de Session'
        type='website'
        url='https://flproductionscr.com/iniciar-sesion'
        image='https://flproductionscr.com/build_main/img/header-main.png'
        keywords='estudio de grabacion, produccion musical, sesion, login, usuario'
        robots='index, follow'
      />
      <div className="contenedor signUp">
        {isLoggedIn &&
          <div className="contenedor">
            <p className="contact-form__mensaje-status__signup">{formStatus}</p>

          </div>
        }
        {!isLoggedIn &&
          <>
            <form className="signUp__form" onSubmit={handleLogin}>
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
              <button type="submit">Iniciar Sesión</button>
            </form>
            <p>o</p>
            <div className="login_buttons__button">
              <a href="/registro-de-usuario">
                <button className="login_buttons__button__registrar" type="button" title="Registrarse">Registrarse</button>
              </a>

            </div>
          </>
        }

      </div>
    </HelmetProvider>
  );

}
