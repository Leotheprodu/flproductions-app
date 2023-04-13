import { Carousel } from 'react-responsive-carousel';
import { testimonios } from '../database_temp/database';

export function Testimonio() {

    return(

        <div className="testimonio">
            <h3>Lo que dicen los clientes</h3>

            <Carousel 
            autoPlay 
            infiniteLoop 
            interval={6000} 
            showStatus={false} 
            showIndicators={false} 
            showThumbs={false}
            emulateTouch
            >
                { testimonios.map( ({texto, link, nombre, imagen}) => (
                <div key={nombre}>
                    <div>
                        <p>" {texto} "</p>
                    </div>

                    <div className='testimonio__imagen'>
                        <a target="_blank" href={link}>
                            <img src={imagen} alt={nombre+"-testimonio-imagen"} />
                        </a>
                    </div>
                        <a target="_blank" href={link}>
                            <h4>{nombre}</h4>
                        </a>
                
                </div>
                
                    ))
                }

            </Carousel>

        </div>


    )
}