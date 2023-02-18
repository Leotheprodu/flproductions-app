import { IconDotsVertical, IconMicrophone, IconPlayerPause, IconPlayerPlay, IconPlayerStop, IconPlaylist } from "@tabler/icons";
import { Link } from "react-router-dom";

export const BotonesAppMusic = ({ clickInfoButton, infoProduccion, handleInfoButton, handleStopButtonClick, volume, setVolume, handlePlayButtonClick, pause, progressDuration, progress, handleonChangeRange, duration, tipo_obra_general }) => {


    return (
        <div className="BotonesAppMusic">
            {
                clickInfoButton && tipo_obra_general === 0 &&
                <div className="BotonesAppMusic__elementos-info-reproductor" >
                    <ul>
                    <li>
                            
                            <Link to={`/canciones/${infoProduccion.id}`}>
                                <IconPlaylist color="#1ab5e6" size={20} />
                                <p>info de la Cancion</p>
                            </Link>
                        </li>
                        <li>
                            
                                <Link to={`/artistas/${infoProduccion.nombre_artista}`}>
                                    <IconMicrophone  color="#1ab5e6" size={20} />
                                    <p>info del Artista</p>
                                </Link>
                        </li>
                    </ul>
                </div>
            }
            {
                clickInfoButton && tipo_obra_general === 1 &&
                <div className="BotonesAppMusic__elementos-info-reproductor" >
                    <ul>
                        <li>
                            
                            <Link to={`/instrumentales/${infoProduccion.id}`}>
                                <IconPlaylist color="#1ab5e6" size={20}/>
                                <p>info del Instrumental</p>
                            </Link>
                        </li>
                        <li>
                            
                                <Link to={`/productores/${infoProduccion.nombre_artista}`}>
                                    <IconMicrophone color="#1ab5e6" size={20} />
                                    <p>info del Productor</p>
                                </Link>
                        </li>
                    </ul>
                </div>
            }
            <button
                onClick={handleInfoButton}
                className="BotonesAppMusic__boton-info-reproductor"
            >

                <IconDotsVertical />
            </button>
            <button
                className="BotonesAppMusic__boton-stop-listadoproducciones"
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
                className="BotonesAppMusic__control-volumen-listadoproducciones"
            />
            <button
                className="BotonesAppMusic__boton-playstop-listadoproducciones"
                onClick={handlePlayButtonClick}

            >

                {!pause ? <IconPlayerPause /> : <IconPlayerPlay />}
            </button>
            <p className="BotonesAppMusic__progressduration-listadoproducciones">{progressDuration}</p>
            <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={progress}
                onChange={handleonChangeRange}
                className="BotonesAppMusic__barra-de-despazamiento-listadoproducciones"
            />
            <p className="BotonesAppMusic__duration-listadoproducciones">{duration}</p>
        </div>
    )
}