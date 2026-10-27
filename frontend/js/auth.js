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
  if (!u) return;
  try {
    const saved = JSON.parse(localStorage.getItem('pp_user'));
    const hasBase = saved && saved.isPaid;
    const hasMaster = saved && saved.masterDsaAccess;
    if (hasBase && hasMaster) {
      window.location.href = 'choose.html';
    } else if (hasMaster) {
      window.location.href = 'masterdsa-dashboard.html';
    } else {
      window.location.href = 'dashboard.html';
    }
  } catch(e) {
    window.location.href = 'dashboard.html';
  }
};

const logout = () => {
  localStorage.clear();
  window.location.href = 'index.html';
};


// ── GOOGLE VERIFY POPUP ──
// Jin users ka account abhi Google se verify nahi hua unko login ke baad ye popup dikhta hai.
// Deadline tak "Remind me later" hai, uske baad server hi sab access band kar deta hai (verifyToken middleware).
(function googleVerifyPopup() {
  try {
    if (!localStorage.getItem('pp_token')) return;
    const page = window.location.pathname.toLowerCase();
    if (page.includes('verifywithgoogle') || page.endsWith('/') || page.endsWith('index.html')) return;

    const u = JSON.parse(localStorage.getItem('pp_user') || 'null');
    if (!u || u.needsGoogleVerify !== true) return;

    const enforced = u.googleVerifyEnforced === true;
    if (!enforced && sessionStorage.getItem('pp_gv_later') === '1') return;

    const esc = (x) => String(x == null ? '' : x).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    let dl = '';
    if (u.googleVerifyDeadline) {
      dl = new Date(u.googleVerifyDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'Asia/Kolkata' });
    }
    const deadlineLine = enforced
      ? 'Your account is locked until you verify.'
      : (dl ? 'Please verify before <b style="color:#fbbf24">' + esc(dl) + '</b>. After that, your account stays locked until it is verified.' : '');

    const run = () => {
      if (document.getElementById('gv-popup')) return;
      const box = document.createElement('div');
      box.id = 'gv-popup';
      box.style.cssText = 'position:fixed;inset:0;z-index:100000;background:rgba(5,5,12,0.82);display:flex;align-items:center;justify-content:center;padding:1.25rem;font-family:"DM Sans",sans-serif';
      box.innerHTML =
        '<div role="dialog" aria-modal="true" style="max-width:440px;width:100%;background:#0e0e1e;border:1px solid rgba(124,106,247,0.35);border-radius:18px;padding:1.6rem;box-shadow:0 20px 60px rgba(0,0,0,0.6);color:#fff">' +
          '<div style="display:inline-flex;align-items:center;gap:7px;font-size:0.66rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#a89df7;background:rgba(124,106,247,0.1);border:1px solid rgba(124,106,247,0.25);padding:4px 11px;border-radius:99px;margin-bottom:0.9rem">🔒 Security update</div>' +
          '<h2 style="font-family:Syne,sans-serif;font-size:1.25rem;font-weight:800;margin:0 0 0.5rem;line-height:1.3">Verify with Google to keep using your account</h2>' +
          '<p style="font-size:0.86rem;color:rgba(255,255,255,0.6);line-height:1.6;margin:0 0 1rem">To increase the security of the website, we have added Google verification. It takes less than a minute.</p>' +
          '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:0.85rem 1rem;font-size:0.8rem;color:rgba(255,255,255,0.65);line-height:1.7;margin-bottom:1rem">' +
            '1. Click <b style="color:#fff">Verify with Google</b> below<br>' +
            '2. Sign in with the Google account for <b style="color:#fff">' + esc(u.email) + '</b><br>' +
            '3. After verifying, you will log in with Google from now on' +
          '</div>' +
          (deadlineLine ? '<p style="font-size:0.8rem;color:rgba(255,255,255,0.55);line-height:1.55;margin:0 0 1rem">' + deadlineLine + '</p>' : '') +
          '<a href="verifywithgoogle.html" style="display:block;text-align:center;background:#7c6af7;color:#fff;text-decoration:none;font-family:Syne,sans-serif;font-weight:700;font-size:0.9rem;padding:0.8rem;border-radius:10px">Verify with Google</a>' +
          (enforced ? '' : '<button id="gv-later" style="display:block;width:100%;background:none;border:none;color:rgba(255,255,255,0.45);font-size:0.78rem;padding:0.75rem 0 0;cursor:pointer;font-family:inherit">Remind me later</button>') +
          '<p style="font-size:0.72rem;color:rgba(255,255,255,0.35);line-height:1.5;margin:0.9rem 0 0">Your email must be a Google account. If it is not, create a Google account using this same email first.</p>' +
        '</div>';
      document.body.appendChild(box);
      const later = document.getElementById('gv-later');
      if (later) later.onclick = () => { sessionStorage.setItem('pp_gv_later', '1'); box.remove(); };
    };
    if (document.body) run(); else document.addEventListener('DOMContentLoaded', run);
  } catch (e) {}
})();

