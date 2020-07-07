/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export function getAll() {
  return axios.get('/users');
}

export function getById(id) {
  return axios.get(`/users/${id}`);
}
