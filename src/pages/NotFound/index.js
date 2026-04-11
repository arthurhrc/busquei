import React from 'react';
import { Link } from 'react-router-dom';
import Busquei from '../../assets/busquei.png';
import './styles.css';

function NotFound() {
    return (
        <div className="notFound">
            <Link to="/">
                <img src={Busquei} alt="Logo" className="notFound__logo" />
            </Link>
            <h1 className="notFound__code">404</h1>
            <p className="notFound__message">Página não encontrada</p>
            <Link to="/" className="notFound__link">Voltar para a página inicial</Link>
        </div>
    );
}

export default NotFound;
