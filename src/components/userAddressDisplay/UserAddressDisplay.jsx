import React from "react";
import PropTypes from 'prop-types';

import './index.css'

const UserAddressDisplay = ({userAddress,userAddressToDisplay, testId}) => {
    return <span className="user-address-display" data-testid={testId} title={userAddress}>
        {userAddressToDisplay}
    </span>
};

UserAddressDisplay.defaultProps = {
    testId:"user-address-display"
};

UserAddressDisplay.propTypes = {
    testId: PropTypes.string,
    userAddress: PropTypes.string.isRequired,
    userAddressToDisplay: PropTypes.string.isRequired,
};

export default UserAddressDisplay;
