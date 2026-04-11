import React from 'react';
import './styles.css';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="errorBoundary">
                    <h2 className="errorBoundary__title">Algo deu errado.</h2>
                    <p className="errorBoundary__message">Ocorreu um erro inesperado na aplicação.</p>
                    <a href="/" className="errorBoundary__link">Voltar para a página inicial</a>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
