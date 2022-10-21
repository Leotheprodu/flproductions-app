import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { NavMenu } from '../components/header__nav';
import { SocialIcons } from '../components/social-icons';

export function Root2 () {

  return(

    <React.StrictMode>

      <NavMenu />
      
      <Header imgName="Portada-pagina-leotheprodu.webp" pagina="root2"/>

      <div className='root-socialIcons'>
        <SocialIcons size={24} />
      </div>

      <div className='contenedor-main'>
      
        <Outlet />
    
      </div>
      
      <Footer/>
      
    </React.StrictMode>
  )

}