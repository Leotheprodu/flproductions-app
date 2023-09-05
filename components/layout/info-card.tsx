import { ReactNode } from 'react';

interface Props {
    icon: ReactNode;
    titulo: string;
    texto: string;
}

export function InfoCard({ icon, titulo, texto }: Props) {
    return (
        <div className="flex flex-col items-center w-[30rem] h-[40rem] p-4 rounded-xl border border-solid border-gris dark:border-oscurecer hover:shadow">
            <div className="text-cuaternario">{icon}</div>
            <div className="text-center">
                <h2 className="font-bold text-2xl mb-0">{titulo}</h2>
            </div>
            <div className="mt-10">
                <p className="text-2xl dark:text-beige">{texto}</p>
            </div>
        </div>
    );
}
