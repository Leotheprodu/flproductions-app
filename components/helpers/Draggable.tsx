import React, { useState, MouseEvent } from 'react';

interface DraggableProps {
    children: React.ReactNode;
    topY?: number;
    leftX?: number;
}
/**
 *
 * @param param0
 * @returns
 */
export const Draggable: React.FC<DraggableProps> = ({
    children,
    topY = 0,
    leftX = 0,
}) => {
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: leftX,
        y: topY,
    });
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    /*     const [hasMoved, setHasMoved] = useState(false); */

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

    /*  useEffect(() => {
        if (!hasMoved) {
            const centerX = 0;
            const centerY = 0;
            setPosition({ x: centerX, y: centerY });
            setHasMoved(true);
        }
    }, [hasMoved]); */

    return (
        <div
            className="draggable"
            style={{
                position: 'absolute',
                top: position.y,
                left: position.x,
            }}
            onMouseDown={startDrag}
            onMouseMove={drag}
            onMouseUp={endDrag}
        >
            {children}
        </div>
    );
};
