import React, { useState, useEffect, useRef } from 'react';
import { Draggable } from '../helpers/Draggable';
import { UserAvatar } from '../users/UserAvatar';
import { setSessionUserMessage } from '../redux/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAPI } from '../helpers/fetchAPI';
import { useFetchAPI } from '../hooks/useFetchAPI';
import { Spinner } from '../helpers/Spinner';
import { IconSend } from '@tabler/icons-react';
import { RootState } from '../redux/store';

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
    const [
        isRequested,
        setIsRequested,
        dataFetch,
        setDataFetch,
        errorFetch,
        setErrorFetch,
    ] = useFetchAPI();
    const isLoggedIn =
        useSelector((state: RootState) => state.user.session.isLoggedIn) ||
        false;
    const user =
        useSelector((state: RootState) => state.user.session.user) || null;
    const urlFetch =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_CHAT_FAQ
            : process.env.NEXT_PUBLIC_DEV_CHAT_FAQ;
    const urlFetchResponses =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_PROD_RESPONSES
            : process.env.NEXT_PUBLIC_DEV_RESPONSES;
    const dispatch = useDispatch();
    const [userConvesations, setUserCoversations] = useState([]);
    const [other_user_id, setOtherUserId] = useState(44);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [inputText, setInputText] = useState<string>('Hazme una pregunta');
    const [clickUserQuestion, setClickUserQuestion] = useState<boolean>(false);
    const [timerToClose, setTimerToClose] = useState<number>(20000);
    const chatRef = useRef(null);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, timerToClose);

        return () => {
            clearTimeout(timer);
        };
    }, [isVisible]);

    const handleClose = (e) => {
        setIsVisible(false);
    };
    const handleFAQ = (e) => {
        setClickUserQuestion(!clickUserQuestion);
    };
    const handleOnBlur = async () => {
        if (
            inputText &&
            inputText !== 'Hazme una pregunta' &&
            inputText !== 'Alguna otra pregunta?'
        ) {
            setIsRequested(true);
            setTimerToClose(30000);
            const { data, error, status } = await fetchAPI({
                method: 'POST',
                url: urlFetch,
                body: { pregunta: inputText, other_user_id },
            });
            if (data) {
                setDataFetch(data);

                setIsRequested(false);
            }
            if (status === 500) {
                dispatch(
                    setSessionUserMessage({
                        message:
                            'Muchos mensajes, intenta preguntar unicamente lo necesesario, o preguntale directamente a LeotheProdu',
                        messageType: 'error',
                    })
                );
            }
            if (error) {
                setErrorFetch(error);
                dispatch(
                    setSessionUserMessage({
                        message: error,
                        messageType: 'error',
                    })
                );
                setIsRequested(false);
            }
            setTimerToClose(10000);
        }
        setInputText('Alguna otra pregunta?');
    };
    useEffect(() => {
        const BringConversation = async () => {
            const { data, error } = await fetchAPI({
                method: 'GET',
                url: urlFetchResponses,
            });
            if (data) {
                const mesajesActualConversation = data.filter(
                    (mensaje) => mensaje.other_user_id === other_user_id
                );
                setUserCoversations(mesajesActualConversation);
            }
            if (error) {
                dispatch(
                    setSessionUserMessage({
                        message: error,
                        messageType: 'error',
                    })
                );
            }
        };
        if (isLoggedIn) {
            BringConversation();
        }
    }, [other_user_id, isLoggedIn, dataFetch]);
    useEffect(() => {
        setIsVisible(true);
    }, [message]);
    return (
        <div className={`MessageComponentContainer`}>
            <Draggable topY={-100} leftX={-300}>
                <div
                    className={`MessageComponent ${messageType} ${
                        isVisible ? 'visible' : 'hidden'
                    }`}
                >
                    {isVisible && (
                        <div className="MessageComponent-content">
                            <p className="MessageComponent-text">{message}</p>
                            <button
                                className="MessageComponent-close"
                                onClick={handleClose}
                            >
                                X
                            </button>
                        </div>
                    )}
                </div>
            </Draggable>

            {clickUserQuestion && (
                <div className="MessageComponentIcon-input">
                    <div ref={chatRef} className="MessageComponent-lastChatFaq">
                        {userConvesations.map((message) => (
                            <div
                                className="MessageComponent-lastChatFaq-messages"
                                key={message.id}
                            >
                                <div className="MessageComponent-lastChatFaq-chat">
                                    <div className="MessageComponent-lastChatFaq_question">
                                        <p>{message.pregunta}</p>
                                    </div>
                                    <div className="MessageComponent-lastChatFaq_avatar">
                                        <UserAvatar
                                            user_id={user.id}
                                            size={4}
                                        />
                                        <p>{user.username}</p>
                                    </div>
                                </div>
                                <div className="MessageComponent-lastChatFaq-chat">
                                    <div className="MessageComponent-lastChatFaq_avatar">
                                        <UserAvatar user_id={44} size={4} />
                                        <p>FLPoductions</p>
                                    </div>
                                    <div className="MessageComponent-lastChatFaq_response">
                                        {message.respuesta}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {clickUserQuestion && isRequested && <Spinner />}
                    {clickUserQuestion && !isRequested && (
                        <div>
                            <textarea
                                autoFocus
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (
                                        inputText === 'Hazme una pregunta' ||
                                        inputText === 'Alguna otra pregunta?'
                                    ) {
                                        setInputText('');
                                    }
                                    if (e.key === 'Enter') {
                                        handleOnBlur();
                                        e.preventDefault();
                                    }
                                    if (e.key === 'Escape') {
                                        setClickUserQuestion(false);
                                        e.preventDefault();
                                    }
                                }}
                            />
                            <button onClick={handleOnBlur}>
                                <IconSend />
                            </button>
                        </div>
                    )}
                </div>
            )}
            <div onClick={handleFAQ} className="MessageComponentIcon-content">
                <UserAvatar user_id={44} size={5} />
            </div>
        </div>
    );
};
