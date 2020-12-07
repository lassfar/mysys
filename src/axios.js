import axios from 'axios';

const instance = axios.create({
  baseURL: ' http://192.168.1.10:2400',
});

export default instance