import { useEffect, useState } from "react"
import { HelmetProvider } from "react-helmet-async";
import { useParams } from "react-router-dom"
import { Spinner } from "../helpers/Spinner";

export const VerificarCorreo = () => {
    const { token } = useParams();
    const [verificado, setVerificado] = useState(false)
    const [spinner, setSpinner] = useState(false);


    useEffect(() => {
        setSpinner(true);
        fetch(`${process.env.NODE_ENV === 'production' ? 'https://flproductionscr.com/' : 'http://localhost:5000/'}api/verificar-correo/${token}`, {
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
