import { UserAvatar } from '../users/UserAvatar';

export const MessageComponent = () => {
    return (
        <div className={`MessageComponentContainer`}>
            <a
                target="_blank"
                href="https://wa.me/50663017707?text=Me%20gustar%C3%ADa%20saber%20m%C3%A1s%20de%20ustedes,%20"
                className="MessageComponentIcon-content flex flex-col items-center justify-center"
            >
                <div className="bg-blanco p-2 rounded-full">
                    <UserAvatar user_id={44} size={5} />
                </div>
                <span className="text-primario uppercase font-semibold bg-blanco rounded-xl p-2 mt-[-.5rem]">
                    Whatsapp
                </span>
            </a>
        </div>
    );
};
