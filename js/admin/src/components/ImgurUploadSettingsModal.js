/*
* This file is part of imgur-upload.
*
* (c) Matteo Pompili <matpompili@gmail.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/
import SettingsModal from 'flarum/components/SettingsModal';

export default class ImageUploadSettingsModal extends SettingsModal {
  className() {
    return 'ImageUploadSettingsModal Modal--small';
  }

  title() {
    return 'Imgur Upload Settings';
  }

  form() {
    return [
        <div className="Form-group">
          <label>Imgur Client ID (OAuth {app.translator.trans('matpompili-imgur-upload.admin.without')} callback)
          - <a href="https://api.imgur.com/oauth2/addclient"><small>{app.translator.trans('matpompili-imgur-upload.admin.get-id')}</small></a></label>
          <input className="FormControl" bidi={this.setting('matpompili.imgur-upload.clientID')}/>
        </div>,
        <p>{app.translator.trans('matpompili-imgur-upload.admin.leaveEmpty')}</p>,
        <div className="Form-group">
          <label>{app.translator.trans('matpompili-imgur-upload.admin.maxImageWidth')}</label>
          <input className="FormControl" bidi={this.setting('matpompili.imgur-upload.maxImageWidth')}/>
          <label>{app.translator.trans('matpompili-imgur-upload.admin.maxImageHeight')}</label>
          <input className="FormControl" bidi={this.setting('matpompili.imgur-upload.maxImageHeight')}/>
        </div>
    ];
  }
}
