import { useEffect, useState } from 'react'
import Image from 'next/image';

interface Props {
    id: number
    username: string
    size: number
}

export const AvatarUsers = ({ id, username, size }: Props) => {
    const [avatar, setAvatar] = useState<string>('');

    const styles = {
        width: `${size}rem`,
        height: `${size}rem`
    };
    useEffect(() => {
        fetch(`${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PROD_USER_AVATAR_ID : process.env.NEXT_PUBLIC_DEV_USER_AVATAR_ID}${id}`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.avatar) {
                    setAvatar(`https://flproductionscr.com/build_main/img/perfil/avatar/${data.avatar}.webp`);

                }else {
                    setAvatar(`https://flproductionscr.com/build_main/img/perfil/avatar/8.webp`);
                }



            })
            .catch((error) => {
                console.log(error);
            })


    }, [id])

    return (
        <div className='AvatarUsers' >
            <img style={styles} src={avatar} alt={`Avatar de ${username}`} />
        </div>
    )
}
