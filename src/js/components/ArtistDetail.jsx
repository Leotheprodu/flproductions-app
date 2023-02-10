import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useProduccionesArtistasBD } from "./hooks/useFetchBD";


export const ArtistDetail = () => {
    const {artist_name} = useParams();
    const [produccionActual, setproduccionActual] = useState(null);
    const {produccionesArtistas} = useProduccionesArtistasBD('http://localhost:5000/api/artistas/producciones');
    
    useEffect(() => {
        if (produccionesArtistas) {
            setproduccionActual(produccionesArtistas.filter(element => element.nombre_artista === artist_name));
        }
    }, [produccionesArtistas, artist_name]);
    
    if (!produccionActual) {
        return <div className="lds-ring"><div></div><div></div><div></div><div></div></div>;
    }
    
    if (!produccionActual.length) {
        return <div>Lo sentimos, No se encontraron datos</div>;
    }
    const {nombre_artista} = produccionActual[0];

    
    return (
        <div>
            <h1>{nombre_artista}</h1>
            
        </div>
    );
}