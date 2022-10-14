import React from 'react';
import { renderRoot } from "./main";
import { Header } from './header';

export function ServiciosRender () {

  renderRoot.render(

    <React.StrictMode>
  
      <Header imgName="header-main" pagina="servicios"/>
  
      <div>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo, nulla. Quaerat quod earum delectus ab facilis nesciunt, rem nihil, incidunt unde suscipit dolorem possimus repellendus consequatur praesentium ea ipsam repellat!</p>
        
      </div>
      
  
    </React.StrictMode>
  )

}