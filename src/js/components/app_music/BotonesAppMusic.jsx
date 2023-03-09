import { IconDotsVertical, IconFileDownload, IconMicrophone, IconPlayerPause, IconPlayerPlay, IconPlayerStop, IconPlaylist } from "@tabler/icons";
import { Link } from "react-router-dom";
import { formatLink } from "../helpers/formatLink";

export const BotonesAppMusic = ({ clickInfoButton, infoProduccion, handleInfoButton, handleStopButtonClick, volume, setVolume, handlePlayButtonClick, pause, progressDuration, progress, handleonChangeRange, duration, tipo_obra_general }) => {
    
    return (
        <div className="BotonesAppMusic">
            {
                clickInfoButton && tipo_obra_general === 0 &&
                <div className="BotonesAppMusic__elementos-info-reproductor" >
                    <ul>
                    <li>
                            
                            <Link to={formatLink(`/cancion/${infoProduccion.id}`)}>
                                <IconPlaylist color="#1ab5e6" size={20} />
                                <p>info de la Cancion</p>
                            </Link>
                        </li>
                        <li>
                            
                                <Link to={formatLink(`/artista/${infoProduccion.nombre_artista}`)}>
                                    <IconMicrophone  color="#1ab5e6" size={20} />
                                    <p>info del Artista</p>
                                </Link>
                        </li>
                        <li>
                            
                                <a href={`https://www.y2mate.com/es/youtube-mp3/${infoProduccion.youtube_id}`} rel="noopener noreferrer" target={"_blank"} >
                                    <IconFileDownload color="#1ab5e6" size={20} />
                                    <p>Descargar mp3</p>
                                </a>
                        </li>
                    </ul>
                </div>
            }
            {
                clickInfoButton && tipo_obra_general === 1 &&
                <div className="BotonesAppMusic__elementos-info-reproductor" >
                    <ul>
                        <li>
                            
                            <Link to={formatLink(`/instrumental/${infoProduccion.id}`)}>
                                <IconPlaylist color="#1ab5e6" size={20}/>
                                <p>info del Instrumental</p>
                            </Link>
                        </li>
                        <li>
                            
                                <Link to={formatLink(`/productor-musical/${infoProduccion.nombre_artista}`)}>
                                    <IconMicrophone color="#1ab5e6" size={20} />
                                    <p>info del Productor</p>
                                </Link>
                        </li>
                        <li>
                            
                                <a href={`https://www.y2mate.com/es/youtube-mp3/${infoProduccion.youtube_id}`} rel="noopener noreferrer" target={"_blank"} >
                                    <IconFileDownload color="#1ab5e6" size={20} />
                                    <p>Descargar mp3</p>
                                </a>
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
            {/* <button
                className="BotonesAppMusic__boton-stop-listadoproducciones"
                onClick={handleStopButtonClick}

            >
                <IconPlayerStop />
            </button> */}
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
            <div className="BotonesAppMusic__barra-de-progreso">
                
            </div>
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