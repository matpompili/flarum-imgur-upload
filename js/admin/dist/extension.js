System.register('matpompili/flarum-img-upload/components/ImageUploadSettingsModal', ['flarum/components/SettingsModal'], function (_export) {
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
            return 'Image Upload Settings';
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
                'Image Upload'
              ),
              m('input', { className: 'FormControl', bidi: this.setting('matpompili.img-upload.imgur') })
            )];
          }
        }]);
        return ImageUploadSettingsModal;
      })(SettingsModal);

      _export('default', ImageUploadSettingsModal);
    }
  };
});;
System.register('matpompili/flarum-img-upload/main', ['flarum/extend', 'flarum/app', 'matpompili/flarum-img-upload/components/ImageUploadSettingsModal'], function (_export) {
  /*
  * This file is part of flarum-img-upload.
  *
  * (c) Matteo Pompili <matpompili@gmail.com>
  *
  * For the full copyright and license information, please view the LICENSE
  * file that was distributed with this source code.
  */

  'use strict';

  var extend, app, ImageUploadSettingsModal;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumApp) {
      app = _flarumApp['default'];
    }, function (_matpompiliFlarumImgUploadComponentsImageUploadSettingsModal) {
      ImageUploadSettingsModal = _matpompiliFlarumImgUploadComponentsImageUploadSettingsModal['default'];
    }],
    execute: function () {

      app.initializers.add('matpompili-flarum-img-upload', function (app) {
        app.extensionSettings['matpompili-flarum-img-upload'] = function () {
          return app.modal.show(new ImageUploadSettingsModal());
        };
      });
    }
  };
});