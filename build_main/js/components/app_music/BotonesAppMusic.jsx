import { IconDotsVertical, IconMicrophone, IconPlayerPause, IconPlayerPlay, IconPlayerStop, IconPlaylist } from "@tabler/icons";
import { Link } from "react-router-dom";

export const BotonesAppMusic = ({clickInfoButton, infoProduccion, handleInfoButton, handleStopButtonClick, volume, setVolume, handlePlayButtonClick, pause, progressDuration, progress, handleonChangeRange, duration}) => {


    return(
        <div className="algunas-producciones__repbutton">
                        {
                            clickInfoButton &&
                            <div className="elementos-info-reproductor" >
                                <ul>
                                    <li>
                                        <IconPlaylist color="#1ab5e6" />
                                        <Link to={`/musica/producciones/${infoProduccion.id}`}>informacion de la cancion</Link>
                                    </li>
                                    <li>
                                        <IconMicrophone color="#1ab5e6" />
                                        <Link to={`/musica/artistas/${infoProduccion.nombre_artista}`}>informacion del artista</Link>
                                    </li>
                                </ul>
                            </div>
                        }
                        <button
                            onClick={handleInfoButton}
                            className="boton-info-reproductor"
                        >

                            <IconDotsVertical />
                        </button>
                        <button
                            className="boton-stop-listadoproducciones"
                            onClick={handleStopButtonClick}

                        >
                            <IconPlayerStop />
                        </button>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.25}
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="control-volumen-listadoproducciones"
                        />
                        <button
                            className="boton-playstop-listadoproducciones"
                            onClick={handlePlayButtonClick}

                        >

                            {!pause ? <IconPlayerPause /> : <IconPlayerPlay />}
                        </button>
                        <p className="progressduration-listadoproducciones">{progressDuration}</p>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={progress}
                            onChange={handleonChangeRange}
                            className="barra-de-despazamiento-listadoproducciones"
                        />
                        <p className="duration-listadoproducciones">{duration}</p>
                    </div>
    )
}