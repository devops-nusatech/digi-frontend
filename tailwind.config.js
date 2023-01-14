/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
   presets: [],
   darkMode: ['class', '[data-mode="dark"]'],
   theme: {
      screens: {
         xs: '478px',
         sm: '640px',
         md: '768px',
         lg: '1024px',
         lg2: '1180px',
         xl: '1280px',
         '1xl': '1340px',
         '1.5xl': '1420px',
         '2xl': '1536px',
         'xs-max': { max: '477.98px' },
         'sm-max': { max: '639.98px' },
         'md-max': { max: '767.98px' },
         'lg-max': { max: '1023.98px' },
         'lg2-max': { max: '1179.98px' },
         'xl-max': { max: '1279.98px' },
         '1xl-max': { max: '1339.98px' },
         '1.5xl-max': { max: '1419.98px' },
         '2xl-max': { max: '1535.98px' },
      },
      colors: ({ colors }) => ({
         neutral1: '#141416',
         neutral2: '#23262F',
         neutral3: '#353945',
         neutral4: '#777E90',
         neutral5: '#B1B5C4',
         neutral6: '#E6E8EC',
         neutral7: '#F4F5F6',
         neutral8: '#FCFCFD',

         shade1: '#18191D',
         shade2: '#17181B',
         shade3: '#D6D8E0',
         shade4: '#F1F2F4',
         shade5: '#F8F8F9',
         shade6: '#F9FAFA',

         primary1: '#0A937F',
         // primary1: '#6c5ce7',
         // primary1: '#3772FF',
         primary2: '#097A69',
         // primary2: '#0045ea',
         primary3: '#9757D7',
         primary4: '#FF6838',
         'my-orange-h': '#ff490f',
         // primary5: '#00C076',
         primary5: '#58BD7D',
         'my-green-h': '#43a968',

         secondary1: '#4BC9F0',
         secondary2: '#E4D7CF',
         secondary3: '#FFD166',
         secondary4: '#CDB4DB',
         secondary5: '#DECBE9',

         chart1: '#00C076',

         inherit: colors.inherit,
         current: colors.current,
         transparent: colors.transparent,
         black: colors.black,
         white: colors.white,
         slate: colors.slate,
         gray: colors.gray,
         zinc: colors.zinc,
         neutral: colors.neutral,
         stone: colors.stone,
         red: colors.red,
         orange: colors.orange,
         amber: colors.amber,
         yellow: colors.yellow,
         lime: colors.lime,
         green: colors.green,
         emerald: colors.emerald,
         teal: colors.teal,
         cyan: colors.cyan,
         sky: colors.sky,
         blue: colors.blue,
         indigo: colors.indigo,
         violet: colors.violet,
         purple: colors.purple,
         fuchsia: colors.fuchsia,
         pink: colors.pink,
         rose: colors.rose,
      }),
      columns: {
         auto: 'auto',
         1: '1',
         2: '2',
         3: '3',
         4: '4',
         5: '5',
         6: '6',
         7: '7',
         8: '8',
         9: '9',
         10: '10',
         11: '11',
         12: '12',
         '3xs': '16rem',
         '2xs': '18rem',
         xs: '20rem',
         sm: '24rem',
         md: '28rem',
         lg: '32rem',
         xl: '36rem',
         '2xl': '42rem',
         '3xl': '48rem',
         '4xl': '56rem',
         '5xl': '64rem',
         '6xl': '72rem',
         '7xl': '80rem',
      },
      spacing: {
         px: '1px',
         0: '0px',
         0.5: '0.125rem',
         1: '0.25rem',
         1.25: '0.3125rem',
         1.5: '0.375rem',
         2: '0.5rem',
         2.5: '0.625rem',
         3: '0.75rem',
         3.5: '0.875rem',
         3.75: '0.9375rem',
         4: '1rem',
         4.5: '1.125rem',
         5: '1.25rem',
         5.5: '1.375rem',
         5.75: '1.4375rem',
         6: '1.5rem',
         6.5: '1.625rem',
         7: '1.75rem',
         7.5: '1.875rem',
         8: '2rem',
         8.5: '2.125rem',
         9: '2.25rem',
         10: '2.5rem',
         10.05: '2.5625rem',
         10.5: '2.625rem',
         11: '2.75rem',
         11.5: '2.875rem',
         12: '3rem',
         14: '3.5rem',
         15: '3.75rem',
         16: '4rem',
         16.5: '4.5rem',
         17: '4.75rem',
         20: '5rem',
         22: '5.375rem',
         23: '5.625rem',
         24: '6rem',
         25: '6.25rem',
         28: '7rem',
         29: '7.25rem',
         30: '7.75rem',
         32: '8rem',
         33: '8.25rem',
         34: '8.5rem',
         35: '8.75rem',
         36: '9rem',
         37: '9.25rem',
         38: '9.75rem',
         40: '10rem',
         44: '11rem',
         44.05: '11.25rem',
         44: '11rem',
         48: '12rem',
         49: '12.5rem',
         52: '13rem',
         54: '13.75rem',
         54.5: '13.875rem',
         56: '14rem',
         56.5: '14.375rem',
         60: '15rem',
         64: '16rem',
         65: '17.8125rem',
         72: '18rem',
         72.5: '18.75rem',
         80: '20rem',
         81.75: '21.875rem',
         82: '22rem',
         82.5: '22.8125rem',
         84: '23.75rem',
         96: '24rem',
         97: '26.25rem',
         99: '32rem',
         640: '40rem',
         500: '31.25rem',
         545: '34.0625rem',
         '600': '600px',
         '700': '43.75rem',
         '736': '46rem',
         '740': '46.25rem',
         '785': '49.0625rem',
         '830': '51.875rem',
         '913': '913px',
         '908': '56.75rem',
         'c-1/3-5': 'calc(33.333333% - 20px)',
         'c-4/6-5': 'calc(66.666667% - 20px)',
         'c-1/3-4': 'calc(33.333333% - 16px)',
         'c-4/6-4': 'calc(66.666667% - 16px)',
         'c-1/2-8': 'calc(50% - 32px)',
         'c-1/2-4': 'calc(50% - 16px)',
         'c-1/2-1': 'calc(50% - 4px)',
         'c-1/2-670': 'calc(50% - 41.875rem)',
         'c-1/2-700': 'calc(50% - 43.75rem)',
         'c-1/2-730': 'calc(50% - 45.625rem)',
         'c-full-1': 'calc(100% - 4px)',
         'c-full+5': 'calc(100% + 20px)',
         'c-full+1': 'calc(100% + 4px)',
         'c-screen-22.5': 'calc(100vh - 5.5rem)',
         'c-screen-343': 'calc(100vh - 21.4563rem)',
         'c-screen-462': 'calc(100vh - 28.8938rem)',
      },
      animation: {
         none: 'none',
         spin: 'spin 1s linear infinite',
         ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
         pulse: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
         bounce: 'bounce 1s infinite',
         down: 'down ease-out 1.4s infinite',
         right: 'right ease-out 2s infinite',
         up: 'up ease-out 1s infinite',
         loader: 'loader 1.1s infinite ease',
         'loader-white': 'loader-white 1.1s infinite ease'
      },
      aspectRatio: {
         auto: 'auto',
         square: '1 / 1',
         video: '16 / 9',
      },
      backdropBlur: ({ theme }) => theme('blur'),
      backdropBrightness: ({ theme }) => theme('brightness'),
      backdropContrast: ({ theme }) => theme('contrast'),
      backdropGrayscale: ({ theme }) => theme('grayscale'),
      backdropHueRotate: ({ theme }) => theme('hueRotate'),
      backdropInvert: ({ theme }) => theme('invert'),
      backdropOpacity: ({ theme }) => theme('opacity'),
      backdropSaturate: ({ theme }) => theme('saturate'),
      backdropSepia: ({ theme }) => theme('sepia'),
      backgroundColor: ({ theme }) => theme('colors'),
      backgroundImage: {
         none: 'none',
         'gradient-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))',
         'gradient-to-tr': 'linear-gradient(to top right, var(--tw-gradient-stops))',
         'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
         'gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
         'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
         'gradient-to-bl': 'linear-gradient(to bottom left, var(--tw-gradient-stops))',
         'gradient-to-l': 'linear-gradient(to left, var(--tw-gradient-stops))',
         'gradient-to-tl': 'linear-gradient(to top left, var(--tw-gradient-stops))',
         'gradient-step': 'linear-gradient(90deg, #B1B5C3 0, #B1B5C3 6px, #0000 6px, #0000 14px)',
         // checkbox: "url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='10' fill='none' viewBox='0 0 14 10'%3E%3Cpath fill-rule='evenodd' d='M13.707.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L5 7.586 12.293.293a1 1 0 0 1 1.414 0z' fill='%23fcfcfd'/%3E%3C/svg%3E")"
         'dropdown': "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='9' fill='none' viewBox='0 0 24 9'%3E%3Cpath d='M6.343 2.657L0 9h24l-6.343-6.343a8 8 0 0 0-11.314 0z' fill='%23fcfcfd'/%3E%3C/svg%3E')",
         'arrow-down': "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='10' fill='none' viewBox='0 0 14 10'%3E%3Cpath fill-rule='evenodd' d='M13.707.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L5 7.586 12.293.293a1 1 0 0 1 1.414 0z' fill='%23fcfcfd'/%3E%3C/svg%3E')",
         'dashed-b': "url(data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='#0A937F' stroke-width='4' stroke-dasharray='4%2c 12' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e)"
      },
      backgroundOpacity: ({ theme }) => theme('opacity'),
      backgroundPosition: {
         bottom: 'bottom',
         center: 'center',
         left: 'left',
         'left-bottom': 'left bottom',
         'left-top': 'left top',
         right: 'right',
         'right-bottom': 'right bottom',
         'right-top': 'right top',
         top: 'top',
      },
      backgroundSize: {
         auto: 'auto',
         cover: 'cover',
         contain: 'contain',
      },
      blur: {
         0: '0',
         none: '0',
         sm: '4px',
         DEFAULT: '8px',
         md: '12px',
         lg: '16px',
         xl: '24px',
         '2xl': '40px',
         '3xl': '64px',
      },
      brightness: {
         0: '0',
         50: '.5',
         75: '.75',
         90: '.9',
         95: '.95',
         100: '1',
         105: '1.05',
         110: '1.1',
         125: '1.25',
         150: '1.5',
         200: '2',
      },
      borderColor: ({ theme }) => ({
         ...theme('colors'),
         DEFAULT: theme('colors.gray.200', 'currentColor'),
      }),
      borderOpacity: ({ theme }) => theme('opacity'),
      borderRadius: () => ({
         none: '0px',
         sm: '0.125rem',
         DEFAULT: '0.25rem',
         smm: '0.3125rem',
         md: '0.375rem',
         lg: '0.5rem',
         xl: '0.75rem',
         '1xl': '0.875rem',
         '2xl': '1rem',
         '3xl': '1.5rem',
         '4xl': '1.75rem',
         '5xl': '2rem',
         full: '9999px',
         20: '20px',
      }),
      borderSpacing: ({ theme }) => ({
         ...theme('spacing'),
      }),
      borderWidth: {
         DEFAULT: '1px',
         0: '0px',
         2: '2px',
         4: '4px',
         8: '8px',
         10: '10px',
      },
      boxShadow: {
         sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
         DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
         md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
         lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
         xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
         '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
         inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
         none: 'none',
         header: 'inset 0 -1px 0 #e6e8ec',
         'header-dark': 'inset 0 -1px 0 #23262f',
         border: '0 0 0 2px #e6e8ec inset',
         'border-dark': '0 0 0 2px #353945 inset',
         card: '0px 64px 64px -48px rgba(15, 15, 15, 0.1)',
         card2: '0px 64px 64px -48px rgb(15 15 15 / 10%)',
         play: '0px 8px 16px -8px rgb(15 15 15 / 10%)',
         dropdown: '0px 16px 48px rgb(31 47 70 / 10%)',
         'dropdown-1': 'inset 0 0 0 2px #777e90',
         'dropdown-2': '0 4px 12px rgb(35 38 47 / 10%)',
         'dropdown-3': '0 4px 12px rgb(20 20 22 / 10%)',
         'dropdown-4': '0px 16px 64px -16px rgb(31 47 70 / 15%)',
         input: 'inset 0 0 0 2px #e6e8ec',
         'input-dark': 'inset 0 0 0 2px #23262f',
         'body': 'inset 0 1px 0 0 #23262f',
         'modal': '0px 64px 64px -48px rgb(31 47 70 / 12%)',
         'step': '0px 4px 16px -8px rgb(15 15 15 / 10%)',
         'sidebar-dropdown': '0px 40px 32px -24px rgb(15 15 15 / 12%)',
         'dropdown-primary': 'inset 0 0 0 2px #0A937F',
      },
      boxShadowColor: ({ theme }) => theme('colors'),
      caretColor: ({ theme }) => theme('colors'),
      accentColor: ({ theme }) => ({
         ...theme('colors'),
         auto: 'auto',
      }),
      contrast: {
         0: '0',
         50: '.5',
         75: '.75',
         100: '1',
         125: '1.25',
         150: '1.5',
         200: '2',
      },
      container: {},
      content: {
         none: 'none',
      },
      cursor: {
         auto: 'auto',
         default: 'default',
         pointer: 'pointer',
         wait: 'wait',
         text: 'text',
         move: 'move',
         help: 'help',
         'not-allowed': 'not-allowed',
         none: 'none',
         'context-menu': 'context-menu',
         progress: 'progress',
         cell: 'cell',
         crosshair: 'crosshair',
         'vertical-text': 'vertical-text',
         alias: 'alias',
         copy: 'copy',
         'no-drop': 'no-drop',
         grab: 'grab',
         grabbing: 'grabbing',
         'all-scroll': 'all-scroll',
         'col-resize': 'col-resize',
         'row-resize': 'row-resize',
         'n-resize': 'n-resize',
         'e-resize': 'e-resize',
         's-resize': 's-resize',
         'w-resize': 'w-resize',
         'ne-resize': 'ne-resize',
         'nw-resize': 'nw-resize',
         'se-resize': 'se-resize',
         'sw-resize': 'sw-resize',
         'ew-resize': 'ew-resize',
         'ns-resize': 'ns-resize',
         'nesw-resize': 'nesw-resize',
         'nwse-resize': 'nwse-resize',
         'zoom-in': 'zoom-in',
         'zoom-out': 'zoom-out',
      },
      divideColor: ({ theme }) => theme('borderColor'),
      divideOpacity: ({ theme }) => theme('borderOpacity'),
      divideWidth: ({ theme }) => theme('borderWidth'),
      dropShadow: {
         sm: '0 1px 1px rgb(0 0 0 / 0.05)',
         DEFAULT: ['0 1px 2px rgb(0 0 0 / 0.1)', '0 1px 1px rgb(0 0 0 / 0.06)'],
         md: ['0 4px 3px rgb(0 0 0 / 0.07)', '0 2px 2px rgb(0 0 0 / 0.06)'],
         lg: ['0 10px 8px rgb(0 0 0 / 0.04)', '0 4px 3px rgb(0 0 0 / 0.1)'],
         xl: ['0 20px 13px rgb(0 0 0 / 0.03)', '0 8px 5px rgb(0 0 0 / 0.08)'],
         '2xl': '0 25px 25px rgb(0 0 0 / 0.15)',
         none: '0 0 #0000',
         hero: '0 0 2em #646cffaa;'
      },
      fill: ({ theme }) => theme('colors'),
      grayscale: {
         0: '0',
         DEFAULT: '100%',
      },
      hueRotate: {
         0: '0deg',
         15: '15deg',
         30: '30deg',
         60: '60deg',
         90: '90deg',
         180: '180deg',
      },
      invert: {
         0: '0',
         DEFAULT: '100%',
      },
      flex: {
         1: '1 1 0%',
         auto: '1 1 auto',
         initial: '0 1 auto',
         none: 'none',
      },
      flexBasis: ({ theme }) => ({
         auto: 'auto',
         ...theme('spacing'),
         '1/2': '50%',
         '1/3': '33.333333%',
         '2/3': '66.666667%',
         '1/4': '25%',
         '2/4': '50%',
         '3/4': '75%',
         '1/5': '20%',
         '2/5': '40%',
         '3/5': '60%',
         '4/5': '80%',
         '1/6': '16.666667%',
         '2/6': '33.333333%',
         '3/6': '50%',
         '4/6': '66.666667%',
         '5/6': '83.333333%',
         '1/12': '8.333333%',
         '2/12': '16.666667%',
         '3/12': '25%',
         '4/12': '33.333333%',
         '5/12': '41.666667%',
         '6/12': '50%',
         '7/12': '58.333333%',
         '8/12': '66.666667%',
         '9/12': '75%',
         '10/12': '83.333333%',
         '11/12': '91.666667%',
         full: '100%',
      }),
      flexGrow: {
         0: '0',
         DEFAULT: '1',
      },
      flexShrink: {
         0: '0',
         DEFAULT: '1',
      },
      fontFamily: {
         dm: ['"DM sans"', 'sans-serif'],
         pop: ['Poppins', 'sans-serif'],
         crypto: 'crypto',
         'urw-din-400': ['urw-din-400', 'sans-serif'],
         'urw-din-500': ['urw-din-500', 'sans-serif'],
      },
      fontSize: {
         none: '0',
         x: ['0.625rem', { lineHeight: '1rem' }],
         xs: ['0.75rem', { lineHeight: '1rem' }],
         sm: ['0.875rem', { lineHeight: '1.25rem' }],
         base: ['1rem', { lineHeight: '1.5rem' }],
         lg: ['1.125rem', { lineHeight: '1.75rem' }],
         xl: ['1.25rem', { lineHeight: '1.75rem' }],
         '2xl': ['1.5rem', { lineHeight: '2rem' }],
         '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
         '3.5xl': ['2rem', { lineHeight: '2.25rem' }],
         '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
         '4.5xl': ['40px', { lineHeight: '1' }],
         '5xl': ['3rem', { lineHeight: '1' }],
         '6xl': ['3.75rem', { lineHeight: '1' }],
         '7xl': ['4.5rem', { lineHeight: '1' }],
         '7.5xl': ['5rem', { lineHeight: '1' }],
         '8xl': ['6rem', { lineHeight: '1' }],
         '9xl': ['8rem', { lineHeight: '1' }],
         '64': ['64px', { lineHeight: '1' }],
      },
      fontWeight: {
         thin: '100',
         extralight: '200',
         light: '300',
         normal: '400',
         medium: '500',
         semibold: '600',
         bold: '700',
         extrabold: '800',
         black: '900',
      },
      gap: ({ theme }) => theme('spacing'),
      gradientColorStops: ({ theme }) => theme('colors'),
      gridAutoColumns: {
         auto: 'auto',
         min: 'min-content',
         max: 'max-content',
         fr: 'minmax(0, 1fr)',
      },
      gridAutoRows: {
         auto: 'auto',
         min: 'min-content',
         max: 'max-content',
         fr: 'minmax(0, 1fr)',
      },
      gridColumn: {
         auto: 'auto',
         'span-1': 'span 1 / span 1',
         'span-2': 'span 2 / span 2',
         'span-3': 'span 3 / span 3',
         'span-4': 'span 4 / span 4',
         'span-5': 'span 5 / span 5',
         'span-6': 'span 6 / span 6',
         'span-7': 'span 7 / span 7',
         'span-8': 'span 8 / span 8',
         'span-9': 'span 9 / span 9',
         'span-10': 'span 10 / span 10',
         'span-11': 'span 11 / span 11',
         'span-12': 'span 12 / span 12',
         'span-full': '1 / -1',
      },
      gridColumnEnd: {
         auto: 'auto',
         1: '1',
         2: '2',
         3: '3',
         4: '4',
         5: '5',
         6: '6',
         7: '7',
         8: '8',
         9: '9',
         10: '10',
         11: '11',
         12: '12',
         13: '13',
      },
      gridColumnStart: {
         auto: 'auto',
         1: '1',
         2: '2',
         3: '3',
         4: '4',
         5: '5',
         6: '6',
         7: '7',
         8: '8',
         9: '9',
         10: '10',
         11: '11',
         12: '12',
         13: '13',
      },
      gridRow: {
         auto: 'auto',
         'span-1': 'span 1 / span 1',
         'span-2': 'span 2 / span 2',
         'span-3': 'span 3 / span 3',
         'span-4': 'span 4 / span 4',
         'span-5': 'span 5 / span 5',
         'span-6': 'span 6 / span 6',
         'span-full': '1 / -1',
      },
      gridRowStart: {
         auto: 'auto',
         1: '1',
         2: '2',
         3: '3',
         4: '4',
         5: '5',
         6: '6',
         7: '7',
      },
      gridRowEnd: {
         auto: 'auto',
         1: '1',
         2: '2',
         3: '3',
         4: '4',
         5: '5',
         6: '6',
         7: '7',
      },
      gridTemplateColumns: {
         none: 'none',
         1: 'repeat(1, minmax(0, 1fr))',
         2: 'repeat(2, minmax(0, 1fr))',
         3: 'repeat(3, minmax(0, 1fr))',
         4: 'repeat(4, minmax(0, 1fr))',
         5: 'repeat(5, minmax(0, 1fr))',
         6: 'repeat(6, minmax(0, 1fr))',
         7: 'repeat(7, minmax(0, 1fr))',
         8: 'repeat(8, minmax(0, 1fr))',
         9: 'repeat(9, minmax(0, 1fr))',
         10: 'repeat(10, minmax(0, 1fr))',
         11: 'repeat(11, minmax(0, 1fr))',
         12: 'repeat(12, minmax(0, 1fr))',
      },
      gridTemplateRows: {
         none: 'none',
         1: 'repeat(1, minmax(0, 1fr))',
         2: 'repeat(2, minmax(0, 1fr))',
         3: 'repeat(3, minmax(0, 1fr))',
         4: 'repeat(4, minmax(0, 1fr))',
         5: 'repeat(5, minmax(0, 1fr))',
         6: 'repeat(6, minmax(0, 1fr))',
      },
      height: ({ theme }) => ({
         auto: 'auto',
         ...theme('spacing'),
         '1/2': '50%',
         '1/3': '33.333333%',
         '2/3': '66.666667%',
         '1/4': '25%',
         '2/4': '50%',
         '3/4': '75%',
         '1/5': '20%',
         '2/5': '40%',
         '3/5': '60%',
         '4/5': '80%',
         '1/6': '16.666667%',
         '2/6': '33.333333%',
         '3/6': '50%',
         '4/6': '66.666667%',
         '5/6': '83.333333%',
         full: '100%',
         screen: '100vh',
         min: 'min-content',
         max: 'max-content',
         fit: 'fit-content',
      }),
      inset: ({ theme }) => ({
         auto: 'auto',
         ...theme('spacing'),
         '1/2': '50%',
         '1/3': '33.333333%',
         '2/3': '66.666667%',
         '1/4': '25%',
         '2/4': '50%',
         '3/4': '75%',
         full: '100%',
      }),
      keyframes: {
         spin: {
            to: {
               transform: 'rotate(360deg)',
            },
         },
         ping: {
            '75%, 100%': {
               transform: 'scale(2)',
               opacity: '0',
            },
         },
         pulse: {
            '50%': {
               opacity: '.5',
            },
         },
         bounce: {
            '0%, 100%': {
               transform: 'translateY(-25%)',
               animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
            },
            '50%': {
               transform: 'none',
               animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
            },
         },
         down: {
            '80%': {
               transform: 'translateY(27px)',
            },
            '100%': {
               transform: 'translateY(27px)',
            }
         },
         right: {
            '80%': {
               transform: 'translateX(27px)',
            },
            '100%': {
               transform: 'translateX(27px)',
            }
         },
         up: {
            '80%': {
               transform: 'translateY(-27px)',
            },
            '100%': {
               transform: 'translateY(-27px)',
            }
         },
         loader: {
            '0%, 100%': {
               boxShadow: '0em -2.6em 0em 0em #777e90, 1.8em -1.8em 0 0em rgba(119, 126, 144, 0.2), 2.5em 0em 0 0em rgba(119, 126, 144, 0.2), 1.75em 1.75em 0 0em rgba(119, 126, 144, 0.2), 0em 2.5em 0 0em rgba(119, 126, 144, 0.2), -1.8em 1.8em 0 0em rgba(119, 126, 144, 0.2), -2.6em 0em 0 0em rgba(119, 126, 144, 0.5), -1.8em -1.8em 0 0em rgba(119, 126, 144, 0.7)'
            },
            '12.5%': {
               boxShadow: '0em -2.6em 0em 0em rgba(119, 126, 144, 0.7), 1.8em -1.8em 0 0em #777e90, 2.5em 0em 0 0em rgba(119, 126, 144, 0.2), 1.75em 1.75em 0 0em rgba(119, 126, 144, 0.2), 0em 2.5em 0 0em rgba(119, 126, 144, 0.2), -1.8em 1.8em 0 0em rgba(119, 126, 144, 0.2), -2.6em 0em 0 0em rgba(119, 126, 144, 0.2), -1.8em -1.8em 0 0em rgba(119, 126, 144, 0.5)'
            },
            '25%': {
               boxShadow: '0em -2.6em 0em 0em rgba(119, 126, 144, 0.5), 1.8em -1.8em 0 0em rgba(119, 126, 144, 0.7), 2.5em 0em 0 0em #777e90, 1.75em 1.75em 0 0em rgba(119, 126, 144, 0.2), 0em 2.5em 0 0em rgba(119, 126, 144, 0.2), -1.8em 1.8em 0 0em rgba(119, 126, 144, 0.2), -2.6em 0em 0 0em rgba(119, 126, 144, 0.2), -1.8em -1.8em 0 0em rgba(119, 126, 144, 0.2)'
            },
            '37.5%': {
               boxShadow: '0em -2.6em 0em 0em rgba(119, 126, 144, 0.2), 1.8em -1.8em 0 0em rgba(119, 126, 144, 0.5), 2.5em 0em 0 0em rgba(119, 126, 144, 0.7), 1.75em 1.75em 0 0em #777e90, 0em 2.5em 0 0em rgba(119, 126, 144, 0.2), -1.8em 1.8em 0 0em rgba(119, 126, 144, 0.2), -2.6em 0em 0 0em rgba(119, 126, 144, 0.2), -1.8em -1.8em 0 0em rgba(119, 126, 144, 0.2)'
            },
            '50%': {
               boxShadow: '0em -2.6em 0em 0em rgba(119, 126, 144, 0.2), 1.8em -1.8em 0 0em rgba(119, 126, 144, 0.2), 2.5em 0em 0 0em rgba(119, 126, 144, 0.5), 1.75em 1.75em 0 0em rgba(119, 126, 144, 0.7), 0em 2.5em 0 0em #777e90, -1.8em 1.8em 0 0em rgba(119, 126, 144, 0.2), -2.6em 0em 0 0em rgba(119, 126, 144, 0.2), -1.8em -1.8em 0 0em rgba(119, 126, 144, 0.2)'
            },
            '62.5%': {
               boxShadow: '0em -2.6em 0em 0em rgba(119, 126, 144, 0.2), 1.8em -1.8em 0 0em rgba(119, 126, 144, 0.2), 2.5em 0em 0 0em rgba(119, 126, 144, 0.2), 1.75em 1.75em 0 0em rgba(119, 126, 144, 0.5), 0em 2.5em 0 0em rgba(119, 126, 144, 0.7), -1.8em 1.8em 0 0em #777e90, -2.6em 0em 0 0em rgba(119, 126, 144, 0.2), -1.8em -1.8em 0 0em rgba(119, 126, 144, 0.2)'
            },
            '75%': {
               boxShadow: '0em -2.6em 0em 0em rgba(119, 126, 144, 0.2), 1.8em -1.8em 0 0em rgba(119, 126, 144, 0.2), 2.5em 0em 0 0em rgba(119, 126, 144, 0.2), 1.75em 1.75em 0 0em rgba(119, 126, 144, 0.2), 0em 2.5em 0 0em rgba(119, 126, 144, 0.5), -1.8em 1.8em 0 0em rgba(119, 126, 144, 0.7), -2.6em 0em 0 0em #777e90, -1.8em -1.8em 0 0em rgba(119, 126, 144, 0.2)'
            },
            '87.5%': {
               boxShadow: '0em -2.6em 0em 0em rgba(119, 126, 144, 0.2), 1.8em -1.8em 0 0em rgba(119, 126, 144, 0.2), 2.5em 0em 0 0em rgba(119, 126, 144, 0.2), 1.75em 1.75em 0 0em rgba(119, 126, 144, 0.2), 0em 2.5em 0 0em rgba(119, 126, 144, 0.2), -1.8em 1.8em 0 0em rgba(119, 126, 144, 0.5), -2.6em 0em 0 0em rgba(119, 126, 144, 0.7), -1.8em -1.8em 0 0em #777e90'
            }
         },
         'loader-white': {
            '0%, 100%': {
               boxshadow: '0em -2.6em 0em 0em #ffffff, 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.5), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7)'
            },
            '12.5%': {
               boxshadow: '0em -2.6em 0em 0em rgba(255, 255, 255, 0.7), 1.8em -1.8em 0 0em #ffffff, 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5)'
            },
            '25%': {
               boxshadow: '0em -2.6em 0em 0em rgba(255, 255, 255, 0.5), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7), 2.5em 0em 0 0em #ffffff, 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2)'
            },
            '37.5%': {
               boxshadow: '0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5), 2.5em 0em 0 0em rgba(255, 255, 255, 0.7), 1.75em 1.75em 0 0em #ffffff, 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2)'
            },
            '50%': {
               boxshadow: '0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.5), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7), 0em 2.5em 0 0em #ffffff, -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2)'
            },
            '62.5%': {
               boxshadow: '0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.5), 0em 2.5em 0 0em rgba(255, 255, 255, 0.7), -1.8em 1.8em 0 0em #ffffff, -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2)'
            },
            '75%': {
               boxshadow: '0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.5), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7), -2.6em 0em 0 0em #ffffff, -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2)'
            },
            '87.5%': {
               boxshadow: '0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.5), -2.6em 0em 0 0em rgba(255, 255, 255, 0.7), -1.8em -1.8em 0 0em #ffffff'
            },
         }
      },
      letterSpacing: {
         tighter: '-0.05em',
         tight: '-0.025em',
         normal: '0em',
         wide: '0.025em',
         wider: '0.05em',
         widest: '0.1em',
         custom1: '-.01em',
         custom: '-.02em',
      },
      lineHeight: {
         none: '1',
         '1.2': '1.2',
         tight: '1.25',
         snug: '1.375',
         normal: '1.5',
         relaxed: '1.625',
         loose: '2',
         3: '.75rem',
         4: '1rem',
         5: '1.25rem',
         6: '1.5rem',
         7: '1.75rem',
         8: '2rem',
         9: '2.25rem',
         10: '2.5rem',
         12: '3rem',
         'custom': '1.71429',
         'custom1': '1.16667',
         'custom2': '1.33333',
         'custom3': '1.14286',
         'custom4': '1.66667',
      },
      listStyleType: {
         none: 'none',
         disc: 'disc',
         decimal: 'decimal',
      },
      margin: ({ theme }) => ({
         auto: 'auto',
         ...theme('spacing'),
      }),
      maxHeight: ({ theme }) => ({
         ...theme('spacing'),
         full: '100%',
         screen: '100vh',
         min: 'min-content',
         max: 'max-content',
         fit: 'fit-content',
      }),
      maxWidth: ({ theme, breakpoints }) => ({
         none: 'none',
         0: '0rem',
         64: '16rem',
         xs: '20rem',
         sm: '24rem',
         m: '23.4375rem',
         md: '28rem',
         'md-2': '28.125rem',
         lg: '32rem',
         xl: '36rem',
         '2xl': '42rem',
         '2.5xl': '45.625rem',
         '3xl': '48rem',
         '4xl': '56rem',
         '5xl': '64rem',
         '5.5xl': '70.75rem',
         '6xl': '72rem',
         '7xl': '80rem',
         full: '100%',
         min: 'min-content',
         max: 'max-content',
         fit: 'fit-content',
         prose: '65ch',
         vh: 'var(--vh)',
         500: '31.25rem',
         ...breakpoints(theme('screens')),
         ...theme('spacing'),
      }),
      minHeight: ({ theme }) => ({
         0: '0px',
         auto: 'auto',
         full: '100%',
         screen: '100vh',
         min: 'min-content',
         max: 'max-content',
         fit: 'fit-content',
         '908': '56.75rem',
         ...theme('spacing'),
      }),
      minWidth: ({ theme, breakpoints }) => ({
         none: 'none',
         0: '0rem',
         64: '16rem',
         xs: '20rem',
         sm: '24rem',
         m: '23.4375rem',
         md: '28rem',
         lg: '32rem',
         xl: '36rem',
         '2xl': '42rem',
         '3xl': '48rem',
         '4xl': '56rem',
         '5xl': '64rem',
         '5.5xl': '70.75rem',
         '6xl': '72rem',
         '7xl': '80rem',
         full: '100%',
         min: 'min-content',
         max: 'max-content',
         fit: 'fit-content',
         72: '4.5rem',
         184: '11.5rem',
         vh: 'var(--vh)',
         500: '31.25rem',
         ...breakpoints(theme('screens')),
      }),
      objectPosition: {
         bottom: 'bottom',
         center: 'center',
         left: 'left',
         'left-bottom': 'left bottom',
         'left-top': 'left top',
         right: 'right',
         'right-bottom': 'right bottom',
         'right-top': 'right top',
         top: 'top',
      },
      opacity: {
         0: '0',
         5: '0.05',
         10: '0.1',
         20: '0.2',
         25: '0.25',
         30: '0.3',
         40: '0.4',
         50: '0.5',
         60: '0.6',
         70: '0.7',
         75: '0.75',
         80: '0.8',
         90: '0.9',
         95: '0.95',
         100: '1',
      },
      order: {
         first: '-9999',
         last: '9999',
         none: '0',
         1: '1',
         2: '2',
         3: '3',
         4: '4',
         5: '5',
         6: '6',
         7: '7',
         8: '8',
         9: '9',
         10: '10',
         11: '11',
         12: '12',
      },
      padding: ({ theme }) => theme('spacing'),
      placeholderColor: ({ theme }) => theme('colors'),
      placeholderOpacity: ({ theme }) => theme('opacity'),
      outlineColor: ({ theme }) => theme('colors'),
      outlineOffset: {
         0: '0px',
         1: '1px',
         2: '2px',
         4: '4px',
         8: '8px',
      },
      outlineWidth: {
         0: '0px',
         1: '1px',
         2: '2px',
         4: '4px',
         8: '8px',
      },
      ringColor: ({ theme }) => ({
         DEFAULT: theme(`colors.blue.500`, '#3b82f6'),
         ...theme('colors'),
      }),
      ringOffsetColor: ({ theme }) => theme('colors'),
      ringOffsetWidth: {
         0: '0px',
         1: '1px',
         2: '2px',
         4: '4px',
         8: '8px',
      },
      ringOpacity: ({ theme }) => ({
         DEFAULT: '0.5',
         ...theme('opacity'),
      }),
      ringWidth: {
         DEFAULT: '3px',
         0: '0px',
         1: '1px',
         2: '2px',
         4: '4px',
         8: '8px',
      },
      rotate: {
         0: '0deg',
         1: '1deg',
         2: '2deg',
         3: '3deg',
         6: '6deg',
         12: '12deg',
         45: '45deg',
         90: '90deg',
         180: '180deg',
      },
      saturate: {
         0: '0',
         50: '.5',
         100: '1',
         150: '1.5',
         200: '2',
      },
      scale: {
         0: '0',
         50: '.5',
         75: '.75',
         90: '.9',
         95: '.95',
         100: '1',
         105: '1.05',
         110: '1.1',
         125: '1.25',
         150: '1.5',
      },
      scrollMargin: ({ theme }) => ({
         ...theme('spacing'),
      }),
      scrollPadding: ({ theme }) => theme('spacing'),
      sepia: {
         0: '0',
         DEFAULT: '100%',
      },
      skew: {
         0: '0deg',
         1: '1deg',
         2: '2deg',
         3: '3deg',
         6: '6deg',
         12: '12deg',
      },
      space: ({ theme }) => ({
         ...theme('spacing'),
      }),
      stroke: ({ theme }) => theme('colors'),
      strokeWidth: {
         0: '0',
         1: '1',
         2: '2',
      },
      textColor: ({ theme }) => theme('colors'),
      textDecorationColor: ({ theme }) => theme('colors'),
      textDecorationThickness: {
         auto: 'auto',
         'from-font': 'from-font',
         0: '0px',
         1: '1px',
         2: '2px',
         4: '4px',
         8: '8px',
      },
      textUnderlineOffset: {
         auto: 'auto',
         0: '0px',
         1: '1px',
         2: '2px',
         4: '4px',
         8: '8px',
      },
      textIndent: ({ theme }) => ({
         ...theme('spacing'),
      }),
      textOpacity: ({ theme }) => theme('opacity'),
      transformOrigin: {
         center: 'center',
         top: 'top',
         'top-right': 'top right',
         right: 'right',
         'bottom-right': 'bottom right',
         bottom: 'bottom',
         'bottom-left': 'bottom left',
         left: 'left',
         'top-left': 'top left',
      },
      transitionDelay: {
         75: '75ms',
         100: '100ms',
         150: '150ms',
         200: '200ms',
         300: '300ms',
         500: '500ms',
         700: '700ms',
         1000: '1000ms',
      },
      transitionDuration: {
         DEFAULT: '150ms',
         75: '75ms',
         100: '100ms',
         150: '150ms',
         200: '200ms',
         300: '300ms',
         500: '500ms',
         700: '700ms',
         1000: '1000ms',
      },
      transitionProperty: {
         none: 'none',
         all: 'all',
         DEFAULT:
            'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
         colors: 'color, background-color, border-color, text-decoration-color, fill, stroke',
         opacity: 'opacity',
         shadow: 'box-shadow',
         transform: 'transform',
      },
      transitionTimingFunction: {
         DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
         linear: 'linear',
         in: 'cubic-bezier(0.4, 0, 1, 1)',
         out: 'cubic-bezier(0, 0, 0.2, 1)',
         'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      translate: ({ theme }) => ({
         ...theme('spacing'),
         '1/2': '50%',
         '1/3': '33.333333%',
         '2/3': '66.666667%',
         '1/4': '25%',
         '2/4': '50%',
         '3/4': '75%',
         full: '100%',
      }),
      width: ({ theme }) => ({
         auto: 'auto',
         ...theme('spacing'),
         '1/2': '50%',
         '1/3': '33.333333%',
         '2/3': '66.666667%',
         '1/4': '25%',
         '2/4': '50%',
         '3/4': '75%',
         '1/5': '20%',
         '2/5': '40%',
         '3/5': '60%',
         '4/5': '80%',
         '1/6': '16.666667%',
         '2/6': '33.333333%',
         '3/6': '50%',
         '4/6': '66.666667%',
         '5/6': '83.333333%',
         '1/12': '8.333333%',
         '2/12': '16.666667%',
         '3/12': '25%',
         '4/12': '33.333333%',
         '5/12': '41.666667%',
         '6/12': '50%',
         '7/12': '58.333333%',
         '8/12': '66.666667%',
         '9/12': '75%',
         '10/12': '83.333333%',
         '11/12': '91.666667%',
         full: '100%',
         screen: '100vw',
         min: 'min-content',
         max: 'max-content',
         fit: 'fit-content',
      }),
      willChange: {
         auto: 'auto',
         scroll: 'scroll-position',
         contents: 'contents',
         transform: 'transform',
      },
      zIndex: {
         auto: 'auto',
         0: '0',
         2: '2',
         3: '3',
         5: '5',
         10: '10',
         20: '20',
         30: '30',
         40: '40',
         50: '50',
         1042: '1042',
         1043: '1043',
         1045: '1045',
      },
   },
   variantOrder: [
      'first',
      'last',
      'odd',
      'even',
      'visited',
      'checked',
      'empty',
      'read-only',
      'group-hover',
      'group-focus',
      'focus-within',
      'hover',
      'focus',
      'focus-visible',
      'active',
      'disabled',
   ],
   plugins: [],
};
