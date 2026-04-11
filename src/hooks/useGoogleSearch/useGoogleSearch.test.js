import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import useGoogleSearch from './index';

jest.mock('../../keys', () => ({
    API_KEY: 'test-key',
    CONTEXT_KEY: 'test-cx'
}));

function HookWrapper({ term, startIndex = 1, searchType = 'web' }) {
    const { data, loading, error } = useGoogleSearch(term, startIndex, searchType);
    if (loading) return <span>carregando</span>;
    if (error) return <span>erro: {error.message}</span>;
    if (data) return <span>resultados: {data.items?.length ?? 0}</span>;
    return <span>vazio</span>;
}

describe('useGoogleSearch', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('retorna vazio quando não há termo', () => {
        render(<HookWrapper term="" />);
        expect(screen.getByText('vazio')).toBeInTheDocument();
    });

    it('exibe carregando durante a requisição', () => {
        global.fetch.mockImplementation(() => new Promise(() => {}));
        render(<HookWrapper term="react" />);
        expect(screen.getByText('carregando')).toBeInTheDocument();
    });

    it('exibe resultados após requisição bem-sucedida', async () => {
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({
                items: [{}, {}],
                searchInformation: { formattedTotalResults: '2', formattedSearchTime: '0.1' }
            })
        });
        render(<HookWrapper term="react" />);
        await waitFor(() => {
            expect(screen.getByText('resultados: 2')).toBeInTheDocument();
        });
    });

    it('trata erro retornado pela API', async () => {
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({
                error: { code: 429, message: 'Cota excedida' }
            })
        });
        render(<HookWrapper term="react" />);
        await waitFor(() => {
            expect(screen.getByText('erro: Cota excedida')).toBeInTheDocument();
        });
    });

    it('trata erro de rede', async () => {
        global.fetch.mockRejectedValueOnce(new Error('Falha de rede'));
        render(<HookWrapper term="react" />);
        await waitFor(() => {
            expect(screen.getByText('erro: Falha de rede')).toBeInTheDocument();
        });
    });
});
