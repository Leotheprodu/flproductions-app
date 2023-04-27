import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { Spinner } from "../../components/helpers/Spinner";
import Link from "next/link";
import { PropsHead } from '../../components/helpers/HeadMetaInfo';
import Head from 'next/head';

function VerificarCorreo({ headInfo }) {
    const { imgWidth, imgHeight, author, copyright, title, description, type, url, image, keywords, robots }: PropsHead = headInfo;
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { token } = router.query;
    const [verificado, setVerificado] = useState<boolean>(false);
    const [spinner, setSpinner] = useState<boolean>(false);


    useEffect(() => {
        if (token) {
            fetch(`${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PROD_USER_EMAIL_VERIFICATION_TOKEN : process.env.NEXT_PUBLIC_DEV_USER_EMAIL_VERIFICATION_TOKEN}${token}`, {
                credentials: "include",
            })
                .then(response => {

                    if (response.status === 200) {
                        setVerificado(true);
                        setSpinner(false);
                        setLoading(false);

                    } else if (response.status === 403) {
                        setVerificado(false);
                        setSpinner(false);
                        setLoading(false);
                    } else {
                        setVerificado(false);
                        setSpinner(false);
                        setLoading(false);
                    }


                })
                .catch(error => {
                    // Manejar el error aquí
                    console.log(error);
                });

        }

    }, [token])

    if (loading) {

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
                    <meta property="og:title" content={`${title} | FLProductions`} />
                    <meta property="og:type" content={type} />
                    <meta property="og:url" content={url} />
                    <meta property="og:image" content={image} />
                    <meta property="og:image:width" content={imgWidth} />
                    <meta property="og:image:height" content={imgHeight} />
                </Head>
                <div className="VerificarCorreo"><Spinner />
                </div>
            </>

        )

    } else {
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
                    <meta property="og:title" content={`${title} | FLProductions`} />
                    <meta property="og:type" content={type} />
                    <meta property="og:url" content={url} />
                    <meta property="og:image" content={image} />
                    <meta property="og:image:width" content={imgWidth} />
                    <meta property="og:image:height" content={imgHeight} />
                </Head>
                <div className="VerificarCorreo">
                    <h1>Su correo electrónico ha sido verificado</h1>

                    <div className="login_buttons__button__status">
                        <Link href="/panel-de-control">
                            <button className="login_buttons__button__registrar" type="button" title="ir a Panel de Control">Panel de Control</button>
                        </Link>
                    </div>
                </div>
            </>
        )
    }
}


export default VerificarCorreo;

export const getServerSideProps = async () => {

    const headInfo = {

        imgWidth: '400',
        imgHeight: '300',
        author: 'Leonardo Serrano',
        copyright: 'FLProductions',
        title: 'Verificar email',
        description: 'Pagina de verificacion de email de FLProductions Costa Rica',
        type: 'website',
        url: 'https://flproductionscr.com/',
        image: 'https://flproductionscr.com/build_main/img/header-main.png',
        keywords: 'panel de control, artistas, usuarios, flproductions, music, Costa Rica',
        robots: 'noindex, nofollow',
    }

    return {

        props: {

            headInfo,
        }
    }

};