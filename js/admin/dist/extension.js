System.register('matpompili/imgur-upload/components/ImgurUploadSettingsModal', ['flarum/components/SettingsModal'], function (_export) {
  /*
  * This file is part of imgur-upload.
  *
  * (c) Matteo Pompili <matpompili@gmail.com>
  *
  * For the full copyright and license information, please view the LICENSE
  * file that was distributed with this source code.
  */
  'use strict';

  var SettingsModal, ImageUploadSettingsModal;
  return {
    setters: [function (_flarumComponentsSettingsModal) {
      SettingsModal = _flarumComponentsSettingsModal['default'];
    }],
    execute: function () {
      ImageUploadSettingsModal = (function (_SettingsModal) {
        babelHelpers.inherits(ImageUploadSettingsModal, _SettingsModal);

        function ImageUploadSettingsModal() {
          babelHelpers.classCallCheck(this, ImageUploadSettingsModal);
          babelHelpers.get(Object.getPrototypeOf(ImageUploadSettingsModal.prototype), 'constructor', this).apply(this, arguments);
        }

        babelHelpers.createClass(ImageUploadSettingsModal, [{
          key: 'className',
          value: function className() {
            return 'ImageUploadSettingsModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return 'Imgur Upload Settings';
          }
        }, {
          key: 'form',
          value: function form() {
            return [m(
              'div',
              { className: 'Form-group' },
              m(
                'label',
                null,
                'Imgur Client ID (OAuth ',
                app.translator.trans('matpompili-imgur-upload.admin.without'),
                ' callback) - ',
                m(
                  'a',
                  { href: 'https://api.imgur.com/oauth2/addclient' },
                  m(
                    'small',
                    null,
                    app.translator.trans('matpompili-imgur-upload.admin.get-id')
                  )
                )
              ),
              m('input', { className: 'FormControl', bidi: this.setting('matpompili.imgur-upload.clientID') })
            ), m(
              'p',
              null,
              app.translator.trans('matpompili-imgur-upload.admin.leaveEmpty')
            ), m(
              'div',
              { className: 'Form-group' },
              m(
                'label',
                null,
                app.translator.trans('matpompili-imgur-upload.admin.maxImageWidth')
              ),
              m('input', { className: 'FormControl', bidi: this.setting('matpompili.imgur-upload.maxImageWidth') }),
              m(
                'label',
                null,
                app.translator.trans('matpompili-imgur-upload.admin.maxImageHeight')
              ),
              m('input', { className: 'FormControl', bidi: this.setting('matpompili.imgur-upload.maxImageHeight') })
            )];
          }
        }]);
        return ImageUploadSettingsModal;
      })(SettingsModal);

      _export('default', ImageUploadSettingsModal);
    }
  };
});;
System.register('matpompili/imgur-upload/main', ['flarum/extend', 'flarum/app', 'matpompili/imgur-upload/components/ImgurUploadSettingsModal'], function (_export) {
  /*
  * This file is part of imgur-upload.
  *
  * (c) Matteo Pompili <matpompili@gmail.com>
  *
  * For the full copyright and license information, please view the LICENSE
  * file that was distributed with this source code.
  */
  'use strict';

  var extend, app, ImgurUploadSettingsModal;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumApp) {
      app = _flarumApp['default'];
    }, function (_matpompiliImgurUploadComponentsImgurUploadSettingsModal) {
      ImgurUploadSettingsModal = _matpompiliImgurUploadComponentsImgurUploadSettingsModal['default'];
    }],
    execute: function () {

      app.initializers.add('matpompili-imgur-upload', function (app) {
        app.extensionSettings['matpompili-imgur-upload'] = function () {
          return app.modal.show(new ImgurUploadSettingsModal());
        };
      });
    }
  };
});