import { useState } from "react";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { useParams } from "react-router-dom"
import { useArtistasBD, useProducciones_HTTP_Fetch, useHandleAppMusic, SocialIcons, MetaInjector, AppMusic, formatLink } from "..";

export const ProducerDetail = () => {
    const tipo_obra_general = 1
    const { artist_name } = useParams();
    const [artistaActual, setArtistaActual] = useState(null);
    const [producciones_HTTP_Fetch] = useProducciones_HTTP_Fetch('api/artistas/producciones');
    const [artistas] = useArtistasBD('api/artistas');
    const produccionesArtista = producciones_HTTP_Fetch.filter(element => formatLink(element.nombre_artista) === artist_name)

    const [playing, setPlaying, pause, setPause, infoProduccion, idCompActual, ended, setEnded, progressDuration, setprogressDuration, progress, setProgress, clickInfoButton, setClickInfoButton, selectedSong] = useHandleAppMusic();


    useEffect(() => {
        if (artistas) {
            setArtistaActual(artistas.filter(element => formatLink(element.nombre_artista) === artist_name && element.tipo_obra !== tipo_obra_general));
        }
    }, [artistas, artist_name]);

    if (!artistaActual) {
        return <div className="lds-ring"><div></div><div></div><div></div><div></div></div>;
    }

    if (!artistaActual.length) {
        return <div>Lo sentimos, No se encontraron datos</div>;
    }

    const { nombre_artista, instagram, spotify, info } = artistaActual[0];


    return (
        <HelmetProvider>
            <MetaInjector

                title={nombre_artista}
                description={info}
                type='website'
                url={`https://flproductionscr.com/musica/artistas/${artist_name}`}
                image='https://flproductionscr.com/build_main/img/header-main.png'
                keywords={`${nombre_artista}, artista, cantante, musica, Costa Rica`}
                robots='index, follow'

            />
            <div className="contenedor">


                <div className="artist-detail__title">
                    <h1>{nombre_artista}</h1>

                    <SocialIcons
                        instagram={instagram}
                        claseCSS='artistdetail__socialicons'
                        size={35}
                        spotify={spotify}

                    />

                </div>

                <div className="artistdetail__info">
                    <p>{info}</p>
                </div>

                <div className='artistdetail__music contenedor-basic'>
                    <div>
                        <h2>{`Musica de ${nombre_artista}`}</h2>
                    </div>

                    <AppMusic
                        songArray={produccionesArtista}
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
            </div>


        </HelmetProvider>
    );
}