import { tns } from 'tiny-slider/src/tiny-slider';




/**
 * Listen for keyup events to navigate the product gallery.
 *
 * @param {Object}  productGalleryInstance       Tiny Slider instance returned from instantiation.
 * @param {Number}  previousKeyCode              Key code used to navigate to previous slide.
 * @param {Number}  nextKeyCode                  Key code used to navigate to next slide.
 * @param {Boolean} ensureProductGalleryIsActive Whether to check that the product gallery
 *                                               is visible.
 */
function initProductGalleryKeyNavigation(
  productGalleryInstance, previousKeyCode, nextKeyCode, ensureProductGalleryIsActive,
) {
  window.addEventListener('keyup', (event) => {
    if (![previousKeyCode, nextKeyCode].includes(event.keyCode)) {
      return;
    }

    if (
      (ensureProductGalleryIsActive && productGalleryInstance.getInfo().container.closest('.tns-slide-active'))
      || !ensureProductGalleryIsActive
    ) {
      productGalleryInstance.goTo(event.keyCode === previousKeyCode ? 'prev' : 'next');
    }
  });
}


/**
 * Listen for Tiny Slider event to update the buttons' states.
 *
 * @param {Object} productGalleryInstance         Tiny Slider instance returned from instantiation.
 * @param {Array}  productGalleryInstanceControls Buttons used to navigate to slides. Must have
 *                                                data-js-product-gallery-x-go-to attribute set to
 *                                                slide index.
 */
function initButtonStateManager(productGalleryInstance, productGalleryInstanceControls) {
  productGalleryInstance.events.on('indexChanged', (info) => {
    productGalleryInstanceControls.forEach((button) => {
      button.setAttribute('class', button.getAttribute('data-js-inactive-class'));
    });

    const activeButton = productGalleryInstanceControls[info.index];
    activeButton.setAttribute('class', activeButton.getAttribute('data-js-active-class'));
  });
}


/**
 * Listen for button clicks to navigate the product gallery.
 *
 * @param {Object} productGalleryInstance         Tiny Slider instance returned from instantiation.
 * @param {Array}  productGalleryInstanceControls Buttons used to navigate to slides. Must have
 *                                                data-js-product-gallery-x-go-to attribute set to
 *                                                slide index.
 */
function initProductGalleryButtonNavigation(
  productGalleryInstance,
  productGalleryInstanceControls,
  productGalleryPreviousButton,
  productGalleryNextButton,
) {
  initButtonStateManager(productGalleryInstance, productGalleryInstanceControls);

  productGalleryInstanceControls.forEach((button) => {
    button.addEventListener('click', () => {
      productGalleryInstance.goTo(
        button.getAttribute('data-js-product-gallery-x-go-to')
          || button.getAttribute('data-js-product-gallery-y-go-to'),
      );
    });
  });

  [
    { direction: 'prev', button: productGalleryPreviousButton },
    { direction: 'next', button: productGalleryNextButton },
  ].forEach(({ direction, button }) => {
    if (button) {
      button.addEventListener('click', () => {
        productGalleryInstance.goTo(direction);
      });
    }
  });
}




if (document.querySelector('[data-js-product-gallery-x]')) {
  const productGalleriesX = [];
  document.querySelectorAll('[data-js-product-gallery-x]').forEach((productGalleryX) => {
    const galleryId = productGalleryX.getAttribute('data-js-product-gallery-x');
    const count     = productGalleriesX.push(tns({
      // Tiny Slider listens for keydown, we want keyup.
      arrowKeys: false,
      axis:      'horizontal',
      container: `[data-js-product-gallery-x="${galleryId}"]`,
      controls:  false,
      center:    true,
      items:     1,
      loop:      false,
      mouseDrag: false,
      nav:       false,
      rewind:    true,
      nested:    'inner',
      speed:     400,
      gutter:    240,
    }));


    // Listen for a and d keys to navigate the vertical product gallery.
    // initProductGalleryKeyNavigation(productGalleriesX[galleryId], 65, 68, true);
    initProductGalleryButtonNavigation(
      productGalleriesX[count - 1],
      document.querySelectorAll(`[data-js-product-gallery-x-controls="${galleryId}"] [data-js-product-gallery-x-go-to]`),
      document.querySelector(`[data-js-product-gallery-previous="${galleryId}"]`),
      document.querySelector(`[data-js-product-gallery-next="${galleryId}"]`),
    );
  });
}




if (document.querySelector('[data-js-product-gallery-y]')) {
  const productGalleriesY = [];
  document.querySelectorAll('[data-js-product-gallery-y]').forEach((productGalleryY) => {
    const galleryId    = productGalleryY.getAttribute('data-js-product-gallery-y');
    const showControls = productGalleryY.getAttribute('data-js-product-gallery-y-show-controls') === 'true';
    const count     = productGalleriesY.push(tns({
      arrowKeys: false,
      axis:      'vertical',
      container: `[data-js-product-gallery-y="${galleryId}"]`,
      controls:  showControls,
      items:     1,
      loop:      true,
      mode:      'gallery',
      nav:       false,
      nested:    'outer',
      rewind:    true,
    }));

    initProductGalleryButtonNavigation(
      productGalleriesY[count - 1],
      document.querySelectorAll(`[data-js-product-gallery-y-controls="${galleryId}"] [data-js-product-gallery-y-go-to]`),
    );

  // Listen for w and s keys to navigate the vertical product gallery.
  // initProductGalleryKeyNavigation(productGalleryY, 87, 83, false);
  });
}
