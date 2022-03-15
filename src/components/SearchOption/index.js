import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

function SearchOption({ title, icon }) {
    return (
        <div className="searchOption">
            {icon && icon}
            <Link to="/">{title}</Link>
        </div>
    )
}

export default SearchOption;