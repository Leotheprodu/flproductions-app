



export function ContactInfo({icon, titulo, parrafo}) {

    return (
        <div className="contact-info">
        
            <div className="contact-info__icon">
                {icon}
            </div>
            <div>
            <h3 className="contact-info__titulo">{titulo}</h3>
                <p className="contact-info__parrafo">{parrafo}</p>
            </div>
                
        </div>

    )

}