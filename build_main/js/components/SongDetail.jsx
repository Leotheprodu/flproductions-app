import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useProduccionesArtistasBD } from "./hooks/useFetchBD";


export const SongDetail = () => {
    const {id} = useParams();
    const [produccionActual, setproduccionActual] = useState(null);
    const {produccionesArtistas} = useProduccionesArtistasBD('http://localhost:5000/api/artistas/producciones');
    
    useEffect(() => {
        if (produccionesArtistas) {
            setproduccionActual(produccionesArtistas.filter(element => element.id === parseInt(id)));
        }
    }, [produccionesArtistas, id]);
    
    if (!produccionActual) {
        return <div className="lds-ring"><div></div><div></div><div></div><div></div></div>;
    }
    
    if (!produccionActual.length) {
        return <div>Lo sentimos, No se encontraron datos</div>;
    }
    const {nombre, artista, genero, duracion} = produccionActual[0]
    
    return (
        <div>
            <h1>{nombre}</h1>
            
        </div>
    );
}