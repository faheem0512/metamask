export const getMaskedUserAddress = (userAddress = '') => {
    const first6 = userAddress.substring(0,6);
    const last4 = userAddress.substring(36);
    const masked = new Array(31).join('*');
    return first6 + masked + last4;
};
