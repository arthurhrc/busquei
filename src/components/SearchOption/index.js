import React from 'react';

import './styles.css';

function SearchOption({ title, icon, isActive, onClick }) {
    return (
        <div
            className={`searchOption ${isActive ? 'searchOption--active' : ''}`}
            onClick={onClick}
        >
            {icon && icon}
            <span>{title}</span>
        </div>
    )
}

export default SearchOption;
