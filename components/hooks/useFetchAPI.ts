import { useState } from 'react';
/**
 * Hooks que necesita cada componente que necesite usar fetchAPI.ts
 * @returns [errorFetch, dataFetch, isRequested]
 */
export const useFetchAPI = () => {
    //almacena el mensaje del error, si lo hay.
    const [errorFetch, setErrorFetch] = useState(null);
    //almacena los datos, si la respuesta es ok(200).
    const [dataFetch, setDataFetch] = useState(null);
    //Se debe usar justo en el momento de iniciar la solicitud, de esa manera se puede usar para disparar un loading,
    //si se cumple isRequested && !dataFetch se muestra el loading, de esa manera se quita justo cuando se recibe la respuesta del server.
    const [isRequested, setIsRequested] = useState<boolean>(false);

    return [
        errorFetch,
        setErrorFetch,
        dataFetch,
        setDataFetch,
        isRequested,
        setIsRequested,
    ];
};
