import PropTypes from "prop-types";
import { Helmet, HelmetProvider } from 'react-helmet-async';
export const Head = (props) => {
    return (

      <HelmetProvider>
       
        <Helmet>
          <meta name="description" content={props.description} />
          <meta property="og:title" content={props.title} />
          <meta property="og:description" content={props.description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={props.url} />
          <meta property="og:image" content={props.image} />
          <meta property="og:image:width" content="400" />
          <meta property="og:image:height" content="300" />
        </Helmet>
      </HelmetProvider>
    );
  };
  
  export default Head;


/* YoutubeEmbed.propTypes = {
    embedId: PropTypes.string.isRequired
}; */