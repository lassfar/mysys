import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://dashboard.mysys.ma',
});

export default instance