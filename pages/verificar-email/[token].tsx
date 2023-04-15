import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { Spinner } from "../../components/helpers/Spinner";

function VerificarCorreo() {
    const router = useRouter();
    const { token } = router.query;
    const [verificado, setVerificado] = useState<boolean>(false)
    const [spinner, setSpinner] = useState<boolean>(false);


    useEffect(() => {
        setSpinner(true);
        fetch(`${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PROD_USER_EMAIL_VERIFICATION_TOKEN : process.env.NEXT_PUBLIC_DEV_USER_EMAIL_VERIFICATION_TOKEN}${token}`, {
            credentials: "include",
        })
            .then(response => {

                if (response.status === 200) {
                    setVerificado(true);
                    setSpinner(false);

                } else if (response.status === 403) {
                    setVerificado(false);
                    setSpinner(false);
                }else {
                    setVerificado(false);
                    setSpinner(false);
                }


            })
            .catch(error => {
                // Manejar el error aquí
                console.log(error);
            });

    }, [])

    if (spinner && !verificado) {

        return <div className="VerificarCorreo"><Spinner /></div>

    } else {
        return (
            <div className="VerificarCorreo">
                <h1>Su correo electrónico ha sido verificado</h1>

                <div className="login_buttons__button__status">
                    <a href="/panel-de-control">
                        <button className="login_buttons__button__registrar" type="button" title="ir a Panel de Control">Panel de Control</button>
                    </a>
                </div>
            </div>
        )
    }
}


export default VerificarCorreo;