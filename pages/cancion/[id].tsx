import { useEffect, useState } from "react";
import { HeadMetaInfo } from '../../components/helpers/HeadMetaInfo';
import { useRouter } from 'next/router'
import { DetalleProducciones, useProducciones_HTTP_Fetch, useHandleAppMusic, AppMusic } from "../../components";

function SongDetail() {
    const tipo_obra_general: number = 0
    const router = useRouter()
    const {id} = router.query;
    const idString: string = Array.isArray(id) ? id.join(",") : id;
    const [produccionActual, setproduccionActual] = useState(null);
    const [producciones_HTTP_Fetch] = useProducciones_HTTP_Fetch(process.env.NEXT_PUBLIC_PROD_PRODUCCIONES, process.env.NEXT_PUBLIC_DEV_PRODUCCIONES);
    const produccionesArtistas = producciones_HTTP_Fetch.filter(element => element.tipo_obra === tipo_obra_general);
    const [playing, setPlaying, pause, setPause, infoProduccion, idCompActual, ended, setEnded, progressDuration, setprogressDuration, progress, setProgress, clickInfoButton, setClickInfoButton, selectedSong] = useHandleAppMusic();


    useEffect(() => {
        if (produccionesArtistas) {
            setproduccionActual(produccionesArtistas.filter(element => element.id === parseInt(idString)));
        }
    }, [producciones_HTTP_Fetch, id]);

    if (!produccionActual) {
        return <div className="lds-ring"><div></div><div></div><div></div><div></div></div>;
    }

    if (!produccionActual.length) {
        return <div>Lo sentimos, No se encontraron datos</div>;
    }

    return (
        <>
            <HeadMetaInfo

                title={`${produccionActual[0].artista.nombre_artista} - ${produccionActual[0].nombre}`}
                description={produccionActual[0].descripcion}
                type='website'
                url={`https://flproductionscr.com/musica/artistas/${id}`}
                image='https://flproductionscr.com/build_main/img/header-main.png'
                keywords={`${produccionActual[0].artista.nombre_artista}, ${produccionActual[0].nombre}, musica, Costa Rica`}
                robots='index, follow'

            />

            <div className=" contenedor songDetail__appmusic">
                <div>

                    <AppMusic
                        songArray={produccionActual}
                        playing={playing}
                        infoProduccion={infoProduccion}
                        selectedSong={selectedSong}
                        idComp={1}
                        idCompActual={idCompActual}
                        pause={pause}
                        setPause={setPause}
                        ended={ended}
                        setEnded={setEnded}
                        setPlaying={setPlaying}
                        progressDuration={progressDuration}
                        setprogressDuration={setprogressDuration}
                        progress={progress}
                        setProgress={setProgress}
                        clickInfoButton={clickInfoButton}
                        setClickInfoButton={setClickInfoButton}
                        tipo_obra_general={tipo_obra_general}


                    />
                </div>
                {/* <img src={`https://flproductionscr.com/build_main/img/banners/music/${id}.webp`} alt="" /> */}
                <DetalleProducciones infoProduccion={produccionActual[0]} tipo_obra_general={tipo_obra_general} />

            </div>
        </>
    );
}

export default SongDetail;