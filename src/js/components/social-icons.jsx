import { IconBrandFacebook, IconBrandYoutube, IconBrandInstagram, IconBrandTwitch, IconBrandSpotify } from '@tabler/icons';
import PropTypes from 'prop-types'

export function SocialIcons({size, stroke, claseCSS, facebook, youtube, instagram, twitch, spotify}) {

    return (

        
        <div className="socialIcons">
            {
                facebook &&
                    <a tabIndex={-1} href={facebook} target="_blank">
                        <IconBrandFacebook 
                            className={'social-icon'+' '+claseCSS}
                            size={size}
                            stroke={stroke}
                        />
                    </a>
            }

            {
                youtube &&
                    <a tabIndex={-1} href={youtube} target="_blank">
                        <IconBrandYoutube
                            className={'social-icon'+' '+claseCSS}
                            size={size}
                            stroke={stroke}
                        />
                    </a>

            }
            {
                instagram &&
                    <a tabIndex={-1} href={instagram} target="_blank">
                        <IconBrandInstagram 
                            className={'social-icon'+' '+claseCSS}
                            size={size}
                            stroke={stroke}
                        />
                    </a>
            }

            {
                twitch &&
                    <a tabIndex={-1} href={twitch} target="_blank">
                        <IconBrandTwitch 
                            className={'social-icon'+' '+claseCSS}
                            size={size} 
                            stroke={stroke}
                        />
                    </a>
            }
            {
                spotify &&
                    <a tabIndex={-1} href={spotify} target="_blank">
                        <IconBrandSpotify 
                            className={'social-icon'+' '+claseCSS}
                            size={size} 
                            stroke={stroke}
                        />
                    </a>
            }


        </div>
            

        

    )


}

SocialIcons.propTypes = {
    
    size: PropTypes.number.isRequired,
    stroke: PropTypes.number.isRequired,
    claseCSS: PropTypes.string,
    
}

SocialIcons.defaultProps = {

    size: 18,
    stroke: 2,

}