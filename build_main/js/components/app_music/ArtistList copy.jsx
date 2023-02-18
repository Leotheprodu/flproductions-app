import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const GenreList = ({ listadoCanciones, tipo_obra_general }) => {
  const [generos, setGeneros] = useState(null);
  const produccionesArtistas = listadoCanciones.filter((genero, index, array) => {
    return !array.slice(0, index).some(p => p.genero === genero.genero);
  });

  useEffect(() => {
    if (listadoCanciones) {
      setGeneros(produccionesArtistas.map(element => element.genero).sort());
    }
  }, [listadoCanciones]);

  if (!generos) {
    return <div className="lds-ring"><div></div><div></div><div></div><div></div></div>;
  }

  if (!generos.length) {
    return <div>Lo sentimos, No se encontraron datos</div>;
  }
  if (tipo_obra_general === 1) {

    return (
      <div className="ArtistList">

        {generos.map(element => (
          <Link to={`/productores/${element}`} key={element}>{element}</Link>

        ))}

      </div>

    )
  } else {
    return (
      <div className="ArtistList">

        {generos.map(element => (
          <Link to={`/artistas/${element}`} key={element}>{element}</Link>

        ))}

      </div>

    )
  }
}
