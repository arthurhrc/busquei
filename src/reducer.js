export const initialState = {
    term: null,
    searchType: 'web',
    darkMode: localStorage.getItem('darkMode') === 'true',
    searchHistory: JSON.parse(localStorage.getItem('searchHistory') || '[]')
};

export const actionTypes = {
    SET_SEARCH_TERM: 'SET_SEARCH_TERM',
    SET_SEARCH_TYPE: 'SET_SEARCH_TYPE',
    TOGGLE_DARK_MODE: 'TOGGLE_DARK_MODE'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SEARCH_TERM: {
            const history = [
                action.term,
                ...state.searchHistory.filter(t => t !== action.term)
            ].slice(0, 6);
            localStorage.setItem('searchHistory', JSON.stringify(history));
            return {
                ...state,
                term: action.term,
                searchHistory: history
            };
        }

        case actionTypes.SET_SEARCH_TYPE:
            return {
                ...state,
                searchType: action.searchType
            }

        case actionTypes.TOGGLE_DARK_MODE: {
            const newDarkMode = !state.darkMode;
            localStorage.setItem('darkMode', newDarkMode);
            return {
                ...state,
                darkMode: newDarkMode
            };
        }

        default:
            return state;
    }
}

export default reducer;
