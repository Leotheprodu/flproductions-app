import React from 'react';
import ReactDOM from 'react-dom/client';
import { Header } from './header';
import '../css/app.css';
import { InicioRender } from './inicio';

export const renderRoot = ReactDOM.createRoot(document.getElementById('root'))

InicioRender()
