import { IconBrandInstagram, IconBrandSpotify } from "@tabler/icons";
import { YoutubeEmbed } from "./Helpers/youtubeEmbed";



export const DetalleProducciones = ({infoProduccion}) => {
const { nombre, descripcion, nombre_artista, instagram, spotify_link, youtube_id } = infoProduccion

  return (
    <div className="algunas-producciones__detalles contenedor">
        <div className="algunas-producciones__detalles__texto">

            <h3>Nombre: <span>{nombre}</span>, interpretado por: <span>{nombre_artista}</span></h3>

            <p>{descripcion}</p>
        </div>
        
        <div className="algunas-producciones__detalles__links">
            
            { spotify_link &&
                <a target='_blank' href={spotify_link}>
                    <IconBrandSpotify stroke={1} size={30}/>
                    <p>Spotify</p>
                </a>

            }

            <a target='_blank' href={instagram}>
                <IconBrandInstagram stroke={1} size={30}/>
                <p>{nombre_artista}</p>
            </a>
            <a target='_blank' href='https://www.instagram.com/leotheprodu/'>
                <IconBrandInstagram stroke={1} size={30}/>
                <p>LeotheProdu</p>
            </a>
            
        </div>

    </div>
  )
}
