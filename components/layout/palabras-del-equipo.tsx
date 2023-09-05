import { useRef } from 'react';

interface Props {
    titulo: string;
    texto: string;
    nombre: string;
    puesto: string;
    foto: string;
}

export function PalabrasDelEquipo({
    titulo,
    texto,
    nombre,
    puesto,
    foto,
}: Props) {
    const ref = useRef(null);

    return (
        <div ref={ref} className="palabras-del-equipo">
            <div className="palabras-del-equipo_foto">
                <img src={foto} alt={nombre} width={500} height={800} />
            </div>
            <div className="contenedor">
                <h4>{titulo}</h4>
                <p className="palabras-del-equipo_parrafo-principal dark:text-beige">
                    <span className="dark:text-blanco">&quot; </span>
                    {texto}
                    <span className="dark:text-blanco"> &quot;</span>
                </p>

                <div className="palabras-del-equipo_firma">
                    <div>
                        <p className="dark:text-beige">{nombre}</p>

                        <p className="palabras-del-equipo_firma_titulo">
                            {puesto}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
