import React from 'react';
import { Link } from 'react-router-dom';

import Search from '../../components/Search/index';
import Busquei from '../../assets/busquei.png'
import AppsIcon from '@material-ui/icons/Apps';
import { Avatar } from '@material-ui/core';

import './styles.css';

function Home() {
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