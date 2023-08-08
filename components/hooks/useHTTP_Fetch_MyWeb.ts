import { useEffect, useState } from 'react';

export const useProducciones_HTTP_Fetch = (
    ENV_PROD?: string,
    ENV_DEV?: string
) => {
    const [producciones_HTTP_Fetch, setProducciones_HTTP_Fetch] = useState([]);

    useEffect(() => {
        fetch(`${process.env.NODE_ENV === 'production' ? ENV_PROD : ENV_DEV}`)
            .then((res) => res.json())
            .then((data) => setProducciones_HTTP_Fetch(data.producciones));
    }, [ENV_PROD]);
    return [producciones_HTTP_Fetch];
};

export const useArtistasBD = (ENV_PROD: string, ENV_DEV: string) => {
    const [artistas, setArtistas] = useState([]);

    useEffect(() => {
        fetch(`${process.env.NODE_ENV === 'production' ? ENV_PROD : ENV_DEV}`)
            .then((res) => res.json())
            .then((data) => setArtistas(data.artistas));
    }, [ENV_PROD]);

    return [artistas];
};
