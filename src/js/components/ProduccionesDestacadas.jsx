
import { useState } from "react";
import { DetalleProducciones, ListadoProducciones } from "../components";
import { useProduccionesArtistasBD } from "./hooks/useFetchBD";


export function ProduccionesDestacadasNosotros() {
    const {produccionesArtistas} = useProduccionesArtistasBD('http://localhost:5000/api/artistas/producciones');



    const produccionesDestacadas = produccionesArtistas.filter(element => element.destacado === 1);
    const [infoProduccion, setInfoProduccion ] = useState({});
    const [onClick, setonClick] = useState(false);
    

    const selectedSong = (song) => {
        const {nombre, descripcion, nombre_artista, instagram, spotify_link, youtube_id} = song
        setonClick(true);

        setInfoProduccion({
            nombre,
            descripcion,
            spotify_link,
            youtube_id,
            nombre_artista,
            instagram
        });
        
        
    };
    
    
    return(
        <div className="algunas-producciones">

            <h2>Algunas producciones hechas por nosotros</h2>

            <ListadoProducciones songArray={produccionesDestacadas} selectedSong={selectedSong}/>

            { onClick &&
                <DetalleProducciones infoProduccion={infoProduccion}/>
            }

        </div>

    )


}