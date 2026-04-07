import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from './index';

const mockDispatch = jest.fn();
const mockPush = jest.fn();

jest.mock('../../StateContext', () => ({
    useStateValue: () => [{}, mockDispatch]
}));

jest.mock('react-router-dom', () => ({
    useHistory: () => ({ push: mockPush })
}));

describe('Search', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renderiza o campo de input', () => {
        render(<Search />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renderiza os botões quando hideButtons não é passado', () => {
        render(<Search />);
        expect(screen.getByText('Busquei')).toBeInTheDocument();
        expect(screen.getByText('Estou com sorte')).toBeInTheDocument();
    });

    it('atualiza o valor do input ao digitar', () => {
        render(<Search />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'javascript' } });
        expect(input.value).toBe('javascript');
    });

    it('dispara dispatch e redireciona ao submeter o formulário', () => {
        render(<Search />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'typescript' } });
        fireEvent.click(screen.getByText('Busquei'));
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'SET_SEARCH_TERM',
            term: 'typescript'
        });
        expect(mockPush).toHaveBeenCalledWith('/search');
    });
});
