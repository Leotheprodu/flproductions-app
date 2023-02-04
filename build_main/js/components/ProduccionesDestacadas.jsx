
import { useState } from "react";
import { DetalleProducciones, ListadoProducciones } from "../components";
import { useProduccionesArtistasBD } from "./hooks/useFetchBD";


export function ProduccionesDestacadasNosotros() {
    const {produccionesArtistas} = useProduccionesArtistasBD('http://localhost:5000/api/artistas/producciones');

    const produccionesDestacadas = produccionesArtistas.filter(element => element.destacado === 1);
    const [playing, setPlaying] = useState(false);
    

    const [infoProduccion, setInfoProduccion ] = useState({});
    const [idCompActual, setidCompActual ] = useState(null);
    const [pause, setPause] = useState(false);

    const selectedSong = (song, idComp) => {
        const {id, nombre, descripcion, nombre_artista, instagram, spotify_link, youtube_id} = song
        !playing && setPlaying(true)
        setInfoProduccion({
            nombre,
            descripcion,
            spotify_link,
            youtube_id,
            nombre_artista,
            instagram,
            id,
        });
        setidCompActual(idComp);

        
        
    };
    const clickBoton = () =>  setPlaying(!playing);
    
    
    return(
        <div className="algunas-producciones">

            <h2>Algunas producciones hechas por nosotros</h2>

            <ListadoProducciones 
                songArray={produccionesDestacadas}
                clickBoton= {clickBoton}
                playing ={playing}
                infoProduccion={infoProduccion}
                selectedSong = {selectedSong}
                idComp = {1}
                idCompActual = {idCompActual}
                pause ={pause}
                setPause ={setPause}
                />

            { playing &&
                <DetalleProducciones infoProduccion={infoProduccion}/>
            }
            

        </div>

    )


}