import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import Search from '../../components/Search/index';
import Busquei from '../../assets/busquei.png';
import AppsIcon from '@material-ui/icons/Apps';
import HistoryIcon from '@material-ui/icons/History';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { Avatar, IconButton } from '@material-ui/core';
import { useStateValue } from '../../StateContext';
import { actionTypes } from '../../reducer';

import './styles.css';

function Home() {
    const [{ darkMode, searchHistory }, dispatch] = useStateValue();
    const history = useHistory();

    const handleHistorySearch = (term) => {
        dispatch({ type: actionTypes.SET_SEARCH_TERM, term });
        history.push('/search');
    };

    return (
        <>
            <div className="home">

                <div className="home__header">
                    <div className="home__headerLeft">
                        <Link to="/about">Sobre</Link>
                        <Link to="/loja">Loja</Link>
                    </div>
                    <div className="home__headerRight">
                        <Link to="/email">E-mail</Link>
                        <Link to="/imagens">Imagens</Link>
                        <AppsIcon />
                        <IconButton
                            size="small"
                            onClick={() => dispatch({ type: actionTypes.TOGGLE_DARK_MODE })}
                        >
                            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                        <Avatar />
                    </div>
                </div>

                <div className="home__body">
                    <img src={Busquei} alt="Logo" />

                    <div className="home__inputContainer">
                        <Search />
                    </div>

                    {searchHistory.length > 0 && (
                        <div className="home__history">
                            <span className="home__historyLabel">Pesquisas recentes</span>
                            {searchHistory.map(item => (
                                <button
                                    key={item}
                                    className="home__historyItem"
                                    onClick={() => handleHistorySearch(item)}
                                >
                                    <HistoryIcon className="home__historyIcon" />
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Home;
