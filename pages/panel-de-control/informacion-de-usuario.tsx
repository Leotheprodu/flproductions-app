import { AvatarSelection } from "../../components/users/AvatarSelection"
import { UserBasicInfo } from "../../components/users/UserBasicInfo"
import { ControlPanel } from '../../components/layout/panel-de-control';


function InfodeUsuario() {
  return (
    <ControlPanel>

      <div className="InfodeUsuario">

        <div className="InfodeUsuario__elemento">
          <UserBasicInfo />

        </div>

        <div className="InfodeUsuario__elemento">
          <AvatarSelection />

        </div>
      </div>
    </ControlPanel>
  )
}
export default InfodeUsuario;