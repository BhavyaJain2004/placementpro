// js/layout.js — Navbar + Sidebar ka SINGLE SOURCE OF TRUTH.
// Kisi bhi protected page mein sirf <div id="app-layout-mount"></div> daalo
// (body ke sabse upar) aur is file ko include karo — poora navbar+sidebar
// automatically ban jayega. Naya sidebar-link add karna ho, ya icon/naam
// badalna ho — sirf isi file mein karo, saari pages pe apply ho jayega.

const SIDEBAR_LINKS = [
  { href: 'companies.html',      icon: '🏢', label: 'Companies' },
  { href: 'company-2026.html',   icon: '🚀', label: '2026 Companies', badge: 'New' },
  { href: 'dsa.html',            icon: '💻', label: 'DSA' },
  { href: 'notes.html',          icon: '📝', label: 'Notes' },
  { href: 'experiences.html',    icon: '💬', label: 'Experiences' },
  { href: 'tests.html',          icon: '🎯', label: 'Mock Tests' },
  { href: 'resume-maker.html',   icon: '📄', label: 'Resume Builder' },
];

function renderAppLayout() {
  const mount = document.getElementById('app-layout-mount');
  if (!mount) return;

  const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';

  const linksHtml = SIDEBAR_LINKS.map(l => {
    const active = l.href === currentPage ? ' active' : '';
    const badge = l.badge ? `<span class="si-badge">${l.badge}</span>` : '';
    return `<a href="${l.href}" class="sidebar-item${active}"><span class="si-icon">${l.icon}</span><span>${l.label}</span>${badge}</a>`;
  }).join('\n');

  mount.innerHTML = `
<nav class="navbar">
  <div class="navbar-brand-wrap">
    <button class="sidebar-toggle-btn" onclick="toggleMobileSidebar()">☰</button>
    <div class="navbar-brand">
      <div class="navbar-brand-copy">
        <span class="navbar-brand-name">PlacementSphere</span>
      </div>
    </div>
  </div>
  <div class="nav-right">
    <div class="profile-wrap">
      <button class="profile-btn" onclick="toggleDropdown()">
        <div class="nav-avatar" id="nav-avatar">?</div>
        <div class="profile-button-copy">
          <span class="pname" id="nav-user-name"></span>
          <span class="profile-button-status">Active</span>
        </div>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style="color:var(--muted)">
          <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
      <div class="profile-dropdown" id="profile-dropdown">
        <div class="dropdown-header">
          <div class="d-name"  id="dd-name">—</div>
          <div class="d-email" id="dd-email">—</div>
        </div>
        <div class="sub-badge" id="sub-badge" style="display:none">
          <span style="font-size:1rem">✦</span>
          <div>
            <div class="sb-title">Lifetime Access</div>
            <div class="sb-sub">Paid ₹99 · Never expires</div>
          </div>
        </div>
        <div class="dropdown-menu">
          <a href="choose.html" class="dropdown-item" id="switch-link" style="display:none;text-decoration:none">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
            Switch to Master DSA
          </a>
          <button class="dropdown-item" onclick="openPwdModal()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Change password
          </button>
          <a href="terms.html" class="dropdown-item" target="_blank">📜 Terms &amp; Conditions</a>
          <a href="privacy.html" class="dropdown-item" target="_blank">🔒 Privacy Policy</a>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item danger" onclick="Auth.logout()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Log out
          </button>
        </div>
      </div>
    </div>
  </div>
</nav>

<div class="sidebar-overlay" id="sidebar-overlay" onclick="toggleMobileSidebar()"></div>
<aside class="sidebar" id="sidebar">
  <div class="sidebar-logo">
    <div class="sidebar-logo-img"><span style="font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:900;color:#7565f5;letter-spacing:-0.05em">P</span></div>
    <span class="sidebar-logo-text">PlacementSphere</span>
  </div>
  <nav class="sidebar-nav">
    <div class="sidebar-section-label">Menu</div>
    <a href="dashboard.html" class="sidebar-item${currentPage === 'dashboard.html' ? ' active' : ''}"><span class="si-icon">🏠</span><span>Dashboard</span></a>

    <div id="sidebar-locked-msg" class="sidebar-locked-note">🔒 Unlock full access to see Companies, DSA, Notes, Mock Tests &amp; more.</div>

    <div id="sidebar-paid-links" style="display:none">
      ${linksHtml}
    </div>

    <div class="sidebar-section-label" id="admin-section-label" style="display:none">Admin</div>
    <a href="admin-panel.html" class="sidebar-item" id="admin-link" style="display:none"><span class="si-icon">⚙️</span><span>Admin Panel</span></a>
  </nav>
  <div class="sidebar-profile" onclick="toggleDropdown()">
    <div class="sidebar-profile-avatar-wrap">
      <div class="nav-avatar" id="sidebar-avatar">?</div>
      <span class="sidebar-online-dot"></span>
    </div>
    <div class="sidebar-profile-info">
      <div class="sidebar-profile-name-row">
        <div class="sidebar-profile-name" id="sidebar-user-name">—</div>
      </div>
      <div class="sidebar-profile-role">Student</div>
    </div>
  </div>
</aside>
`;

  // ── Behavior (pehle dashboard.html mein alag-alag likha hota tha, ab yahin ek jagah) ──
  window.toggleDropdown = function () {
    document.getElementById('profile-dropdown').classList.toggle('open');
  };
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.profile-wrap')) {
      const dd = document.getElementById('profile-dropdown');
      if (dd) dd.classList.remove('open');
    }
  });

  window.toggleMobileSidebar = function () {
    document.getElementById('sidebar').classList.toggle('mobile-open');
    document.getElementById('sidebar-overlay').classList.toggle('open');
  };

  // Desktop hover-expand behavior
  (function initSidebarHoverLayout() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    const desktopQuery = window.matchMedia('(min-width: 901px)');
    function handleEnter() { document.body.classList.add('sidebar-hovered'); }
    function handleLeave() { document.body.classList.remove('sidebar-hovered'); }
    if (desktopQuery.matches) {
      sidebar.addEventListener('mouseenter', handleEnter);
      sidebar.addEventListener('mouseleave', handleLeave);
    }
    if (!desktopQuery.matches) {
      document.querySelectorAll('.sidebar-item').forEach(item => {
        item.addEventListener('click', () => {
          sidebar.classList.remove('mobile-open');
          document.getElementById('sidebar-overlay').classList.remove('open');
        });
      });
    }
  })();

  // ── Auth state se sidebar/nav ko populate karo (naam, avatar, paid-links, admin-link) ──
  applyUserToLayout();
}

