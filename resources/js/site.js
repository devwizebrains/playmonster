import '@ryangjchandler/spruce';
import 'alpinejs';
import './brand-page/product-gallery';
import './brand-page/grid-carousel';
import './cookie';

window._ = require('lodash');
window.axios  = require('axios');

axios.defaults.headers = {'X-Requested-With': 'XMLHttpRequest'};