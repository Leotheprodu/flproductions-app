import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer, NavMenu, SocialIcons } from '../components';


export function Root() {

  return(
    
    <React.StrictMode>

      <NavMenu/>

      <Header imgName="header-main.png" pagina="header"/>
    
      <div className='root-socialIcons'>
        <SocialIcons size={24} />
      </div>
      

      <div className='contenedor-main'>
      
        <Outlet />
      
      </div>
      
      <Footer />
      
    </React.StrictMode>
  )

}