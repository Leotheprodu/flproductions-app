import React, { useState, MouseEvent, useEffect } from 'react';

interface DraggableProps {
    children: React.ReactNode;
}

export const Draggable: React.FC<DraggableProps> = ({ children }) => {
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const [hasMoved, setHasMoved] = useState(false);

    const startDrag = (e: MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const drag = (e: MouseEvent<HTMLDivElement>) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y,
            });
        }
    };

    const endDrag = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (!hasMoved) {
            const rect = document.documentElement.getBoundingClientRect();
            const centerX = rect.width / 1.7;
            const centerY = rect.height / 9;
            setPosition({ x: centerX, y: centerY });
            setHasMoved(true);
        }
    }, [hasMoved]);

    return (
        <div
            className="draggable"
            style={{ position: 'fixed', top: position.y, left: position.x }}
            onMouseDown={startDrag}
            onMouseMove={drag}
            onMouseUp={endDrag}
        >
            {children}
        </div>
    );
};
