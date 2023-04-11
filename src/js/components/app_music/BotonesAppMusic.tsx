import { IconDotsVertical, IconFileDownload, IconMicrophone, IconPlayerPause, IconPlayerPlay, IconPlaylist } from "@tabler/icons";
import { Link } from "react-router-dom";
import { formatLink } from "../helpers/formatLink";


interface Props {
    clickInfoButton: boolean
    infoProduccion: any
    handleInfoButton: any
    volume: number
    setVolume: Function
    handlePlayButtonClick: any
    pause: boolean
    progressDuration: number
    progress: number
    handleonChangeRange: any
    duration: string
    tipo_obra_general: number
    playing: boolean
    ended: boolean
}


export const BotonesAppMusic = ({ clickInfoButton, infoProduccion, handleInfoButton, volume, setVolume, handlePlayButtonClick, pause, progressDuration, progress, handleonChangeRange, duration, tipo_obra_general, playing, ended }: Props) => {
    
    return (
        <div className="BotonesAppMusic">
            {
                tipo_obra_general === 0 &&
                <div className={`BotonesAppMusic__elementos-info-reproductor ${clickInfoButton ? 'selected' : ''}`} >
                    <ul>
                    <li>
                            
                            <Link to={formatLink(`/cancion/${infoProduccion.id}`)}>
                                <IconPlaylist size={15} />
                                <p>info de la Cancion</p>
                            </Link>
                        </li>
                        <li>
                            
                                <Link to={formatLink(`/artista/${infoProduccion.nombre_artista}`)}>
                                    <IconMicrophone size={15} />
                                    <p>info del Artista</p>
                                </Link>
                        </li>
                        <li>
                            
                                <a href={`https://www.y2mate.com/es/youtube-mp3/${infoProduccion.youtube_id}`} rel="noopener noreferrer" target={"_blank"} >
                                    <IconFileDownload size={15} />
                                    <p>Descargar mp3</p>
                                </a>
                        </li>
                    </ul>
                </div>
            }
            {
                tipo_obra_general === 1 &&
                <div className={`BotonesAppMusic__elementos-info-reproductor ${clickInfoButton ? 'selected' : ''}`} >
                    <ul>
                        <li>
                            
                            <Link to={formatLink(`/instrumental/${infoProduccion.id}`)}>
                                <IconPlaylist  size={15}/>
                                <p>info del Instrumental</p>
                            </Link>
                        </li>
                        <li>
                            
                                <Link to={formatLink(`/productor-musical/${infoProduccion.nombre_artista}`)}>
                                    <IconMicrophone size={15} />
                                    <p>info del Productor</p>
                                </Link>
                        </li>
                        <li>
                            
                                <a href={`https://www.y2mate.com/es/youtube-mp3/${infoProduccion.youtube_id}`} rel="noopener noreferrer" target={"_blank"} >
                                    <IconFileDownload size={15} />
                                    <p>Descargar mp3</p>
                                </a>
                        </li>
                    </ul>
                </div>
            }
            <button
                type="button"
                onClick={handleInfoButton}
                className="BotonesAppMusic__boton-info-reproductor"
            >

                <IconDotsVertical />
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
                type="button"
                className="BotonesAppMusic__boton-playstop-listadoproducciones"
                onClick={handlePlayButtonClick}

            >

                { !pause && playing && !ended  ? <IconPlayerPause /> : <IconPlayerPlay />}
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