import { AvatarSelection } from "./AvatarSelection"
import { UserBasicInfo } from "./UserBasicInfo"



export const InfodeUsuario = () => {
  return (
    <div className="InfodeUsuario">
    
      <div className="InfodeUsuario__elemento">
        <UserBasicInfo />

      </div>

      <div className="InfodeUsuario__elemento">
        <AvatarSelection />

      </div>
    </div>
  )
}
