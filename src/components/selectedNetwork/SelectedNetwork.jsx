import React from "react";
import PropTypes from 'prop-types';

import './index.css'

const SelectedNetwork = ({name,testId}) => {
    return <div className="selected-network" data-testid={testId}>
        {name}
    </div>;
};

SelectedNetwork.defaultProps = {
    testId:"SelectedNetwork",
};

SelectedNetwork.propTypes = {
    testId: PropTypes.string,
    name: PropTypes.string.isRequired,
};

export default SelectedNetwork;
