System.register('matpompili/flarum-img-upload/main', ['flarum/extend', 'flarum/components/TextEditor', 'flarum/components/Button'], function (_export) {
  /*
  * This file is part of flarum-img-upload.
  *
  * (c) Matteo Pompili <matpompili@gmail.com>
  *
  * For the full copyright and license information, please view the LICENSE
  * file that was distributed with this source code.
  */

  //import Composer from 'flarum/components/Composer';

  'use strict';

  var extend, TextEditor, Button;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumComponentsTextEditor) {
      TextEditor = _flarumComponentsTextEditor['default'];
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton['default'];
    }],
    execute: function () {
      app.initializers.add('matpompili-flarum-img-upload', function () {
        extend(TextEditor.prototype, 'controlItems', function (items) {
          items.add('image-upload', m(
            'div',
            { 'class': 'Button hasIcon image-upload-button' },
            m('i', { 'class': 'icon fa fa-fw fa-paperclip Button-icon' }),
            m(
              'span',
              { 'class': 'Button-label' },
              'Allega'
            ),
            m('input', { type: 'file', accept: 'image/*', id: 'image-upload-input', name: 'image-upload-input' })
          ));

          if (this.props.preview) {
            //Remove preview button, and add it to the end
            items.remove('preview');
            items.add('preview', Button.component({
              icon: 'eye',
              className: 'Button Button--icon',
              onclick: this.props.preview }));
          };
        });

        extend(TextEditor.prototype, 'init', function () {
          var textareaObj = this;
          $("#composer").on("change", "#image-upload-input", function () {
            var reader = new FileReader();
            reader.onload = function (e) {
              var data = e.target.result.substr(e.target.result.indexOf(",") + 1, e.target.result.length);
              //$("#image_preview").attr("src", e.target.result);
              var icon = $(".image-upload-button > i");
              var buttonText = $(".image-upload-button > span.Button-label");
              var submitButton = $(".item-submit > button");
              icon.removeClass('fa-paperclip').addClass('fa-spin fa-circle-o-notch');
              buttonText.text("Caricando");
              submitButton.attr("disabled", true);
              $.ajax({
                url: 'https://api.imgur.com/3/image',
                headers: {
                  'Authorization': 'Client-ID 44a018e98db7cfa'
                },
                type: 'POST',
                data: {
                  'image': data,
                  'type': 'base64'
                },
                success: function success(response) {
                  icon.removeClass('fa-spin fa-circle-o-notch').addClass('fa-check green');
                  buttonText.text("Caricato!");
                  var linkString = '\n![alt text](' + response.data.link + ')\n';
                  textareaObj.insertAtCursor(linkString);
                  $("#image-upload-input").val("");
                  textareaObj.props.preview();
                  setTimeout(function () {
                    submitButton.attr("disabled", false);
                    icon.removeClass('fa-check green').addClass('fa-paperclip');
                    buttonText.text("Allega");
                  }, 1000);
                }, error: function error(response) {
                  icon.removeClass('fa-spin fa-cog').addClass('fa-times red');
                  buttonText.text("Errore");
                  console.log(response);
                  setTimeout(function () {
                    submitButton.attr("disabled", false);
                    icon.removeClass('fa-times red').addClass('fa-paperclip');
                    buttonText.text("Allega");
                  }, 1000);
                }
              });
            };
            reader.readAsDataURL($("#image-upload-input")[0].files[0]);
          });
        });
      });
    }
  };
});