import { IconBrandInstagram, IconBrandSpotify } from "@tabler/icons";
import { useState, useEffect } from "react";
import { YoutubeEmbed } from "./Helpers/youtubeEmbed";

export function ProduccionesDestacadas() {
    const [producciones, setProducciones] = useState([]);
    const [artistas, setArtistas] = useState([]);
    

    useEffect(() => {
        fetch('http://localhost:5000/api/artistas/producciones')
        .then((res) => res.json())
        .then((data) => setProducciones(data));
    }, []);
    useEffect(() => {
        fetch('http://localhost:5000/api/artistas')
        .then((res) => res.json())
        .then((data) => setArtistas(data));
    }, []);


    const [youtubeLink, setyoutubeLink] = useState('');
    const produccionesDestacadas = producciones.filter(element => element.destacado === 1);
    const [instagramLink, setinstagramLink] = useState('');
    const [spotifyLink, setSpotifyLink] = useState('');
    const [artistaItem, setartistaItem] = useState('');
    const [nombreItem, setnombreItem] = useState('');
    const [descripcionItem, setdescripcionItem] = useState('');
    const [onClick, setonClick] = useState(false);
    

    const onClickStateAsign = (nombre, descripcion, id_artista, spotify_link, youtube_id) => {
        setyoutubeLink(youtube_id);
        setonClick(true);
        setdescripcionItem(descripcion);
        setnombreItem(nombre);
        setSpotifyLink(spotify_link);
        setartistaItem(artistas.find(element => element.id === id_artista).nombre);
        setinstagramLink(artistas.find(element => element.id === id_artista).instagram);
        youtube = youtube_id;
    }
    
    
    return(
        <div className="algunas-producciones">

            <h2>Algunas producciones hechas por nosotros</h2>

            <div className="algunas-producciones__botones">

                {
                    
                    produccionesDestacadas.map(({id, nombre, descripcion, id_artista, spotify_link, youtube_id}) => (
                        <div className="algunas-producciones__boton" key={ id }>
                            <p onClick={ () => onClickStateAsign( nombre, descripcion, id_artista, spotify_link, youtube_id) }>{ nombre }</p>
                        </div>
                    ))
                }
            </div>
            { onClick &&
                <div className="algunas-producciones__detalles contenedor">
                    <div className="algunas-producciones__detalles__texto">

                        <h3>Nombre: <span>{nombreItem}</span>, interpretado por: <span>{artistaItem}</span></h3>

                        <p>{descripcionItem}</p>
                    </div>
                    
                    <div className="algunas-producciones__detalles__links">
                        
                        { spotifyLink &&
                            <a target='_blank' href={spotifyLink}>
                                <IconBrandSpotify stroke={1} size={30}/>
                                <p>Spotify</p>
                            </a>

                        }

                        <a target='_blank' href={instagramLink}>
                            <IconBrandInstagram stroke={1} size={30}/>
                            <p>{artistaItem}</p>
                        </a>
                        <a target='_blank' href='https://www.instagram.com/leotheprodu/'>
                            <IconBrandInstagram stroke={1} size={30}/>
                            <p>LeotheProdu</p>
                        </a>
                        
                    </div>
                </div>
            }

            <div  className="contenedor algunas-producciones__videoDiv">
                <YoutubeEmbed embedId={youtubeLink}/>
            </div>

        </div>

    )


}