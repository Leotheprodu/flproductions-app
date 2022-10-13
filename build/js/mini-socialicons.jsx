import { IconBrandFacebook, IconBrandYoutube, IconBrandInstagram, IconBrandTwitch } from '@tabler/icons';
import propTypes from 'prop-types'

export function SocialIcons({size, stroke, claseCSS}) {

    return (

        <>

            <a href="https://www.facebook.com/FLProductionscr" target="_blank">
                <IconBrandFacebook 
                    className={claseCSS}
                    size={size} // set custom `width` and `height`
                    stroke={stroke}
                   /*  strokeLinejoin="miter" // override other SVG props */
                />
            </a>
            <a href="https://www.youtube.com/channel/UCAVKw7wP-yKPGSbCd1BJ7mw" target="_blank">
                <IconBrandYoutube
                    className={claseCSS}
                    size={size} // set custom `width` and `height`
                    stroke={stroke}  // set `stroke-width`
                />
            </a>
            <a href="https://www.instagram.com/leotheprodu/" target="_blank">
                <IconBrandInstagram 
                    className={claseCSS}
                    size={size} // set custom `width` and `height`
                    stroke={stroke}  // set `stroke-width`
                />
            </a>
            <a href="https://www.twitch.tv/leotheprodu" target="_blank">
                <IconBrandTwitch 
                    className={claseCSS}
                    size={size} // set custom `width` and `height`
                    stroke={stroke}  // set `stroke-width`
                />
            </a>
            

        </>

    )


}

SocialIcons.propTypes = {
    
    size: propTypes.number.isRequired,
    stroke: propTypes.number.isRequired,
    claseCSS: propTypes.string.isRequired,
    
}

SocialIcons.defaultProps = {

    size: 18,
    stroke: 2,
    claseCSS: 'social-icon',

}