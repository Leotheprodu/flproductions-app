import PropTypes from "prop-types";

export function YoutubeEmbed({ embedId }) {
    
    return(

        <div className="video-responsive">
            <iframe
            width="1200"
            height="483"
            src={`https://www.youtube.com/embed/${embedId}?autoplay=1&modestbranding=1&rel=0`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title=""
            />
        </div>
    );

}


YoutubeEmbed.propTypes = {
    embedId: PropTypes.string.isRequired
};