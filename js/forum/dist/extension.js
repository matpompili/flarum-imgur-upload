'use strict';

System.register('botfactoryit/imgur-upload/main', ['flarum/extend', 'flarum/components/TextEditor', 'flarum/components/Button'], function (_export, _context) {
	"use strict";

	var extend, TextEditor, Button;


	/*
 * This function checks if x is a number
 */
	function isNumber(x) {
		return !(isNaN(x) || x == '');
	}
	return {
		setters: [function (_flarumExtend) {
			extend = _flarumExtend.extend;
		}, function (_flarumComponentsTextEditor) {
			TextEditor = _flarumComponentsTextEditor.default;
		}, function (_flarumComponentsButton) {
			Button = _flarumComponentsButton.default;
		}],
		execute: function () {

			app.initializers.add('botfactoryit-imgur-upload', function () {
				/*
    * This adds the Attach button
    */
				extend(TextEditor.prototype, 'controlItems', function (items) {
					items.add('imgur-upload', m(
						'div',
						{ 'class': 'Button hasIcon imgur-upload-button' },
						m('i', { 'class': 'icon fa fa-fw fa-picture-o Button-icon' }),
						m('span', { 'class': 'Button-label' }),
						m('input', { type: 'file', accept: 'image/*', id: 'imgur-upload-input', name: 'imgur-upload-input' })
					));

					// If we are editing a post, the preview method is defined
					if (this.props.preview) {
						// Remove preview button, and add it to the end (it just looks nicer)
						var previewButton = items.get('preview');
						items.remove('preview');
						items.add('preview', previewButton);
					};
				});

				/*
    * This add a listner, with Jquery, to the Attach button. If a file is selected
    * it gets upload with Imgur API. If the upload is a succes it displays the
    * link in the Composer, otherwise it print the error to the console and shows
    * an error on the Attach button. In any case it gets prepared for a new upload
    */
				extend(TextEditor.prototype, 'init', function () {
					var _this = this;

					//Adds a listener for changes in the file input field
					$('#composer').on('change', '#imgur-upload-input', function () {
						// Get the elements with jQuery to act on them later
						var buttonDiv = $('.imgur-upload-button');
						var icon = $('.imgur-upload-button > i');
						var buttonText = $('.imgur-upload-button > span.Button-label');
						var submitButton = $('.item-submit > button');

						// Show a loading icon and a loading text
						icon.removeClass('fa-picture-o').addClass('fa-spin fa-circle-o-notch');
						buttonText.text(app.translator.trans('botfactoryit-imgur-upload.forum.loading')[0]);
						buttonDiv.addClass('loading');

						// Disable the submit button until the upload is completed
						submitButton.attr('disabled', true);

						var file = $("#imgur-upload-input")[0].files[0];

						var formData = new FormData();
						formData.append('image', file);

						$.ajax({
							url: 'https://api.imgur.com/3/image',
							headers: {
								'Authorization': 'Client-ID ' + app.forum.attribute('botfactoryit.imgur-upload.client_id')
							},
							type: 'POST',
							data: formData,
							cache: false,
							contentType: false,
							processData: false,
							success: function success(response) {
								// Remove the loading icon and text, and show the success
								icon.removeClass('fa-spin fa-circle-o-notch').addClass('fa-check green');
								buttonText.text(app.translator.trans('botfactoryit-imgur-upload.forum.loaded')[0]);

								// Get the link to the uploaded image and put https instead of http
								var imageLink = response.data.link;
								var thumbnailLink = imageLink;

								if (response.data.width > 1024) {
									var extensionIndex = thumbnailLink.lastIndexOf('.');
									thumbnailLink = thumbnailLink.slice(0, extensionIndex) + 'h' + thumbnailLink.slice(extensionIndex);
								}

								var stringToInject = '';
								stringToInject += '[URL=' + imageLink + ']';
								stringToInject += '[IMG]' + thumbnailLink + '[/IMG]';
								stringToInject += '[/URL]';
								stringToInject += '\n';

								_this.insertAtCursor(stringToInject);

								$('#imgur-upload-input').val('');

								// After 1 second, re-enable upload
								setTimeout(function () {
									//Enable the submit button
									submitButton.attr('disabled', false);

									// Restore the Attach button for a new upload
									icon.removeClass('fa-check green').addClass('fa-picture-o');
									buttonDiv.removeClass('loading');

									buttonText.text('');
								}, 2000);
							},
							error: function error(response) {
								// Remove the loading icon and text, and show the error
								icon.removeClass('fa-spin fa-circle-o-notch').addClass('fa-times red');
								buttonText.text(app.translator.trans('botfactoryit-imgur-upload.forum.error')[0]);
								buttonDiv.removeClass('loading');

								// Output the error to the console, for debug purposes
								console.log(response);

								setTimeout(function () {
									// Enable the submit button
									submitButton.attr('disabled', false);

									// Restore the Attach button for a new upload
									icon.removeClass('fa-times red').addClass('fa-picture-o');
									buttonDiv.removeClass('loading');

									buttonText.text('');
								}, 2000);
							}
						});
					});
				});
			});
		}
	};
});