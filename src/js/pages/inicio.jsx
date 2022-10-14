import React from 'react';
import { renderRoot } from "../main";
import { Header } from '../components/header';

export function InicioRender() {

  renderRoot.render(

    <React.StrictMode>
  
      <Header imgName="header-main.png" pagina="inicio"/>
  
      <div className='contenedor inicio_info1'>
      <h1>Estudio de grabación y producción musical</h1>
        <p>Desde Siquirres de Limón, Costa Rica, ofrecemos un servicio profesional de grabación y producción musical, queremos ofrecerte todo lo que necesitas para que tu proyecto musical sea todo un éxito.</p>
        <div className='inicio_info1_servicios-cards'>

        </div>
      </div>
      
  
    </React.StrictMode>
  )

}