import { ReactNode } from "react"


interface Props {
    icon: ReactNode
    titulo: string
    texto: string
}

export function InfoCard ({icon, titulo, texto}: Props){

    return(

        <div className='info-card'>
            <div className='info-card_icon'>
                {icon}
            </div>
            <div className='info-card_titulo'>
                <h2>{titulo}</h2>
                
            </div>
            <div className='info-card_texto'>
                <p>{texto}</p>
                
            </div>

        </div>


    )



}
