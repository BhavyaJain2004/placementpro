// js/track.js — page-view tracking (apna khud ka counter). Kabhi bhi page ko slow/block nahi karta (fail-silent).
(function () {
  try {
    const API_BASE = window.API ? window.API.base : 'https://placementpro-production-1864.up.railway.app/api';
    fetch(`${API_BASE}/pageview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: window.location.pathname })
    }).catch(() => {});
  } catch (e) {}
})();

// Added on 27/8/26

