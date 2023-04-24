import { useEffect, useState } from "react"


export const useEnvLink = (nodeEnv: string) => {

    const [envlink, setEnvlink] = useState<string>('');

    useEffect(() => {
        if (nodeEnv === 'development') {
            setEnvlink(`${process.env.DEV_LINK}/`);

        } else {
            setEnvlink(`${process.env.PROD_LINK}/`);
        }

    }, [envlink, nodeEnv]);



    return [
        envlink
    ]
}