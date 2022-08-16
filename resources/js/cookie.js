/**
 * Get a cookie's value by name.
 *
 * @param {String} name Cookie name.
 */
window.getCookie = (name, defaultValue) => {
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(name));

  return cookie ? cookie.split('=')[1] : defaultValue || null;
};

/**
 * Set a cookie's value.
 *
 * @param {String} name Cookie name.
 * @param {Mixed} value Cookie value.
 */
window.setCookie = (name, value) => {
  document.cookie = [name, value].join('=');
};

// Default to the US market.
if (window.getCookie('market') === null) {
  window.setCookie('market', 'US');
}
