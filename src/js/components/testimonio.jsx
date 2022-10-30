import { Carousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types'

export function Testimonio({testimonios}) {

    return(

        <div className="testimonio">
            <h3>Testimonios</h3>

            <Carousel 
            autoPlay 
            infiniteLoop 
            interval={6000} 
            showStatus={false} 
            showIndicators={false} 
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

Testimonio.propTypes = {
    
    testimonios: PropTypes.array.isRequired,
    
}