import app from 'flarum/app';
import ImgurUploadSettingsModal from 'botfactoryit/imgur-upload/components/ImgurUploadSettingsModal';

app.initializers.add('botfactoryit-imgur-upload', () => {
	app.extensionSettings['botfactoryit-imgur-upload'] = () => app.modal.show(new ImgurUploadSettingsModal());
});
