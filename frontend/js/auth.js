const decodeToken = () => {
  try {
    const t = localStorage.getItem('pp_token');
    if (!t) return null;
    const p = JSON.parse(atob(t.split('.')[1]));
    if (p.exp * 1000 < Date.now()) { localStorage.clear(); return null; }
    return p;
  } catch { return null; }
};

// Redirect to login if not authenticated
const requireAuth = () => {
  const u = decodeToken();
  if (!u) { window.location.href = 'index.html'; return null; }
  return u;
};

// Redirect to dashboard if not paid
const requirePaid = () => {
  const u = requireAuth();
  if (!u) return null;
  if (!u.isPaid) { window.location.href = 'dashboard.html'; return null; }
  return u;
};

// Redirect if already logged in
const redirectIfLoggedIn = () => {
  const u = decodeToken();
  if (u) window.location.href = 'dashboard.html';
};

const logout = () => {
  localStorage.clear();
  window.location.href = 'index.html';
};

// Set navbar user info
const setNavUser = (name) => {
  const el = document.getElementById('nav-user-name');
  const av = document.getElementById('nav-avatar');
  if (el) el.textContent = name;
  if (av) av.textContent = name?.charAt(0)?.toUpperCase() || '?';
};

window.Auth = { decodeToken, requireAuth, requirePaid, redirectIfLoggedIn, logout, setNavUser };
