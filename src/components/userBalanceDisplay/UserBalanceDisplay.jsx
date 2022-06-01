import React from "react";
import PropTypes from 'prop-types';

import './index.css'

const UserBalanceDisplay = ({balance,unit,testId}) => {
    return <div className="user-balance-display" data-testid={testId}>
        {balance} {unit}
    </div>;
};

UserBalanceDisplay.defaultProps = {
    testId:"user-balance-display",
};

UserBalanceDisplay.propTypes = {
    testId: PropTypes.string,
    balance: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
};

export default UserBalanceDisplay;
