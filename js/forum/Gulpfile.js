var flarum = require('flarum-gulp');

flarum({
  modules: {
    'matpompili/flarum-img-upload': [
      'src/**/*.js'
    ]
  }
});
