import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
export const AvatarSelection = () => {
    const maxAvatarLength = 9
    const [avatarIzq, setAvatarIzq] = useState(0);
    const [avatar, setAvatar] = useState(1);
    const [avatarDer, setAvatarDer] = useState(2);
    const [datoActualizado, setDatoActualizado] = useState(false);
    const userInfo = useSelector(state => state.user.session.user);

    useEffect(() => {

        fetch(`${process.env.NODE_ENV === 'production' ? 'https://flproductionscr.com/' : 'http://localhost:5000/'}api/avatar/${userInfo.id}`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.avatar <= 1) {
                    setAvatar(1);
                    setAvatarIzq(0);
                    setAvatarDer(2);
                } else if (avatar >= maxAvatarLength) {
                    setAvatar(maxAvatarLength);
                    setAvatarIzq(maxAvatarLength - 1);
                    setAvatarDer(maxAvatarLength + 1);
                } else {
                    setAvatar(data.avatar);
                    setAvatarIzq(data.avatar - 1);
                    setAvatarDer(data.avatar + 1);
                }



            })
            .catch((error) => {
                console.log(error);
            })


    }, [])


    const handleClickIzq = () => {
        if (avatar <= 1) {
            setAvatar(1);
            setAvatarIzq(0);
            setAvatarDer(2);
        } else {
            setAvatar(avatar - 1);
            setAvatarIzq(avatarIzq - 1);
            setAvatarDer(avatarDer - 1);
        }

    }
    const handleClickDer = () => {
        if (avatar >= maxAvatarLength) {
            setAvatar(maxAvatarLength);
            setAvatarIzq(maxAvatarLength - 1);
            setAvatarDer(maxAvatarLength + 1);
        } else {
            setAvatar(avatar + 1);
            setAvatarIzq(avatarIzq + 1);
            setAvatarDer(avatarDer + 1);
        }

    }
    const handleClickSelect = () => {
        fetch(`${process.env.NODE_ENV === 'production' ? 'https://flproductionscr.com/' : 'http://localhost:5000/'}api/avatar-update`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ id: userInfo.id , avatar: avatar}),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setDatoActualizado(true);

                }

            })
            .catch((error) => {
                console.log(error);
            });

    }

    return (
        <div className='contenedor__AvatarSelection'>
            <div className='AvatarSelection__images'>
                <div className='AvatarSelection__item0' >
                    <img src={`https://flproductionscr.com/build_main/img/perfil/avatar/${avatarIzq}.webp`} alt={`Avatar # ${avatarIzq}`} />
                </div>
                <div className='AvatarSelection__item1' >
                    <img src={`https://flproductionscr.com/build_main/img/perfil/avatar/${avatar}.webp`} alt={`Avatar # ${avatar}`} />
                </div>
                <div className='AvatarSelection__item2' >
                    <img src={`https://flproductionscr.com/build_main/img/perfil/avatar/${avatarDer}.webp`} alt={`Avatar # ${avatarDer}`} />
                </div>
            </div>
            <div className='AvatarSelection__botones'>
                <button className='AvatarSelection__boton0' onClick={handleClickIzq}><IconChevronLeft size={50} /></button>
                {!datoActualizado ? <button className='AvatarSelection__boton1' onClick={handleClickSelect}>SELECCIONAR</button> : <p>Avatar Actualizado</p>}
                <button className='AvatarSelection__boton2' onClick={handleClickDer}><IconChevronRight size={50} /></button>
            </div>
        </div>
    )
}