function applyUserToLayout() {
  const u = (window.Auth && Auth.getUser) ? Auth.getUser() : JSON.parse(localStorage.getItem('pp_user') || 'null');
  if (!u) return;

  const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const setDisplay = (id, val) => { const el = document.getElementById(id); if (el) el.style.display = val; };

  setText('nav-user-name', u.name || u.email);
  setText('sidebar-user-name', u.name || u.email);
  setText('dd-name', u.name || 'Student');
  setText('dd-email', u.email || '');
  const initial = (u.name || u.email || '?').charAt(0).toUpperCase();
  setText('nav-avatar', initial);
  setText('sidebar-avatar', initial);

  if (u.isPaid) {
    setDisplay('sidebar-paid-links', 'block');
    setDisplay('sidebar-locked-msg', 'none');
    setDisplay('sub-badge', 'flex');
    if (u.masterDsaAccess) setDisplay('switch-link', 'flex');
  } else {
    setDisplay('sidebar-paid-links', 'none');
    setDisplay('sidebar-locked-msg', 'block');
  }
  if (u.isAdmin) {
    setDisplay('admin-link', 'flex');
    setDisplay('admin-section-label', 'block');
  }
}

// Turant run karo — mount-div HTML mein pehle se maujood hai (script tag uske baad hai),
// isliye DOMContentLoaded ka wait karne ki zaroorat nahi. Isse page ke apne baad wale
// scripts (auth check, nav-avatar set karna waghera) ko navbar/sidebar turant mil jate hain.
renderAppLayout();
