System.register('matpompili/flarum-img-upload/main', ['flarum/extend'], function (_export) {
  /*
  * This file is part of flarum-img-upload.
  *
  * (c) Matteo Pompili <matpompili@gmail.com>
  *
  * For the full copyright and license information, please view the LICENSE
  * file that was distributed with this source code.
  */

  //import CommentPost from 'flarum/components/CommentPost';

  'use strict';

  var extend;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }],
    execute: function () {
      app.initializers.add('matpompili-flarum-img-upload', function () {
        //On every post loading
        // extend(CommentPost.prototype, 'config', function() {
        //     //Run KaTeX renderer on the single post (not on the entire page)
        //     render(this.element);
        // });
      });

      //This call KaTeX renderer with some options
      // function render(elem = document.body) {
      //   renderMathInElement(elem,{
      //     //Do not render inside those tags
      //     "ignoredTags":["script", "noscript", "style", "textarea", "pre"],
      //     //Those are the delimiters we are going to use to write latex formulas
      //     "delimiters":[
      //       {left: "$$", right: "$$", display: true},
      //       {left: "$", right: "$", display: false},
      //     ]
      //   });
      // }
    }
  };
});