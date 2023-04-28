import { useEffect, useRef } from 'react';
import Image from 'next/image';

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

    useEffect(() => {
        const ElementWithFX = ref.current;

        function mostrarScroll() {
            const scrollTop = document.documentElement.scrollTop;
            const alturaElemento = ElementWithFX.offsetTop;

            if (alturaElemento - 200 < scrollTop) {
                ElementWithFX.style.opacity = 1;
                ElementWithFX.classList.add('fxMostrarArriba');
            }
        }
        if (ElementWithFX !== null) {
            document.addEventListener('scroll', mostrarScroll);
        }

        return () => {
            document.removeEventListener('scroll', mostrarScroll);
        };
    }, []);

    return (
        <div ref={ref} className="palabras-del-equipo fxElement">
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
