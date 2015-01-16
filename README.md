vastengine [![Build Status](https://travis-ci.org/Cynicollision/vastengine.svg?branch=master)](https://travis-ci.org/Cynicollision/vastengine)
==========

vastengine is a JavaScript game engine that utilizes the HTML Canvas. It is used to create 2D video games that run in the web browser, particularly on mobile devices (particularly Android).

The intention is to provide an all-in-one library to cover the foundation of game mechanics without becoming bloated with features that can otherwise be acheived in JavaScript. For instance, drawing primitive shapes on the canvas is already very simple: vastengine will make it easy to get the drawing context but will not implement its own method of drawing primitives. Instead, vastengine provides a game loop and management of assets (sounds, graphics) and game objects (visible entities in the game, such as the player and enemies). It is expected that the developer is at least experienced with JavaScript but vastengine is intended for beginner to intermediate use.

The following features are in development and/or planned for the first version of the engine:
* Game loop and state management.
* Image and audio resource management.
* Touch input handling (multi-touch likely in a future version).
* Rendering visible game components.

Future plans/ideas that I would like to see happen someday but so far are nowhere even close to being implemented:
* Visual game editor that generates JavaScript that uses vastengine (either in the browser or for the desktop). Game Maker 4.x inspired this project and it would be awesome to come full circle and create a next-generation version.
* WebGL support because I'm realizing the Canvas is rather slow...

### Special Thanks
This project depend heavily on the following pieces of software and I am extremely grateful for their existence:
* [grunt](https://github.com/gruntjs/grunt) & tasks:
    * [grunt-closure-compiler](https://github.com/gmarty/grunt-closure-compiler)
    * [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean)
    * [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy)
    * [grunt-contrib-jasmine](https://github.com/gruntjs/grunt-contrib-jasmine)
    * [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
    * [grunt-jsdoc](https://github.com/krampstudio/grunt-jsdoc)
* [jasmine](https://github.com/pivotal/jasmine)
* [travis-ci](https://travis-ci.org)
