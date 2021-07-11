import Axios from 'axios';

/**
 * Takes in token, if the token is available it will add to the global header
 * Sending token with every request
 */
const setAuthToken = token => {
    if(token) {
        Axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete Axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;