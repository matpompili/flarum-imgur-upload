<?php

/*
* This file is part of imgur-upload.
*
* (c) Matteo Pompili <matpompili@gmail.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

use DirectoryIterator;
use Flarum\Event\PrepareApiAttributes;
use Flarum\Event\ConfigureLocales;
use Flarum\Event\ConfigureClientView;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events) {
  $events->subscribe(SettingsLoader::class);
  $events->listen(ConfigureLocales::class, function (ConfigureLocales $event) {
    foreach (new DirectoryIterator(__DIR__ .'/locale') as $file) {
      if ($file->isFile() && in_array($file->getExtension(), ['yml', 'yaml'])) {
        $event->locales->addTranslations($file->getBasename('.' . $file->getExtension()), $file->getPathname());
      }
    }
  });
  $events->listen(ConfigureClientView::class, function (ConfigureClientView $event) {
    if ($event->isForum()) {
      $event->addAssets([
        __DIR__.'/css/forum/forum.css',
        __DIR__.'/js/forum/dist/extension.js',
      ]);
      $event->addBootstrapper('matpompili/imgur-upload/main');
    }
    if ($event->isAdmin()) {
      $event->addAssets([
        __DIR__.'/js/admin/dist/extension.js',
      ]);
      $event->addBootstrapper('matpompili/imgur-upload/main');
    }
  });
};

class SettingsLoader {
  protected $settings;

  public function __construct(SettingsRepositoryInterface $settings) {
    $this->settings = $settings;
  }

  public function subscribe(Dispatcher $events) {
    $events->listen(PrepareApiAttributes::class, [$this, 'prepareApiAttributes']);
  }

  public function prepareApiAttributes(PrepareApiAttributes $event) {
    if ($event->isSerializer(ForumSerializer::class)) {
      $event->attributes['imgurClientID'] = $this->settings->get('matpompili.imgur-upload.clientID');
      $event->attributes['test'] = 'prova';
    }
  }
}
