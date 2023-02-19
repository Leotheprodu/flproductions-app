import { IconMicrophone, IconBrandSpotify } from "@tabler/icons";




export const DetalleProducciones = ({infoProduccion, tipo_obra_general}) => {
const { descripcion, nombre_artista, spotify_link, estilo, genero, fecha_lanzamiento, bpm, key } = infoProduccion
const fecha = new Date(fecha_lanzamiento);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear().toString();
    const fechaFormateada = `${dia}/${mes}/${anio}`;
  return (
    <div className="detalle-producciones contenedor">
        <div className="detalle-producciones__texto">


            <p>{descripcion}</p>

        </div>
        <div className="detalle-producciones__appmusic__masdetalles">
                <p><span>Estilo:</span> {`${estilo}`}</p>
                <p><span>Genero Musical:</span> {`${genero}`}</p>
                <p><span>Fecha de Lanzamiento:</span> {`${fechaFormateada}`}</p>
                <p><span>Key:</span> {`${key}`}</p>
                <p><span>bpm:</span> {`${bpm}`}</p>

            </div>
        <div className="detalle-producciones__links">
            
            { spotify_link &&
                <a target='_blank' href={spotify_link}>
                    <IconBrandSpotify stroke={1} size={30}/>
                    <p>Escuchar en Spotify</p>
                </a>

            }
            
            { tipo_obra_general !== 1 &&
                <a href={`/artistas/${nombre_artista}`}>
                    <IconMicrophone stroke={1} size={30}/>
                    <p>{`mas de ${nombre_artista}`}</p>
                </a>
            }
            { tipo_obra_general === 1 &&
                <a href={`/productores/${nombre_artista}`}>
                    <IconMicrophone stroke={1} size={30}/>
                    <p>{`mas de ${nombre_artista}`}</p>
                </a>
            }
            
        </div>

    </div>
  )
}
