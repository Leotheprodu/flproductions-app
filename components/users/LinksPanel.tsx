import {
    IconAddressBook,
    IconHeadphonesFilled,
    IconMicrophone2,
    IconMusic,
    IconSettingsFilled,
    IconUser,
} from '@tabler/icons-react';
import NavLink from '../helpers/NavLink';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

export const LinksPanel = ({ handleClickMovilUser }) => {
    const userRoles: [number] =
        useSelector((state: RootState) => state.user.session.roles) || [];
    return (
        <nav className="links-panel">
            <div
                onClick={handleClickMovilUser}
                className="links-panel__element"
            >
                <NavLink href="/panel-de-control">
                    <IconSettingsFilled />
                    <p>Panel</p>
                </NavLink>
            </div>
            <div
                onClick={handleClickMovilUser}
                className="links-panel__element"
            >
                <NavLink href="/panel-de-control/informacion-de-usuario">
                    <IconUser />
                    <p>Configurar Usuario</p>
                </NavLink>
            </div>
            {userRoles.includes(3) && (
                <div
                    onClick={handleClickMovilUser}
                    className="links-panel__element"
                >
                    <NavLink href="/panel-de-control/artista">
                        <IconMicrophone2 />
                        <p>Artista</p>
                    </NavLink>
                </div>
            )}
            {userRoles.includes(4) && (
                <div
                    onClick={handleClickMovilUser}
                    className="links-panel__element"
                >
                    <NavLink href="/panel-de-control/productor-musical">
                        <IconHeadphonesFilled />
                        <p>Productor Musical</p>
                    </NavLink>
                </div>
            )}
        </nav>
    );
};
