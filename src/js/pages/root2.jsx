import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer, NavMenu, SocialIcons } from '../components';

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