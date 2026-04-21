// ── CONFIG ── change this after backend deploy
// const API_BASE = 'http://localhost:5000/api';
// const API_BASE = 'https://placementpro-production-e168.up.railway.app/api';
const API_BASE = 'https://placementpro-4tbr.onrender.com/api';

const getToken = () => localStorage.getItem('pp_token');

const call = async (endpoint, options = {}) => {
  const token = getToken();
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    ...options
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  // if (response.status === 401) {
  // const data = await response.json();
  // if (data.message === 'Session expired. Please login again.') {
  //   alert('Aapka session expire ho gaya — doosri device pe login hua. Please login again.');
  //   localStorage.removeItem('pp_token');
  //   window.location.href = 'index.html';
  //   return;
  // }
}
  return data;
};

const showToast = (msg, type = '') => {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.className = `show ${type}`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.className = '', 2800);
};

window.API  = { call, base: API_BASE };
window.toast = showToast;
