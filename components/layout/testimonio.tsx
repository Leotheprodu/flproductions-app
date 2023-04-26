import { Carousel } from 'react-responsive-carousel';
import { testimonios } from '../database_temp/database';
import Image from 'next/image';
import Link from "next/link";

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
                        <p>&quot; {texto} &quot;</p>
                    </div>

                    <div className='testimonio__imagen'>
                        <Link target="_blank" href={link}>
                            <img src={imagen} alt={nombre+"-testimonio-imagen"} />
                        </Link>
                    </div>
                        <Link target="_blank" href={link}>
                            <h4>{nombre}</h4>
                        </Link>
                
                </div>
                
                    ))
                }

            </Carousel>

        </div>


    )
}