// import axios
import axios from 'axios';

const Api = axios.create({
    // Set the base URL for the API requests
    baseURL: 'http://localhost:3000',
});

export default Api;