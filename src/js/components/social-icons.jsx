import { IconBrandFacebook, IconBrandYoutube, IconBrandInstagram, IconBrandTwitch } from '@tabler/icons';
import propTypes from 'prop-types'

export function SocialIcons({size, stroke, claseCSS}) {

    return (

        
        <div className="socialIcons">

            <a href="https://www.facebook.com/FLProductionscr" target="_blank">
                <IconBrandFacebook 
                    className={'social-icon'+' '+claseCSS}
                    size={size} // set custom `width` and `height`
                    stroke={stroke}
                   /*  strokeLinejoin="miter" // override other SVG props */
                />
            </a>
            <a href="https://www.youtube.com/channel/UCAVKw7wP-yKPGSbCd1BJ7mw" target="_blank">
                <IconBrandYoutube
                    className={'social-icon'+' '+claseCSS}
                    size={size} // set custom `width` and `height`
                    stroke={stroke}  // set `stroke-width`
                />
            </a>
            <a href="https://www.instagram.com/leotheprodu/" target="_blank">
                <IconBrandInstagram 
                    className={'social-icon'+' '+claseCSS}
                    size={size} // set custom `width` and `height`
                    stroke={stroke}  // set `stroke-width`
                />
            </a>
            <a href="https://www.twitch.tv/leotheprodu" target="_blank">
                <IconBrandTwitch 
                    className={'social-icon'+' '+claseCSS}
                    size={size} // set custom `width` and `height`
                    stroke={stroke}  // set `stroke-width`
                />
            </a>


        </div>
            

        

    )


}

SocialIcons.propTypes = {
    
    size: propTypes.number.isRequired,
    stroke: propTypes.number.isRequired,
    claseCSS: propTypes.string,
    
}

SocialIcons.defaultProps = {

    size: 18,
    stroke: 2,

}