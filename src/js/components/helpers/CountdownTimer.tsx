import { useState, useEffect } from 'react';

export const CountdownTimer = ({ segundos }) => {
    const [timeLeft, setTimeLeft] = useState<number>(segundos);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prevTime => prevTime > 0 ? prevTime - 1 : 0);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const minutes: number = Math.floor(timeLeft / 60);
    const seconds: number = timeLeft % 60;

    return (
        <div className='CountdownTimer'>
            <p>tiempo restante: {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</p>
        </div>
    );
};