import { useEffect, useState } from 'react'

export const AvatarUsers = ({ id, username, size }) => {
    const [avatar, setAvatar] = useState('');
    const styles = {
        width: `${size}rem`,
        height: `${size}rem`
    };
    useEffect(() => {
        fetch(`${process.env.NODE_ENV === 'production' ? 'https://flproductionscr.com/' : 'http://localhost:5000/'}api/avatar/${id}`, {
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


    }, [])

    return (
        <div className='AvatarUsers' >
            <img style={styles} src={avatar} alt={`Avatar de ${username}`} />
        </div>
    )
}
