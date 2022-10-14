import propTypes from 'prop-types'

export function InfoCard ({icon, titulo, texto}){

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
