// Google ID token verify karta hai (Google Sign-In ke "credential" ko).
// Koi extra npm package nahi chahiye — jsonwebtoken + Node ka built-in crypto/https hi kaafi hai.
// Frontend ka bheja hua email kabhi trust nahi karte, token ka signature Google ke public keys se check hota hai.
const https  = require('https');
const crypto = require('crypto');
const jwt    = require('jsonwebtoken');

const CERTS_URL = 'https://www.googleapis.com/oauth2/v3/certs';
const ISSUERS   = ['https://accounts.google.com', 'accounts.google.com'];

let cachedKeys  = null;
let cachedUntil = 0;

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let body = '';
      res.on('data', (c) => { body += c; });
      res.on('end', () => {
        try { resolve({ json: JSON.parse(body), headers: res.headers || {} }); }
        catch (e) { reject(new Error('Google certs parse error')); }
      });
    });
    req.on('error', reject);
    req.setTimeout(5000, () => req.destroy(new Error('Google certs timeout')));
  });
}

// Google ke public keys — cache-control ke hisaab se cache karte hain (har login pe dobara fetch nahi)
async function getGoogleKeys(force) {
  if (!force && cachedKeys && Date.now() < cachedUntil) return cachedKeys;
  const { json, headers } = await fetchJson(CERTS_URL);
  if (!json || !Array.isArray(json.keys)) throw new Error('Google certs invalid');
  const m = /max-age=(\d+)/.exec(headers['cache-control'] || '');
  const ttlMs = (m ? parseInt(m[1], 10) : 3600) * 1000;
  cachedKeys  = json.keys;
  cachedUntil = Date.now() + ttlMs;
  return cachedKeys;
}

async function verifyGoogleIdToken(idToken) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    const e = new Error('GOOGLE_CLIENT_ID not set');
    e.code = 'NOT_CONFIGURED';
    throw e;
  }

  const decoded = jwt.decode(idToken, { complete: true });
  if (!decoded || !decoded.header || decoded.header.alg !== 'RS256' || !decoded.header.kid)
    throw new Error('Invalid Google token');

  let keys = await getGoogleKeys(false);
  let jwk  = keys.find((k) => k.kid === decoded.header.kid);
  if (!jwk) { // Google ne key rotate ki ho sakti hai — ek baar fresh fetch karke dekho
    keys = await getGoogleKeys(true);
    jwk  = keys.find((k) => k.kid === decoded.header.kid);
  }
  if (!jwk) throw new Error('Invalid Google token');

  const pem = crypto.createPublicKey({ key: jwk, format: 'jwk' }).export({ type: 'spki', format: 'pem' });
  const payload = jwt.verify(idToken, pem, {
    algorithms: ['RS256'],
    audience:   clientId,   // token humare hi app ke liye bana ho
    issuer:     ISSUERS
  });

  if (!payload.sub || !payload.email) throw new Error('Google token missing email');
  if (payload.email_verified !== true && payload.email_verified !== 'true')
    throw new Error('Google email not verified');

  return {
    googleId: String(payload.sub),
    email:    String(payload.email).toLowerCase().trim(),
    name:     (payload.name || '').trim()
  };
}

module.exports = { verifyGoogleIdToken };
