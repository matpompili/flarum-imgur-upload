'use strict';

System.register('botfactoryit/imgur-upload/components/ImgurUploadSettingsModal', ['flarum/components/SettingsModal'], function (_export, _context) {
	"use strict";

	var SettingsModal, ImgurUploadSettingsModal;
	return {
		setters: [function (_flarumComponentsSettingsModal) {
			SettingsModal = _flarumComponentsSettingsModal.default;
		}],
		execute: function () {
			ImgurUploadSettingsModal = function (_SettingsModal) {
				babelHelpers.inherits(ImgurUploadSettingsModal, _SettingsModal);

				function ImgurUploadSettingsModal() {
					babelHelpers.classCallCheck(this, ImgurUploadSettingsModal);
					return babelHelpers.possibleConstructorReturn(this, (ImgurUploadSettingsModal.__proto__ || Object.getPrototypeOf(ImgurUploadSettingsModal)).apply(this, arguments));
				}

				babelHelpers.createClass(ImgurUploadSettingsModal, [{
					key: 'className',
					value: function className() {
						return 'ImgurUploadSettingsModal Modal--small';
					}
				}, {
					key: 'title',
					value: function title() {
						return app.translator.trans('botfactory-imgur-upload.admin.settings.title');
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
				return ImgurUploadSettingsModal;
			}(SettingsModal);

			_export('default', ImgurUploadSettingsModal);
		}
	};
});;
'use strict';

System.register('botfactoryit/imgur-upload/main', ['flarum/app', 'botfactoryit/imgur-upload/components/ImgurUploadSettingsModal'], function (_export, _context) {
	"use strict";

	var app, ImgurUploadSettingsModal;
	return {
		setters: [function (_flarumApp) {
			app = _flarumApp.default;
		}, function (_botfactoryitImgurUploadComponentsImgurUploadSettingsModal) {
			ImgurUploadSettingsModal = _botfactoryitImgurUploadComponentsImgurUploadSettingsModal.default;
		}],
		execute: function () {

			app.initializers.add('botfactoryit-imgur-upload', function () {
				app.extensionSettings['botfactoryit-imgur-upload'] = function () {
					return app.modal.show(new ImgurUploadSettingsModal());
				};
			});
		}
	};
});