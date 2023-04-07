import { useSelector } from 'react-redux';
import { AvatarUsers, MensajesDelSistema } from '../components';

export const InicioPaneldeControl = () => {

    const user = useSelector(state => state.user.session.user);
    return (
        <>
            <div className='InicioPaneldeControl__div contenedor'>
                <div className='InicioPaneldeControl'>
                
                    <AvatarUsers id={user.id} username={user.username} size={10}/>

                    <div className='InicioPaneldeControl_textos'>
                    <h1>{user.username}</h1>
                    

                    </div>
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
