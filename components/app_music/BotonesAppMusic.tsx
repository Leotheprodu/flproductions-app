import {
    IconDotsVertical,
    IconFileDownload,
    IconMicrophone,
    IconPlayerPause,
    IconPlayerPlay,
    IconPlaylist,
} from '@tabler/icons';
import Link from 'next/link';
import { formatLink } from '../helpers/formatLink';

interface Props {
    clickInfoButton: boolean;
    infoProduccion: any;
    handleInfoButton: any;
    tipo_obra_general: number;
    song: any;
    idComp: number;
    idCompActual: number;
    handlePlayButtonClick: any;
    pause: boolean;
    playing: boolean;
    ended: boolean;
    selectedSong: Function;
    itemKey: number;
    idCompInfo: number;
}

export const BotonesAppMusic = ({
    clickInfoButton,
    infoProduccion,
    handleInfoButton,
    tipo_obra_general,
    song,
    idComp,
    idCompActual,
    handlePlayButtonClick,
    pause,
    playing,
    ended,
    selectedSong,
    itemKey,
    idCompInfo,
}: Props) => {
    return (
        <div className="BotonesAppMusic">
            {tipo_obra_general === 0 && (
                <div
                    className={`BotonesAppMusic__elementos-info-reproductor ${
                        clickInfoButton &&
                        idCompInfo === idComp &&
                        itemKey === song.id
                            ? 'selected'
                            : ''
                    }`}
                >
                    <ul>
                        <li>
                            <Link href={formatLink(`/cancion/${song.id}`)}>
                                <IconPlaylist size={15} />
                                <p>info de la Cancion</p>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={formatLink(
                                    `/artista/${song.artista.nombre_artista}`
                                )}
                            >
                                <IconMicrophone size={15} />
                                <p>info del Artista</p>
                            </Link>
                        </li>
                        <li>
                            <a
                                href={`https://www.y2mate.com/es/youtube-mp3/${song.youtube_id}`}
                                rel="noopener noreferrer"
                                target={'_blank'}
                            >
                                <IconFileDownload size={15} />
                                <p>Descargar mp3</p>
                            </a>
                        </li>
                    </ul>
                </div>
            )}
            {tipo_obra_general === 1 && (
                <div
                    className={`BotonesAppMusic__elementos-info-reproductor ${
                        clickInfoButton &&
                        idComp === idCompActual &&
                        infoProduccion.id === song.id
                            ? 'selected'
                            : ''
                    }`}
                >
                    <ul>
                        <li>
                            <Link href={formatLink(`/instrumental/${song.id}`)}>
                                <IconPlaylist size={15} />
                                <p>info del Instrumental</p>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={formatLink(
                                    `/productor-musical/${song.artista.nombre_artista}`
                                )}
                            >
                                <IconMicrophone size={15} />
                                <p>info del Productor</p>
                            </Link>
                        </li>
                        <li>
                            <a
                                href={`https://www.y2mate.com/es/youtube-mp3/${song.youtube_id}`}
                                rel="noopener noreferrer"
                                target={'_blank'}
                            >
                                <IconFileDownload size={15} />
                                <p>Descargar mp3</p>
                            </a>
                        </li>
                    </ul>
                </div>
            )}
            <button
                type="button"
                onClick={() => handleInfoButton(idComp, song.id)}
                className="BotonesAppMusic__boton-info-reproductor"
            >
                <IconDotsVertical />
            </button>
            <button
                type="button"
                className="BotonesAppMusic__boton-playstop-listadoproducciones"
                onClick={() => selectedSong(song, idComp)}
            >
                <IconPlayerPlay />
            </button>

            {/* <input
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
                {!pause && playing && !ended ? (
                    <IconPlayerPause />
                ) : (
                    <IconPlayerPlay />
                )}
            </button>
            <div className="BotonesAppMusic__barra-de-progreso"></div>
            <p className="BotonesAppMusic__progressduration-listadoproducciones">
                {progressDuration}
            </p>
            <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={progress}
                onChange={handleonChangeRange}
                className="BotonesAppMusic__barra-de-despazamiento-listadoproducciones"
            />
            <p className="BotonesAppMusic__duration-listadoproducciones">
                {duration}
            </p> */}
        </div>
    );
};
