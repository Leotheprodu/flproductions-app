export const testimonios = [
    {
        imagen: `${process.env.NEXT_PUBLIC_PROD_LINK}/build_main/img/artistas/blackstyle1.webp`,
        nombre: 'BlackStyle Addams',
        texto: 'Yo recomiendo FLProductions y a Leo Serrano, porque es un productor muy responsable y profesional, por esa razon desde que lo conocí, dejé de probar en otro estudios, acá mi musica sí suena profesional.',
        link: 'https://www.instagram.com/blackstyle_adamsmusic/',
    },
    {
        imagen: `${process.env.NEXT_PUBLIC_PROD_LINK}/build_main/img/artistas/rousses1.webp`,
        nombre: 'Rousses',
        texto: 'FLProductions es uno de los mejores estudios y me quedo corto, en este estudio he crecido mucho, lo recomiendo para todo artista que quiera sonar con calidad y que quiera crecer en la industria musical.',
        link: 'https://www.instagram.com/roussesofficial/',
    },
    {
        imagen: `${process.env.NEXT_PUBLIC_PROD_LINK}/build_main/img/artistas/cesarjs1.webp`,
        nombre: 'Cesar JS',
        texto: 'El estudio que ofrece el sonido mas profesional de Limon y uno de los mejores en Costa Rica, Leo Serrano es un productor a otro nivel... con todo eso se puede lograr musica de alta calidad.',
        link: 'https://www.instagram.com/cesar_js506/',
    },
];
interface ImageStudio {
    src: string;
    width: number;
    height: number;
    alt: string;
    title: string;
}

export const fotosDelEstudio: ImageStudio[] = [
    {
        src: `${process.env.NEXT_PUBLIC_PROD_LINK}/build_main/img/foto-estudio1.webp`,
        width: 3264,
        height: 2448,
        alt: 'foto del estudio',
        title: 'Setup del estudio',
    },
    {
        src: `${process.env.NEXT_PUBLIC_PROD_LINK}/build_main/img/foto-estudio2.webp`,
        width: 1249,
        height: 937,
        alt: 'foto del estudio',
        title: 'Setup del estudio',
    },
    {
        src: `${process.env.NEXT_PUBLIC_PROD_LINK}/build_main/img/foto-estudio3.webp`,
        width: 6000,
        height: 4000,
        alt: 'foto del estudio',
        title: 'Setup del estudio, Bajo Yamaha',
    },
];

export const mainBannerSlider = [
    {
        img_link: `${process.env.NEXT_PUBLIC_PROD_LINK}/build_main/img/banners/music/28.webp`,
        link: 'https://www.youtube.com/watch?v=URtP7jMs9M0',
        title: 'Nuevo Beat: "Bichote"',
        description:
            '¡Instrumental de trap latino disponible ahora! Consigue "Bichote" y lleva tu música al siguiente nivel con su distintivo ritmo que combina lo tradicional y lo moderno. ¡Obtén este instrumento imprescindible para tu próxima canción hoy mismo!',
    },
    {
        img_link: `${process.env.NEXT_PUBLIC_PROD_LINK}/build_main/img/banners/music/descuento-img.webp`,
        link: 'https://wa.me/50663017707?text=Me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20el%20descuento',
        title: 'Descuentos en todos los servicios',
        description:
            '¡Por todo Septiembre tenemos descuentos en todos los servicios, reserva tu cita hoy!, solo en FLProductions!',
    },
];

export const musickeys = [
    'indefinido',
    'C',
    'Cm',
    'C#',
    'C#m',
    'D',
    'Dm',
    'D#',
    'D#m',
    'E',
    'Em',
    'F',
    'Fm',
    'F#',
    'F#m',
    'G',
    'Gm',
    'G#',
    'G#m',
    'A',
    'Am',
    'A#',
    'A#m',
    'B',
    'Bm',
];

export const generosMusicales = [
    'Dancehall',
    'Reggaeton',
    'HipHop',
    'Trap',
    'Afrobeat',
    'R&B',
    'EDM',
    'Salsa',
    'Cumbia',
    'Bachata',
    'Merengue',
    'Rock',
    'Pop',
    'Vallenato',
    'Banda',
    'Ranchera',
    'Corrido',
];

export const infoCampos = {
    nombre: 'Este Campo es para que pongas el nombre de tu cancion',
    descripcion:
        'Es bueno poner una descripcion a tu cancion, algo que la describa, o un resumen del mensaje o cuenta algo sobre ella',
    spotify_link:
        'Pon el link de tu cancion pero el de spotify, de esa manera tus seguidores pueden encontrarla mas facilmente',
    youtube_id:
        'Este es el campo mas importante porque el reproductor de musica funciona con youtube, debes poner el link de tu cancion de youtube y nosotros extraemos el id o directamente puedes poner el id de youtube, en google puedes encontrar mas informacion de como obtener tu ID de youtube',
    estilo: 'Esto es solamente para separar 2 grupos musicales, secular es la mayoria de musica, por eso esta por default y el otro grupo seria el cristiano, de esa manera las personas que solo escuchan musica cristiana pueden encontrar mas facilmente su musica favorita',
    genero: 'Selecciona el genero musical de tu cancion, si no lo encuentras, escoge alguno que mas se acerque',
    key: 'Aqui puedes poner en cual escala esta tu cancion, puede ser interesante para oyentes musicos',
    bpm: 'Beats por Minuto, este dato puede ser interesante para productores, musicos, djs, les puede facilitar el trabajo si quieren usar esta cancion para algo mas que solo escucharla',
    fecha_lanzamiento:
        'Es la fecha en que fue lanzada esta cancion, para tener un orden cronologico de tu musica, es importante',
};
