import { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AppMusic, StyleList, ArtistList, useHandleAppMusic, useProducciones_HTTP_Fetch, MetaInjector, GenreList } from '../components';



export const Instrumentales = () => {
  const tipo_obra_general = 1
  const [producciones_HTTP_Fetch] = useProducciones_HTTP_Fetch('api/artistas/producciones');
  const produccionesArtistas = producciones_HTTP_Fetch.filter(element => element.tipo_obra === tipo_obra_general);
  const [produccioneFiltradas, setProduccioneFiltradas] = useState(produccionesArtistas);


  useEffect(() => {
    if (producciones_HTTP_Fetch) {
      setProduccioneFiltradas(produccionesArtistas);
    }
  }, [producciones_HTTP_Fetch]);


  const [playing, setPlaying, pause, setPause, infoProduccion, idCompActual, ended, setEnded, progressDuration, setprogressDuration, progress, setProgress, clickInfoButton, setClickInfoButton, selectedSong] = useHandleAppMusic();

  return (


    <HelmetProvider>
      <MetaInjector
        title='Canciones'
        description='Musica de clientes del estudio FLProductions'
        type='website'
        url='https://flproductionscr.com/musica'
        image='https://flproductionscr.com/build_main/img/header-main.png'
        keywords='musica, artistas, destacados, producciones, music'
        robots='index, follow'
      />
      <div className='instrumentales'>

        <div className='canciones__filtros contenedor-basic center'>
          <StyleList listadoCanciones={produccionesArtistas} tipo_obra_general={tipo_obra_general} setProduccioneFiltradas={setProduccioneFiltradas} produccioneFiltradas={produccioneFiltradas} />

          <GenreList listadoCanciones={produccionesArtistas} tipo_obra_general={tipo_obra_general} setProduccioneFiltradas={setProduccioneFiltradas} produccioneFiltradas={produccioneFiltradas} />

          <ArtistList listadoCanciones={produccionesArtistas} tipo_obra_general={tipo_obra_general} setProduccioneFiltradas={setProduccioneFiltradas} produccioneFiltradas={produccioneFiltradas} />

        </div>



        <div className='contenedor-basic'>

          <AppMusic
            songArray={produccioneFiltradas}
            playing={playing}
            infoProduccion={infoProduccion}
            selectedSong={selectedSong}
            idComp={2}
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



  )
}