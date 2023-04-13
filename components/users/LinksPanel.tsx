import { IconAddressBook, IconSettingsFilled } from '@tabler/icons-react';
import  NavLink from '../helpers/NavLink';

export const LinksPanel = () => {



  return (
    <nav className="links-panel">
      <div className='links-panel__element'>

        <NavLink href="/panel-de-control">
          <IconSettingsFilled />
          <p>Panel</p>
        </NavLink>
      </div>
      <div className='links-panel__element'>
        <NavLink href="/panel-de-control/informacion-de-usuario">
          <IconAddressBook />
          <p>Actualiza tu info</p>
        </NavLink>

      </div>
    </nav>
  )
}
