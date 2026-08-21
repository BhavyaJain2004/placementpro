// js/pricing.js — syncs any on-page price mention with the live Package data from admin panel.
// Usage: <span data-price-key="199" data-price-prefix="Unlock for ">₹199</span>
// If API fails, the static fallback text already in the HTML stays as-is (safe default).
(function () {
  window._livePackages = window._livePackages || {};

  async function syncPrices() {
    try {
      const packages = await API.call('/packages');
      packages.forEach(p => { window._livePackages[p.key] = p; });

      document.querySelectorAll('[data-price-key]').forEach(el => {
        let key = el.getAttribute('data-price-key');
        const wantsOriginal = key.endsWith('-original');
        if (wantsOriginal) key = key.replace('-original', '');
        const pkg = window._livePackages[key];
        if (!pkg) return; // package off/deleted — keep static fallback, don't break the page
        const value = wantsOriginal ? pkg.originalPrice : pkg.price;
        if (!value) return; // e.g. no strikethrough price set — leave static fallback
        const prefix = el.getAttribute('data-price-prefix') || '';
        const suffix = el.getAttribute('data-price-suffix') || '';
        const symbol = el.hasAttribute('data-price-nosymbol') ? '' : '₹';
        el.textContent = prefix + symbol + value + suffix;
      });
    } catch (e) { /* API down — keep whatever static text was already on the page */ }
  }

  // Reads a live price synchronously for JS-generated templates (e.g. test card lists).
  // Falls back to the given default if packages haven't loaded yet or the plan is off.
  window.getLivePrice = function (key, fallback) {
    const pkg = window._livePackages[key];
    return pkg ? pkg.price : fallback;
  };

  window.syncPrices = syncPrices;
  document.addEventListener('DOMContentLoaded', syncPrices);
})();
