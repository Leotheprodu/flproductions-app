import React from 'react';
import { HeadMetaInfo } from '../components/helpers/HeadMetaInfo';
import Link from 'next/link';


function ErrorPage() {


    return (

        <div className='error-page contenedor'>

            <>
                <HeadMetaInfo
                    title='Error Page'
                    description='Lo sentimos, hubo un problema al cargar la página'
                    robots='noindex, nofollow'
                    type='website'
                    url='https://flproductionscr.com/musica'
                    image='https://flproductionscr.com/build_main/img/header-main.png'
                    keywords='error'
                />


                <div className='error-page__errorType-padre'>
                    <p className='error-page__errorType'>
                        <i>404</i>
                    </p>
                </div>

                <h1>¡Oops!</h1>

                <h2>Parece que este enlace no existe</h2>

                <div className='error-page__redirigir'>

                    <p className='error-page__redirigir__text'>Te recomendamos ir a la página principal</p>
                    <Link href="/">
                        <div className='error-page__redirigir__button'>
                            Ir
                        </div>
                    </Link>
                </div>

            </>



        </div>
    )

}

export default ErrorPage;