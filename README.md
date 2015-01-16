vastengine [![Build Status](https://travis-ci.org/Cynicollision/vastengine.svg?branch=master)](https://travis-ci.org/Cynicollision/vastengine)
==========

vastengine is a 2D game engine written in JavaScript. It is currently in very early stages of development. It is used to create video games that run in the web browser, particularly on mobile devices. Desktop browsers are of course to be supported, but for the time being there are no plans to support keyboard input. 

The intention is to be an all-in-one library to cover the foundation (game loop, asset management, etc.) without becoming bloated with features that can otherwise be acheived in JavaScript. For instance, drawing primitive shapes on the canvas is already very simple: vastengine will make it easy to get the drawing context but will not implement its own method of drawing primitives. It is expected that the developer is at least experienced with JavaScript.

The following features are in development and/or planned for the first version of the engine:
* Game loop and state management.
* Image and audio resource management.
* Touch input handling (multi-touch likely in a future version).
* Game state saving/loading support.
* Rendering visible game components

Future plans/ideas that I would like to see happen someday but so far are nowhere even close to being implemented:
* Create a repo (I really like the name "vastgap") that provides Phonegap pre-configured with vastengine for various platforms (e.g. Android, IOS). 
* Visual game editor that generates JavaScript that uses vastengine (either in the browser or for the desktop). Game Maker 4.x inspired this project and it would be awesome to come full circle and create a similar application.

### Special Thanks
This project depend heavily on the following pieces of software and I am extremely grateful for their existence:
* [grunt](https://github.com/gruntjs/grunt) & tasks:
    * [grunt-closure-compiler](https://github.com/gmarty/grunt-closure-compiler)
    * [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy)
    * [grunt-contrib-jasmine](https://github.com/gruntjs/grunt-contrib-jasmine)
    * [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
* [jasmine](https://github.com/pivotal/jasmine)
* [travis-ci](https://travis-ci.org)
