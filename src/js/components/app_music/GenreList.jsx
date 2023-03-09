import { useEffect, useState } from "react";
import { Spinner } from "../helpers/Spinner";


export const GenreList = ({ listadoCanciones, tipo_obra_general, produccioneFiltradas, setProduccioneFiltradas }) => {
  const [generos, setGeneros] = useState(null);

  const produccionesArtistas = produccioneFiltradas.filter((genero, index, array) => {
    return !array.slice(0, index).some(p => p.genero === genero.genero);
  });

  useEffect(() => {
    if (produccioneFiltradas) {
      setGeneros(produccionesArtistas.map(element => element.genero).sort());
    }
  }, [produccioneFiltradas]);

  const handleFilteredList = (e) => {
    const filtro = e.target.innerText;
    setProduccioneFiltradas(produccioneFiltradas.filter(element => element.genero.includes(filtro)));
    
    if (generos.length === 1) {
      setProduccioneFiltradas(listadoCanciones);
    }
  
  }
  if (!generos) {
    return <div className="lds-ring"><div></div><div></div><div></div><div></div></div>;
  }

  if (!generos.length) {
    <Spinner/>
  }
  
  
  return (
    <>
    <div className="ArtistList__Main">
      <h4>Genero Musical</h4>
      <div className="ArtistList">

        {generos.map(element => (
          <p onClick={handleFilteredList} key={element}>{element}</p>

        ))}

      </div>
    </div>

    </>

  )
  
}
