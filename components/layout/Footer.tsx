import React from 'react';
import { SocialIcons } from './social-icons';

export function Footer() {
    const copyright = new Date();

    const actualYear = copyright.getFullYear();

    return (
        <footer className="footer dark:bg-terciario dark:text-blanco dark:border-none">
            <div className="footer_content">
                <p className="dark:text-secundario">
                    © 2013 - {actualYear}{' '}
                    <span className="dark:text-primario">FLProductions</span> by
                    LeotheProdu
                </p>
            </div>
            <div className="footer_content2">
                <SocialIcons
                    size={22}
                    facebook="https://www.facebook.com/FLProductionscr"
                    youtube="https://www.youtube.com/channel/UCAVKw7wP-yKPGSbCd1BJ7mw"
                    instagram="https://www.instagram.com/leotheprodu/"
                    twitch="https://www.twitch.tv/leotheprodu"
                    claseCSS=""
                    spotify=""
                />
            </div>
        </footer>
    );
}
