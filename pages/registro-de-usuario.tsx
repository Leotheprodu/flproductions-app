import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
    setSession,
    setSessionUserMessage,
} from '../components/redux/userActions';
import { Spinner } from '../components/helpers/Spinner';
import Link from 'next/link';
import { PropsHead } from '../components/helpers/HeadMetaInfo';
import Head from 'next/head';
import { RootState, fetchAPI } from '../components';

function SignUp({ headInfo }) {
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
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(
        (state: RootState) => state.user.session.isLoggedIn
    );
    const music = useSelector((state: RootState) => state.user.session.music);
    const router = useRouter();
    const [username, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const fecha_creacion: string = new Date().toISOString().slice(0, 10);
    const captcha = useRef(null);
    const [statusenviado, setStatusEnviado] = useState<boolean>(false);
    const [spinner, setSpinner] = useState<boolean>(false);
    const urlApiLogin =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_AUTH_LOGIN
            : process.env.NEXT_PUBLIC_DEV_AUTH_LOGIN;
    const urlApiSignUp =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_USER_SIGNUP
            : process.env.NEXT_PUBLIC_DEV_USER_SIGNUP;
    const loginNewUser = async () => {
        const { error, data } = await fetchAPI({
            url: urlApiLogin,
            method: 'POST',
            body: { email, password },
        });
        if (data) {
            dispatch(setSession({ ...data, music }));
            setStatusEnviado(true);
        } else {
            alert(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSpinner(true);
        if (username.length > 15) {
            dispatch(
                setSessionUserMessage({
                    message:
                        'El nombre de usuario debe tener maximo 15 caracteres',
                    messageType: 'error',
                })
            );
            setSpinner(false);
            return;
        }

        if (captcha.current.getValue()) {
            const { error, status } = await fetchAPI({
                url: urlApiSignUp,
                method: 'POST',
                body: {
                    email,
                    password,
                    username,
                    fecha_creacion,
                },
            });
            if (status === 200) {
                setEmail('');
                setPassword('');
                setUserName('');
                setSpinner(false);

                dispatch(
                    setSessionUserMessage({
                        message:
                            'Listo!, te hemos enviado un correo de verificacion, porfavor verifica tu email',
                        messageType: 'notification',
                    })
                );
                setStatusEnviado(true);
                loginNewUser();
            } else if (error) {
                dispatch(
                    setSessionUserMessage({
                        message: error,
                        messageType: 'error',
                    })
                );
                setSpinner(false);
                return;
            }
        } else {
            dispatch(
                setSessionUserMessage({
                    message: 'Acepta el captcha para continuar',
                    messageType: 'warning',
                })
            );
        }
    };

    const handleOnChangeNombreUsuario = (e) => {
        setUserName(e.target.value.trim());
        if (e.target.value.length > 15) {
            dispatch(
                setSessionUserMessage({
                    message:
                        'No esta permitido tener mas de 15 caracteres en el nombre de usuario',
                    messageType: 'error',
                })
            );
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

            <div className="contenedor signUp">
                {!statusenviado && !isLoggedIn && (
                    <>
                        <form className="signUp__form" onSubmit={handleSubmit}>
                            <div className="signUp__form__input">
                                <label className="mb-3" htmlFor="name">
                                    Nombre de Usuario:
                                </label>
                                <input
                                    type="text"
                                    className="mb-3"
                                    value={username}
                                    onChange={handleOnChangeNombreUsuario}
                                    required
                                />
                            </div>
                            <div className=" signUp__form__input">
                                <label className="mb-3" htmlFor="email">
                                    Correo:
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    className="mb-3"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="signUp__form__input">
                                <label className="mb-3" htmlFor="password">
                                    Contraseña:
                                </label>
                                <input
                                    type="password"
                                    className="mb-3"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="mb-3 recaptcha">
                                <ReCAPTCHA
                                    ref={captcha}
                                    sitekey="6LdqhcAiAAAAAE8hwgEptpxIcQHsW_c2S_AfkFmw"
                                />
                            </div>
                            {!spinner ? (
                                <button type="submit">Registrar</button>
                            ) : (
                                <Spinner />
                            )}
                        </form>
                        <p>o</p>
                        <div className="login_buttons__button">
                            <Link href="/iniciar-sesion">
                                <button
                                    className="login_buttons__button__registrar"
                                    type="button"
                                    title="Registrarse"
                                >
                                    Iniciar Sesión
                                </button>
                            </Link>
                        </div>
                    </>
                )}

                {statusenviado ||
                    (isLoggedIn && (
                        <div className="contenedor">
                            <div className="login_buttons__button__status">
                                <button
                                    className="login_buttons__button__registrar"
                                    onClick={() => {
                                        router.back();
                                    }}
                                    type="button"
                                    title="Volver atrás"
                                >
                                    Volver
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
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
}

export default SignUp;

export const getServerSideProps = async () => {
    const headInfo = {
        imgWidth: '400',
        imgHeight: '300',
        author: 'Leonardo Serrano',
        copyright: 'FLProductions',
        title: 'Registro de Usuario',
        description: 'Pagina de Registro de Usuario de FLProductions',
        type: 'website',
        url: 'https://flproductionscr.com/registro-de-usuario',
        image: `${process.env.NEXT_PUBLIC_PROD_LINK}/build_main/img/header-main.png`,
        keywords:
            'estudio de grabacion, produccion musical, registro, signup, usuario',
        robots: 'index, follow',
    };

    return {
        props: {
            headInfo,
        },
    };
};
