/** @type {import('prettier').Config} */
module.exports = {
   singleQuote: true,
   bracketSameLine: true,
   tabWidth: 3,
   arrowParens: 'avoid',
   quoteProps: 'consistent',
   proseWrap: 'always',
   plugins: [require('prettier-plugin-tailwindcss')],
   singleAttributePerLine: true,
   overrides: [
      {
         files: ['**/*.css', '**/*.scss', '**/*.pcss', '**/*.html'],
         options: {
            singleQuote: false,
            tabWidth: 3,
         },
      },
   ],
};
