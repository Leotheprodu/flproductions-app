import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Image from 'next/image';

export const AvatarSelection = () => {
    const maxAvatarLength: number = 9
    const [avatarIzq, setAvatarIzq] = useState<number>(0);
    const [avatar, setAvatar] = useState<number>(1);
    const [avatarDer, setAvatarDer] = useState<number>(2);
    const [datoActualizado, setDatoActualizado] = useState<boolean>(false);
    const userInfo = useSelector((state: RootState) => state.user.session.user);

    useEffect(() => {

        fetch(`${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PROD_USER_AVATAR_ID : process.env.NEXT_PUBLIC_DEV_USER_AVATAR_ID}${userInfo.id}`, {
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


    }, [userInfo])


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
        fetch(`${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PROD_USER_AVATAR_UPDATE : process.env.NEXT_PUBLIC_DEV_USER_AVATAR_UPDATE}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ id: userInfo.id , avatar: avatar}),
        })
        .then((response) => {
            if (response.status === 200) {
                setDatoActualizado(true);

            }else{
                alert("Solo usuarios con correo verificado pueden cambiar su avatar")
                return
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
                <button tabIndex={5} className='AvatarSelection__boton0' onClick={handleClickIzq}><IconChevronLeft size={50} /></button>
                {!datoActualizado ? <button tabIndex={7} className='AvatarSelection__boton1' onClick={handleClickSelect}>SELECCIONAR</button> : <p>Avatar Actualizado</p>}
                <button tabIndex={6} className='AvatarSelection__boton2' onClick={handleClickDer}><IconChevronRight size={50} /></button>
            </div>
        </div>
    )
}