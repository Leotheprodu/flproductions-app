import { useSelector } from 'react-redux';
import { AvatarUsers, MensajesDelSistema } from '../../components';
import { RootState } from '../../components/redux/store';
import { ControlPanel } from '../../components/layout/panel-de-control';
import { PropsHead } from '../../components/helpers/HeadMetaInfo';
import Head from 'next/head';


function InicioPaneldeControl({ headInfo }) {
    const { imgWidth, imgHeight, author, copyright, title, description, type, url, image, keywords, robots }: PropsHead = headInfo;
    const user = useSelector((state: RootState) => state.user.session.user);

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
                <meta property="og:title" content={`${title} | FLProductions`} />
                <meta property="og:type" content={type} />
                <meta property="og:url" content={url} />
                <meta property="og:image" content={image} />
                <meta property="og:image:width" content={imgWidth} />
                <meta property="og:image:height" content={imgHeight} />
            </Head>

            <div className='InicioPaneldeControl__div contenedor'>
                <div className='InicioPaneldeControl'>

                    <AvatarUsers id={user.id} username={user.username} size={10} />

                    <div className='InicioPaneldeControl_textos'>
                        <h1>{user.username}</h1>


                    </div>
                </div>
                <div className='InicioPaneldeControl__mensajes'>
                    <MensajesDelSistema />

                </div>

            </div>

            <div className='contenedor'>
            </div>
        </ControlPanel>
    )
}

export default InicioPaneldeControl;

export const getServerSideProps = async () => {

    const headInfo = {

        imgWidth: '400',
        imgHeight: '300',
        author: 'Leonardo Serrano',
        copyright: 'FLProductions',
        title: 'Panel de Control',
        description: 'Panel de Control de los usuarios de FLProductions Costa Rica',
        type: 'website',
        url: 'https://flproductionscr.com/panel-de-control',
        image: 'https://flproductionscr.com/build_main/img/header-main.png',
        keywords: 'panel de control, artistas, usuarios, flproductions, music, Costa Rica',
        robots: 'index, follow',
    }

    return {

        props: {

            headInfo,
        }
    }

};