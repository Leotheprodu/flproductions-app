import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ArtistList = ({ listadoCanciones, tipo_obra_general, produccioneFiltradas, setProduccioneFiltradas }) => {
  const [artistas, setArtistas] = useState(null);
  const [artistaFiltrado, setArtistaFiltrado] = useState(null);
 
  const produccionesArtistas = listadoCanciones.filter((persona, index, array) => {
    return !array.slice(0, index).some(p => p.nombre_artista === persona.nombre_artista);
  });

  useEffect(() => {
    if (listadoCanciones) {
      setArtistas(produccionesArtistas.map(element => element.nombre_artista).sort());
    }
  }, [listadoCanciones]);
  useEffect(() => {
    if (produccioneFiltradas) {
      setArtistaFiltrado(produccioneFiltradas[0]);
      
    }
  }, [produccioneFiltradas]);
  const handleFilteredList = (e) => {
    const filtro = e.target.innerText;
    setProduccioneFiltradas(listadoCanciones.filter(element => element.nombre_artista.includes(filtro)));
    if (artistaFiltrado.nombre_artista === filtro) {
      setProduccioneFiltradas(listadoCanciones);
    }
    
  
  
  }
  if (!artistas) {
    return <div className="lds-ring"><div></div><div></div><div></div><div></div></div>;
  }

  if (!artistas.length) {
    return <div>Lo sentimos, No se encontraron datos</div>;
  }
  if (tipo_obra_general === 1) {

    return (
      <div className="ArtistList">

        {artistas.map(element => (
          <p key={element}>{element}</p>

        ))}

      </div>

    )
  } else {
    return (
      <div className="ArtistList">

        {artistas.map(element => (
          <p onClick={handleFilteredList} key={element}>{element}</p>

        ))}

      </div>

    )
  }
}
