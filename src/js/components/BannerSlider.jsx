import PropTypes from 'prop-types'

export function BannerSlider ({datos}) {
const {img_link, link, titulo, descripcion} = datos
  return (

    

    <div className="BannerSlider">

      <div>
        
        <picture>

          <img className={pagina+"-img"} style={{ backgroundImage:`url(${imgLink})` }} loading="lazy" />
        </picture>

      </div>


    </div>

  )

}
BannerSlider.propTypes = {
    
  pagina: PropTypes.string.isRequired,
  imgLink: PropTypes.string.isRequired,
  
}
BannerSlider.defaultProps = {

  imgLink: "../../build_main/img/header-main.png",
  pagina: "default",

}