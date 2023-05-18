import React, { useEffect, useState } from 'react';
import { fetchAPI } from '../helpers/fetchAPI';
interface Props {
    user_id: number | null;
    size?: number;
}
export const UserAvatar = ({ user_id, size = 5 }: Props) => {
    const [avatar_id, setAvatarId] = useState({
        avatar: 0,
        username: 'usuario',
    });
    const urlApiAvatarId =
        process.env.NODE_ENV === 'production'
            ? `${process.env.NEXT_PUBLIC_PROD_USER_AVATAR_ID}${user_id}`
            : `${process.env.NEXT_PUBLIC_DEV_USER_AVATAR_ID}${user_id}`;
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await fetchAPI({ url: urlApiAvatarId });
            if (user_id) {
                if (data) {
                    setAvatarId(data);
                }
            }
        };

        fetchData();
    }, [user_id]);
    const styles = {
        width: `${size}rem`,
        height: `${size}rem`,
    };
    return (
        <div className="AvatarUsers">
            <img
                style={styles}
                src={`https://flproductionscr.com/build_main/img/perfil/avatar/${
                    avatar_id.avatar || 0
                }.avif`}
                alt={`Avatar de ${avatar_id.username || 'usuario'}`}
            />
        </div>
    );
};
