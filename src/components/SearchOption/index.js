import React from 'react';
import PropTypes from 'prop-types';

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

SearchOption.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.node,
    isActive: PropTypes.bool,
    onClick: PropTypes.func
};

export default SearchOption;
