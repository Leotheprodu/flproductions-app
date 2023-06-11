import { useRef } from 'react';
import { useFxElement } from '../hooks/useFxElement';

interface Props {
    titulo: string;
    texto: any;
    tipo: number;
}

export function SimpleText({ titulo, texto, tipo = 2 }: Props) {
    const ref = useRef(null);
    tipo === 2 && useFxElement(ref, 'fxMostrarIzquierda');

    if (tipo === 1) {
        return (
            <div className={'simple-text_info'}>
                <h1>{titulo}</h1>

                {texto}
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
