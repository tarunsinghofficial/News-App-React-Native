import axios from 'axios';

export default axios.create({
    baseURL: 'https://newsapi.org/v2/'
})