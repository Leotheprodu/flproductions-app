
import { useEffect, useState } from "react";


export const useProducciones_HTTP_Fetch = (url) => {
    
    const [producciones_HTTP_Fetch, setProducciones_HTTP_Fetch] = useState([]);
    
    useEffect(() => {
        fetch(url)
        .then((res) => res.json())
        .then((data) => setProducciones_HTTP_Fetch(data));
    }, []);
    
    
    
    return { 
        producciones_HTTP_Fetch
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