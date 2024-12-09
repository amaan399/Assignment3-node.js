// tests/babel.config.js
module.exports = {
    presets: [
      '@babel/preset-env',  // To compile modern JavaScript (ES6+)
      '@babel/preset-react' // If you're using React (Optional if you don't use React)
    ],
    plugins: [
      '@babel/plugin-transform-runtime' // Reduces code duplication for helpers
    ]
  };
  