import { IconBrandInstagram } from "@tabler/icons";
import { useState } from "react";
import { algunasProducciones } from "./database/database";
import { YoutubeEmbed } from "./Helpers/youtubeEmbed";

export function AlgunasProducciones() {
    const [youtubeLink, setyoutubeLink] = useState('');
    const [instagramLink, setinstagramLink] = useState('');
    const [artistaItem, setartistaItem] = useState('');
    const [nombreItem, setnombreItem] = useState('');
    const [descripcionItem, setdescripcionItem] = useState('');
    const [onClick, setonClick] = useState(false);

    const prueba = (youtube, instagram, artista, descripcion, nombre) => {
        setyoutubeLink(youtube);
        setonClick(true);
        setinstagramLink(instagram);
        setartistaItem(artista);
        setdescripcionItem(descripcion);
        setnombreItem(nombre);
    }


    return(
        <div className="algunas-producciones">

            <h2>Algunas producciones hechas por nosotros</h2>
            

            <div className="algunas-producciones__botones">

                {
                    algunasProducciones.map(({ nombre, artista, youtube, instagram, descripcion }) => (
                        <div className="algunas-producciones__boton" key={ youtube }>
                            <p onClick={ () => prueba( youtube, instagram, artista, descripcion, nombre ) }>{ nombre }</p>
                        </div>
                    ))
                }
            </div>
            {
                onClick &&
                <div className="algunas-producciones__detalles contenedor">
                <div className="algunas-producciones__detalles__texto">

                    <h3>Nombre: <span>{nombreItem}</span>, interpretado por: <span>{artistaItem}</span></h3>

                    <p>{descripcionItem}</p>
                </div>
                
                <div className="algunas-producciones__detalles__instagram">
                    
                    <a target='_blank' href={instagramLink}>
                        <IconBrandInstagram size={50}/>
                        <p>{artistaItem}</p>
                    </a>
                    <a target='_blank' href='https://www.instagram.com/leotheprodu/'>
                        <IconBrandInstagram size={50}/>
                        <p>LeotheProdu</p>
                    </a>
                </div>
                </div>
            }

            <div  className="contenedor algunas-producciones__videoDiv">
                <YoutubeEmbed embedId={youtubeLink}/>
            </div>

        </div>

    )


}