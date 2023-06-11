import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface mainBannerSlider {
    img_link: string;
    link: string;
    title: string;
    description: string;
}
interface Props {
    datos: mainBannerSlider[];
}

export function BannerSlider({ datos }: Props) {
    return (
        <>
            <Carousel
                autoPlay
                infiniteLoop
                interval={6000}
                showStatus={false}
                showIndicators={false}
                emulateTouch
                showThumbs={false}
            >
                {datos.map(({ img_link, link, title, description }) => (
                    <div
                        key={title}
                        className="BannerSlider__div"
                        style={{
                            background: `url(${img_link})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <div className="BannerSlider__div-texto">
                            <h2>{title}</h2>
                            <p>{description}</p>
                            <a href={link}>Mas información</a>
                        </div>
                    </div>
                ))}
            </Carousel>
        </>
    );
}
