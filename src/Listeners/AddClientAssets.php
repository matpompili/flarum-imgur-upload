<?php namespace BotFactory\ImgurUpload\Listeners;

use DirectoryIterator;
use Flarum\Event\ConfigureWebApp;
use Flarum\Event\ConfigureLocales;
use Illuminate\Contracts\Events\Dispatcher;

class AddClientAssets {
	public function subscribe(Dispatcher $events) {
		$events->listen(ConfigureWebApp::class, [$this, 'addAssets']);
		$events->listen(ConfigureLocales::class, [$this, 'addLocales']);
	}
	
	public function addAssets(ConfigureWebApp $app) {
		if ($app->isForum()) {
			$app->addAssets([
				__DIR__ . '/../../css/forum/forum.css',
				__DIR__ . '/../../js/forum/dist/extension.js',
			]);
			
			$app->addBootstrapper('botfactoryit/imgur-upload/main');
		}
		
		if ($app->isAdmin()) {
			$app->addAssets([
				__DIR__ . '/../../js/admin/dist/extension.js',
			]);
			
			$app->addBootstrapper('botfactoryit/imgur-upload/main');
		}
	}

	/*
	* Provides i18n files.
	*/
	public function addLocales(ConfigureLocales $event) {
		foreach (new DirectoryIterator(__DIR__.'/../../locale') as $file) {
			if ($file->isFile() && in_array($file->getExtension(), ['yml', 'yaml'])) {
				$event->locales->addTranslations($file->getBasename('.' . $file->getExtension()), $file->getPathname());
			}
		}
	}
}
