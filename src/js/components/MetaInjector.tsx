
import { Helmet } from 'react-helmet-async';

interface Props {
    title: string
    description: string
    type: string
    url: string
    image: string
    keywords: string
    robots: string
}

export const MetaInjector = ({title, description, type, url, image, keywords, robots}: Props) => {


const imgWidth :string = "400"
const imgHeight :string = "300"
const author :string = "Leonardo Serrano"
const copyright :string = "FLProductions"


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