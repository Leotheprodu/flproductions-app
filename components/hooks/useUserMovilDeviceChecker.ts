import { useState, useEffect } from 'react';

export const useUserMovilDeviceChecker = () => {
    const [isMovilUser, setIsMovilUser] = useState<boolean>(false);
    const [onClickMovilUser, setOnClickMovilUser] = useState<boolean>(false);
    useEffect(() => {
        if (window.innerWidth <= 768) {
            setIsMovilUser(true);
        } else {
            setIsMovilUser(false);
        }
    }, []);
    return [isMovilUser, onClickMovilUser, setOnClickMovilUser];
};
