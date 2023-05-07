import {
    IconAddressBook,
    IconMusic,
    IconSettingsFilled,
} from '@tabler/icons-react';
import NavLink from '../helpers/NavLink';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

export const LinksPanel = () => {
    const userRoles: [number] = useSelector(
        (state: RootState) => state.user.session.roles
    );
    return (
        <nav className="links-panel">
            <div className="links-panel__element">
                <NavLink href="/panel-de-control">
                    <IconSettingsFilled />
                    <p>Panel</p>
                </NavLink>
            </div>
            <div className="links-panel__element">
                <NavLink href="/panel-de-control/informacion-de-usuario">
                    <IconAddressBook />
                    <p>Actualiza tu info</p>
                </NavLink>
            </div>
            {userRoles.includes(3) && (
                <div className="links-panel__element">
                    <NavLink href="/panel-de-control/artista">
                        <IconMusic />
                        <p>Artista</p>
                    </NavLink>
                </div>
            )}
        </nav>
    );
};
