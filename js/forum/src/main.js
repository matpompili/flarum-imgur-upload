/*
* This file is part of imgur-upload.
*
* (c) Matteo Pompili <matpompili@gmail.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/
import { extend } from 'flarum/extend';
import TextEditor from 'flarum/components/TextEditor';
import Button from 'flarum/components/Button';

app.initializers.add('matpompili-imgur-upload', function() {
  extend(TextEditor.prototype, 'controlItems', function(items) {
    items.add('imgur-upload', (
      <div class="Button hasIcon imgur-upload-button">
      <i class="icon fa fa-fw fa-paperclip Button-icon"></i>
      <span class="Button-label">{app.translator.trans('matpompili-imgur-upload.forum.attach')}</span>
      <input type="file" accept="image/*" id="imgur-upload-input" name="imgur-upload-input"></input>
      </div>
    ));

    if (this.props.preview) {
      //Remove preview button, and add it to the end
      items.remove('preview');
      items.add('preview', Button.component({
        icon: 'eye',
        className: 'Button Button--icon',
        onclick: this.props.preview})
      );
    };
  });

  extend(TextEditor.prototype, 'init', function(){
    var textareaObj = this;
    $("#composer").on("change", "#imgur-upload-input", function() {
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = e.target.result.substr(e.target.result.indexOf(",") + 1, e.target.result.length);
        var icon = $(".imgur-upload-button > i");
        var buttonText = $(".imgur-upload-button > span.Button-label");
        var submitButton = $(".item-submit > button");
        icon.removeClass('fa-paperclip').addClass('fa-spin fa-circle-o-notch');
        buttonText.text(app.translator.trans('matpompili-imgur-upload.forum.loading')[0]);
        submitButton.attr("disabled", true);
        $.ajax({
          url: 'https://api.imgur.com/3/image',
          headers: {
            'Authorization': 'Client-ID '+ app.forum.attribute('imgurClientID')
          },
          type: 'POST',
          data: {
            'image': data,
            'type': 'base64'
          },
          success: function(response) {
            icon.removeClass('fa-spin fa-circle-o-notch').addClass('fa-check green');
            buttonText.text(app.translator.trans('matpompili-imgur-upload.forum.loaded')[0]);
            var linkString = '\n![alt text]('+response.data.link+')\n';
            textareaObj.insertAtCursor(linkString);
            $("#imgur-upload-input").val("");
            if (typeof textareaObj.props.preview !== 'undefined') {
              // the variable is defined
              textareaObj.props.preview();
            }
            setTimeout(function(){
              submitButton.attr("disabled", false);
              icon.removeClass('fa-check green').addClass('fa-paperclip');
              buttonText.text(app.translator.trans('matpompili-imgur-upload.forum.attach')[0]);
            },1000);
          }, error: function(response) {
            icon.removeClass('fa-spin fa-cog').addClass('fa-times red');
            buttonText.text(app.translator.trans('matpompili-imgur-upload.forum.error')[0]);
            console.log(response);
            setTimeout(function(){
              submitButton.attr("disabled", false);
              icon.removeClass('fa-times red').addClass('fa-paperclip');
              buttonText.text(app.translator.trans('matpompili-imgur-upload.forum.attach')[0]);
            },1000);
          }
        });
      };
      reader.readAsDataURL($("#imgur-upload-input")[0].files[0]);
    });
  });
});
