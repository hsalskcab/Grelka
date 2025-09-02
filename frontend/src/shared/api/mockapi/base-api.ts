import axios from 'axios';

const MOCKAPI_BASE_URL = 'https://68b704ad73b3ec66cec38226.mockapi.io';

export const axiosInstance = axios.create({
  baseURL: MOCKAPI_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});