// Generates a stable, friendly cartoon-style avatar for a given seed (name/email)
// so every user gets a consistent, good-looking human illustration instead of a plain letter
const avatarUrl = (seed) => {
  const s = encodeURIComponent(seed || 'user');
  return `https://api.dicebear.com/9.x/notionists/svg?seed=${s}&backgroundColor=7c6af7,6c5ae7,5b4de8&backgroundType=gradientLinear`;
};

// Applies the avatar image to every "nav-avatar" element on the page (navbar + sidebar, etc.)
const applyAvatar = (seed) => {
  document.querySelectorAll('.nav-avatar').forEach(el => {
    el.innerHTML = `<img src="${avatarUrl(seed)}" alt="avatar" style="width:100%;height:100%;border-radius:50%;object-fit:cover">`;
  });
};

// Set navbar user info
const setNavUser = (name, seed) => {
  const el = document.getElementById('nav-user-name');
  if (el) el.textContent = name;
  applyAvatar(seed || name);
};

// Activity ping — page visit log
(function pingActivity() {
  const token = localStorage.getItem('pp_token');
  if (!token) return;

  const page = window.location.pathname.split('/').pop().replace('.html', '') || 'dashboard';

  API.call('/activity/ping', {
    method: 'POST',
    body: JSON.stringify({ page })
  }).catch(() => {});
})();

