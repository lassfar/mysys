import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.11.114:2400',
});

export default instance