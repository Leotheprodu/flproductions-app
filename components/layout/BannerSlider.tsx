import { Button } from '@nextui-org/button';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useRouter } from 'next/router';

interface mainBannerSlider {
    img_link: string;
    link?: string;
    title: string;
    description: string;
}
interface Props {
    datos: mainBannerSlider[];
}

export function BannerSlider({ datos }: Props) {
    const router = useRouter();
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
                            {link && (
                                <div className="w-30 mt-4">
                                    <Button
                                        className="text-4xl text-blanco dark:text-negro bg-transparent hover:bg-terciario border border-blanco"
                                        color="default"
                                        type="button"
                                        onClick={() => {
                                            router.push(link);
                                        }}
                                    >
                                        Mas información
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </Carousel>
        </>
    );
}
