import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setSession,
    setSessionUserMessage,
} from '../components/redux/userActions';
import { useRouter } from 'next/router';
import { RootState } from '../components/redux/store';
import { Spinner, fetchAPI } from '../components';

import { PropsHead } from '../components/helpers/HeadMetaInfo';
import Head from 'next/head';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';

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

    const music = useSelector((state: RootState) => state.user.session.music);
    const router = useRouter();
    const formStatus: string =
        'Ya has iniciado sesion, le vamos a dirigir a la pagina anterior.';
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [botonOlvideContra, setBotonOlvideContra] = useState<boolean>(false);
    const [spinner, setSpinner] = useState<boolean>(false);
    const inputConfig = {
        label: 'text-3xl p-2',
        input: ['text-3xl p-2 rounded-xl'],
        innerWrapper: 'bg-transparent',
        errorMessage: 'text-2xl absolute',
        inputWrapper: [
            'h-20',
            'shadow-xl',
            'bg-default-200/50',
            'dark:bg-default/60',
            'backdrop-blur-xl',
            'backdrop-saturate-200',
            'hover:bg-default-200/70',
            'dark:hover:bg-default/70',
            'group-data-[focused=true]:bg-default-200/50',
            'dark:group-data-[focused=true]:bg-default/60',
            '!cursor-text',
        ],
    };
    const validateEmail = (email) =>
        email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    const validationState = React.useMemo(() => {
        if (email === '') return undefined;

        return validateEmail(email) ? 'valid' : 'invalid';
    }, [email]);
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
            dispatch(
                setSessionUserMessage({
                    message:
                        'muchos intentos de inicio de sesion, espere 15 minutos para volver a intentar o puede probar cambiar la contraseña',
                    messageType: 'error',
                })
            );
            return;
        } else if (error) {
            dispatch(
                setSessionUserMessage({
                    message: error,
                    messageType: 'error',
                })
            );
            setBotonOlvideContra(true);
            setSpinner(false);
        }
        try {
            if (data) {
                dispatch(setSession({ ...data, music }));
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
                        <form
                            className="md:w-[30rem] container my-[6rem] flex flex-col gap-14 rounded-xl border-1 border-gris p-6 shadow-md"
                            onSubmit={handleLogin}
                        >
                            <h2 className="mb-1 text-4xl text-center text-terciario">
                                Iniciar Sesión
                            </h2>
                            <div className=" mt-7">
                                <Input
                                    type="email"
                                    label="Correo electrónico"
                                    value={email}
                                    labelPlacement="outside"
                                    variant="faded"
                                    classNames={inputConfig}
                                    color={
                                        validationState === 'invalid'
                                            ? 'danger'
                                            : 'primary'
                                    }
                                    errorMessage={
                                        validationState === 'invalid' &&
                                        'Ingrese un correo válido'
                                    }
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="">
                                <Input
                                    label="Contraseña"
                                    type="password"
                                    color="primary"
                                    labelPlacement="outside"
                                    variant="faded"
                                    classNames={inputConfig}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="flex justify-center">
                                <Button
                                    className="text-2xl w-60"
                                    color="primary"
                                    isLoading={spinner}
                                    type="submit"
                                >
                                    Iniciar Sesión
                                </Button>
                            </div>
                        </form>
                        <div className="flex flex-col gap-6 items-center">
                            {botonOlvideContra && (
                                <div className="">
                                    <Button
                                        className="text-2xl"
                                        color="secondary"
                                        type="button"
                                        title="He olvidado mi contraseña"
                                        onClick={() => {
                                            router.push('/recuperar-password');
                                        }}
                                    >
                                        He olvidado mi contraseña
                                    </Button>
                                </div>
                            )}
                            <div className="">
                                <Button
                                    className="text-2xl"
                                    color="secondary"
                                    type="button"
                                    title="Registrarse"
                                    onClick={() => {
                                        router.push('/registro-de-usuario');
                                    }}
                                >
                                    Registrarse
                                </Button>
                            </div>
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
        image: `${process.env.NEXT_PUBLIC_PROD_LINK}/build_main/img/header-main.png`,
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
