import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { fetchAPI, Spinner, PropsHead, useFetchAPI } from '../../components';

function VerificarCorreo({ headInfo }) {
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
    const [loading, setLoading] = useState(true);
    const [errorFetch, setErrorFetch] = useFetchAPI();
    const router = useRouter();
    const { token } = router.query;

    useEffect(() => {
        console.log(token);
        if (token) {
            const apiUrl = `${
                process.env.NODE_ENV === 'production'
                    ? process.env.NEXT_PUBLIC_PROD_USER_EMAIL_VERIFICATION_TOKEN
                    : process.env.NEXT_PUBLIC_DEV_USER_EMAIL_VERIFICATION_TOKEN
            }${token}`;
            const fetchData = async () => {
                const { status, error } = await fetchAPI({ url: apiUrl });
                if (status === 200) {
                    setLoading(false);
                } else {
                    setErrorFetch(error);
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [token]);

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

            {loading && (
                <div className="VerificarCorreo">
                    <Spinner />
                </div>
            )}
            {!loading && !errorFetch && (
                <div className="VerificarCorreo">
                    <h1>Su correo electrónico ha sido verificado</h1>

                    <div className="login_buttons__button__status">
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
            )}
            {errorFetch && (
                <div className="VerificarCorreo">
                    <h1>{errorFetch}</h1>
                </div>
            )}
        </>
    );
}

export default VerificarCorreo;

export const getServerSideProps = async () => {
    const headInfo = {
        imgWidth: '400',
        imgHeight: '300',
        author: 'Leonardo Serrano',
        copyright: 'FLProductions',
        title: 'Verificar email',
        description:
            'Pagina de verificacion de email de FLProductions Costa Rica',
        type: 'website',
        url: 'https://flproductionscr.com/verificar-email',
        image: 'https://flproductionscr.com/build_main/img/header-main.png',
        keywords:
            'panel de control, artistas, usuarios, flproductions, music, Costa Rica',
        robots: 'noindex, nofollow',
    };

    return {
        props: {
            headInfo,
        },
    };
};
