# flarum-imgur-upload
**flarum-imgur-upload** is a [Flarum](https://github.com/flarum/flarum/) extension to support the upload of images to the popular website [Imgur](https://imgur.com/), and include the direct link of the image in the post.

>Flarum is a free, open-source forum software built with PHP and Mithril.js.

>Imgur is the best place to share and enjoy the most awesome images on the Internet.

## Features
With flarum-imgur-upload you can **attach** as many images as you want while writing your post, and it will automatically add the link to the uploaded image in your post!

It uses the Markdown language to include images, so you can also copy the link for other purposes.

You can also choose to resize images down to a maximum size before upload, reducing uploading times!

## Install
The only way to get flarum-imgur-upload is with composer: in your flarum folder run
  ```
  composer require matpompili/imgur-upload
  ```

## Configuration
Since **flarum-imgur-upload** uses Imgur API to upload your images, you will need an Imgur Client-ID. To get one simply register to the [Imgur](https://imgur.com/) website, and register an application [here](https://api.imgur.com/oauth2/addclient).
You need to choose a name for your application (e.g. My Forum), and select *OAuth 2 authorization without a callback URL* (as shown below).
![Imgur application configuration demo](https://i.imgur.com/WIcoUHW.png)

Once your application, which can be even your own website, has been registered, your Client-ID will be available [here](https://imgur.com/account/settings/apps). Simply put it in the configuration of the extension, in your admin page.

From there you can also set the maximum image size. If images are bigger than that they will be resized (keeping aspect raio) before being uploaded.

## Usage
While writing a post, or opening a new discussion, click on the *Attach* button. This will prompt the file chooser, if you're on a computer, or the gallery and/or camera if you're on mobile. After the image to upload has been selected, the uploading process will start (which may take some time, based on the image size and on connection quality). Once the process will be completed, the code to include the image will be automatically added in your composer. Have fun!
