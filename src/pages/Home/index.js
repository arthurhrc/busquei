import React from 'react';
import { Link } from 'react-router-dom';

import Search from '../../components/Search/index';
import Busquei from '../../assets/busquei.png'
import AppsIcon from '@material-ui/icons/Apps';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { Avatar, IconButton } from '@material-ui/core';
import { useStateValue } from '../../StateContext';
import { actionTypes } from '../../reducer';

import './styles.css';

function Home() {
    const [{ darkMode }, dispatch] = useStateValue();

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
                </div>
            </div>
        </>
    )
}

export default Home;
