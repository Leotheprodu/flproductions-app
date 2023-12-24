import { IconBrandWhatsapp } from '@tabler/icons-react';
import { UserAvatar } from '../users/UserAvatar';

export const MessageComponent = () => {
    return (
        <div className={`MessageComponentContainer`}>
            <a
                target="_blank"
                href="https://wa.me/50663017707?text=Me%20gustar%C3%ADa%20saber%20m%C3%A1s%20de%20ustedes,%20"
                className="cursor-pointer flex flex-col items-center justify-center gap-1"
            >
                <div className="rounded-full flex justify-center items-center m-0">
                    <UserAvatar user_id={44} size={4} />
                </div>
                <span className="text-success-400 text-center flex gap-1 items-center absolute bottom-[-1rem] bg-gris rounded-full px-1 shadow-sm">
                    <IconBrandWhatsapp size={20} />
                    <span className="text-sm">Whatsapp</span>
                </span>
            </a>
        </div>
    );
};
