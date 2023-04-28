import { AvatarSelection } from '../../components/users/AvatarSelection';
import { UserBasicInfo } from '../../components/users/UserBasicInfo';
import { ControlPanel } from '../../components/layout/panel-de-control';
import { PropsHead } from '../../components/helpers/HeadMetaInfo';
import Head from 'next/head';

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
            </div>
        </ControlPanel>
    );
}
export default InfodeUsuario;

export const getServerSideProps = async () => {
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
