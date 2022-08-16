import { tns } from 'tiny-slider/src/tiny-slider';




/**
 * Listen for keyup events to navigate the carousel.
 *
 * @param {Object}  carouselInstance       Tiny Slider instance returned from instantiation.
 * @param {Number}  previousKeyCode        Key code used to navigate to previous slide.
 * @param {Number}  nextKeyCode            Key code used to navigate to next slide.
 * @param {Boolean} ensureCarouselIsActive Whether to check that the carousel is visible.
 */
function initCarouselKeyNavigation(
  carouselInstance, previousKeyCode, nextKeyCode, ensureCarouselIsActive,
) {
  window.addEventListener('keyup', (event) => {
    if (![previousKeyCode, nextKeyCode].includes(event.keyCode)) {
      return;
    }

    if (
      (ensureCarouselIsActive && carouselInstance.getInfo().container.closest('.tns-slide-active'))
      || !ensureCarouselIsActive
    ) {
      carouselInstance.goTo(event.keyCode === previousKeyCode ? 'prev' : 'next');
    }
  });
}


/**
 * Listen for Tiny Slider event to update the buttons' states.
 *
 * @param {Object} carouselInstance         Tiny Slider instance returned from instantiation.
 * @param {Array}  carouselInstanceControls Buttons used to navigate to slides. Must have
 *                                          data-js-carousel-x-go-to attribute set to slide index.
 */
function initButtonStateManager(carouselInstance, carouselInstanceControls) {
  carouselInstance.events.on('indexChanged', (info) => {
    carouselInstanceControls.forEach((button) => {
      button.setAttribute('class', button.getAttribute('data-js-inactive-class'));
    });

    const activeButton = carouselInstanceControls[info.index];
    activeButton.setAttribute('class', activeButton.getAttribute('data-js-active-class'));
  });
}


/**
 * Listen for button clicks to navigate the carousel.
 *
 * @param {Object} carouselInstance         Tiny Slider instance returned from instantiation.
 * @param {Array}  carouselInstanceControls Buttons used to navigate to slides. Must have
 *                                          data-js-carousel-x-go-to attribute set to slide index.
 */
function initCarouselButtonNavigation(carouselInstance, carouselInstanceControls) {
  initButtonStateManager(carouselInstance, carouselInstanceControls);

  carouselInstanceControls.forEach((button) => {
    button.addEventListener('click', () => {
      carouselInstance.goTo(button.getAttribute('data-js-carousel-x-go-to'));
    });
  });
}


/**
 * Check if the controls are visible to the user.
 *
 * @param {Object} controls DOM element that serves as controls.
 */
function controlsAreVisible(controls) {
  const { top } = controls.getBoundingClientRect();

  return top > 0 && top < window.innerHeight;
}


/**
 * Listen for slide changes and animate the row controls appropriately.
 *
 * @param {Object} carouselY Tiny Slider instance returned from instantiation.
 */
function initRowControlsVisibilityToggling(carouselY) {
  const firstRowControls = document.querySelector('[data-js-carousel-x-controls]');
  firstRowControls.style.cssText = firstRowControls.getAttribute('data-js-active-row-style');

  carouselY.events.on('indexChanged', () => {
    const oldRowControls = (Array.from(document.querySelectorAll('[data-js-carousel-x-controls]')))
      .find((controls) => controlsAreVisible(controls));

    if (oldRowControls) {
      oldRowControls.style.cssText = oldRowControls.getAttribute('data-js-inactive-row-style');
    }
  });

  carouselY.events.on('transitionStart', (info) => {
    const newRowControls = (Array.from(document.querySelectorAll('[data-js-carousel-x-controls]')))[info.index];

    if (newRowControls) {
      setTimeout(() => {
        newRowControls.style.cssText = newRowControls.getAttribute('data-js-active-row-style');
      }, 500);
    }
  });
}


/**
 * Display the pager as inactive.
 *
 * @param {Object} pager DOM element for the pager.
 */
function deactivatePager(pager) {
  pager.getAttribute('data-js-carousel-y-controls-active-class').split(' ').forEach((className) => {
    pager.classList.remove(className);
  });
  pager.getAttribute('data-js-carousel-y-controls-inactive-class').split(' ').forEach((className) => {
    pager.classList.add(className);
  });
}


/**
 * Display the pager as active.
 *
 * @param {Object} pager DOM element for the pager.
 */
function activatePager(pager) {
  pager.getAttribute('data-js-carousel-y-controls-inactive-class').split(' ').forEach((className) => {
    pager.classList.remove(className);
  });
  pager.getAttribute('data-js-carousel-y-controls-active-class').split(' ').forEach((className) => {
    pager.classList.add(className);
  });
}




if (document.querySelector('[data-js-carousel-x]')) {
  const carouselsX = [];
  document.querySelectorAll('[data-js-carousel-x]').forEach((carouselX) => {
    const instance = carouselX.getAttribute('data-js-carousel-x');

    carouselsX.push(tns({
      // Tiny Slider listens for keydown, we want keyup.
      arrowKeys : false,
      axis      : 'horizontal',
      container : `[data-js-carousel-x="${instance}"]`,
      controls  : false,
      items     : 1,
      loop      : false,
      nav       : false,
      nested    : 'inner',
      speed     : 400,
      lazyload  : true,
    }));


    // Listen for left and right arrow keys to navigate the vertical carousel.
    initCarouselKeyNavigation(carouselsX[instance], 37, 39, true);
    initCarouselButtonNavigation(
      carouselsX[instance],
      document.querySelectorAll(`[data-js-carousel-x-controls="${instance}"] [data-js-carousel-x-go-to]`),
    );
  });
}




if (document.querySelector('[data-js-carousel-y]')) {
  const carouselY = tns({
    arrowKeys         : false,
    axis              : 'vertical',
    container         : '[data-js-carousel-y]',
    controlsContainer : '[data-js-carousel-y-controls]',
    items             : 1,
    loop              : false,
    nav               : false,
    nested            : 'outer',
    speed             : 400,
    lazyload          : true,
  });

  carouselY.events.on('indexChanged', (info) => {
    const isOnFirstSlide = info.displayIndex === 1;
    const isOnLastSlide  = info.displayIndex === info.slideCount;
    const pagers         = document.querySelectorAll('[data-js-carousel-y-controls] button');

    if (isOnFirstSlide) {
      deactivatePager(pagers[0]);
      activatePager(pagers[1]);
    } else if (isOnLastSlide) {
      deactivatePager(pagers[1]);
      activatePager(pagers[0]);
    } else {
      activatePager(pagers[0]);
      activatePager(pagers[1]);
    }
  });

  // Show/hide row controls when navigating to different rows.
  initRowControlsVisibilityToggling(carouselY);
  // Listen for up and down arrow keys to navigate the vertical carousel.
  initCarouselKeyNavigation(carouselY, 38, 40, false);
}
