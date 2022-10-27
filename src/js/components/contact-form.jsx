import { useState } from "react";
import { ContactInfo } from "./contact-info";
import { IconMapPin, IconPhone, IconMail } from '@tabler/icons';

export function FormulariodeContacto() {

  const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [formStatus, setFormStatus] = useState('Enviar')
  const InfoCardSize = 40
  const infoCardStroke = 2

  const onSubmit = (e) => {
    e.preventDefault()
    setFormStatus('Enviando...')
    const { name, email, message } = e.target.elements
    let conFom = {
      name: name.value,
      email: email.value,
      message: message.value,
    }
    setFormStatus('Enviado Correctamente')
    console.log(conFom)
  }

  return (
    <>
  
      <div className="contacto-grid">
      <div className="contacto_info-Icons">
      <ContactInfo 
      icon={
        <IconMapPin
        size={InfoCardSize} 
        stroke={infoCardStroke}
        />
      }
      titulo='Dirección'
      parrafo='Herediana de Siquirres, Limón Costa Rica'
      
      />
      <ContactInfo 
      icon={
        <IconPhone
        size={InfoCardSize} 
        stroke={infoCardStroke}
        />
      }
      titulo='Dirección'
      parrafo='Herediana de Siquirres, Limón Costa Rica'
      
      />
      <ContactInfo 
      icon={
        <IconMail
        size={InfoCardSize} 
        stroke={infoCardStroke}
        />
      }
      titulo='Dirección'
      parrafo='Herediana de Siquirres, Limón Costa Rica'
      
      />
      </div>
      

        <div className=" formulario container mt-5 ">
          <h3 className="mb-3">Contacto</h3>
          <form onSubmit={onSubmit} >
            <div className="mb-3">
              <label className="form-label" htmlFor="nombre">
                Nombre
              </label>
              <input className="form-control" type="text" id="nombre" required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input className="form-control" type="email" id="email" required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="mensaje">
                Mensaje
              </label>
              <textarea className="form-control" id="mensaje" required />
            </div>
            <div className="contact__button">
            <button className="btn btn-danger" type="submit">
              Enviar
            </button>
            </div>
          </form>
        </div>
      </div>

    </>





  )

}
