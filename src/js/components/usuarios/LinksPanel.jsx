import { IconAddressBook, IconSettingsFilled } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';

export const LinksPanel = () => {
  return (
    <nav className="links-panel">

      <NavLink end to="/panel-de-control">
        <IconSettingsFilled />
        <p>Panel</p>
      </NavLink>
      <NavLink to="/panel-de-control/informacion-de-usuario">
        <IconAddressBook />
        <p>Información de usuario</p>
      </NavLink>
    </nav>
  )
}
