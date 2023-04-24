import { useEffect, useState } from "react";
import { Spinner } from "../helpers/Spinner";

interface Props {
  listadoCanciones: any;
  tipo_obra_general:number
  produccioneFiltradas:any
  setProduccioneFiltradas: any
}


export const StyleList = ({ listadoCanciones, tipo_obra_general, produccioneFiltradas, setProduccioneFiltradas }: Props) => {
  const [estilos, setEstilos] = useState(null);

  const produccionesEstilos = produccioneFiltradas.filter((estilos, index, array) => {
    return !array.slice(0, index).some(p => p.estilo === estilos.estilo);
  });

  useEffect(() => {
    if (produccioneFiltradas) {
      setEstilos(produccionesEstilos.map(element => element.estilo).sort());
    }
  }, [produccioneFiltradas, produccionesEstilos]);

  const handleFilteredList = (e) => {
    const filtro = e.target.innerText;
    setProduccioneFiltradas(produccioneFiltradas.filter(element => element.estilo.includes(filtro)));
    if (estilos.length === 1) {
      setProduccioneFiltradas(listadoCanciones);
    }



  }
  if (!estilos) {
    return <div className="lds-ring"><div></div><div></div><div></div><div></div></div>;
  }

  if (!estilos.length) {
    <Spinner/>
  }
  if (tipo_obra_general === 1) {

    return (
      <div className="ArtistList__Main">
        <h4>Estilo</h4>
        <div className="ArtistList">

          {estilos.map(element => (
            <p onClick={handleFilteredList} key={element}>{element}</p>

          ))}

        </div>
      </div>

    )
  } else {
    return (
      <div className="ArtistList__Main">
        <h4>Tipo</h4>
        <div className="ArtistList">

          {estilos.map(element => (
            <p onClick={handleFilteredList} key={element}>{element}</p>

          ))}

        </div>
      </div>

    )
  }
}
