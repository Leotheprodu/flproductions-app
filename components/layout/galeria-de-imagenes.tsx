import { useState } from 'react';
import PhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
// import optional lightbox plugins
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';
import { fotosDelEstudio } from '../database_temp/database';

export function GaleriaDeImagenes() {
    const [open, setOpen] = useState<boolean>(false);
    const [NuevoArray, setNuevoArray] = useState(fotosDelEstudio);

    function imagenClick(e) {
        setOpen(true);

        let primerImagen = e.target;
        const filtrados = fotosDelEstudio.filter(
            (item) => item.src !== primerImagen.src
        );
        const datosPrimerImagen = fotosDelEstudio.filter(
            (item) => item.src === primerImagen.src
        );
        setNuevoArray([
            {
                src: primerImagen.src,
                width: datosPrimerImagen[0].width,
                height: datosPrimerImagen[0].height,
                alt: datosPrimerImagen[0].alt,
                title: datosPrimerImagen[0].title,
            },
            ...filtrados,
        ]);
    }
    return (
        <div className="galeria-de-imagenes">
            <h3>Fotos del estudio</h3>
            <PhotoAlbum
                padding={10}
                onClick={imagenClick}
                layout="rows"
                photos={fotosDelEstudio}
            />
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={NuevoArray}
                plugins={[Thumbnails, Fullscreen, Slideshow, Zoom]}
            />
        </div>
    );
}
