import { Helmet } from 'react-helmet-async';

export const MetaInjector = ({title, description, type, url, image, keywords, robots}) => {


const imgWidth = "400"
const imgHeight = "300"
const author = "Leonardo Serrano"
const copyright = "FLProductions"


    return (
        <Helmet>
            <title>{`${title} | FLProductions`}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords}/>
            <meta name="robots" content={robots}/>
            <meta name="author" content={author} />
            <meta name="copyright" content={copyright} />
            <meta property="og:description" content={description} />
            <meta property="og:title" content={`${title} | FLProductions`} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content={imgWidth} />
            <meta property="og:image:height" content={imgHeight} />
        </Helmet>
    )
}