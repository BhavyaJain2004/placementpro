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

  // Added new part 
   if (res.status === 401) {
    const data = await res.json().catch(() => ({}));
    localStorage.removeItem('pp_token');
    if (data.message === 'SESSION_EXPIRED') {
      alert('You were logged out because your account was accessed from another device.');
    }
    window.location.href = 'index.html';
    return;
  }

  // New Part over

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
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
