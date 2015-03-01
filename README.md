vastengine [![Build Status](https://travis-ci.org/Cynicollision/vastengine.svg?branch=master)](https://travis-ci.org/Cynicollision/vastengine)
==========

vastengine is a work-in-progress JavaScript/HTML Canvas game engine. It is used to create 2D video games that run in the web browser, particularly on mobile devices (particularly Android).

The intention is to provide an all-in-one library to cover the foundation of game mechanics but not necessarily all of the details such as collision detection, particle effects, and others that are game-specific. vastengine provides a game loop and management of assets (sounds, graphics) and game objects (visible entities in the game, such as the player and enemies). It is expected that the developer is at least experienced with JavaScript but vastengine is intended for beginner to intermediate use. 

The following features are in development and/or planned for the first version of the engine:
* Game loop and state management.
* Image and audio resource management.
* Touch input handling.
* Rendering visible game components.
* Android "wrapper" to create native Android applications

Future plans/ideas that I would like to happen someday but so far are nowhere even close to being implemented:
* Visual game editor (either in the browser or for the desktop) that generates JavaScript that uses vastengine. Game Maker 4.x inspired this project and it would be awesome to come full circle and create a next-generation version.
* Multi-platform support.
* WebGL support because Canvas can be rather slow...
* 
### Documentation
Work in progress, but getting started on the [github pages site](http://cynicollision.github.io/vastengine).

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
