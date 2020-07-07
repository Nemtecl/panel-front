/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export function login(params) {
  return axios.post('/authenticate', params);
}
