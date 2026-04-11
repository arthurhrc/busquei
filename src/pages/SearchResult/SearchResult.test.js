import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchResult from './index';
import useGoogleSearch from '../../hooks/useGoogleSearch/index';

jest.mock('../../hooks/useGoogleSearch/index', () => jest.fn());

jest.mock('../../StateContext', () => ({
    useStateValue: () => [
        { term: 'react', searchType: 'web', darkMode: false },
        jest.fn()
    ]
}));

jest.mock('react-router-dom', () => ({
    Link: ({ children }) => <>{children}</>,
    useHistory: () => ({ push: jest.fn() })
}));

jest.mock('../../assets/busquei.png', () => 'busquei.png');

describe('SearchResult', () => {
    beforeEach(() => {
        window.scrollTo = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('exibe skeleton durante carregamento', () => {
        useGoogleSearch.mockReturnValue({ data: null, loading: true, error: null });
        render(<SearchResult />);
        expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    });

    it('exibe mensagem de erro', () => {
        useGoogleSearch.mockReturnValue({ data: null, loading: false, error: new Error('Erro') });
        render(<SearchResult />);
        expect(screen.getByText('Algo deu errado. Tente novamente.')).toBeInTheDocument();
    });

    it('exibe resultados quando há dados', () => {
        useGoogleSearch.mockReturnValue({
            data: {
                items: [{
                    link: 'https://example.com',
                    formattedUrl: 'example.com',
                    displayLink: 'example.com',
                    title: 'Exemplo React',
                    snippet: 'Um site de exemplo sobre React'
                }],
                searchInformation: {
                    formattedTotalResults: '1',
                    formattedSearchTime: '0.1'
                },
                queries: {}
            },
            loading: false,
            error: null
        });
        render(<SearchResult />);
        expect(screen.getByText('Exemplo React')).toBeInTheDocument();
    });
});
