import { FormulariodeContacto } from '../components';
import { PropsHead } from '../components/helpers/HeadMetaInfo';
import Head from 'next/head';

function ContactPage({ headInfo }) {
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

            <div className="contacto-container">
                <h3 className="contacto__contact-form__title">Contáctenos</h3>

                <FormulariodeContacto />
            </div>

            <div className="contacto__map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2268.886137957426!2d-83.55804507982572!3d10.131148626326205!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x572d591623657f53!2sFLProductions!5e0!3m2!1ses!2scr!4v1667294867121!5m2!1ses!2scr"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </>
    );
}

export default ContactPage;

export const getStaticProps = async () => {
    const headInfo = {
        imgWidth: '400',
        imgHeight: '300',
        author: 'Leonardo Serrano',
        copyright: 'FLProductions',
        title: 'Contacto',
        description:
            'Información de contacto de los estudios de FLProductions Costa Rica',
        type: 'website',
        url: 'https://flproductionscr.com/contacto',
        image: `${process.env.NEXT_PUBLIC_PROD_LINK}/build_main/img/header-main.png`,
        keywords: 'musica, artistas, destacados, producciones, music',
        robots: 'index, follow',
    };

    return {
        props: {
            headInfo,
        },
    };
};
