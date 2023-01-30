import { useRef } from "react";

export const ListadoProducciones = ({songArray, selectedSong}) => {
    /* const songRef = useRef(null);

    const songCurrent = songRef.current;
    if songCurrent  
    songCurrent.classList.add('beatplaying'); */
    
    
    return (
        <div className="algunas-producciones__botones">

            {
                
                songArray.map((song) => (
                    <div /* ref={songRef} */ onClick={ () => selectedSong(song) } className="algunas-producciones__boton" key={ song.id }>
                        <img src={`https://img.youtube.com/vi/${song.youtube_id}/mqdefault.jpg`} alt={ `imagen de ${song.nombre}` } />
                        <p>{ song.nombre }</p>
                    </div>
                ))
            }
        </div>
    )
}
