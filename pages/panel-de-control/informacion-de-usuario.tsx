import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import {
    TypeofUser,
    AvatarSelection,
    UserBasicInfo,
    ControlPanel,
    PropsHead,
    setUserMessage,
} from '../../components';

function InfodeUsuario({ headInfo }) {
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
    useEffect(() => {
        dispatch(
            setUserMessage({
                message: `Actualiza la informacion basica de tu cuenta, cambia tu avatar, selecciona si eres un Cantante o Productor Musical.`,
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
            <div className="InfodeUsuario">
                <div className="InfodeUsuario__elemento">
                    <UserBasicInfo />
                </div>

                <div className="InfodeUsuario__elemento">
                    <AvatarSelection />
                </div>
                <div className="InfodeUsuario__elemento">
                    <TypeofUser />
                </div>
            </div>
        </ControlPanel>
    );
}
export default InfodeUsuario;

export const getStaticProps = async () => {
    const headInfo = {
        imgWidth: '400',
        imgHeight: '300',
        author: 'Leonardo Serrano',
        copyright: 'FLProductions',
        title: 'Actualizar datos',
        description:
            'Pagina de actualziacion de los datos de usuarios de FLProductions Costa Rica',
        type: 'website',
        url: 'https://flproductionscr.com/panel-de-control/informacion-de-usuario',
        image: 'https://flproductionscr.com/build_main/img/header-main.png',
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
