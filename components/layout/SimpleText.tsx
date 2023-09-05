import { useRef } from 'react';

interface Props {
    titulo: string;
    texto: any;
    tipo: number;
}

export function SimpleText({ titulo, texto, tipo = 2 }: Props) {
    const ref = useRef(null);

    if (tipo === 1) {
        return (
            <div className="flex flex-col p-4 w-full gap-6">
                <h1 className="uppercase text-center mb-0 mt-8 text-4xl font-bold md:text-6xl md:mt-24">
                    {titulo}
                </h1>

                <div>{texto}</div>
            </div>
        );
    } else if (tipo === 2) {
        return (
            <div ref={ref} className="flex flex-col p-4 w-full">
                <h3 className="uppercase mb-0 mt-48 ">{titulo}</h3>

                <div>{texto}</div>
            </div>
        );
    } else {
        return <></>;
    }
}
