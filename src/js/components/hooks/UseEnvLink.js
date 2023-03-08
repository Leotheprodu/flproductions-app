import { useEffect, useState } from "react"


export const useEnvLink = (nodeEnv) => {

    const [envlink, setEnvlink] = useState('');

    useEffect(() => {
        if (nodeEnv === 'development') {
            setEnvlink('http://localhost:5000/');

        } else {
            setEnvlink('https://flproductionscr.com/');
        }

    }, [envlink]);



    return [
        envlink
    ]
}