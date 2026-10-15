const test = require('node:test');
const assert = require('node:assert');
const crypto = require('crypto');

const ITERATIONS = 100000;
const KEYLEN = 64;
const DIGEST = 'sha512';

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, DIGEST).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  try {
    const [salt, originalHash] = storedHash.split(':');
    if (!salt || !originalHash) return false;
    const testHash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, DIGEST).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(testHash, 'hex'), Buffer.from(originalHash, 'hex'));
  } catch {
    return false;
  }
}

test('Password hashing and verification', () => {
  const password = 'Covenant2026!';
  const hash = hashPassword(password);

  assert.strictEqual(typeof hash, 'string');
  assert.ok(hash.includes(':'), 'Hash must contain salt and hash separator');
  assert.strictEqual(verifyPassword(password, hash), true, 'Valid password must verify');
  assert.strictEqual(verifyPassword('WrongPassword!', hash), false, 'Invalid password must fail verification');
});

test('Bilingual supported locales validation', () => {
  const supportedLocales = ['id', 'en'];
  const isValidLocale = (loc) => supportedLocales.includes(loc);

  assert.strictEqual(isValidLocale('id'), true);
  assert.strictEqual(isValidLocale('en'), true);
  assert.strictEqual(isValidLocale('fr'), false);
  assert.strictEqual(isValidLocale(''), false);
});
