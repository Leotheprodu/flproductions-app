import { IconLockSquareRoundedFilled, IconMail } from "@tabler/icons-react";
import { useState } from "react";
import { CountdownTimer, Spinner } from "../components";
import { useRouter } from 'next/router'



function RecuperarPassword () {

    const router = useRouter();
    const [switchButton, setSwitchButton] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [pin, setPin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [password1, setPassword1] = useState<string>('');
    const [formStatus, setFormStatus] = useState<string>('');
    const [spinner, setSpinner] = useState<boolean>(false);
    const [procesoTerminado, setProcesoTerminado] = useState<boolean>(false);


    const handleEmail = (e) => {
        e.preventDefault();
        setSpinner(true);
        if (email !== '') {
            fetch(`${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PROD_USER_RECUPERAR_PASSWORD : process.env.NEXT_PUBLIC_DEV_USER_RECUPERAR_PASSWORD}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({ email }),
            })
                .then(response => {
                    if (response.status === 200) {
                        setSwitchButton(true);
                        setSpinner(false);
                        setTimeout(function () {

                            setSwitchButton(false);

                        }, 600000);

                    } else if (response.status === 500 || response.status === 404) {
                        setFormStatus('El correo no existe en el sistema, solo usuarios registrados pueden cambiar una contraseña');
                        setTimeout(function () {
                            setFormStatus('');
                            setSpinner(false);
                        }, 5000);
                        return;
                    } else if (response.status === 429) {
                        setFormStatus('Has enviado muchas solicitudes de correo, ententalo de nuevo en un momento');
                        setSpinner(false);
                        return;
                    }

                })
                .catch(error => {
                    // Manejar el error aquí
                    console.log(error);
                });


        }else{
            setSpinner(false);
            setFormStatus('el email no puede estar en blanco');
                        setTimeout(function () {
                            setFormStatus('');
                            setSpinner(false);
                        }, 5000);
                        return;
        }

    }

    const handleNewPassword = (e) => {
        e.preventDefault();
        setSpinner(true);
        if (pin !== '' && password === password1) {
            fetch(`${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PROD_USER_RECUPERAR_PASSWORD_PASO2 : process.env.NEXT_PUBLIC_DEV_USER_RECUPERAR_PASSWORD_PASO2}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({ email, password, pin }),
            })
                .then(response => {
                    
                    if (response.status === 200) {
                        setProcesoTerminado(true);
                        setFormStatus('Contraseña actualizada exitosamente')
                        setSpinner(false);

                    } else if (response.status === 500) {
                        setFormStatus('Ha habido un problema, vuelva a intentarlo mas tarde');
                        return;
                    } else if (response.status === 404) {
                        setFormStatus('El PIN es incorrecto o ha caducado');
                        setTimeout(function () {
                            setFormStatus('');
                        }, 5000);
                        return;
                    }

                })
                .catch(error => {
                    // Manejar el error aquí
                    console.log(error);
                });


        } else {
            setFormStatus('Revisa que las contraseñas coincidan, ademas que el pin sea el enviado por email');
            return;
        }
    }

    const hanldeOnBlur = () => {
        if (password !== password1) {

            setFormStatus('Las contraseñas deben coincidir');
        } else {

            setFormStatus('');
        }

    }
    if (procesoTerminado) {

        return (
            
            <div className="RecuperarPassword-contenedor">
                <div className="login_buttons__button__status">
                    <button className="login_buttons__button__registrar" onClick={() => { router.back() }} type="button" title="Volver atrás">Atras</button>
                    <a href="/panel-de-control">
                        <button className="login_buttons__button__registrar" type="button" title="ir a Panel de Control">Panel de Control</button>
                    </a>
                    <a href="/iniciar-sesion">
                        <button className="login_buttons__button__registrar" type="button" title="ir a login">Iniciar Sesion</button>
                    </a>
                </div>
            </div>
        )
    } else {

        return (
            <div className="RecuperarPassword-contenedor">
                {!switchButton &&


                    <form className="RecuperarPassword" onSubmit={handleEmail}>


                        <div className="login__form">

                            <div className="login_container_input">
                                <label htmlFor="email">
                                    Correo electrónico:
                                </label>
                                <input tabIndex={1}
                                    type="email"

                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                            </div>


                        </div>
                        {formStatus &&
                            <div>
                                <p className="contact-form__mensaje-status">{formStatus}</p>
                            </div>

                        }

                        {!formStatus &&

                            <div className="login_buttons">

                                <div className="login_buttons__button">
                                    {!spinner &&
                                        <button tabIndex={2} type="submit" title="Iniciar Sesión"><IconMail />Enviar Correo</button>
                                    }
                                    {spinner &&
                                        <Spinner />
                                    }

                                </div>

                            </div>
                        }


                    </form>
                }
                {switchButton &&

                    <>
                        <h2>Revisa tu bandeja de correo electrónico y copia el PIN</h2>
                        <form className="RecuperarPassword" onSubmit={handleNewPassword}>
                            <div className="login__form">

                                <div className="login_container_input">
                                    <label htmlFor="text">
                                        PIN:
                                    </label>
                                    <input
                                        tabIndex={1}
                                        type="text"
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value)}
                                    />

                                </div>


                                <div className="login_container_input">
                                    <label htmlFor="password">
                                        Nueva Contraseña:
                                    </label>
                                    <input
                                        tabIndex={2}
                                        type="password"
                                        value={password1}
                                        onChange={(e) => setPassword1(e.target.value)}
                                    />

                                </div>
                                <div className="login_container_input">
                                    <label htmlFor="password">
                                        Nueva Contraseña:
                                    </label>
                                    <input
                                        tabIndex={3}
                                        onBlur={hanldeOnBlur}
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                </div>
                            </div>
                            <CountdownTimer segundos={600} />
                            {!formStatus &&

                                <div className="login_buttons">

                                    <div className="login_buttons__button">

                                        <button type="submit" tabIndex={4} title="Iniciar Sesión"><IconLockSquareRoundedFilled />Enviar</button>

                                    </div>

                                </div>
                            }
                        </form>

                        {formStatus &&
                            <div>
                                <p className="contact-form__mensaje-status">{formStatus}</p>
                            </div>

                        }
                    </>
                }

            </div>
        )
    }

}

export default RecuperarPassword;