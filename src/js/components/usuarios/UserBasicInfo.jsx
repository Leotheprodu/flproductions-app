

import { IconBan, IconCircleCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSession } from '../redux/userActions';

export const UserBasicInfo = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.session.user);
  const userRoles = useSelector(state => state.user.session.roles);
  const [username, setUserName] = useState(userInfo.username);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [formStatus, setFormStatus] = useState('');
  const [clasePass, setClasePass] = useState('');
  const [statusenviado, setStatusEnviado] = useState(false);
  const [disabled, setDisabled] = useState('disabled');

  const refreshUserSession = () => {
    fetch(`${process.env.NODE_ENV === 'production' ? 'https://flproductionscr.com/' : 'http://localhost:5000/'}api/usuarios/${userInfo.id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isLoggedIn) {
          dispatch(setSession(data));

        }


      })
      .catch((error) => {
        console.log(error);
      })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password1) {
      setFormStatus('Las contraseñas deben coincidir');
      return;
    }
    if (username.length > 15) {
      setFormStatus('el nombre de usuario debe tener maximo 15 caracteres');
      return;
    }


    const password2 = password === password1 && password !== null ? password : null;
    const datosActualizadosDeUsuario = { username: username, email: email, password: password2 !== null ? password2 : null };

    // Aquí puedes enviar los datos del formulario a tu servidor
    fetch(`${process.env.NODE_ENV === 'production' ? 'https://flproductionscr.com/' : 'http://localhost:5000/'}api/actualizar-usuarios/${userInfo.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify(datosActualizadosDeUsuario),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFormStatus('Se han actualizado los datos correctamente');
          setStatusEnviado(true);
          refreshUserSession();

        } else {
          alert("HUBO UN ERROR")
        }

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const hanldeOnBlurPassword = () => {
    if (password !== password1) {
      setClasePass('UserBasicInfo__Error');
      setFormStatus('Las contraseñas deben coincidir');
    } else {
      setClasePass('');
      setFormStatus('');
    }

  }
  const handleOnChangeNombreUsuario = (e) => {
    setUserName((e.target.value).trim());
    if ((e.target.value).length > 15) {
      setFormStatus('No esta permitido tener mas de 15 caracteres en el nombre de usuario');
    } else {
      setFormStatus('');
    }

  }
  const handleVerificarEmail = () => {

    const fechaultimaModificacion = new Date(userInfo.ultima_actualizacion);
    const fechaActual = new Date();
    // 2. Restar la fecha actual con la fecha de la tabla de SQL
    const diferenciaEnMilisegundos = fechaActual - fechaultimaModificacion;

    // 3. Convertir la diferencia en milisegundos a horas
    const diferenciaEnHoras = diferenciaEnMilisegundos / 3600000;
    // 4. Comparar la cantidad de horas con 1
    if (diferenciaEnHoras >= 0.25) {
      fetch(`${process.env.NODE_ENV === 'production' ? 'https://flproductionscr.com/' : 'http://localhost:5000/'}api/verificar-email/${email}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setFormStatus('Hemos reenviado el correo de verificacion, ve a revisarlo y verifica tu correo');
          setStatusEnviado(true);
        })
        .catch((error) => {
          console.log(error);
        })
    } else {
      alert('Para volver a enviar el correo de verificacion, debe haber pasado 15 minutos desde el ultimo cambio');
      return;
    }

  }


  return (
    <>
      <div className='contenedor__UserBasicInfo'>

        <form className="UserBasicInfo__form" onSubmit={handleSubmit}>
          <div className="UserBasicInfo__form__input">
            <label className="mb-3" htmlFor="name">Nombre de Usuario:</label>
            <input
              tabIndex={1}
              type="text"
              className="mb-3"
              value={username}
              onChange={handleOnChangeNombreUsuario}
              required
            />
          </div>
          <div className=" UserBasicInfo__form__input">
            <label onClick={() => setDisabled('')} className="mb-3" htmlFor="email">Correo Electronico:</label>
            <div className='UserBasicInfo__form__input__verified'>
              <input
                tabIndex={-1}
                type="email"
                value={email}
                className="mb-3"
                disabled={disabled}
                onChange={(e) => setEmail(e.target.value)}

              />
              {userRoles.includes(1) && <div><IconCircleCheck size={30} stroke={1} color='green' />Verificado</div>}

              {!userRoles.includes(1) &&
                <div className='UserBasicInfo__Email-No-verificado'>
                  <IconBan size={30} stroke={1} color='red' />
                  No Verificado
                  {!statusenviado &&
                    <button tabIndex={-1} onClick={handleVerificarEmail} type='button'>
                      Verificar?
                    </button>}

                </div>
              }

            </div>
          </div>
          <div className="UserBasicInfo__form__input">
            <label className="mb-3" htmlFor="password">Nueva Contraseña:</label>
            <input
            tabIndex={3}
              type="password"
              className={`mb-3 ${clasePass}`}
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}

            />
          </div>
          <div className="UserBasicInfo__form__input">
            <label className="mb-3" htmlFor="password">Nueva Contraseña:</label>
            <input
              type="password"

              className={`mb-3 ${clasePass}`}
              tabIndex={4}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={hanldeOnBlurPassword}
            />
          </div>
          <div>
            <p className="contact-form__mensaje-status">{formStatus}</p>
          </div>
          {!statusenviado &&

            <button tabIndex={5} type="submit">Guardar</button>

          }
        </form>
      </div>

    </>
  )
}
