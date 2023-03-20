
import { IconCheckbox } from '@tabler/icons';
import { IconBan, IconCircleCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';


export const UserBasicInfo = () => {
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('...Usuario Actualizado');
    const datosActualizadosDeUsuario = JSON.stringify([userInfo.id, password === password1 && password !== '' ? password : null, username !== userInfo.username ? username : null, email !== userInfo.email ? email : null ])

    // Aquí puedes enviar los datos del formulario a tu servidor
    
    console.log(datosActualizadosDeUsuario)
  };
  
  const hanldeOnBlur = () => {
    if (password !== password1) {
      setClasePass('UserBasicInfo__Error');
      setFormStatus('Las contraseñas deben coincidir');
    } else {
      setClasePass('');
      setFormStatus('');
    }

  }
  const handleVerificarEmail = () => {
    setFormStatus('Hemos reenviado el correo de verificacion, ve a revisarlo y verifica tu correo');
    setStatusEnviado(!statusenviado);
  }


  return (
    <>
      <div className='contenedor__UserBasicInfo'>

        <form className="UserBasicInfo__form" onSubmit={handleSubmit}>
          <div className="UserBasicInfo__form__input">
            <label className="mb-3" htmlFor="name">Nombre de Usuario:</label>
            <input
              type="text"
              className="mb-3"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className=" UserBasicInfo__form__input">
            <label onClick={() => setDisabled('')} className="mb-3" htmlFor="email">Correo:</label>
            <div className='UserBasicInfo__form__input__verified'>
              <input
                type="email"
                value={email}
                className="mb-3"
                disabled={disabled}
                onChange={(e) => setEmail(e.target.value)}

              />
              {userRoles.includes(1) && <div><IconCircleCheck size={30} stroke={1} color='green' />Correo Verificado</div>}

              {!userRoles.includes(1) && 
              <div>
                <IconBan stroke={1} color='red' />
                Correo No Verificado 
                {!statusenviado &&
                <button onClick={handleVerificarEmail} type='button'>
                  Verificar
                </button>}
                
                </div>
                }

            </div>
          </div>
          <div className="UserBasicInfo__form__input">
            <label className="mb-3" htmlFor="password">Nueva Contraseña:</label>
            <input
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={hanldeOnBlur}
            />
          </div>
          <div>
            <p className="contact-form__mensaje-status">{formStatus}</p>
          </div>
          <button type="submit">Guardar</button>
        </form>
      </div>

    </>
  )
}
