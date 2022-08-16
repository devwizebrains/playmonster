const defaultTheme = require('tailwindcss/defaultTheme');




module.exports = {
  purge: {
    content: [
      './resources/**/*.js',
      './resources/**/*.antlers.html',
      './resources/**/*.blade.php',
      './content/**/*.md',
    ],
  },

  theme: {
    extend: {
      backgroundColor: {
        'black-opacity-50': 'rgba(0, 0, 0, .5)',
      },

      boxShadow: {
        dark: '0px 0px 10px 10px rgba(0, 0, 0, .5)',
      },

      colors: {
        'brand-blue': {
          300: '#1C9AD6',
          500: '#2E3192',
        },

        'brand-green': {
          500: '#C0D230',
          700: '#758938',
        },
      },

      fontFamily: {
        'luckiest-guy': ['Luckiest\\ Guy', ...defaultTheme.fontFamily.sans],
      },

      height: {
        '480px': '480px',
      },

      inset: {
        '-256px': '-256px',
        '-20px':  '-20px',
        '5px':    '5px',
        50:       '5.0%',
        14:       '3.5rem',
      },

      margin: {
        '5px':  '5px',
        '10px': '10px',
      },

      minWidth: {
        '1280px': '1280px',
      },

      transitionDuration: {
        250: '250ms',
      },

      height: {
        '72':   '18rem',
        '80':   '20rem',
        '96':   '24rem',
      },

      maxHeight: {
        '50vh': '50vh',
        '60vh': '60vh',
      },

      width: {
        '40px': '40px',
        '50px': '50px',
        '40vw': '40vw',
        '60vw': '60vw',
        '75vw': '75vw',
        '72':   '18rem',
        '80':   '20rem',
        '96':   '24rem',
      },

      screens: {
        '2xl': '1660px',
      }
    },
  },

  variants: {
    boxShadow: ['responsive', 'hover', 'focus', 'group-hover'],
    cursor:    ['responsive', 'active'],
    inset:     ['responsive', 'hover'],
    zIndex:    ['responsive', 'hover'],
  },

  plugins: [],

  future: {
    removeDeprecatedGapUtilities: true,
  },
};
