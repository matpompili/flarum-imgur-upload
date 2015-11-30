import SettingsModal from 'flarum/components/SettingsModal';

export default class ImageUploadSettingsModal extends SettingsModal {
  className() {
    return 'ImageUploadSettingsModal Modal--small';
  }

  title() {
    return 'Image Upload Settings';
  }

  form() {
    return [
      <div className="Form-group">
        <label>Image Upload</label>
        <input className="FormControl" bidi={this.setting('matpompili.img-upload.imgur')}/>
      </div>
    ];
  }
}
