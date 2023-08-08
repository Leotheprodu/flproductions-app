import { useEffect, useState } from 'react';
import { Spinner } from '../helpers/Spinner';

interface Props {
    listadoCanciones: any;
    tipo_obra_general: number;
    produccioneFiltradas: any;
    setProduccioneFiltradas: Function;
}

export const ArtistList = ({
    listadoCanciones,
    tipo_obra_general,
    produccioneFiltradas,
    setProduccioneFiltradas,
}: Props) => {
    const [artistas, setArtistas] = useState(null);

    const produccionesArtistas = produccioneFiltradas.filter(
        (persona, index, array) => {
            return !array
                .slice(0, index)
                .some(
                    (p) =>
                        p.artista.nombre_artista ===
                        persona.artista.nombre_artista
                );
        }
    );

    useEffect(() => {
        if (produccioneFiltradas) {
            setArtistas(
                produccionesArtistas
                    .map((element) => element.artista.nombre_artista)
                    .sort()
            );
        }
    }, [produccioneFiltradas]);

    const handleFilteredList = (e) => {
        const filtro = e.target.innerText;
        setProduccioneFiltradas(
            produccioneFiltradas.filter((element) =>
                element.artista.nombre_artista.includes(filtro)
            )
        );
        if (artistas.length === 1) {
            setProduccioneFiltradas(listadoCanciones);
        }
    };

    const handleResetList = () => {
        setProduccioneFiltradas(listadoCanciones);
    };

    if (!artistas) {
        return (
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        );
    }

    if (!artistas.length) {
        <Spinner />;
    }
    if (tipo_obra_general === 2) {
        return (
            <div className="ArtistList__Main">
                <h4>Productor Musical</h4>

                <div className="ArtistList">
                    {artistas.map((element) => (
                        <p onClick={handleFilteredList} key={element}>
                            {element}
                        </p>
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <>
                <div className="ArtistList__Main">
                    <h4>Artista</h4>

                    <div className="ArtistList">
                        {artistas.map((element) => (
                            <p onClick={handleFilteredList} key={element}>
                                {element}
                            </p>
                        ))}
                    </div>
                </div>
                {artistas.length === 1 && (
                    <div className="ArtistList__reset">
                        <p onClick={handleResetList}>Reset</p>
                    </div>
                )}
            </>
        );
    }
};
