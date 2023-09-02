'use client'; // Error components must be Client Components

import React from 'react';
import { useEffect } from 'react';
import { Button } from '@nextui-org/button';

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col justify-center items-center h-60">
            <h1 className=" uppercase mb-8 text-3xl font-bold">Lo sentimos</h1>
            <h2 className=" mb-8">Parece que ha habido un error</h2>
            <Button
                color="danger"
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Vuelve a intentarlo
            </Button>
        </div>
    );
}
