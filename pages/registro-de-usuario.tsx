import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from 'next/router'
import { HeadMetaInfo } from '../components/helpers/HeadMetaInfo';
import { useDispatch } from 'react-redux';
import { setSession } from "../components/redux/userActions";
import { Spinner } from "../components/helpers/Spinner";
import Link from "next/link";

function SignUp() {

  const dispatch = useDispatch();
  const router = useRouter();
  const [username, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const fecha_creacion: string = new Date().toISOString().slice(0, 10);
  const captcha = useRef(null);
  const [formStatus, setFormStatus] = useState<string>('');
  const [statusenviado, setStatusEnviado] = useState<boolean>(false);
  const [spinner, setSpinner] = useState<boolean>(false);
  const onChange = () => {
    if (captcha.current.getValue()) {
      setFormStatus('');
    }
  }
  const loginNewUser = () => {
    fetch(`${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PROD_AUTH_LOGIN : process.env.NEXT_PUBLIC_DEV_AUTH_LOGIN}`, {
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
      fetch(`${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PROD_USER_SIGNUP : process.env.NEXT_PUBLIC_DEV_USER_SIGNUP}`, {
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
    <>
      <HeadMetaInfo
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
              <Link href="/iniciar-sesion">
                <button className="login_buttons__button__registrar" type="button" title="Registrarse">Iniciar Sesión</button>
              </Link>

            </div>
          </>

        }
        {statusenviado &&
          <div className="contenedor">
            <p className="contact-form__mensaje-status__signup">{formStatus}</p>
            <div className="login_buttons__button__status">
              <button className="login_buttons__button__registrar" onClick={() => { router.back() }} type="button" title="Volver atrás">Volver</button>
              <Link href="/panel-de-control">
                <button className="login_buttons__button__registrar" type="button" title="ir a Panel de Control">Panel de Control</button>
              </Link>
            </div>

          </div>
        }
      </div>
    </>
  );

}


export default SignUp;