var flarum = require('flarum-gulp');

flarum({
  modules: {
    'botfactoryit/imgur-upload': [
      'src/**/*.js'
    ]
  }
});
