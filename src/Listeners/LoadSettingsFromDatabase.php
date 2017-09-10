<?php namespace BotFactory\ImgurUpload\Listeners;

use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Event\PrepareApiAttributes;
use Flarum\Api\Serializer\ForumSerializer;

class LoadSettingsFromDatabase {
	protected $settings;
	
	protected $toLoadSettings = [
		'botfactoryit.imgur-upload.client_id'
	];

	public function __construct(SettingsRepositoryInterface $settings) {
		$this->settings = $settings;
	}

	public function subscribe(Dispatcher $events) {
		$events->listen(PrepareApiAttributes::class, [$this, 'prepareApiAttributes']);
	}
	
	/*
	* Get the setting values from the database and make them available
	* in the forum.
	*/
	public function prepareApiAttributes(PrepareApiAttributes $event) {
		if ($event->isSerializer(ForumSerializer::class)) {
			foreach ($this->toLoadSettings as $setting) {
				$event->attributes[$setting] = $this->settings->get($setting);
			}
		}
	}
}
