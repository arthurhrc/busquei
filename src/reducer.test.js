import reducer, { initialState, actionTypes } from './reducer';

describe('reducer', () => {
    it('retorna o estado inicial quando chamado sem estado', () => {
        const estado = reducer(undefined, {});
        expect(estado).toEqual(initialState);
    });

    it('atualiza o term ao receber SET_SEARCH_TERM', () => {
        const estado = reducer(initialState, {
            type: actionTypes.SET_SEARCH_TERM,
            term: 'react js'
        });
        expect(estado.term).toBe('react js');
    });

    it('retorna o estado sem modificações para ação desconhecida', () => {
        const estadoAtual = { term: 'vue js' };
        const estado = reducer(estadoAtual, { type: 'ACAO_DESCONHECIDA' });
        expect(estado).toEqual(estadoAtual);
    });
});
