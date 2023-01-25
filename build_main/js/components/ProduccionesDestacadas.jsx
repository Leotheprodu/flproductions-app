
import { useState } from "react";
import { YoutubeEmbed } from "./Helpers/youtubeEmbed";
import { DetalleProducciones, ListadoProducciones } from "../components";
import { useArtistasBD, useProduccionesArtistasBD } from "./hooks/useFetchBD";


export function ProduccionesDestacadasNosotros() {

    const {produccionesArtistas} = useProduccionesArtistasBD('http://localhost:5000/api/artistas/producciones');
    const {artistas} = useArtistasBD('http://localhost:5000/api/artistas');



    const produccionesDestacadas = produccionesArtistas.filter(element => element.destacado === 1);
    const [infoProduccion, setInfoProduccion ] = useState({});
    const [onClick, setonClick] = useState(false);
    

    const selectedSong = ({nombre, descripcion, id_artista, spotify_link, youtube_id}) => {
        setonClick(true);
        const artistaItem = artistas.find(element => element.id === id_artista).nombre;
        const instagramLink = artistas.find(element => element.id === id_artista).instagram;

        setInfoProduccion({
            nombre,
            descripcion,
            spotify_link,
            youtube_id,
            artistaItem,
            instagramLink
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