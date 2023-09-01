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
            <div className={'simple-text_info'}>
                <h1>{titulo}</h1>

                <div>{texto}</div>
            </div>
        );
    } else if (tipo === 2) {
        return (
            <div ref={ref} className={'simple-text_info'}>
                <h3>{titulo}</h3>

                {texto}
            </div>
        );
    } else {
        return <></>;
    }
}
