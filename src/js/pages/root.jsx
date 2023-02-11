/* import React from 'react'; */
import { Outlet } from 'react-router-dom';
import { Header, Footer, NavMenu, SocialIcons } from '../components';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';



export function Root() {

  return(
    
   /*  <React.StrictMode> */
<>
      <NavMenu/>

      {/* <Header imgLink="https://flproductionscr.com/build_main/img/header-main.webp" pagina="header"/> */}
      

      <main className='contenedor-main'>
      
        <Outlet />
      
      </main>
      <div>
        <TawkMessengerReact
          propertyId="5803024f304e8e75855baa7f"
          widgetId="default"/>
      </div>
      <Footer />
      </>
    /* </React.StrictMode> */
  )

}
