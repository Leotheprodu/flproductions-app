import ReactDOM from 'react-dom/client';
import '../css/app.css';
import { InicioRender } from './pages/inicio';

export const renderRoot = ReactDOM.createRoot(document.getElementById('root'))

InicioRender()
