import SettingsModal from 'flarum/components/SettingsModal';

export default class ImgurUploadSettingsModal extends SettingsModal {
	className() {
		return 'ImgurUploadSettingsModal Modal--small';
	}

	title() {
		return app.translator.trans('botfactoryit-imgur-upload.admin.settings.title');
	}

	form() {
		return [
			<div className="Form-group">
				<label>Imgur Client ID</label>
				<input className="FormControl" bidi={this.setting('botfactoryit.imgur-upload.client_id')}/>
			</div>
		];
	}
}
