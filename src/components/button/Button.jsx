import React from "react";
import PropTypes from 'prop-types';

import './index.css'

const Button = ({label,onClick,testId}) => {
    return <button className='standard-button' onClick={onClick} aria-label={label} data-testid={testId}>
        {label}
    </button>
};

Button.defaultProps = {
    testId:"button"
};

Button.propTypes = {
    testId: PropTypes.string,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Button;
