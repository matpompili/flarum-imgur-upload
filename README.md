# flarum-imgur-upload
**flarum-imgur-upload** is a [Flarum](https://github.com/flarum/flarum/) extension to support the upload of images to the popular website [Imgur](http://imgur.com/), and include the direct link of the image in the post.

>Flarum is a free, open-source forum software built with PHP and Mithril.js.

>Imgur is the best place to share and enjoy the most awesome images on the Internet.

## Features
With flarum-imgur-upload you can **attach** as many images as you want while writing your post, and it will automatically add the link to the uploaded image in your post!

It uses the Markdown language to include images, so you can also copy the link for other purposes.

## Install
The easiest way to get flarum-imgur-upload is with composer: in your flarum folder run
  ```
  composer require matpompili/flarum-imgur-upload
  ```
### Other ways to install
If you don't want to use composer, you can get the extension in one these two ways:
  1. Clone this repository in your `flarum/extensions` folder with
  ```
  git clone https://github.com/matpompili/flarum-latex.git matpompili-latex
  ```
  2. Download the latest version with the **Download ZIP** button on the top right of this page, and extract it in your `flarum/extensions`. Rename the extracted folder to `matpompili-latex`.

## Configuration
Since **flarum-imgur-upload** uses Imgur API to upload your images, you will need an Imgur Client-ID. To get one simply register to the [Imgur](http://imgur.com/) website, and register an application. Once your application, which can be even your own website, has been registered, your Client-ID will be available. Simply put it in the configuration of the extension, in your admin page.

## Usage
While writing a post, or opening a new discussion, click on the *Attach* button. This will prompt the file chooser, if you're on a computer, or the gallery and/or camera if you're on mobile. After the image to upload has been selected, the uploading process will start (which may take some time, based on the image size and on connection quality). Once the process will be completed, the code to include the image will be automatically added in your composer. Have fun!
