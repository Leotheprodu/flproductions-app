import { IconMenu2 } from '@tabler/icons';
import propTypes from 'prop-types'
/* import { useState } from 'react' */

let claseInteligente = 'nav-normal'

/* const paginas = {
  'Inicio': '#',
  'Acerca de Nosotros': '#',
  'Blog': '#',
  'contacto': '#',
  'servicios': '#'

} */

export function NavMenu({pagina}) {

  function inicio() {
    if(pagina ==='inicio') {

      return "nav_menu-active"
    }
  }
  function nosotros() {
    if(pagina ==='acerca de nosotros') {

      return "nav_menu-active"
    }
  }
  function blog() {
    if(pagina ==='blog') {

      return "nav_menu-active"
    }
  }
  function contacto() {
    if(pagina ==='contacto') {

      return "nav_menu-active"
    }
  }
  function servicios() {
    if(pagina ==='servicios') {

      return "nav_menu-active"
    }
  }

  /* const [clasenueva, setCounter] = useState( claseInteligente );
  
  function botonMenu () {

    if(claseInteligente === 'nav-normal') {
  
      setCounter('clickbuttonmenu')
      claseInteligente = 'clickbuttonmenu'
  
    }else if(claseInteligente === 'clickbuttonmenu'){
      
      setCounter('nav-normal')
      claseInteligente = 'nav-normal'
    }
  } */

  return(
    <div className='header__nav'>

      <h1>FLProductions</h1>

      <nav>

        <button>

          <IconMenu2
            /* onClick={botonMenu} */
            className="nav-toggle"
            size={24} // set custom `width` and `height`
            stroke={1}  // set `stroke-width`

          />

        </button>


        <a className={claseInteligente+" "+ inicio()} href="#">Inicio</a>
        <a className={claseInteligente+" "+ nosotros()} href="#">Acerca de Nosotros</a>
        <a className={claseInteligente+" "+ blog()} href="#">Blog</a>
        <a className={claseInteligente+" "+ contacto()} href="#">Contacto</a>
        <a className={claseInteligente+" "+ servicios()} href="#">Servicios</a>
        

      </nav>
      

    </div>


  )


}

NavMenu.propTypes = {
    
  pagina: propTypes.string.isRequired,
  
}