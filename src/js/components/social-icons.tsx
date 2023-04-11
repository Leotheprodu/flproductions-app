import { IconBrandFacebook, IconBrandYoutube, IconBrandInstagram, IconBrandTwitch, IconBrandSpotify } from '@tabler/icons';

interface Props {
    size: number
    stroke: number
    claseCSS: string
    facebook: string
    youtube: string
    instagram: string
    twitch: string
    spotify: string

}

export function SocialIcons({size, stroke, claseCSS, facebook, youtube, instagram, twitch, spotify}: Props) {

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

SocialIcons.defaultProps = {

    size: 18,
    stroke: 2,

}