import { useSelector } from 'react-redux';
import { AvatarUsers, MensajesDelSistema } from '../components';

export const InicioPaneldeControl = () => {

    const user = useSelector(state => state.user.session.user);
    return (
        <>
            <div className='InicioPaneldeControl__div contenedor'>
                <div style={{ backgroundImage: `url("https://flproductionscr.com/build_main/img/banners/pages/panel-de-control.webp")` }} className='InicioPaneldeControl'>
                    <h1>Panel de Control</h1>
                    <AvatarUsers id={user.id} username={user.username} size={10}/>
                    <h3>{user.username}</h3>
                </div>
                    <div className='InicioPaneldeControl__mensajes'>
                        <MensajesDelSistema />

                    </div>

            </div>

            <div className='contenedor'>
            </div>
        </>
    )
}
