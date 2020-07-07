/* eslint-disable no-undef */
import axios from 'axios';
import { toast } from 'react-toastify';

export function setup() {
  axios.defaults.baseURL = '/api';
  axios.defaults.headers.common.Accept = 'application/json';

  axios.interceptors.response.use((r) => r.data, (err) => {
    const r = err.response;
    if (r.status >= 400 && r.status < 500) {
      const msg = (r.data || {}).errorCode || 'Vérifiez les informations fournies';
      toast.error(msg);
    }

    if (r.status >= 500) {
      const msg = (r.data || {}).errorCode || 'Erreur serveur';
      toast.error(msg);
    }

    return Promise.reject(err);
  });
}

export default axios;
