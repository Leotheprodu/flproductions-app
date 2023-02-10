import { SocialIcons } from "./social-icons";



export function Footer () {

    const copyright = new Date();

    const actualYear = copyright.getFullYear();
    
    return(

        <footer className="footer">

            <div className="footer_content">
                
            <p><span>© 2013 - {actualYear} FLProductions</span> - creado por LeotheProdu</p>
            

            </div>
            <div className="footer_content2">

            <SocialIcons size={25} />
            </div>

        </footer>

    )
}