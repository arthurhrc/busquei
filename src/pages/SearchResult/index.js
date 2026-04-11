import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import SearchIcon from '@material-ui/icons/Search';
import DescriptionIcon from '@material-ui/icons/Description';
import ImageIcon from '@material-ui/icons/Image';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import RoomIcon from '@material-ui/icons/Room';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { Button, IconButton } from '@material-ui/core';

import useGoogleSearch from '../../hooks/useGoogleSearch/index';
import Busquei from '../../assets/busquei.png'
import { useStateValue } from '../../StateContext';
import { actionTypes } from '../../reducer';

import Search from '../../components/Search/index';
import SearchOption from '../../components/SearchOption/index';

import './styles.css';

function SearchResult() {

    const [{ term, searchType, darkMode }, dispatch] = useStateValue();
    const [startIndex, setStartIndex] = useState(1);
    const { data, loading, error } = useGoogleSearch(term, startIndex, searchType);

    useEffect(() => {
        setStartIndex(1);
    }, [term, searchType]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [startIndex]);

    const handleSearchType = (type) => {
        dispatch({ type: actionTypes.SET_SEARCH_TYPE, searchType: type });
    };

    return (
        <>
            <div className="searchResult">
                <div className="searchResult__header">
                    <Link to="/">
                        <img className="searchResult__logo" src={Busquei} alt="Logo" />
                    </Link>

                    <div className="searchResult__headerBody">
                        <Search hideButtons />

                        <div className="searchResult__options">
                            <div className="searchResult__optionsLeft">
                                <SearchOption
                                    title="Pesquisa"
                                    icon={<SearchIcon />}
                                    isActive={searchType === 'web'}
                                    onClick={() => handleSearchType('web')}
                                />
                                <SearchOption title="Notícias" icon={<DescriptionIcon />} />
                                <SearchOption
                                    title="Imagens"
                                    icon={<ImageIcon />}
                                    isActive={searchType === 'image'}
                                    onClick={() => handleSearchType('image')}
                                />
                                <SearchOption title="Loja" icon={<LocalOfferIcon />} />
                                <SearchOption title="Navegação" icon={<RoomIcon />} />
                                <SearchOption title="Mais resultados" icon={<MoreVertIcon />} />
                            </div>
                            <div className="searchResult__optionsRight">
                                <SearchOption title="Configurações" />
                                <SearchOption title="Ferramentas" />
                                <IconButton
                                    size="small"
                                    onClick={() => dispatch({ type: actionTypes.TOGGLE_DARK_MODE })}
                                >
                                    {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>

                {loading && (
                    <p className="searchResult__loading">Buscando...</p>
                )}

                {error && (
                    <p className="searchResult__error">Algo deu errado. Tente novamente.</p>
                )}

                {!loading && !error && term && (
                    <div className="searchResult__items">
                        <p className="searchResult__itemsCount">
                            Encontramos {data?.searchInformation?.formattedTotalResults} resultados
                            ({data?.searchInformation?.formattedSearchTime} segundos) para {term}
                        </p>

                        {searchType === 'image' ? (
                            <div className="searchResult__imageGrid">
                                {data?.items?.map(item => (
                                    <a
                                        href={item.image?.contextLink}
                                        key={item.link}
                                        className="searchResult__imageItem"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src={item.link} alt={item.title} />
                                        <p>{item.displayLink}</p>
                                    </a>
                                ))}
                            </div>
                        ) : (
                            data?.items?.map(item => (
                                <div className="searchResult__item" key={item.formattedUrl}>

                                    <a href={item.link} className="searchResult__itemLink">
                                        {item.pagemap?.cse_image?.length > 0 &&
                                            item.pagemap?.cse_image[0]?.src && (
                                                <img
                                                    className="searchResult__itemImage"
                                                    src={item.pagemap?.cse_image?.length > 0 && item.pagemap?.cse_image[0]?.src}
                                                    alt="Featured Visual" />
                                            )
                                        }
                                        {item.displayLink}
                                        <ArrowDropDownIcon />
                                    </a>

                                    <a href={item.link} className="searchResult__itemTitle">
                                        <h2>{item.title}</h2>
                                    </a>

                                    <p className="searchResult__itemSnippet">
                                        {item.snippet}
                                    </p>

                                </div>
                            ))
                        )}

                        <div className="searchResult__pagination">
                            {data?.queries?.previousPage && (
                                <Button
                                    variant="outlined"
                                    onClick={() => setStartIndex(data.queries.previousPage[0].startIndex)}
                                >
                                    Página anterior
                                </Button>
                            )}
                            {data?.queries?.nextPage && (
                                <Button
                                    variant="outlined"
                                    onClick={() => setStartIndex(data.queries.nextPage[0].startIndex)}
                                >
                                    Próxima página
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default SearchResult;
