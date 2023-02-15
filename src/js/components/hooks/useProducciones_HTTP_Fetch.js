
import { useEffect, useState } from "react";


export const useProducciones_HTTP_Fetch = (url, localUrl) => {
    
    const [producciones_HTTP_Fetch, setProducciones_HTTP_Fetch] = useState([]);
    
    

        
        useEffect(() => {
            if (process.env.NODE_ENV === 'development') {
            fetch(localUrl)
            .then((res) => res.json())
            .then((data) => setProducciones_HTTP_Fetch(data));
        } else {
            fetch(url)
            .then((res) => res.json())
            .then((data) => setProducciones_HTTP_Fetch(data));
        }
        }, []);
        return [

            producciones_HTTP_Fetch
        ] 


}



export const useArtistasBD = (url, localUrl) => {
    
    const [artistas, setArtistas] = useState([]);
    
    

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
        fetch(localUrl)
        .then((res) => res.json())
        .then((data) => setArtistas(data));
        } else {
            fetch(url)
            .then((res) => res.json())
            .then((data) => setArtistas(data));
        }

    }, []);

    return [ 
        artistas
    ]

}

