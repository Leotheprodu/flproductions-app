import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSession } from '../components/redux/userActions';
import { useRouter } from 'next/router';
import { RootState } from '../components/redux/store';
import { Spinner, fetchAPI } from '../components';
import Link from 'next/link';
import { PropsHead } from '../components/helpers/HeadMetaInfo';
import Head from 'next/head';

function Login({ headInfo }) {
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
    const router = useRouter();
    const formStatus: string =
        'Ya has iniciado sesion, le vamos a dirigir a la pagina anterior.';
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [botonOlvideContra, setBotonOlvideContra] = useState<boolean>(false);
    const [spinner, setSpinner] = useState<boolean>(false);
    const urlAPI =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_AUTH_LOGIN
            : process.env.NEXT_PUBLIC_DEV_AUTH_LOGIN;
    const handleLogin = async (e) => {
        e.preventDefault();
        setSpinner(true);
        const { status, data, error } = await fetchAPI({
            url: urlAPI,
            method: 'POST',
            body: { email, password },
        });
        if (status === 429) {
            setSpinner(false);
            alert(
                'muchos intentos de inicio de sesion, espere 15 minutos para volver a intentar o puede probar cambiar la contraseña'
            );
            return;
        } else if (error) {
            alert(error);
            setBotonOlvideContra(true);
            setSpinner(false);
        }
        try {
            if (data.isLoggedIn) {
                dispatch(setSession(data));
                setSpinner(false);

                setTimeout(() => {
                    router.back();
                }, 3000);
            }
        } catch (error) {
            setBotonOlvideContra(true);
            setSpinner(false);
            return;
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
                {isLoggedIn && (
                    <div className="contenedor">
                        <p className="contact-form__mensaje-status__signup">
                            {formStatus}
                        </p>
                    </div>
                )}
                {!isLoggedIn && (
                    <>
                        <form className="signUp__form" onSubmit={handleLogin}>
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
                            {!spinner && (
                                <button type="submit">Iniciar Sesión</button>
                            )}
                            {spinner && <Spinner />}
                        </form>
                        <p>o</p>
                        {botonOlvideContra && (
                            <div className="login_buttons__button">
                                <Link href="/recuperar-password">
                                    <button
                                        className="login_buttons__button__registrar"
                                        type="button"
                                        title="He olvidado mi contraseña"
                                    >
                                        He olvidado mi contraseña
                                    </button>
                                </Link>
                            </div>
                        )}
                        <div className="login_buttons__button">
                            <Link href="/registro-de-usuario">
                                <button
                                    className="login_buttons__button__registrar"
                                    type="button"
                                    title="Registrarse"
                                >
                                    Registrarse
                                </button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Login;

export const getServerSideProps = async () => {
    const headInfo = {
        imgWidth: '400',
        imgHeight: '300',
        author: 'Leonardo Serrano',
        copyright: 'FLProductions',
        title: 'Inicio de Session',
        description: 'Incio de Session',
        type: 'website',
        url: 'https://flproductionscr.com/iniciar-sesion',
        image: 'https://flproductionscr.com/build_main/img/header-main.png',
        keywords:
            'estudio de grabacion, produccion musical, sesion, login, usuario',
        robots: 'index, follow',
    };

    return {
        props: {
            headInfo,
        },
    };
};
