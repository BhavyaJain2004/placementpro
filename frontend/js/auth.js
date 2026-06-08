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
  // masterDsaAccess check karo pp_user se
  try {
    const saved = JSON.parse(localStorage.getItem('pp_user'));
    if (saved && saved.masterDsaAccess) {
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

// Set navbar user info
const setNavUser = (name) => {
  const el = document.getElementById('nav-user-name');
  const av = document.getElementById('nav-avatar');
  if (el) el.textContent = name;
  if (av) av.textContent = name?.charAt(0)?.toUpperCase() || '?';
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
            <p style="color:rgba(255,255,255,0.45); font-size:0.82rem;">2 minutes — help us improve PlacementPro</p>
          </div>
          <div style="margin-bottom:1.25rem;">
            <p style="color:rgba(255,255,255,0.6); font-size:0.82rem; margin-bottom:0.5rem;">How would you rate PlacementPro?</p>
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

window.Auth = { decodeToken, requireAuth, requirePaid, redirectIfLoggedIn, logout, setNavUser, getUser };


