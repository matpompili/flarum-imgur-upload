import app from 'flarum/app';
import ImgurUploadSettingsModal from './components/ImgurUploadSettingsModal';

app.initializers.add('botfactoryit-imgur-upload', () => {
	app.extensionSettings['botfactoryit-imgur-upload'] = () => app.modal.show(new ImgurUploadSettingsModal());
});
