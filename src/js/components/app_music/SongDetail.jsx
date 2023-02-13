import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useProducciones_HTTP_Fetch } from "../hooks/useProducciones_HTTP_Fetch";


export const SongDetail = () => {
    const {id} = useParams();
    const [produccionActual, setproduccionActual] = useState(null);
    const [producciones_HTTP_Fetch] = useProducciones_HTTP_Fetch('http://localhost:5000/api/artistas/producciones');
    const produccionesArtistas = producciones_HTTP_Fetch.filter(element => element.tipo_obra === 0);
    
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