import { IconLockSquareRoundedFilled, IconMail } from '@tabler/icons-react';
import { useState } from 'react';
import { CountdownTimer, Spinner, fetchAPI } from '../components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { PropsHead } from '../components/helpers/HeadMetaInfo';
import Head from 'next/head';

function RecuperarPassword({ headInfo }) {
    const {
        imgWidth,
        imgHeight,
        author,
        copyright,
        title,
        description,
        type,
        url,
        image,
        keywords,
        robots,
    }: PropsHead = headInfo;
    const router = useRouter();
    const [switchButton, setSwitchButton] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [pin, setPin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [password1, setPassword1] = useState<string>('');
    const [formStatus, setFormStatus] = useState<string>('');
    const [spinner, setSpinner] = useState<boolean>(false);
    const [procesoTerminado, setProcesoTerminado] = useState<boolean>(false);
    const urlAPIFirstProcess =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_USER_RECUPERAR_PASSWORD
            : process.env.NEXT_PUBLIC_DEV_USER_RECUPERAR_PASSWORD;
    const urlAPISecondProcess =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_USER_RECUPERAR_PASSWORD_PASO2
            : process.env.NEXT_PUBLIC_DEV_USER_RECUPERAR_PASSWORD_PASO2;
    const handleEmail = async (e) => {
        e.preventDefault();
        setSpinner(true);
        if (email !== '') {
            const { status, error } = await fetchAPI({
                url: urlAPIFirstProcess,
                method: 'POST',
                body: { email },
            });
            if (status === 200) {
                setSwitchButton(true);
                setSpinner(false);
                setTimeout(function () {
                    setSwitchButton(false);
                }, 600000);
            } else if (status === 500 || status === 404) {
                setFormStatus(
                    'El correo no existe en el sistema, solo usuarios registrados pueden cambiar una contraseña'
                );
                setTimeout(function () {
                    setFormStatus('');
                    setSpinner(false);
                }, 5000);
                return;
            } else if (status === 429) {
                setFormStatus(
                    'Has enviado muchas solicitudes de correo, ententalo de nuevo en un momento'
                );
                setSpinner(false);
                return;
            } else if (error) {
                setFormStatus(error);
                setSpinner(false);
            }
        } else {
            setSpinner(false);
            setFormStatus('el email no puede estar en blanco');
            setTimeout(function () {
                setFormStatus('');
                setSpinner(false);
            }, 5000);
            return;
        }
    };

    const handleNewPassword = async (e) => {
        e.preventDefault();
        setSpinner(true);
        if (pin !== '' && password === password1) {
            const { status, error } = await fetchAPI({
                url: urlAPISecondProcess,
                method: 'POST',
                body: { email, password, pin },
            });
            if (status === 200) {
                setProcesoTerminado(true);
                setFormStatus('Contraseña actualizada exitosamente');
                setSpinner(false);
            } else if (status === 500) {
                setFormStatus(
                    'Ha habido un problema, vuelva a intentarlo mas tarde'
                );
                return;
            } else if (status === 404) {
                setFormStatus('El PIN es incorrecto o ha caducado');
                setTimeout(function () {
                    setFormStatus('');
                }, 5000);
                return;
            } else if (error) {
                setFormStatus(error);
                return;
            }
        } else {
            setFormStatus(
                'Revisa que las contraseñas coincidan, ademas que el pin sea el enviado por email'
            );
            return;
        }
    };

    const hanldeOnBlur = () => {
        if (password !== password1) {
            setFormStatus('Las contraseñas deben coincidir');
        } else {
            setFormStatus('');
        }
    };
    return (
        <>
            <Head>
                <title>{`${title} | FLProductions`}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="robots" content={robots} />
                <meta name="author" content={author} />
                <meta name="copyright" content={copyright} />
                <meta property="og:description" content={description} />
                <meta
                    property="og:title"
                    content={`${title} | FLProductions`}
                />
                <meta property="og:type" content={type} />
                <meta property="og:url" content={url} />
                <meta property="og:image" content={image} />
                <meta property="og:image:width" content={imgWidth} />
                <meta property="og:image:height" content={imgHeight} />
            </Head>
            <div className="RecuperarPassword-contenedor">
                {procesoTerminado && (
                    <div className="RecuperarPassword-contenedor">
                        {formStatus && (
                            <div>
                                <h4>{formStatus}</h4>
                            </div>
                        )}
                        <div className="login_buttons__button__status">
                            <button
                                className="login_buttons__button__registrar"
                                onClick={() => {
                                    router.back();
                                }}
                                type="button"
                                title="Volver atrás"
                            >
                                Atras
                            </button>
                            <Link href="/panel-de-control">
                                <button
                                    className="login_buttons__button__registrar"
                                    type="button"
                                    title="ir a Panel de Control"
                                >
                                    Panel de Control
                                </button>
                            </Link>
                            <Link href="/iniciar-sesion">
                                <button
                                    className="login_buttons__button__registrar"
                                    type="button"
                                    title="ir a login"
                                >
                                    Iniciar Sesion
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
                {!switchButton && !procesoTerminado && (
                    <form className="RecuperarPassword" onSubmit={handleEmail}>
                        <div className="login__form">
                            <div className="login_container_input">
                                <label htmlFor="email">
                                    Correo electrónico:
                                </label>
                                <input
                                    tabIndex={1}
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        {formStatus && (
                            <div>
                                <p className="contact-form__mensaje-status">
                                    {formStatus}
                                </p>
                            </div>
                        )}

                        {!formStatus && (
                            <div className="login_buttons">
                                <div className="login_buttons__button">
                                    {!spinner && (
                                        <button
                                            tabIndex={2}
                                            type="submit"
                                            title="Iniciar Sesión"
                                        >
                                            <IconMail />
                                            Enviar Correo
                                        </button>
                                    )}
                                    {spinner && <Spinner />}
                                </div>
                            </div>
                        )}
                    </form>
                )}
                {switchButton && !procesoTerminado && (
                    <>
                        <h2>
                            Revisa tu bandeja de correo electrónico y copia el
                            PIN
                        </h2>
                        <form
                            className="RecuperarPassword"
                            onSubmit={handleNewPassword}
                        >
                            <div className="login__form">
                                <div className="login_container_input">
                                    <label htmlFor="text">PIN:</label>
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
                                        onChange={(e) =>
                                            setPassword1(e.target.value)
                                        }
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
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <CountdownTimer segundos={600} />
                            {!formStatus && (
                                <div className="login_buttons">
                                    <div className="login_buttons__button">
                                        <button
                                            type="submit"
                                            tabIndex={4}
                                            title="Iniciar Sesión"
                                        >
                                            <IconLockSquareRoundedFilled />
                                            Enviar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>

                        {formStatus && (
                            <div>
                                <p className="contact-form__mensaje-status">
                                    {formStatus}
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default RecuperarPassword;

export const getServerSideProps = async () => {
    const headInfo = {
        imgWidth: '400',
        imgHeight: '300',
        author: 'Leonardo Serrano',
        copyright: 'FLProductions',
        title: 'Recuperar Password',
        description: 'Recupera tu password para acceder a FLProductions',
        type: 'website',
        url: 'https://flproductionscr.com/recuperar-password',
        image: `${process.env.NEXT_PUBLIC_PROD_LINK}/build_main/img/header-main.png`,
        keywords: 'musica, artistas, auth, recuperar password',
        robots: 'index, follow',
    };

    return {
        props: {
            headInfo,
        },
    };
};
