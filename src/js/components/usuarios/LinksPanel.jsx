import { IconAddressBook, IconSettingsFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const LinksPanel = () => {



  return (
    <nav className="links-panel">
      <div className='links-panel__element'>

        <NavLink end to="/panel-de-control">
          <IconSettingsFilled />
          <p>Panel</p>
        </NavLink>
      </div>
      <div className='links-panel__element'>
        <NavLink to="/panel-de-control/informacion-de-usuario">
          <IconAddressBook />
          <p>Actualiza tu info</p>
        </NavLink>

      </div>
    </nav>
  )
}
