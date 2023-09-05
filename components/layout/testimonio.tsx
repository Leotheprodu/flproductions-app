import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { testimonios } from '../database_temp/database';
import Link from 'next/link';

export function Testimonio() {
    return (
        <div className="flex flex-col max-w-[90%] md:max-w-[60%] gap-8 my-0 mx-auto">
            <h3 className="text-center uppercase text-6xl">
                Lo que dicen los clientes
            </h3>

            <Carousel
                autoPlay
                infiniteLoop
                interval={6000}
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                emulateTouch
            >
                {testimonios.map(({ texto, link, nombre, imagen }) => (
                    <div className="flex flex-col gap-8" key={nombre}>
                        <div>
                            <p className="italic text-oscurecer font-serif text-3xl dark:text-secundario">
                                &quot; {texto} &quot;
                            </p>
                        </div>

                        <div className="flex w-48 my-0 mx-auto">
                            <Link target="_blank" href={link}>
                                <img
                                    className="w-48 h-48 rounded-full shadow-lg object-cover"
                                    src={imagen}
                                    alt={nombre + '-testimonio-imagen'}
                                />
                            </Link>
                        </div>
                        <Link target="_blank" href={link}>
                            <h4 className=" text-5xl mt-4 dark:text-cuaternario">
                                {nombre}
                            </h4>
                        </Link>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
