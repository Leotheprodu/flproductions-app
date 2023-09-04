import { IconLockSquareRoundedFilled, IconMail } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { CountdownTimer, Spinner, fetchAPI } from '../components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { PropsHead } from '../components/helpers/HeadMetaInfo';
import Head from 'next/head';
import { Button, Input } from '@nextui-org/react';

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
    useEffect(() => {
        setFormStatus('');
    }, [pin, email, password, password1]);
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
            <div className="h-[100vh]">
                {procesoTerminado && (
                    <div className="">
                        {formStatus && (
                            <div>
                                <h4>{formStatus}</h4>
                            </div>
                        )}
                        <div className=" my-[10rem] mx-auto items-center md:max-w-[35rem] container flex flex-col gap-14 rounded-xl border-1 border-gris py-20 shadow-md">
                            <Button
                                onClick={() => {
                                    router.back();
                                }}
                                type="button"
                                color="warning"
                                className="text-2xl"
                                title="Volver atrás"
                            >
                                Atras
                            </Button>

                            <Button
                                onClick={() => {
                                    router.push('/panel-de-control');
                                }}
                                className="text-2xl"
                                color="primary"
                                type="button"
                                title="ir a Panel de Control"
                            >
                                Panel de Control
                            </Button>

                            <Button
                                className="text-2xl"
                                color="primary"
                                isLoading={spinner}
                                onClick={() => {
                                    router.push('/iniciar-sesion');
                                }}
                                type="button"
                                title="ir a login"
                            >
                                Iniciar Sesion
                            </Button>
                        </div>
                    </div>
                )}
                {!switchButton && !procesoTerminado && (
                    <form
                        className="w-[30rem] flex flex-col items-center gap-10 my-10 md:w-[30rem] container rounded-xl border-1 border-gris p-6 shadow-md mx-auto"
                        onSubmit={handleEmail}
                    >
                        <div className="">
                            <h3 className="text-4xl text-center text-terciario">
                                Recupera tu Contraseña
                            </h3>
                            <div className="">
                                <Input
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
                                    label="Correo electrónico"
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
                            <div className="">
                                <div className="">
                                    <Button
                                        className="text-2xl w-60 uppercase"
                                        color="primary"
                                        isLoading={spinner}
                                        tabIndex={2}
                                        type="submit"
                                        title="Iniciar Sesión"
                                    >
                                        <IconMail />
                                        Recuperar
                                    </Button>
                                </div>
                            </div>
                        )}
                    </form>
                )}
                {switchButton && !procesoTerminado && (
                    <div className=" flex flex-col items-center mt-40">
                        <h2 className="mb-32">
                            Revisa tu bandeja de correo electrónico y copia el
                            PIN
                        </h2>
                        <form
                            className="items-center md:max-w-[35rem] container flex flex-col gap-14 rounded-xl border-1 border-gris py-20 shadow-md"
                            onSubmit={handleNewPassword}
                        >
                            <div className="flex flex-col items-center gap-20">
                                <div className="">
                                    <Input
                                        label="PIN"
                                        tabIndex={1}
                                        type="text"
                                        color="primary"
                                        labelPlacement="outside"
                                        variant="faded"
                                        classNames={inputConfig}
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value)}
                                    />
                                </div>

                                <div className="">
                                    <Input
                                        label="Nueva Contraseña"
                                        tabIndex={2}
                                        type="password"
                                        color="primary"
                                        labelPlacement="outside"
                                        variant="faded"
                                        classNames={inputConfig}
                                        value={password1}
                                        onChange={(e) =>
                                            setPassword1(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="">
                                    <Input
                                        label="Verificar Contraseña"
                                        tabIndex={3}
                                        onBlur={hanldeOnBlur}
                                        type="password"
                                        value={password}
                                        color="primary"
                                        labelPlacement="outside"
                                        variant="faded"
                                        classNames={inputConfig}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="mt-8">
                                <CountdownTimer segundos={600} />
                            </div>
                            {!formStatus && (
                                <div className=" my-10">
                                    <div className="">
                                        <Button
                                            className="text-2xl w-60"
                                            color="primary"
                                            type="submit"
                                            tabIndex={4}
                                            title="Enviar"
                                        >
                                            <IconLockSquareRoundedFilled />
                                            Enviar
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </form>

                        {formStatus && (
                            <div>
                                <p className="">{formStatus}</p>
                            </div>
                        )}
                    </div>
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
