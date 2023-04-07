
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { AvatarUsers } from './usuarios/AvatarUsers';
export const MensajesDelSistema = () => {

    const roles = useSelector(state => state.user.session.roles);
    const user = useSelector(state => state.user.session.user);
    const [mainMensaje, setMainMensaje] = useState('');
    const size = 5
    const styles = {
        width: `${size}rem`,
        height: `${size}rem`
    };
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
    useEffect(() => {
        fetch(`${process.env.NODE_ENV === 'production' ? 'https://flproductionscr.com/' : 'http://localhost:5000/'}api/mensajes-generales`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    const Mensaje_General_Todos = data.filter((item) => item.tipo_de_mensaje === "mensajePanel" && item.id_role === 8);

                    setMainMensaje(Mensaje_General_Todos[0].mensaje);

                }


            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


    return (
        <>
            {!roles.includes(1) &&
                <div className='mensajes-del-sistema__bloque'>

                    <ul>
                        <h3>Mensajes del Sistema:</h3>
                        <li>
                            Debes verificar tu email, revisa la bandeja de entrada de su correo y busca el que le hemos enviado el dia {formatoFecha(user.fecha_creacion)}, si ya verificaste el correo, vuelve a iniciar sesión para que los cambios sean aplicados.
                        </li>

                    </ul>

                </div>

            }

            <div className='mensajes-del-sistema__bloque'>
               
                    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}} className='AvatarUsers'>

                        <img style={styles} src="https://flproductionscr.com/build_main/img/perfil/avatar/2.webp" alt="Avatar de LeotheProdu" />
                    <h3 style={{ margin: '0' }}>LeotheProdu:</h3>
                    </div>

                    
                    <p style={{ lineHeight: '2', textAlign: 'justify' }}>{mainMensaje}</p>
                    

                

            </div >
        </>
    )
}
