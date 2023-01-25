
import { useEffect, useState } from "react";


export const useProduccionesArtistasBD = (url) => {
    
    const [produccionesArtistas, setproduccionesArtistas] = useState([]);
    
    useEffect(() => {
        fetch(url)
        .then((res) => res.json())
        .then((data) => setproduccionesArtistas(data));
    }, []);
    
    
    
    return { 
        produccionesArtistas
    }

}

export const useArtistasBD = (url) => {
    
    const [artistas, setArtistas] = useState([]);
    
    useEffect(() => {
        fetch(url)
        .then((res) => res.json())
        .then((data) => setArtistas(data));
    }, []);
    
    
    
    return { 
        artistas
    }

}