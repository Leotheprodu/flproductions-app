const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        colors: {
            primario: '#1f92eaff',
            secundario: '#f3de3fff',
            terciario: '#273043ff',
            cuaternario: '#c3423fff',
            negro: '#000000',
            blanco: '#ffffff',
            beige: '#eaf0ceff',
            oscurecer: 'rgb(102, 102, 102)',
            gris: 'rgb(238, 238, 238)',
            gradient_primario:
                'linear-gradient(127deg,rgba(243, 222, 63, 1) 0%,rgba(195, 65, 63, 1) 50%,rgba(31, 146, 234, 1) 100%)',
        },
        extend: {},
    },
    darkMode: 'class',
    plugins: [nextui()],
};
export default config;
