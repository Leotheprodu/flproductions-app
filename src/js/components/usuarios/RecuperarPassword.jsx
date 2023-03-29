import { IconLockSquareRoundedFilled, IconMail } from "@tabler/icons-react";
import { useState } from "react";

export const RecuperarPassword = () => {

    const [switchButton, setSwitchButton] = useState(false);
    const [email, setEmail] = useState('');
    const [pin, setPin] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [formStatus, setFormStatus] = useState('');

    const handleEmail = (e) => {
        e.preventDefault();
        setSwitchButton(true);

    }

    const handleNewPassword = (e) => {
        e.preventDefault();

    }

    const hanldeOnBlur = () => {
        if (password !== password1) {

            setFormStatus('Las contraseñas deben coincidir');
        } else {

            setFormStatus('');
        }

    }


    return (
        <div className="RecuperarPassword-contenedor">
            {!switchButton &&


                <form className="RecuperarPassword" onSubmit={handleEmail}>


                    <div className="login__form">

                        <div className="login_container_input">
                            <label htmlFor="email">
                                Correo electrónico:
                            </label>
                            <input
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

                                <button type="submit" title="Iniciar Sesión"><IconMail />Enviar Correo</button>

                            </div>

                        </div>
                    }


                </form>
            }
            {switchButton &&


                <form className="RecuperarPassword" onSubmit={handleNewPassword}>
                    <div className="login__form">

                        <div className="login_container_input">
                            <label htmlFor="text">
                                PIN:
                            </label>
                            <input

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
                                onBlur={hanldeOnBlur}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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

                                <button type="submit" title="Iniciar Sesión"><IconLockSquareRoundedFilled />Enviar</button>

                            </div>

                        </div>
                    }
                </form>
            }

        </div>
    )
}
