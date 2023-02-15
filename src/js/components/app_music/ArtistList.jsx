import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ArtistList = ({listadoCanciones}) => {
  const [artistas, setArtistas] = useState(null);
  const produccionesArtistas = listadoCanciones.filter((persona, index, array) => {
    return !array.slice(0, index).some(p => p.nombre_artista === persona.nombre_artista);
  });

useEffect(() => {
  if (listadoCanciones) {
      setArtistas(produccionesArtistas.map(element => element.nombre_artista).sort());
  }
}, [listadoCanciones]);

if (!artistas) {
  return <div className="lds-ring"><div></div><div></div><div></div><div></div></div>;
}

if (!artistas.length) {
  return <div>Lo sentimos, No se encontraron datos</div>;
}
  return (
    <div className="ArtistList">
      {artistas.map(element => (
        <Link to={`/musica/artistas/${element}`} key={element}>{element}</Link>
  
      ))}

    </div>

  )
}
