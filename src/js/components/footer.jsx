import { SocialIcons } from "./social-icons";



export function Footer () {

    const copyright = new Date();

    const actualYear = copyright.getFullYear();
    
    return(

        <div className="footer">

            <p><span>© 2013 - {actualYear} FLProductions</span> - creado por LeotheProdu</p>
            <div className="footer_social-icons">
                <SocialIcons size={25} />
            </div>


        </div>

    )
}