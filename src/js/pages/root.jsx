/* import React from 'react'; */
import { Outlet } from 'react-router-dom';
import { Footer, NavMenu } from '../components';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { Provider } from 'react-redux';
import store from '../components/redux/store';



export function Root() {

  return (
    <Provider store={store}>

      <div className='root-container'>
        <NavMenu />


        <main className='contenedor-main'>

          <Outlet />

        </main>
        <div>
          <TawkMessengerReact
            propertyId="5803024f304e8e75855baa7f"
            widgetId="default" />
        </div>
        <Footer />
      </div>
    </Provider>
  )

}
