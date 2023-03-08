
import { useEffect, useState } from "react";
import { useEnvLink } from "./UseEnvLink";


export const useProducciones_HTTP_Fetch = (url) => {
    const [envLink] = useEnvLink(process.env.NODE_ENV);
    
    const [producciones_HTTP_Fetch, setProducciones_HTTP_Fetch] = useState([]);
    
    
    
    useEffect(() => {
        
        fetch(`${envLink}${url}`)
        .then((res) => res.json())
        .then((data) => setProducciones_HTTP_Fetch(data.producciones));
        
    }, [envLink]);
    return [
        
        producciones_HTTP_Fetch
    ]
    
    
}



export const useArtistasBD = (url) => {
    
    const [artistas, setArtistas] = useState([]);
    const [envLink] = useEnvLink(process.env.NODE_ENV);



    useEffect(() => {
        fetch(`${envLink}${url}`)
            .then((res) => res.json())
            .then((data) => setArtistas(data.artistas));

    }, [envLink]);

    return [
        artistas
    ]

}

