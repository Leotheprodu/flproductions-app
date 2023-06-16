import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    MensajesDelSistema,
    setSessionUserMessage,
    ControlPanel,
    RootState,
    PropsHead,
    UserAvatar,
} from '../../components';
import Head from 'next/head';
function InicioPaneldeControl({ headInfo }) {
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
    const user = useSelector((state: RootState) => state.user.session.user);
    const isLoggedIn = useSelector(
        (state: RootState) => state.user.session.isLoggedIn || false
    );
    useEffect(() => {
        dispatch(
            setSessionUserMessage({
                message: `En el panel de control, puedes configurar tu cuenta`,
                messageType: 'warning',
            })
        );
    }, []);

    return (
        <ControlPanel>
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
            {isLoggedIn && (
                <div className=" vh100 InicioPaneldeControl__div contenedor">
                    <div className="InicioPaneldeControl__mensajes">
                        <MensajesDelSistema />
                    </div>
                </div>
            )}

            <div className="contenedor"></div>
        </ControlPanel>
    );
}

export default InicioPaneldeControl;

export const getServerSideProps = async () => {
    const headInfo = {
        imgWidth: '400',
        imgHeight: '300',
        author: 'Leonardo Serrano',
        copyright: 'FLProductions',
        title: 'Panel de Control',
        description:
            'Panel de Control de los usuarios de FLProductions Costa Rica',
        type: 'website',
        url: 'https://flproductionscr.com/panel-de-control',
        image: `${process.env.NEXT_PUBLIC_PROD_LINK}/build_main/img/header-main.png`,
        keywords:
            'panel de control, artistas, usuarios, flproductions, music, Costa Rica',
        robots: 'index, follow',
    };

    return {
        props: {
            headInfo,
        },
    };
};
