import { IconPlayerPause, IconPlayerPlay, IconPlayerStop } from "@tabler/icons";

export const ListadoProducciones = ({songArray, selectedSong, selectedSongId, playing, setPlaying, progress, playerRef}) => {

    return (
        <div className="algunas-producciones__botones">

            {
                
                songArray.map((song) => (
                    
                    <div onClick={ () => selectedSong(song) } className={`algunas-producciones__boton ${song.id === selectedSongId ? "selected" : ""}`} key={ song.id }>
                        <img src={`https://img.youtube.com/vi/${song.youtube_id}/mqdefault.jpg`} alt={ `imagen de ${song.nombre}` } />
                        <div className="algunas-producciones__texto">
                            <p className="texto-1">{ song.nombre }</p>
                            <p className="texto-2">{ song.nombre_artista }</p>


                            <div className="algunas-producciones__repbutton">

                                {
                                    song.id === selectedSongId &&
                                    <>
                                        <button onClick={() => setPlaying(!playing)}>
                                            {playing ? <IconPlayerPause/> : <IconPlayerPlay/>}
                                        </button>
                                        <input 
                                            type="range" 
                                            min={0} 
                                            max={1} 
                                            step={0.01} 
                                            value={progress} 
                                            onChange={e => playerRef.current.seekTo(e.target.value * playerRef.current.getDuration())} 
                                        />
                                    </>
                                }
                                
                            </div>

                        </div>
                    </div>
                    
                ))
            }
        </div>
    )
}