/*
* This file is part of imgur-upload.
*
* (c) Matteo Pompili <matpompili@gmail.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/
import { extend } from 'flarum/extend';
import app from 'flarum/app';
import ImgurUploadSettingsModal from 'matpompili/imgur-upload/components/ImgurUploadSettingsModal';

app.initializers.add('matpompili-imgur-upload', app => {
  app.extensionSettings['matpompili-imgur-upload'] = () => app.modal.show(new ImgurUploadSettingsModal());
});
