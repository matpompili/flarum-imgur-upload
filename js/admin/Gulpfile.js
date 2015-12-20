var flarum = require('flarum-gulp');

flarum({
  modules: {
    'matpompili/imgur-upload': [
      'src/**/*.js'
    ]
  }
});
