import { CLIENT_ID_NAME_CURRENCY } from "./constants";
export const getMaskedUserAddress = (userAddress = '') => {
    //total string length is 42
    const first6 = userAddress.substring(0,6);
    const last4 = userAddress.substring(38); // to extract last four characters
    const masked = new Array(33).join('*'); // to create 32 * string
    return first6 + masked + last4;
};

export const getFormattedBalance = (rawBalance) => {
    return (rawBalance / (10 ^ 18)).toFixed(3);
};

export const getCurrencySymbol = (clientId) => {
    return CLIENT_ID_NAME_CURRENCY[clientId] ? CLIENT_ID_NAME_CURRENCY[clientId]['currency'] : 'NA';
};

export const getNetworkName = (clientId) => {
    return CLIENT_ID_NAME_CURRENCY[clientId] ? CLIENT_ID_NAME_CURRENCY[clientId]['name'] : 'Others';
};
