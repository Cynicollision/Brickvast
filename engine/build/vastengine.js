'use strict';var vastengine=vastengine||{};
(function(){vastengine.AssetManager=function(a){this.assets=[];this.type=a;if(a!=vastengine.AssetType.IMAGE&&a!=vastengine.AssetType.AUDIO)throw'Invalid asset type "'+a+'"';};vastengine.AssetType={IMAGE:"image",AUDIO:"audio"};vastengine.AssetManager.prototype.add=function(a,b){this.assets.push({id:a,source:b,asset:void 0})};vastengine.AssetManager.prototype.getById=function(a){for(var b=0;b<this.assets.length;b++)if(this.assets[b].id===a)return this.assets[b].asset;throw"No asset exists with the given ID value.";
};vastengine.AssetManager.prototype.load=function(){for(var a=0;a<this.assets.length;a++)this.type===vastengine.AssetType.IMAGE?this.assets[a].asset=new Image:this.type===vastengine.AssetType.AUDIO&&(this.assets[a].asset=new Audio(this.assets[a].source)),this.assets[a].asset.src=this.assets[a].source}})();vastengine=vastengine||{};
(function(){vastengine.Canvas=function(){this.canvas=this.buildCanvas();this.backgroundScrollFactor=1;this.scaleFactor=2;this.canvas.onmousedown=function(a){vastengine.Input.onTouch(a)};this.canvas.onmouseup=function(a){vastengine.Input.onTouchEnd(a)}};vastengine.Canvas.prototype.buildCanvas=function(){var a=document.createElement("canvas");a.id="vastCanvas";a.className="canvasStlye";a.width=vastengine.Game.Config.canvasWidth;a.height=vastengine.Game.Config.canvasHeight;document.body.appendChild(a);
return a};vastengine.Canvas.prototype.getDrawingContext=function(){return this.canvas.getContext("2d")};vastengine.Canvas.prototype.setBackgroundColor=function(a){this.canvas.style.background=a};vastengine.Canvas.prototype.setBackgroundImage=function(a,b){this.canvas.style.backgroundImage="url("+a+")";b||(this.canvas.style.backgroundRepeat="no-repeat")};vastengine.Canvas.prototype.setBackgroundPosition=function(a,b){this.canvas.style.backgroundPosition=a+"px "+b+"px"};vastengine.Canvas.prototype.setScrollFactor=
function(a){this.backgroundScrollFactor=a};vastengine.Canvas.prototype.getCanvasWidth=function(){return this.canvas.width};vastengine.Canvas.prototype.getCanvasHeight=function(){return this.canvas.height};vastengine.Canvas.prototype.setCanvasSize=function(a,b){this.canvas.width=a;this.canvas.height=b};vastengine.Canvas.prototype.setScale=function(a){this.scaleFactor=a};vastengine.Canvas.prototype.getScale=function(){return this.scaleFactor};vastengine.Canvas.prototype.getViewRelativeX=function(a){return void 0!==
a.view?a.view.x:0};vastengine.Canvas.prototype.getViewRelativeY=function(a){return void 0!==a.view?a.view.y:0};vastengine.Canvas.prototype.drawElement=function(a){var b=this.getDrawingContext();b.save();a(this.getDrawingContext());b.restore()};vastengine.Canvas.prototype.draw=function(a){var b=this.getDrawingContext();b.clearRect(0,0,this.canvas.width,this.canvas.height);b.save();b.scale(this.scaleFactor,this.scaleFactor);var c=(vastengine.Game.Canvas.getCanvasWidth()-vastengine.Game.Canvas.getCanvasWidth()/
this.scaleFactor)/2,d=(vastengine.Game.Canvas.getCanvasHeight()-vastengine.Game.Canvas.getCanvasHeight()/this.scaleFactor)/2;vastengine.Game.Config.scaleFromCenter&&b.translate(-c,-d);c=this.getViewRelativeX(a);d=this.getViewRelativeY(a);this.setBackgroundPosition(-c*this.backgroundScrollFactor,-d*this.backgroundScrollFactor);a.sortEntities();a=a.getEntities();for(var e=0;e<a.length;e++)if(a[e].draw&&a[e].draw(),a[e]){var g=a[e].getImage();if(g)try{b.drawImage(g,a[e].x-c,a[e].y-d)}catch(f){vastengine.Game.setError("Failed drawing entity image: "+
g.src)}}this.getDrawingContext().restore()}})();vastengine=vastengine||{};
(function(){vastengine.Controller=function(){this.entities=[];this.view={x:0,y:0};this.onTouchEnd=this.onTouch=this.postStep=null};vastengine.Controller.prototype.setViewPosition=function(a,b){this.view.x=a;this.view.y=b};vastengine.Controller.prototype.step=function(){this.removeDestroyedEntities();for(var a=0;a<this.entities.length;a++)0!==this.entities[a].speed&&(this.entities[a].x+=Math.round(vastengine.MathUtil.getLengthDirectionX(this.entities[a].getSpeed(),this.entities[a].getDirection())/10),
this.entities[a].y+=Math.round(vastengine.MathUtil.getLengthDirectionY(this.entities[a].getSpeed(),this.entities[a].getDirection())/10)),this.entities[a].step&&this.entities[a].step();this.postStep&&this.postStep()};vastengine.Controller.prototype.setPostStep=function(a){this.postStep=a};vastengine.Controller.prototype.setOnTouch=function(a){this.onTouch=a};vastengine.Controller.prototype.setOnTouchEnd=function(a){this.onTouchEnd=a};vastengine.Controller.prototype.addEntity=function(a){this.entities.push(a)};
vastengine.Controller.prototype.getEntities=function(){return this.entities};vastengine.Controller.prototype.getEntityById=function(a){for(var b=0;b<this.entities.length;b++)if(this.entities[b].id===a)return this.entities[b]};vastengine.Controller.prototype.getEntitiesByType=function(a){for(var b=[],c=0;c<this.entities.length;c++)this.entities[c].type===a&&b.push(this.entities[c]);return b};vastengine.Controller.prototype.getEntitiesAtPosition=function(a,b,c){for(var d=[],e=0;e<this.entities.length;e++)this.entities[e].onPosition(a,
b)&&(c&&this.entities[e].type!==c||d.push(this.entities[e]));return d};vastengine.Controller.prototype.isPositionFree=function(a,b,c){for(var d=0;d<this.entities.length;d++)if(this.entities[d].onPosition(a,b)&&(!c||c===this.entities[d].type))return!1;return!0};vastengine.Controller.prototype.sortEntities=function(){this.entities.sort(function(a,b){return-(a.depth-b.depth)})};vastengine.Controller.prototype.removeDestroyedEntities=function(){void 0!==this.entities&&0<this.entities.length&&(this.entities=
this.entities.filter(function(a){return!a||!a.isDestroyed}))}})();vastengine=vastengine||{};
(function(){vastengine.Dialog=function(a,b,c,d,e){this.width=b;this.height=c;this.callback=e;this.buttonHeight=80;this.lineSpacing=50;this.textFont=this.lineSpacing-10+"pt Calibri";this.textPadding=10;this.textLines=this.buildTextLines(a,this.width-this.textPadding,this.textFont);0>=c&&(this.height=this.textLines.length*this.lineSpacing+this.textPadding+d.length*this.buttonHeight);this.y=this.x=0;vastengine.Game.Canvas&&(this.x=vastengine.Game.Canvas.getCanvasWidth()/2-this.width/2,this.y=vastengine.Game.Canvas.getCanvasHeight()/
2-this.height/2);this.buttons=this.buildButtons(d,this.x,this.y,this.width,this.height,this.buttonHeight);this.visible=!1;this.scale=function(){var a=0;return{get:function(){return a},update:function(){1>a&&(a+=0.25*(1-a));0.99<a&&(a=1)}}}()};vastengine.Dialog.prototype.buildTextLines=function(a,b,c){var d;vastengine.Game.Canvas&&(d=vastengine.Game.Canvas.getDrawingContext())&&(d.font=c);c=[];a=a.split(" ");for(var e="",g=0;g<a.length;g++){var f=e+a[g]+" ";d&&(d.measureText(f).width>b&&0<g?(c.push(e),
e=a[g]+" "):e=f)}c.push(e);return c};vastengine.Dialog.prototype.buildButtons=function(a,b,c,d,e,g){for(var f=[],h=a.length-1;0<=h;h--)f.push({text:a[a.length-h-1],x:b,y:c+e-(h+1)*g,w:d,h:g});return f};vastengine.Dialog.prototype.setVisible=function(a){this.visible=a};vastengine.Dialog.prototype.isVisible=function(){return this.visible};vastengine.Dialog.prototype.onTouch=function(a,b){for(var c=-1,d=0;d<this.buttons.length;d++)a>this.buttons[d].x&&a<this.buttons[d].x+this.buttons[d].w&&b>this.buttons[d].y&&
b<this.buttons[d].y+this.buttons[d].h&&(c=d);-1<c&&(vastengine.Game.setDialog(void 0),this.doCallback(c))};vastengine.Dialog.prototype.doCallback=function(a){this.callback&&this.callback(a)};vastengine.Dialog.prototype.draw=function(){if(this.visible){var a=vastengine.Game.Canvas.getDrawingContext();a.save();this.scale.update();a.fillStyle="#000";a.globalAlpha=0.5;a.fillRect(0,0,vastengine.Game.Canvas.getCanvasWidth(),vastengine.Game.Canvas.getCanvasHeight());a.globalAlpha=1;a.shadowBlur=20;a.shadowColor=
"black";a.fillStyle="#FFF";a.fillRect(this.x+(this.width-this.width*this.scale.get())/2,this.y+(this.height-this.height*this.scale.get())/2,this.width*this.scale.get(),this.height*this.scale.get());a.shadowBlur=0;if(1===this.scale.get()){a.textBaseline="top";a.fillStyle="#000";a.font=this.textFont;for(var b=0;b<this.textLines.length;b++)a.fillText(this.textLines[b],this.x+this.textPadding,this.y+b*this.lineSpacing);a.font=this.buttonHeight/2+"pt Calibri";a.textAlign="center";a.textBaseline="middle";
for(b=0;b<this.buttons.length;b++)a.fillText(this.buttons[b].text,this.buttons[b].x+this.buttons[b].w/2,this.buttons[b].y+this.buttons[b].h/2)}a.restore()}}})();vastengine=vastengine||{};
(function(){vastengine.Entity=function(a,b){this.depth=this.y=this.x=0;this.type=a||"";this.id=b||0;this.isDestroyed=!1;this.height=this.width=this.direction=this.speed=0;this.draw=this.step=this.onTouchEnd=this.onTouch=null};vastengine.Entity.prototype.setOnTouch=function(a){this.onTouch=a};vastengine.Entity.prototype.setOnTouchEnd=function(a){this.onTouchEnd=a};vastengine.Entity.prototype.setStep=function(a){this.step=a};vastengine.Entity.prototype.setDraw=function(a){this.draw=a};vastengine.Entity.prototype.mouseup=
function(a,b){};vastengine.Entity.prototype.destroy=function(){this.isDestroyed=!0};vastengine.Entity.prototype.checkCollision=function(a){return!(this.x+this.width<a.x+1||a.x+a.width-1<this.x||this.y+this.height<a.y+1||a.y+a.height-1<this.y)};vastengine.Entity.prototype.onPosition=function(a,b){return a>this.x&&b>this.y&&a<this.x+this.width&&b<this.y+this.height};vastengine.Entity.prototype.getImage=function(){return this.image};vastengine.Entity.prototype.setImage=function(a){this.image=a};vastengine.Entity.prototype.setPosition=
function(a,b){this.x=a;this.y=b};vastengine.Entity.prototype.getX=function(){return this.x};vastengine.Entity.prototype.setX=function(a){this.x=a};vastengine.Entity.prototype.getY=function(){return this.y};vastengine.Entity.prototype.setY=function(a){this.y=a};vastengine.Entity.prototype.getSpeed=function(){return this.speed};vastengine.Entity.prototype.setSpeed=function(a){this.speed=a};vastengine.Entity.prototype.getDirection=function(){return this.direction};vastengine.Entity.prototype.setDirection=
function(a){this.direction=a};vastengine.Entity.prototype.setSize=function(a,b){this.width=a;this.height=b}})();var $vast=vastengine=vastengine||{};
(function(){function a(){vastengine.Game.Canvas.drawElement(function(a){a.save();a.fillStyle="White";a.font="normal 16pt Arial";a.fillText(vastengine.Game.getCurrentFPS()+" fps",64,96);a.restore()})}vastengine.Game=function(){this.activeDialog=this.activeController=null;this.state=vastengine.GameState.STOPPED};vastengine.GameState={STOPPED:0,RUNNING:1};vastengine.Game.Config={fps:60,canvasWidth:window.innerWidth,canvasHeight:window.innerHeight,scaleFromCenter:!1,debugShowFPS:!0};vastengine.Game.setState=
function(a){this.state=a};vastengine.Game.setActiveController=function(a){this.activeController=a};vastengine.Game.getActiveController=function(){return this.activeController};vastengine.Game.hasActiveControler=function(){return this.activeController?void 0!==this.activeController.view:!1};vastengine.Game.setDialog=function(a){a?(this.activeDialog=a,this.activeDialog.setVisible(!0),vastengine.Game.setState(vastengine.GameState.STOPPED)):(vastengine.Game.setState(vastengine.GameState.RUNNING),this.activeDialog.setVisible(!1),
this.activeDialog=null)};vastengine.Game.init=function(){vastengine.Game.Images=new vastengine.AssetManager(vastengine.AssetType.IMAGE);vastengine.Game.Audio=new vastengine.AssetManager(vastengine.AssetType.AUDIO);vastengine.Game.Canvas=new vastengine.Canvas};vastengine.Game.run=function(){function b(){return window.performance&&window.performance.now?window.performance.now():(new Date).getTime()}function c(){var f=b();for(e+=Math.min(1,(f-g)/1E3);e>d;)vastengine.Game.state===vastengine.GameState.RUNNING&&
vastengine.Game.hasActiveControler()&&vastengine.Game.getActiveController().step(d),e-=d;vastengine.Game.hasActiveControler()&&vastengine.Game.Canvas.draw(vastengine.Game.getActiveController());vastengine.Game.activeDialog&&vastengine.Game.activeDialog.isVisible()&&vastengine.Game.activeDialog.draw();vastengine.Game.Config.debugShowFPS&&a();g=f;requestAnimationFrame(c)}var d=1/vastengine.Game.Config.fps,e=0,g=b();vastengine.Game.state=vastengine.GameState.RUNNING;requestAnimationFrame(c)};vastengine.Game.getCurrentFPS=
function(){var a=(new Date).getMilliseconds(),c=1,d=0;return function(){var e=(new Date).getMilliseconds();a>e?(d=c,c=1):c+=1;a=e;return d}}();vastengine.Game.setError=function(a){var c="vastengine error: ";a&&(c+=a);throw c;}})();vastengine=vastengine||{};
(function(){vastengine.Input=function(){this.currentTouchY=this.currentTouchX=-1};vastengine.InputEventType={TOUCH_START:0,TOUCH_END:1};vastengine.Input.onTouch=function(a){this.onTouchEvent(vastengine.InputEventType.TOUCH_START,a.pageX,a.pageY)};vastengine.Input.onTouchEnd=function(a){this.onTouchEvent(vastengine.InputEventType.TOUCH_END,a.pageX,a.pageY)};vastengine.Input.onTouchEvent=function(a,b,c){var d=vastengine.Game.getActiveController(),e=vastengine.Game.Canvas.getScale(),g=(window.innerWidth-
vastengine.Game.Canvas.getCanvasWidth()/e)/2,f=(window.innerHeight-vastengine.Game.Canvas.getCanvasHeight()/e)/2;b/=e;c/=e;vastengine.Game.Config.scaleFromCenter&&(b+=g,c+=f);if(vastengine.Game.activeDialog){if(a===vastengine.InputEventType.TOUCH_START)vastengine.Game.activeDialog.onTouch(b,c)}else if(d)if(a===vastengine.InputEventType.TOUCH_START&&d.onTouch)d.onTouch(b+d.view.x,c+d.view.y);else if(d.onTouchEnd)d.onTouchEnd(b+d.view.x,c+d.view.y);if(vastengine.Game.state===vastengine.GameState.RUNNING)for(d=
d.getEntities(),g=0;g<d.length;g++)if(f=d[g],0<f.width&&0<f.height&&b>f.x&&c>f.y&&b<f.x+f.width&&c<f.y+f.height)if(a===vastengine.InputEventType.TOUCH_START&&f.onTouch)f.onTouch(b,c);else if(f.onTouchEnd)f.onTouchEnd(b,c)}})();vastengine=vastengine||{};(function(){vastengine.MathUtil={};vastengine.MathUtil.getPointDistance=function(a,b,c,d){return Math.sqrt((c-a)*(c-a)+(d-b)*(d-b))};vastengine.MathUtil.getPointDirection=function(a,b,c,d){a=180/Math.PI*Math.atan2(d-b,c-a);360<a?a-=360:0>a&&(a+=360);return a};vastengine.MathUtil.getLengthDirectionX=function(a,b){return Math.floor(a*Math.cos(Math.PI/180*b))};vastengine.MathUtil.getLengthDirectionY=function(a,b){return Math.floor(a*Math.sin(Math.PI/180*b))}})();
