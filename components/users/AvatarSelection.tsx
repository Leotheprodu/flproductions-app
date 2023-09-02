import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchAPI, setSessionUserMessage } from '../';
import { Button } from '@nextui-org/react';

export const AvatarSelection = (): JSX.Element | null => {
    const maxAvatarLength: number = 9;
    const [avatarIzq, setAvatarIzq] = useState<number>(0);
    const [avatar, setAvatar] = useState<number>(1);
    const [avatarDer, setAvatarDer] = useState<number>(2);
    const [datoActualizado, setDatoActualizado] = useState<boolean>(false);
    const userInfo = useSelector((state: RootState) => state.user.session.user);
    const userRoles: [number] = useSelector(
        (state: RootState) => state.user.session.roles
    );
    const dispatch = useDispatch();
    const urlApiAvatarId = `${
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_USER_AVATAR_ID
            : process.env.NEXT_PUBLIC_DEV_USER_AVATAR_ID
    }${userInfo.id}`;
    const urlApiAvatarUpdate =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_USER_AVATAR_UPDATE
            : process.env.NEXT_PUBLIC_DEV_USER_AVATAR_UPDATE;
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await fetchAPI({ url: urlApiAvatarId });
            if (data) {
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
            }
        };
        fetchData();
    }, [userInfo]);

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
    };
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
    };
    const handleClickSelect = async () => {
        const avatarSelected = { id: userInfo.id, avatar };
        const { data, status } = await fetchAPI({
            url: urlApiAvatarUpdate,
            method: 'POST',
            body: avatarSelected,
        });
        if (status === 200) {
            setDatoActualizado(true);
            dispatch(
                setSessionUserMessage({
                    message: `Avatar Actualizado!`,
                    messageType: 'warning',
                })
            );
        } else {
            dispatch(
                setSessionUserMessage({
                    message: `Lo Siento, solo usuarios verificados pueden cambiar su Avatar.`,
                    messageType: 'error',
                })
            );
            return;
        }
    };
    if (userRoles.includes(1)) {
        return (
            <div className=" relative md:max-w-[40rem] container my-[6rem] flex flex-col rounded-xl border-1 border-gris p-4 shadow-md">
                <div>
                    <h3 className="mb-20 text-center text-cuaternario text-3xl">
                        Cambiar de Avatar
                    </h3>
                </div>
                <div className="AvatarSelection__images">
                    <div className="AvatarSelection__item0">
                        <img
                            src={`${process.env.NEXT_PUBLIC_PROD_LINK}/build_main/img/perfil/avatar/${avatarIzq}.webp`}
                            alt={`Avatar # ${avatarIzq}`}
                        />
                    </div>
                    <div className="AvatarSelection__item1">
                        <img
                            src={`${process.env.NEXT_PUBLIC_PROD_LINK}/build_main/img/perfil/avatar/${avatar}.webp`}
                            alt={`Avatar # ${avatar}`}
                        />
                    </div>
                    <div className="AvatarSelection__item2">
                        <img
                            src={`${process.env.NEXT_PUBLIC_PROD_LINK}/build_main/img/perfil/avatar/${avatarDer}.webp`}
                            alt={`Avatar # ${avatarDer}`}
                        />
                    </div>
                </div>
                <div className="AvatarSelection__botones">
                    <button
                        tabIndex={5}
                        className="AvatarSelection__boton0"
                        onClick={handleClickIzq}
                    >
                        <IconChevronLeft size={50} />
                    </button>
                    <div className="flex items-center justify-center">
                        <Button
                            tabIndex={7}
                            color="primary"
                            className="text-2xl uppercase"
                            onClick={handleClickSelect}
                            disabled={datoActualizado}
                        >
                            SELECCIONAR
                        </Button>
                    </div>

                    <button
                        tabIndex={6}
                        className="AvatarSelection__boton2"
                        onClick={handleClickDer}
                    >
                        <IconChevronRight size={50} />
                    </button>
                </div>
            </div>
        );
    }
};
