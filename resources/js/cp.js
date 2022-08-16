/**
 * When extending the control panel, be sure to uncomment the necessary code for your build process:
 * https://statamic.dev/extending/control-panel
 */

Statamic.$hooks.on('entry.saved', (resolve, reject, payload) => {
  if (payload.collection == 'brand_pages') {
      Statamic.$axios.get(`${process.env.MIX_APP_URL}/generate-playbox/${payload.reference}`).then(resolve);
  }
  resolve();
});
