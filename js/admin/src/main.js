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

import ImageUploadSettingsModal from 'matpompili/flarum-img-upload/components/ImageUploadSettingsModal';

app.initializers.add('matpompili-flarum-img-upload', app => {
  app.extensionSettings['matpompili-flarum-img-upload'] = () => app.modal.show(new ImageUploadSettingsModal());
});
