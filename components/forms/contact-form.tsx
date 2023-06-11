import { useRef, useState } from 'react';
import { IconMapPin, IconBrandWhatsapp, IconMail } from '@tabler/icons';
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from 'emailjs-com';
import { ContactInfo } from '..';

export function FormulariodeContacto() {
    const [formStatus, setFormStatus] = useState<string>('');
    const [statusenviado, setStatusEnviado] = useState<boolean>(false);
    const captcha = useRef(null);
    const InfoCardSize: number = 40;
    const infoCardStroke: number = 2;

    const onChange = () => {
        if (captcha.current.getValue()) {
            setFormStatus('');
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setFormStatus('...Enviando');
        if (captcha.current.getValue()) {
            const { nombre, email, mensaje } = e.target.elements;
            let infoContacto = {
                nombre: nombre.value,
                email: email.value,
                mensaje: mensaje.value,
            };
            emailjs
                .send(
                    'service_51za005',
                    'template_tzuzku9',
                    infoContacto,
                    'hu1gXn4JXbvqONlBp'
                )
                .then(
                    function (response) {
                        console.log('SUCCESS!', response.status, response.text);
                        setFormStatus('Mensaje enviado Correctamente');
                        setStatusEnviado(true);
                    },
                    function (error) {
                        console.log('FAILED...', error);
                    }
                );

            /* console.log(conFom); */
        } else setFormStatus('Por favor acepta el captcha');
    };

    return (
        <>
            <div className="contacto-grid">
                <div className="contacto_info-Icons contenedor">
                    <ContactInfo
                        icon={
                            <IconMapPin
                                size={InfoCardSize}
                                stroke={infoCardStroke}
                            />
                        }
                        titulo="Dirección"
                        parrafo="Siquirres, Limón Costa Rica"
                        link="https://goo.gl/maps/iBQjkYs7n49ywDXE8"
                    />
                    <ContactInfo
                        icon={
                            <IconBrandWhatsapp
                                size={InfoCardSize}
                                stroke={infoCardStroke}
                            />
                        }
                        titulo="Whatsapp"
                        parrafo="+50663017707"
                        link="https://wa.me/50663017707?text=Me%20gustaría%20saber%20más%20de%20ustedes,%20"
                    />
                    <ContactInfo
                        icon={
                            <IconMail
                                size={InfoCardSize}
                                stroke={infoCardStroke}
                            />
                        }
                        titulo="Email"
                        parrafo="leoserrano@flproductionscr.com"
                        link=""
                    />
                </div>

                <div className="formulario">
                    {!statusenviado && (
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="nombre">
                                    Nombre
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="form-control"
                                    type="email"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="mensaje">
                                    Mensaje
                                </label>
                                <textarea className="form-control2" required />
                            </div>
                            <div className="recaptcha">
                                <ReCAPTCHA
                                    ref={captcha}
                                    sitekey="6LdqhcAiAAAAAE8hwgEptpxIcQHsW_c2S_AfkFmw"
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <p className="contact-form__mensaje-status">
                                    {formStatus}
                                </p>
                            </div>
                            <div className="contact__button">
                                <button type="submit">Enviar</button>
                            </div>
                        </form>
                    )}
                    {statusenviado && (
                        <div>
                            <p className="contact-form__mensaje-status">
                                {formStatus}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
