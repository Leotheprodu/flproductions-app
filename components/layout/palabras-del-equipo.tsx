import { useRef } from 'react';

interface Props {
    titulo: string;
    texto: string;
    nombre: string;
    puesto: string;
    foto: string;
    firma: string;
}

export function PalabrasDelEquipo({
    titulo,
    texto,
    nombre,
    puesto,
    foto,
    firma,
}: Props) {
    const ref = useRef(null);

    return (
        <div ref={ref} className="palabras-del-equipo">
            <div className="palabras-del-equipo_foto">
                <img src={foto} alt={nombre} width={500} height={800} />
            </div>
            <div className="contenedor">
                <h4>{titulo}</h4>
                <p className="palabras-del-equipo_parrafo-principal">
                    <span>&quot; </span>
                    {texto}
                    <span> &quot;</span>
                </p>

                <div className="palabras-del-equipo_firma">
                    <img
                        className="palabras-del-equipo_firma-firma"
                        src={firma}
                        alt={nombre + ' firma'}
                    />
                    <div>
                        <p>{nombre}</p>

                        <p className="palabras-del-equipo_firma_titulo">
                            {puesto}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
