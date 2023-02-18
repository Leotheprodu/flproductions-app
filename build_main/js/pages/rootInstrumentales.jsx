/* import React from 'react'; */
import { Outlet } from 'react-router-dom';
import { Footer, NavMenu, BeatPlayer, useProducciones_HTTP_Fetch, useHandleAppMusic, useHandleItemAppMusic } from '../components';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { useState } from 'react';



export function RootInstrumentales() {
  const [producciones_HTTP_Fetch] = useProducciones_HTTP_Fetch('api/artistas/producciones');
    const produccionesArtistas = producciones_HTTP_Fetch.filter(element => element.tipo_obra === 1);
  //ESTE HOOK MANEJA EL REPRODUCTOR DE AUDIO PARA QUE REPRODUZCA UNA CANCION A LA VEZ
  const [playing, setPlaying, pause, setPause, infoProduccion, ended, setEnded, progressDuration, setprogressDuration, progress, setProgress, clickInfoButton, setClickInfoButton] = useHandleAppMusic();
  const [duration, volume, setVolume, playerRef, handleStopButtonClick, handlePlayButtonClick, handlePlay, handleDuration, handleonChangeRange, handleProgress, handleInfoButton] = useHandleItemAppMusic(setPlaying, setEnded, setClickInfoButton, playing, setPause, setProgress, setprogressDuration, clickInfoButton)
  const [selectedSong, setselectedSong] = useState(null)
  console.log(selectedSong);
  return(
<>
      <NavMenu/>

      <main className='contenedor-main'>
      
        <Outlet 
        context = {{produccionesArtistas, selectedSong, setselectedSong}}

        />
      
      </main>
      <div>
        <TawkMessengerReact
          propertyId="5803024f304e8e75855baa7f"
          widgetId="default"/>
      </div>
      {
      
      <div>
        <BeatPlayer
        /* infoProduccion={infoProduccion}
        playing={playing}
        handlePlay={handlePlay}
        handleDuration={handleDuration}
        playerRef={playerRef}
        handleProgress={handleProgress}
        volume={volume}
        setPause={setPause}
        clickInfoButton={clickInfoButton}
        handleInfoButton={handleInfoButton}
        handleStopButtonClick={handleStopButtonClick}
        setVolume={setVolume}
        handlePlayButtonClick={handlePlayButtonClick}
        pause={pause}
        progressDuration={progressDuration}
        progress={progress}
        handleonChangeRange={handleonChangeRange}
        duration={duration} */

        />
      </div>
      }

      <Footer />
      </>
  )

}
