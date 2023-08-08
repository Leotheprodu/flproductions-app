import { IconPlayerPlayFilled } from '@tabler/icons-react';
import ReactPlayer from 'react-player';
import { BotonesAppMusic } from '..';

interface Props {
    playing: boolean;
    infoProduccion: any;
    selectedSong: any;
    idComp: number;
    idCompActual: number;
    pause: boolean;
    setPause: Function;
    ended: boolean;
    setEnded: Function;
    progressDuration: number;
    progress: number;
    clickInfoButton: boolean;
    song: any;
    handlePlay: any;
    handleDuration: any;
    playerRef: any;
    handleProgress: any;
    volume: number;
    handleInfoButton: any;
    setVolume: Function;
    handlePlayButtonClick: any;
    handleonChangeRange: any;
    duration: string;
    tipo_obra_general: number;
    itemKey: number;
    idCompInfo: number;
}

const ItemAppMusic = ({
    playing,
    infoProduccion,
    selectedSong,
    idComp,
    idCompActual,
    pause,
    setPause,
    ended,
    setEnded,
    progressDuration,
    progress,
    clickInfoButton,
    song,
    handlePlay,
    handleDuration,
    playerRef,
    handleProgress,
    volume,
    handleInfoButton,
    setVolume,
    handlePlayButtonClick,
    handleonChangeRange,
    duration,
    tipo_obra_general,
    itemKey,
    idCompInfo,
}: Props) => {
    return (
        <div
            className={`ItemAppMusic ${
                infoProduccion
                    ? song.id === infoProduccion.id &&
                      !ended &&
                      idComp === idCompActual
                        ? 'selected'
                        : ''
                    : ''
            }`}
        >
            <div className="ItemAppMusic__imagen">
                <img
                    src={`https://img.youtube.com/vi/${song.youtube_id}/mqdefault.jpg`}
                    alt={`imagen de ${song.nombre}`}
                />
            </div>

            <div className="ItemAppMusic__texto">
                <div className="ItemAppMusic__texto__titulo">
                    <p className="ItemAppMusic__texto-1">{song.nombre}</p>
                    {tipo_obra_general === 1 && (
                        <p className="ItemAppMusic__texto-2">{`${song.artista.nombre_artista}`}</p>
                    )}
                </div>
                {tipo_obra_general === 2 && (
                    <p className="ItemAppMusic__texto-3">{song.genero}</p>
                )}
            </div>
            <div className="ItemAppMusic__botones">
                <BotonesAppMusic
                    clickInfoButton={clickInfoButton}
                    infoProduccion={infoProduccion}
                    handleInfoButton={handleInfoButton}
                    tipo_obra_general={tipo_obra_general}
                    song={song}
                    idComp={idComp}
                    idCompActual={idCompActual}
                    handlePlayButtonClick={handlePlayButtonClick}
                    pause={pause}
                    playing={playing}
                    ended={ended}
                    selectedSong={selectedSong}
                    itemKey={itemKey}
                    idCompInfo={idCompInfo}
                />
            </div>
        </div>
    );
};

export default ItemAppMusic;
