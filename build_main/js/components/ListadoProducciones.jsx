

export const ListadoProducciones = ({songArray, selectedSong}) => {

    return (
        <div className="algunas-producciones__botones">

            {
                
                songArray.map((song) => (
                    <div onClick={ () => selectedSong(song) } className="algunas-producciones__boton" key={ song.id }>
                        <img src={`https://img.youtube.com/vi/${song.youtube_id}/mqdefault.jpg`} alt={ `imagen de ${song.nombre}` } />
                        <p>{ song.nombre }</p>
                    </div>
                ))
            }
        </div>
    )
}