// Feedback popup — har page pe
(async function showFeedbackPopup() {
  return;
  const token = localStorage.getItem('pp_token');
  if (!token) return;

  try {
    const u = JSON.parse(atob(token.split('.')[1]));
    if (!u || !u.isPaid) return;
  } catch(e) { return; }

  // Already diya hua hai?
  if (localStorage.getItem('fb_given') === 'true') return;

  // 3 din mein dismiss kiya tha?
  const dismissed = localStorage.getItem('fb_dismissed');
  if (dismissed && Date.now() - dismissed < 3 * 24 * 60 * 60 * 1000) return;

  // Server check
  try {
    const data = await API.call('/feedback/check');
    if (data.given) {
      localStorage.setItem('fb_given', 'true');
      return;
    }
  } catch(e) { return; }

  // Feedback modal inject karo agar exist nahi karta
  if (!document.getElementById('feedback-modal')) {
    document.body.insertAdjacentHTML('beforeend', `
      <div id="feedback-modal" style="
        display:none; position:fixed; inset:0;
        background:rgba(8,8,16,0.85); z-index:9999;
        align-items:center; justify-content:center; padding:1rem;
      ">
        <div style="
          background:#1a1a2e; border:1px solid rgba(124,106,247,0.3);
          border-radius:16px; padding:2rem; max-width:420px; width:100%;
          position:relative;
        ">
          <button onclick="closeFeedback()" style="
            position:absolute; top:1rem; right:1rem;
            background:none; border:none; color:rgba(255,255,255,0.4);
            font-size:1.4rem; cursor:pointer;
          ">×</button>
          <div style="text-align:center; margin-bottom:1.5rem;">
            <div style="font-size:2rem; margin-bottom:0.5rem;">💬</div>
            <h3 style="color:#f0f0f8; font-family:'Syne',sans-serif; font-size:1.2rem; margin-bottom:0.35rem;">Quick Feedback</h3>
            <p style="color:rgba(255,255,255,0.45); font-size:0.82rem;">2 minutes — help us improve PlacementSphere</p>
          </div>
          <div style="margin-bottom:1.25rem;">
            <p style="color:rgba(255,255,255,0.6); font-size:0.82rem; margin-bottom:0.5rem;">How would you rate PlacementSphere?</p>
            <div style="display:flex; gap:0.5rem; font-size:1.75rem; cursor:pointer;">
              <span onclick="setRating(1)" class="fb-star" style="opacity:0.3">⭐</span>
              <span onclick="setRating(2)" class="fb-star" style="opacity:0.3">⭐</span>
              <span onclick="setRating(3)" class="fb-star" style="opacity:0.3">⭐</span>
              <span onclick="setRating(4)" class="fb-star" style="opacity:0.3">⭐</span>
              <span onclick="setRating(5)" class="fb-star" style="opacity:0.3">⭐</span>
            </div>
            <p id="rating-label" style="color:#7c6af7; font-size:0.78rem; margin-top:0.35rem; min-height:1rem;"></p>
          </div>
          <div style="margin-bottom:1rem;">
            <p style="color:rgba(255,255,255,0.6); font-size:0.82rem; margin-bottom:0.5rem;">What did you like or dislike?</p>
            <textarea id="fb-message" placeholder="Share your thoughts..." style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:0.75rem;color:#f0f0f8;font-size:0.85rem;font-family:'DM Sans',sans-serif;resize:none;height:80px;box-sizing:border-box;"></textarea>
          </div>
          <div style="margin-bottom:1.5rem;">
            <p style="color:rgba(255,255,255,0.6); font-size:0.82rem; margin-bottom:0.5rem;">What feature would you love to see next?</p>
            <textarea id="fb-want" placeholder="eg. Mock tests, more companies, video solutions..." style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:0.75rem;color:#f0f0f8;font-size:0.85rem;font-family:'DM Sans',sans-serif;resize:none;height:70px;box-sizing:border-box;"></textarea>
          </div>
          <button onclick="submitFeedback()" id="fb-btn" style="width:100%;background:#7c6af7;color:white;border:none;padding:0.85rem;border-radius:10px;cursor:pointer;font-size:0.95rem;font-weight:700;font-family:'Syne',sans-serif;">
            Submit Feedback ✓
          </button>
          <p style="color:rgba(255,255,255,0.25);font-size:0.72rem;text-align:center;margin-top:0.6rem;">Won't appear again after submitting</p>
        </div>
      </div>

      <script>
        let selectedRating = 0;
        const ratingLabels = ['','Poor 😞','Fair 😐','Good 🙂','Great 😊','Excellent 🔥'];
        function setRating(n) {
          selectedRating = n;
          document.querySelectorAll('.fb-star').forEach((s,i) => s.style.opacity = i < n ? '1' : '0.3');
          document.getElementById('rating-label').textContent = ratingLabels[n];
        }
        function closeFeedback() {
          document.getElementById('feedback-modal').style.display = 'none';
          localStorage.setItem('fb_dismissed', Date.now());
        }
        async function submitFeedback() {
          if (!selectedRating) { alert('Please select a rating!'); return; }
          const btn = document.getElementById('fb-btn');
          btn.disabled = true; btn.textContent = 'Submitting...';
          try {
            await API.call('/feedback/submit', {
              method: 'POST',
              body: JSON.stringify({
                rating:  selectedRating,
                message: document.getElementById('fb-message').value.trim(),
                want:    document.getElementById('fb-want').value.trim()
              })
            });
            document.getElementById('feedback-modal').style.display = 'none';
            localStorage.setItem('fb_given', 'true');
            toast('Thank you for your feedback! 🙏', 'success');
          } catch(e) {
            btn.disabled = false; btn.textContent = 'Submit Feedback ✓';
          }
        }
      <\/script>
    `);
  }

  // 1 sec baad dikhao
  setTimeout(() => {
    const modal = document.getElementById('feedback-modal');
    if (modal) modal.style.display = 'flex';
  }, 1000);

})();
const getUser = () => {
  try { return JSON.parse(localStorage.getItem('pp_user')); }
  catch(e) { return null; }
};

window.Auth = { decodeToken, requireAuth, requirePaid, redirectIfLoggedIn, logout, setNavUser, getUser, avatarUrl, applyAvatar };
