import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.11.106:2400',
});

export default instance