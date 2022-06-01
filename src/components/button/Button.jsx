import React from "react";
import PropTypes from 'prop-types';

import './index.css'

const Button = ({label,onClick,testId,isLoading}) => {
    return <button className={`standard-button ${isLoading ? 'disabled' : ''}`}
                   onClick={onClick} aria-label={label} data-testid={testId} disabled={isLoading}>
        {isLoading ? 'Loading...' : label}
    </button>;
};

Button.defaultProps = {
    testId:"button",
    isLoading: false
};

Button.propTypes = {
    testId: PropTypes.string,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isLoading:PropTypes.bool,
};

export default Button;
