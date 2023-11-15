import React, { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setSession } from '../components/redux/userActions';
import { PropsHead } from '../components/helpers/HeadMetaInfo';
import Head from 'next/head';
import { RootState, fetchAPI } from '../components';
import { Checkbox } from '@nextui-org/checkbox';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { toast } from 'react-hot-toast';

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
    const [isSelected, setIsSelected] = useState(false);
    useEffect(() => {
        setSpinner(false);
    }, [username, email, password]);

    const urlApiLogin =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_AUTH_LOGIN
            : process.env.NEXT_PUBLIC_DEV_AUTH_LOGIN;
    const urlApiSignUp =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_USER_SIGNUP
            : process.env.NEXT_PUBLIC_DEV_USER_SIGNUP;

    const inputConfig = {
        label: 'text-xl text-terciario',
        input: ['text-xl text-terciario bg-blanco/0'],
        innerWrapper: '',
        errorMessage: 'text-2xl absolute',
        inputWrapper: [''],
    };
    const validateEmail = (email) =>
        email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    const validationState = React.useMemo(() => {
        if (email === '') return undefined;

        return validateEmail(email) ? 'valid' : 'invalid';
    }, [email]);
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
            toast.error('El nombre de usuario debe tener maximo 15 caracteres');
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
                    role: isSelected ? 3 : null,
                },
            });
            if (status === 200) {
                setEmail('');
                setPassword('');
                setUserName('');
                setSpinner(false);
                toast.success(
                    'Usuario creado exitosamente, verifica tu email',
                    { duration: 20000 }
                );

                setStatusEnviado(true);
                loginNewUser();
            } else if (error) {
                console.log(error);
                toast.error('Ocurrio un error, intenta mas tarde');
                setSpinner(false);
                return;
            }
        } else {
            toast.error('Acepta el captcha para continuar');
            setTimeout(() => {
                setSpinner(false);
            }, 3000);
        }
    };

    const handleOnChangeNombreUsuario = (e) => {
        setUserName(e.target.value.trim());
        if (e.target.value.length > 15) {
            toast.error('El nombre de usuario debe tener maximo 15 caracteres');
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

            <div
                className="contenedor signUp w-full flex justify-center items-center rounded-2xl shadow-lg "
                style={{
                    background: `url(${process.env.NEXT_PUBLIC_PROD_LINK}/build_main/img/tropical_forest_perfect_postale_co_2.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {!statusenviado && !isLoggedIn && (
                    <>
                        <form
                            className="md:max-w-[35rem] container mt-[6rem] flex flex-col gap-14 rounded-xl border-1 border-gris p-6 shadow-md backdrop-blur-sm bg-blanco/10"
                            onSubmit={handleSubmit}
                        >
                            <div className="">
                                <Input
                                    color="primary"
                                    label="Nombre de Usuario"
                                    labelPlacement="outside"
                                    variant="faded"
                                    classNames={inputConfig}
                                    type="text"
                                    className="mb-3"
                                    value={username}
                                    onChange={handleOnChangeNombreUsuario}
                                    required
                                />
                            </div>
                            <div className="">
                                <Input
                                    labelPlacement="outside"
                                    label="Correo"
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
                                    type="email"
                                    value={email}
                                    className="mb-3"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="">
                                <Input
                                    color="primary"
                                    label="Contraseña"
                                    labelPlacement="outside"
                                    variant="faded"
                                    classNames={inputConfig}
                                    type="password"
                                    className="mb-3"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <Checkbox
                                    size="lg"
                                    isSelected={isSelected}
                                    onValueChange={setIsSelected}
                                    classNames={{
                                        label: 'text-1xl text-terciario',
                                    }}
                                >
                                    Eres un artista/cantante?
                                </Checkbox>
                            </div>
                            <div className="mb-3 recaptcha">
                                <ReCAPTCHA
                                    ref={captcha}
                                    sitekey="6LdqhcAiAAAAAE8hwgEptpxIcQHsW_c2S_AfkFmw"
                                />
                            </div>
                            <div className=" flex justify-center">
                                <Button
                                    className="text-2xl w-60"
                                    color="primary"
                                    isLoading={spinner}
                                    type="submit"
                                >
                                    Registrar
                                </Button>
                            </div>
                            <div className=" flex justify-center mb-[6rem]">
                                <Button
                                    className="text-2xl text-terciario"
                                    variant="light"
                                    type="button"
                                    onClick={() => {
                                        router.push('/iniciar-sesion');
                                    }}
                                    title="iniciar sesion"
                                >
                                    tienes una cuenta?
                                </Button>
                            </div>
                        </form>
                    </>
                )}

                {(statusenviado || isLoggedIn) && (
                    <div className="">
                        <div className=" flex flex-col gap-10 items-center ">
                            <Button
                                className="text-2xl w-60"
                                color="primary"
                                onClick={() => {
                                    router.back();
                                }}
                                type="button"
                                title="Volver atrás"
                            >
                                Volver
                            </Button>

                            <Button
                                onClick={() => {
                                    router.push('/panel-de-control');
                                }}
                                className="text-2xl w-60"
                                color="warning"
                                type="button"
                                title="ir a Panel de Control"
                            >
                                Panel de Control
                            </Button>
                        </div>
                    </div>
                )}
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
