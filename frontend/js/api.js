// ── CONFIG ── change this after backend deploy
// const API_BASE = 'http://localhost:5000/api';
// const API_BASE = 'https://PlacementSphere-production-e168.up.railway.app/api';
// const API_BASE = 'https://placementpro-4tbr.onrender.com/api'; // OLD — Render (usage limit khatam ho gaya tha)
const API_BASE = 'https://placementpro-production-1864.up.railway.app/api';

const getToken = () => localStorage.getItem('pp_token');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// fetch ko timeout dete hain — warna agar network hang ho jaye, request kabhi khatam hi na ho
const fetchWithTimeout = (url, options, timeoutMs = 4000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(id));
};

const call = async (endpoint, options = {}) => {
  const token = getToken();
  const fetchOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    ...options
  };

  // Fail-fast: 4 second timeout, koi retry nahi. Normal case mein isse koi delay nahi —
  // response jitni fast backend se aaye utni hi fast dikhta hai. Sirf genuinely-atki hui
  // request ko 4 second baad hi cancel kar deta hai (pehle 12-38 second tak wait hota tha).
  let res;
  try {
    res = await fetchWithTimeout(`${API_BASE}${endpoint}`, fetchOptions);
  } catch (err) {
    throw new Error('Network issue — dobara try karo.');
  }

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

  // 413 Payload Too Large (screenshot/image bahut bada) aksar server/proxy se plain text/HTML aata hai, JSON nahi —
  // isliye .json() try karne se pehle status check karo taaki crash na ho aur user ko sahi message mile
  if (res.status === 413) {
    throw new Error('File bahut bada hai. Chhota screenshot/image try karo.');
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || data.error || 'Something went wrong. Please try again.');
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
