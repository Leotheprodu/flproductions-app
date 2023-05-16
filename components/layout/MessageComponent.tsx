import React, { useState, useEffect } from 'react';
import { Draggable } from '../helpers/Draggable';

interface MessageComponentProps {
    message: string;
    messageType?: 'error' | 'warning' | 'notification' | string;
}
/**
 *Componente para mostrar mensajes al usuario
 * @param message string
 * @param messageType string: 'error' | 'warning' | 'notification'
 * @returns
 */
export const MessageComponent: React.FC<MessageComponentProps> = ({
    message,
    messageType = 'notification',
}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 10000);

        return () => {
            clearTimeout(timer);
        };
    }, [isVisible]);

    const handleClose = (e) => {
        setIsVisible(false);
    };

    useEffect(() => {
        console.log(message);
        setIsVisible(true); // Mostrar el componente cuando se recibe un nuevo mensaje
        /* playNotificationSound(); */
    }, [message]);
    /* const playNotificationSound = () => {
        const audio = new Audio('../../public/notification.mp3');
        audio.play();
    }; */
    return (
        <Draggable>
            <div
                className={`MessageComponent ${messageType} ${
                    isVisible ? 'visible' : 'hidden'
                }`}
            >
                <div className="MessageComponent-content">
                    <div className="MessageComponent-text">{message}</div>
                    <button
                        className="MessageComponent-close"
                        onClick={handleClose}
                    >
                        X
                    </button>
                </div>
            </div>
        </Draggable>
    );
};
