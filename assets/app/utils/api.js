import axios from 'axios';

const API = '/api';

function headers() {
  const token = JSON.parse(localStorage.getItem('token'));

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer: ${token}`,
  };
}

function queryString(params) {
  const query = Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
  return `${query.length ? '?' : ''}${query}`;
}

export default {
  fetch(url, params = {}) {
    return axios.get(`${API}${url}${queryString(params)}`, { headers: headers() });
  },

  post(url, data) {
    return axios.post(`${API}${url}`, data, { headers: headers() })
      .catch(error => error.response);
  },

  patch(url, data) {
    return axios.patch(`${API}${url}`, data, { headers: headers() });
  },

  delete(url) {
    return axios.delete(`${API}${url}`, { headers: headers() });
  },
};
