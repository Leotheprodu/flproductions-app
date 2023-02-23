import PropTypes from 'prop-types'
import { Carousel } from 'react-responsive-carousel'

export function BannerSlider ({datos}) {

  return (

    <>
      <Carousel 
        autoPlay 
        infiniteLoop 
        interval={6000} 
        showStatus={false} 
        showIndicators={false} 
        emulateTouch
      >
        { datos.map( ({img_link, link, title, description}) => (
            

              <div
                key={title} 
                className='BannerSlider__div' 
                style={{
                  background: `url(${img_link})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
              
                }}
              >
                <div className='BannerSlider__div-texto'>
                  <h2>{title}</h2>
                  <p>{description}</p>
                  <a href={link}>Mas información</a>
                  


                </div>

              </div>
                    
          ))
        }
        
      </Carousel>
    </>


  )

}
/* BannerSlider.propTypes = {
    
  pagina: PropTypes.string.isRequired,
  img_link: PropTypes.string.isRequired,
  
}
BannerSlider.defaultProps = {

  img_link: "../../build_main/img/header-main.png",
  pagina: "default",

} */