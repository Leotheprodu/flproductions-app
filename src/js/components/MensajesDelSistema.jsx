import { useSelector } from 'react-redux';

export const MensajesDelSistema = () => {

    const roles = useSelector(state => state.user.session.roles);
    const user = useSelector(state => state.user.session.user);

    const formatoFecha = (date) => {
        // Crear un objeto Date con la fecha
        const fecha = new Date(date);

        // Obtener el día
        const dia = fecha.getDate();

        // Obtener el mes
        const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        const mes = meses[fecha.getMonth()];

        // Obtener el año
        const anio = fecha.getFullYear();

        // Crear la cadena de texto con el formato deseado
        const fechaFormateada = dia + ' de ' + mes + ' del ' + anio;
        return fechaFormateada;

    }


    return (
        <>
            {!roles.includes(1) &&
                <div className='mensajes-del-sistema__bloque'>

                    <ul>
                    <h3>Mensajes del Sistema</h3>
                        <li>
                            Debes verificar tu email, revisa la bandeja de entrada de su correo y busca el que le hemos enviado el dia {formatoFecha(user.fecha_creacion)}
                        </li>

                    </ul>

                </div>

            }
            
        </>
    )
}
