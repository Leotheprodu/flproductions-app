import { SocialIcons } from "./social-icons";



export function Footer () {

    const copyright = new Date();

    const actualYear = copyright.getFullYear();
    
    return(

        <div className="footer">

            <div>
                <SocialIcons size={24} claseCSS='header__socialIcons__icons' />
            </div>

            <p>© 2013 - {actualYear} FLProductions - creado por LeotheProdu</p>

        </div>

    )
}