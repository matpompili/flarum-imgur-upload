/*
* This file is part of flarum-img-upload.
*
* (c) Matteo Pompili <matpompili@gmail.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { extend } from 'flarum/extend';
import app from 'flarum/app';
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
        <label>Imgur Client-ID</label>
        <input className="FormControl" bidi={this.setting('matpompili.image-upload.imgur')}/>
      </div>
    ];
  }
}

app.initializers.add('matpompili-flarum-img-upload', app => {
  app.extensionSettings['matpompili-flarum-img-upload'] = () => app.modal.show(new ImageUploadSettingsModal());
});
