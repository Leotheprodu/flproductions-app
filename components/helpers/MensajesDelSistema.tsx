import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../redux/store';
import { UserAvatar, fetchAPI, setSessionUserMessage } from '../';

export const MensajesDelSistema = () => {
    const dispatch = useDispatch();
    const roles = useSelector((state: RootState) => state.user.session.roles);
    const user = useSelector((state: RootState) => state.user.session.user);
    const [mainMensaje, setMainMensaje] = useState<string>('');
    const size: number = 5;
    const styles = {
        width: `${size}rem`,
        height: `${size}rem`,
    };
    const urlApiGeneralMessages =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_USER_GENERAL_MESSAGES
            : process.env.NEXT_PUBLIC_DEV_USER_GENERAL_MESSAGES;
    const formatoFecha = (date) => {
        // Crear un objeto Date con la fecha
        const fecha = new Date(date);

        // Obtener el día
        const dia = fecha.getDate();

        // Obtener el mes
        const meses = [
            'enero',
            'febrero',
            'marzo',
            'abril',
            'mayo',
            'junio',
            'julio',
            'agosto',
            'septiembre',
            'octubre',
            'noviembre',
            'diciembre',
        ];
        const mes = meses[fecha.getMonth()];

        // Obtener el año
        const anio = fecha.getFullYear();

        // Crear la cadena de texto con el formato deseado
        const fechaFormateada = dia + ' de ' + mes + ' del ' + anio;
        return fechaFormateada;
    };
    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await fetchAPI({
                url: urlApiGeneralMessages,
            });
            if (data) {
                const Mensaje_General_Todos = data.filter(
                    (item) =>
                        item.tipo_de_mensaje === 'mensajePanel' &&
                        item.id_role === 8
                );

                setMainMensaje(Mensaje_General_Todos[0].mensaje);
            } else {
                setMainMensaje('');
                dispatch(
                    setSessionUserMessage({
                        message: error,
                        messageType: 'error',
                    })
                );
            }
        };
        fetchData();
    }, []);
    return (
        <>
            {!roles.includes(1) && (
                <div className="mensajes-del-sistema__bloque">
                    <ul>
                        <h3>Mensajes del Sistema:</h3>
                        <li>
                            Debes verificar tu email, revisa la bandeja de
                            entrada de su correo y busca el que le hemos enviado
                            el dia {formatoFecha(user.fecha_creacion)}, si ya
                            verificaste el correo, vuelve a iniciar sesión para
                            que los cambios sean aplicados.
                        </li>
                    </ul>
                </div>
            )}

            <div className="mensajes-del-sistema__bloque">
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                    }}
                    className="AvatarUsers"
                >
                    <UserAvatar user_id={44} />
                    <h3 style={{ margin: '0' }}>LeotheProdu:</h3>
                </div>

                <p style={{ lineHeight: '2', textAlign: 'justify' }}>
                    {mainMensaje}
                </p>
            </div>
        </>
    );
};
