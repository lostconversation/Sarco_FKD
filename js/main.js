if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
            var container, stats;
            var cross;

var camera, controls, scene, renderer, btn, stars=[], rains=[], pivot, startPosition=[], object, flatTarget=[];
var fov = 70, zoomFov = 200, currentFov, camTween;
var geometry, material;
var isDragged = 0;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var hovering = 0;
var objects = [];
var circleClick = [];
var clickTime = 1;
var inside = 0;
var page;
var audioLoaded = 0;
var maxVolume = .3;
var fadeVolume = 50;
var currentEP = 1;
var mouseDown = 0;
var showDrag = 1;
var nameUp = 0;
var nameUpClicked;
var movingMouse = 0;
var mouseClickX = 0;
var mouseClickY = 0;
var hit="T tri";
var audio = document.createElement('audio');
var songTitle = document.getElementById('songTitle');
var song1title = "1. A goodbye";
var song2title = "2. Down (feat. Veyl)";
var song3title = "3. South of Sun";
var song4title = "4. Globe";
var song5title = "5. Sura Novi";
var song6title = "6. We Were Promised Flying Cars";
var currentSong = 1;
var particleMaterial = new THREE.SpriteMaterial();

var matHigh = new THREE.MeshStandardMaterial( { flatShading: false, color: 0x2fe2e3  } );
var material1 = new THREE.MeshBasicMaterial( { flatShading: false, color: 0x2fe2e3, transparent:true  } ); //blue
var material2t = new THREE.MeshLambertMaterial( { flatShading: false, color: 0xec6078, emissive: 0x1f0d10, transparent: true, side: THREE.DoubleSide  } );// rosa 0xec6078
var material2q = new THREE.MeshStandardMaterial( { flatShading: false, color: 0xec6078, emissive: 0x1f0d10, transparent: true, side: THREE.DoubleSide  } );
var material2c = new THREE.MeshPhongMaterial( { flatShading: false, color: 0xec6078, emissive: 0x1f0d10, transparent: true, side: THREE.DoubleSide  } );

var worldWidth = 256, worldDepth = 256,
worldHalfWidth = worldWidth / 2, worldHalfDepth = worldDepth / 2;
var clock = new THREE.Clock();
var pivot = new THREE.Group();


var randGround1 = 40//Math.floor((Math.random() * 200) + 100);
var randGround2 = .4

var firstTime = 1;
var menu=0;
var flag = 0;
var sound = 0;



var query = "(-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2), (min-resolution: 192dpi)";
 
if (matchMedia(query).matches) {
  // do high-dpi stuff
  var retinaCheck = 1;
  if (/Mobi/.test(navigator.userAgent)) {
    www = window.innerWidth/2;
    hhh = screen.height/2;
}else{
www = window.innerWidth/2;
hhh = window.innerHeight/2;
}


} else {
  // do non high-dpi stuff
  var retinaCheck = 2;
  var www = window.innerWidth/1;
  var hhh = window.innerHeight/1;
}






// window.addEventListener("touchmove", rayHover, false);

window.addEventListener( 'resize', onWindowResize, false );
window.addEventListener( 'touchstart', onMouseDown, false);
window.addEventListener( 'touchmove', onMouseMove, false);
window.addEventListener( 'touchend', onMouseUp, false );
window.addEventListener( 'mousedown', onMouseDown, false);
window.addEventListener( 'mouseup', onMouseUp, false );
window.addEventListener( 'mousemove', onMouseMove, false );
// window.addEventListener( "wheel", zoom, false );

window.onblur = function() {
  
  if (sound == 1){
    audio=this.audio;
  // var audio = eval("this.audio" + currentEP);
        // if (!fadeIn){}else{clearInterval(fadeIn)};
        // if (!fadeOut){}else{clearInterval(fadeOut)};
        // audio.volume = 1;
        audio.pause();
        // var fadeOut = setInterval(function(){
        //   // console.log(maxVolume, audio.volume)
        //           audio.volume= audio.volume - .005;
        //           if (audio.volume <= 0.01){
        //             // console.log("done")
        //             audio.pause(); 
                    
        //             audio.volume=maxVolume;
        //             clearInterval(fadeOut);
        //           }
        //         },fadeVolume/2);
  }
};

window.onfocus = function() {
  if (sound == 1){
    audio=this.audio;
        audio.volume=0;
        audio.play();  
        var fadeIn = setInterval(function(){
          audio.volume+=.005;
          if (audio.volume >= maxVolume){
            audio.volume=maxVolume;
            clearInterval(fadeIn);
          }
        },fadeVolume*2);
  }
};



var clock = new THREE.Clock();

window.scene = scene;
window.THREE = THREE;



document.addEventListener("DOMContentLoaded", function(event) { 

$('#btnTop').fadeOut();
  $('#nav-icon').click(function(){
    $(this).toggleClass('open');
  });


// TouchEmulator();
Sound();
init();
addStars();
animateStars();
addGround();
obj1();
animate();

}); // end document.ready



function onMouseDown( event ){


    flag = 0;
    mouseDown = 1;
    isDragged = 1;
    // clickTime = 1;
    showDrag = 0;
    
    var drag = document.getElementById('drag');
    drag.style.visibility='hidden'; 
    if (/Mobi/.test(navigator.userAgent)) {     
      mouseClickX = ( event.touches[0].clientX / www ) * retinaCheck - 1;
      mouseClickY =  - ( event.touches[0].clientY / hhh ) * retinaCheck + 1;
      mouse.x = mouseClickX;
      mouse.y = mouseClickY;
      hovering = 1;
      if (inside == 0){
      rayHover( event );
    }
      // console.log( event.touches[0].clientX, www, mouseClickX)
    } else{
    mouseClickX = ( event.clientX / www ) * retinaCheck - 1;
    mouseClickY =  - ( event.clientY / hhh ) * retinaCheck + 1;
    // console.log(event.touches[0].clientX)
  }

  rayCastDrag( event );
    if(hovering==1){
     clickTime = 1;
  }
};

function onMouseMove( event ){
  // console.log("mooove");
  if (hovering==1){
    rayCastDrag( event );
  }

  if (/Mobi/.test(navigator.userAgent)) {
      mouse.x = ( event.touches[0].clientX / www ) * retinaCheck - 1;
      mouse.y =  - ( event.touches[0].clientY / hhh ) * retinaCheck + 1;
  }else{
      mouse.x = ( event.clientX / www ) * retinaCheck - 1;
      mouse.y = - ( event.clientY / hhh ) * retinaCheck + 1;
}
};

function onMouseUp( event ){
  // console.log(controls.enabled)
  isDragged = 0;
  mouseDown = 0;
  if (/Mobi/.test(navigator.userAgent)) {
      mouse.x = ( event.clientX / www ) * retinaCheck - 1;
      mouse.y = - ( event.clientY / hhh ) * retinaCheck + 1;
  }
    var xx = Math.abs(mouseClickX - mouse.x);
    var yy = Math.abs(mouseClickY - mouse.y);
    // console.log(xx, mouseClickX, mouse.x)
 
  // console.log(xx)
  if (xx > 0.04 || yy > 0.04){
    flag=1; 
  }else{
    flag=0;
     if(inside==0){
      clickTime=0;
    }
  }



    if (flag == 0){
        // console.log("click");
      if(clickTime==1){
          // non-clickable
      }else{
        clickTime=0;
        // event.preventDefault();
        
        if (/Mobi/.test(navigator.userAgent)) {  
        // console.log(event.touches[0].clientX, www, mouseClickX, mouse.x, mouse)   
            // mouse.x = mouseClickX;
            // mouse.y = mouseClickY;
            // console.log("release")
          } else{
            if(nameUp==1){
            // mouse.x = ( event.clientX / www ) * retinaCheck - 1;
            // mouse.y = - ( event.clientY / hhh ) * retinaCheck + 1;
            }else{
            mouse.x = ( event.clientX / www ) * retinaCheck - 1;
            mouse.y = - ( event.clientY / hhh ) * retinaCheck + 1;
          // console.log(event.touches[0].clientX)
        }}
        raycaster.setFromCamera( mouse, camera );
        if (nameUp==1){
          var intersects = 'T tri';
        }else{
        var intersects = raycaster.intersectObjects( objects, true );
        }
        if ( intersects.length > 0 ) {

          clickTime=1;
          inside=1;
          inte = intersects[ 0 ];
          if (nameUp==1){
            
        }else{

          addClickSphere( inte );
        }
          document.getElementById('T-knowing').style.pointerEvents = 'none';
          document.getElementById('T-finding').style.pointerEvents = 'none';
          document.getElementById('T-delight').style.pointerEvents = 'none';

          new TWEEN.Tween( cluster.rotation).to({ x: 0, y: Math.PI*2 , z: 0 }, 5000 ).easing(TWEEN.Easing.Quartic.InOut).start();

          if(hit=="Q quad"){
              xx = 150;
              yy = -48;
              zz = 305;  
                          
            } else if(hit=="T tri"){
              xx = -363;
              yy = 143;
              zz = -46;
              
            } else if(hit=="C Tube"){
              xx = -217;
              yy = 107;
              zz = 185;
              
            }
            
            $('html,body').css('cursor', 'crosshair');
            controls.enabled = false;
              
            new TWEEN.Tween( camera.position).to({ x: xx, y: yy, z: zz }, 3000 ).easing(TWEEN.Easing.Quartic.Out).onComplete(function(){
              
              new TWEEN.Tween( camera.position).to({ x: 0, y: -50, z: 1200 }, 5000 ).easing(TWEEN.Easing.Quartic.InOut).onComplete(function(){
                // console.log("asdfasdf")
                  // camBack(page);
                  controls.enabled = true;
                  if (menu == 0){
                  clickTime = 0;
                  inside=0;
                  }
                  document.getElementById('T-knowing').style.pointerEvents = 'all';
                  document.getElementById('T-finding').style.pointerEvents = 'all';
                  document.getElementById('T-delight').style.pointerEvents = 'all';
                  var isaac = document.getElementById('isaac');
                  isaac.style.opacity=0;
                }).start();
             }).start();
              
  

      }
      }
    }
    else if(flag == 1){
      if(inside==0){
      clickTime=0;
    }
    }
    nameUp=0;
};





function onNameUp(){
  nameUp = 1;
  hovering=1;
  onMouseUp();
  // console.log(t1)
}

function rayCastDrag( event ){
        deltaX = -camera.position.x;
        deltaY = -camera.position.y;
        deltaZ = -camera.position.z;

        distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);

        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera( mouse, camera );
        // console.log(mouse.x, event.clientX, event.touches[0].clientX, mouseClickX)
        var intersects = raycaster.intersectObjects( flatTarget );
        // console.log(mouse.x)
        if ( intersects.length > 0 ) {
          // console.log(intersects[ 0 ])
          var geometry = new THREE.SphereGeometry( .004*distance,19,16 );
          var material1 = new THREE.MeshBasicMaterial( { color: 0x2fe2e3, transparent: true, opacity: .1, wireframe:true} );
          var circle1 = new THREE.Mesh( geometry, material1 );
          // circle1.position.copy( inte.point );
          circle1.lookAt(camera.position);
          circle1.name="clickSphere1";
          circle1.position.x = intersects[ 0 ].point.x;
          circle1.position.y = intersects[ 0 ].point.y;
          circle1.position.z = intersects[ 0 ].point.z;
          // circle1.position.z = distance;
          scene.add( circle1 );
          var ssss = 1
          var stuff = setInterval(function(){
            ssss-=.005;
            circle1.scale.set( ssss, ssss, ssss );
            // circle1.position.y-=10;
            if (ssss<=0){
            scene.remove(circle1);
            clearInterval(stuff);
          }
          },10)
          }
 }

function cameraMove( XX,YY,ZZ ) {
  // controls.target=(new THREE.Vector3(0,0,0));
const camera = this.camera;
const begin = camera.position.clone();
// const beginT = controls.target.clone();
var position = new THREE.Vector3(XX,YY,ZZ);


new TWEEN.Tween(begin)
  .to(position, 2000)
  .easing(TWEEN.Easing.Quartic.InOut)
  .onUpdate(function() {
    camera.position.set(this.x, this.y, this.z)//.normalize().negate();
  })
  .onComplete(function(){
    firstTime-=1;
    if (firstTime==0){
      
      clickTime=0;
      cameraMove( 0, -50, 1200 )
      

  }else{
    if (menu==1){
    clickTime = 1;
  }else if (firstTime ==-1){
    var drag = document.getElementById('drag');
    drag.style.visibility='visible'; 
      songTitle.textContent=song1title;
      if (/Mobi/.test(navigator.userAgent)) {
            
        } else{
          playSound(sound);
        }
      
  }}
  })
  .start();
}



function zoom(){
  // console.log("zoooom")
}

function Sound() {
    audio.src = "audio/Sarco_Track_"+1+".mp3";
    audio.volume=maxVolume;
    audio.onended = function() {
      nextSong();
    };
  }

function playSound(sound){
    this.sound=sound;
    audio=this.audio;
    this.maxVolume=maxVolume;
    var icoPlay = document.getElementById('icoPlay');
    var icoPause = document.getElementById('icoPause');
    var soundIcoBar = document.getElementById('g2');
    if (this.sound==1){ //---------------------------- PAUSE
        clearInterval(fadeIn);
        clearInterval(fadeOut);
        if (/Mobi/.test(navigator.userAgent)) {
            audio.pause(); 
        }else{
          var fadeOut = setInterval(function(){
                  audio.volume-=.01;
                  if (audio.volume <= 0.01){
                    // console.log("done")
                    audio.pause(); 
                    clearInterval(fadeOut);
                    audio.volume=maxVolume;
                  }
                },fadeVolume/2);
        }
        this.sound=0;
        soundIcoBar.style.opacity=1;
        var songTitle = document.getElementById('songTitle');
        songTitle.style.opacity=.2;
    }else if (this.sound==0){ //------------------------- PLAY
        clearInterval(fadeIn);
        clearInterval(fadeOut);
        audio.volume=0;
        audio.play(); 
        var fadeIn = setInterval(function(){
          audio.volume+=.01;
          if (audio.volume >= maxVolume){
            // console.log("done") 
            clearInterval(fadeIn);
            audio.volume=maxVolume;
          }
        },fadeVolume*2);
        this.sound=1;
        var soundIcoBar = document.getElementById('g2').style.opacity=0;
        var songTitle = document.getElementById('songTitle').style.opacity=1;
    }
} 

function nextSong(){
    currentSong+=1;
      if(currentSong==7){currentSong=1};
    sound=1;
    audio.src = 'audio/Sarco_Track_'+currentSong+'.mp3';
    audio.play();
    var songTitle = document.getElementById('songTitle');
    songTitle.style.opacity=1;
    var songTit = eval("song"+currentSong+"title");
    songTitle.textContent= songTit;
    var soundIcoBar = document.getElementById('g2').style.opacity=0;
    
}


function init() {

this.www=www;
this.hhh=hhh;
// console.log(www,hhh)
scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000e12 );
scene.fog = new THREE.Fog( 0x000e12, 100,10000);
// projector = new THREE.Projector();
renderer = new THREE.WebGLRenderer({ 
  antialias: true
});
renderer.setPixelRatio( window.devicePixelRatio * 1 );
renderer.setSize( www, hhh );
var container = document.getElementById( 'container' );
container.appendChild( renderer.domElement );
camera = new THREE.PerspectiveCamera(70, www / hhh, 1, 10000 );
camera.position.z = 500;
camera.position.y = 12000;
controls = new THREE.OrbitControls( camera, container );
// controls.addEventListener( 'change', render ); // remove when using animation loop
controls.enableDamping = true;
controls.minPolarAngle = 0.4;
controls.maxPolarAngle = 2;
controls.dampingFactor = .08;
controls.rotateSpeed = 0.04;
controls.enableZoom = true;
controls.zoomSpeed = .2;
controls.minDistance = 200;
controls.maxDistance = 3000;
controls.enablePan = false;

// lights
var sphere = new THREE.SphereGeometry( 32, 16, 8 );



// directional light
directionalLight = new THREE.DirectionalLight( 0xec6078, 5);
directionalLight.position.set(-8, 14, 20);
// directionalLight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
directionalLight.castShadow = true;
// directionalLight.shadowCameraVisible = true;
scene.add( directionalLight );




light1 = new THREE.PointLight( 0xf16c9a, 155 ,711,14 );
// light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
scene.add( light1 );

light2 = new THREE.DirectionalLight( 0xec6078, 5);
// light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xf0000ff } ) ) );
light2.position.set( -200, -250, 80 );

}



function obj1(){

var geometry = new THREE.PlaneGeometry( 6000, 6000 );
var materialINV = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0.3, alphaTest: 0, visible: false } );
flatT = new THREE.Mesh( geometry, materialINV );
flatT.lookAt(camera.position);
flatT.name="flatTarget";
scene.add( flatT );
flatTarget.push(flatT)

  cluster = new THREE.Object3D();
  cluster.name="cluster"
  scene.add(cluster);


var ooo=0;

var loaderC1 = new THREE.OBJLoader( );
        loaderC1.load( 'obj/c1.obj', function ( object ) {
          object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
            child.material = material2c;
            ooo+=1;
        }
    } );
          object.position.x=10;
          
        object.rotation.y = 80.1;
        object.name="c1";
        cluster.add( object );
        objects.push( object );

});


var loaderT1 = new THREE.OBJLoader( );
        loaderT1.load( 'obj/t1.obj', function ( object ) {
          object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
            
            child.material.opacity=.2;
            child.material = material2t;
            ooo+=1;
        }
    } );
        object.rotation.y = 80;
        object.name="t1";
        cluster.add( object );
        objects.push( object );
});

var loaderQ1 = new THREE.OBJLoader( );
        loaderQ1.load( 'obj/q1.obj', function ( object ) {
          object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
            child.material = material2q;
            ooo+=1;
        }
    } );
          object.position.z=10;
          object.position.x=10;
        object.rotation.y = 80.01;
        object.name="q1";
        cluster.add( object );
        objects.push( object );
});




var loaderQ2 = new THREE.OBJLoader( );
        loaderQ2.load( 'obj/q2.obj', function ( object ) {
          object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
            child.material = material1;
            ooo+=1;
        }
    } );
          object.position.x=10;
          object.position.z=10
        object.rotation.y = 80.01;
        object.name="q2";
        cluster.add( object );
});

var loaderC2 = new THREE.OBJLoader( );
        loaderC2.load( 'obj/c2.obj', function ( object ) {
          object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
            child.material = material1;
            ooo+=1;
        }
    } );
        object.position.x=10;

        object.rotation.y = 80.1;
        object.name="c2";
        cluster.add( object );
        
});

var loaderT2 = new THREE.OBJLoader( );
        loaderT2.load( 'obj/t2.obj', function ( object ) {
          object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
            child.material = material1;
            ooo+=1;
        }
    } );
        object.rotation.y = 80;
        object.name="t2";
        cluster.add( object );

});


var go = setInterval(function(){
if(ooo>=6){
cameraMove( 0,-50,2000 );
clearInterval(go);
}
}, 2000);
}

function about(){

  if (menu==0){
    $("#about").fadeIn(1000).css({
     'pointer-events': 'all'
    });

  menu = 1;
  clickTime = 1;
  inside = 1;

  var logo = document.getElementById('logoSvg');
  logo.style.opacity=0;
  var tTitle = document.getElementById('T-title');
  tTitle.style.opacity=0;
      
  }  else if (menu==1){

    $("#about").fadeOut(1000).css({
       'pointer-events': 'none'
    });
    menu = 0;
    var logo = document.getElementById('logoSvg');
    logo.style.opacity=1;
    var tTitle = document.getElementById('T-title');
    tTitle.style.opacity=1; 
    clickTime = 0;
    inside = 0;
}
}



function addClickSphere( inte ){
          var size = 10;
          var geometry = new THREE.SphereGeometry( size, 333 );
          var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
          var circle = new THREE.Mesh( geometry, material );
          circle.position.copy( inte.point );
          circle.lookAt(camera.position)
          circle.name="clickSphere"
          scene.add( circle );

          var clickSph = setTimeout(function(){
            scene.remove(circle);
          },500);

}




function floorMove() {
  var ground = document.getElementsByName("Ground");
  var position = new THREE.Vector3(0,-1500,0);
  new TWEEN.Tween(ground)
  .to(position, 6000)
  .easing(TWEEN.Easing.Quartic.Out)
  .start();
}


function rayHover( event ){
      // event.preventDefault();
        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera( mouse, camera );
        // console.log(mouse, camera);
        var intersects = raycaster.intersectObjects( objects, true );
        // console.log(mouse);
        if ( intersects.length > 0 ) {
          
          var isaac = document.getElementById('isaac');
              isaac.style.opacity=1;
              // console.log(firstTime)
          hovering=1;
          $('html,body').css('cursor', 'pointer');
            hit = intersects[ 0 ].object.name;
            // console.log(hit)
            material1.opacity=.1;
            if(hit=="Q quad"){
              q1 = scene.getObjectByName('q1');
              q1.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                  // child.material = matHigh;
                  child.material.emissive.setHex( 0xff4a66 );
                }});
              t1 = scene.getObjectByName('t1');
              t1.traverse( function ( object ) { object.visible = false; } );
              c1 = scene.getObjectByName('c1');
              c1.traverse( function ( object ) { object.visible = false; } );
              ground = scene.getObjectByName('Ground');
              ground.material.opacity = .1;
              // $("#FKD").text("FINDING")
              var Tf = document.getElementById('T-finding');
              Tf.style.opacity=1; 
              var Tk = document.getElementById('T-knowing');
              Tk.style.opacity=.1; 
              var Td = document.getElementById('T-delight');
              Td.style.opacity=.1; 

            } else if(hit=="T tri"){
              t1 = scene.getObjectByName('t1');
              t1.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                  // child.material = matHigh;
                  child.material.emissive.setHex( 0xff4a66 );
                }});
              q1 = scene.getObjectByName('q1');
              q1.traverse( function ( object ) { object.visible = false; } );
              c1 = scene.getObjectByName('c1');
              c1.traverse( function ( object ) { object.visible = false; } );
              ground = scene.getObjectByName('Ground');
              ground.material.opacity = .1;
              // $("#FKD").text("DELIGHT")
              var Tf = document.getElementById('T-finding');
              Tf.style.opacity=.1; 
              var Tk = document.getElementById('T-knowing');
              Tk.style.opacity=.1; 
              var Td = document.getElementById('T-delight');
              Td.style.opacity=1; 
            } else if(hit=="C Tube"){
              c1 = scene.getObjectByName('c1');
              c1.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                  // child.material = matHigh;
                  child.material.emissive.setHex( 0xff4a66 );
                }});
              q1 = scene.getObjectByName('q1');
              q1.traverse( function ( object ) { object.visible = false; } );
              t1 = scene.getObjectByName('t1');
              t1.traverse( function ( object ) { object.visible = false; } );
              ground = scene.getObjectByName('Ground');
              ground.material.opacity = .1;
              // $("#FKD").text("KNOWING")
              var Tf = document.getElementById('T-finding');
              Tf.style.opacity=.1; 
              var Tk = document.getElementById('T-knowing');
              Tk.style.opacity=1; 
              var Td = document.getElementById('T-delight');
              Td.style.opacity=.1; 
            }
        }else{
          hovering=0;
          material1.opacity=1;
          var isaac = document.getElementById('isaac');
              isaac.style.opacity=0;
          // clickTime=0;
          // console.log(hit)
          $('html,body').css('cursor', 'default');
          ground = scene.getObjectByName('Ground');
          ground.material.opacity = 1;
          t1 = scene.getObjectByName('t1');
              t1.traverse( function ( object ) { object.visible = true; } );
              t1.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                  // child.material = material2t;
                  child.material.emissive.setHex(0x1f0d10);
                }});
          c1 = scene.getObjectByName('c1');
             c1.traverse( function ( object ) { object.visible = true; } );
             c1.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                  // child.material = material2c;
                  child.material.emissive.setHex(0x1f0d10);
                }});
          q1 = scene.getObjectByName('q1');
              q1.traverse( function ( object ) { object.visible = true; } );
              q1.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                  // child.material = material2q;
                  child.material.emissive.setHex(0x1f0d10);
                }});
              var Tf = document.getElementById('T-finding');
              Tf.style.opacity=1; 
              var Tk = document.getElementById('T-knowing');
              Tk.style.opacity=1; 
              var Td = document.getElementById('T-delight');
              Td.style.opacity=1; 

        }

}

function nameHover( hit ){
            clickTime=1;
            // hovering=1;
            material1.opacity=.2;
            if(hit=="Q quad"){
              q1 = scene.getObjectByName('q1');
              q1.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                  // child.material = matHigh;
                  child.material.emissive.setHex( 0xff4a66 );
                }});

              t1 = scene.getObjectByName('t1');
              t1.traverse( function ( object ) { object.visible = false; } );
              c1 = scene.getObjectByName('c1');
              c1.traverse( function ( object ) { object.visible = false; } );
              ground = scene.getObjectByName('Ground');
              ground.material.opacity = .1;
              // console.log(hit, ground)
              // $("#FKD").text("FINDING")
              var Tf = document.getElementById('T-finding');
              Tf.style.opacity=1; 
              var Tk = document.getElementById('T-knowing');
              Tk.style.opacity=.1; 
              var Td = document.getElementById('T-delight');
              Td.style.opacity=.1; 

            } else if(hit=="T tri"){

              t1 = scene.getObjectByName('t1');
              t1.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                  // child.material = matHigh;
                  child.material.emissive.setHex( 0xff4a66 );
                }});
              q1 = scene.getObjectByName('q1');
              q1.traverse( function ( object ) { object.visible = false; } );
              c1 = scene.getObjectByName('c1');
              c1.traverse( function ( object ) { object.visible = false; } );
              ground = scene.getObjectByName('Ground');
              ground.material.opacity = .1;
              // $("#FKD").text("DELIGHT")
              var Tf = document.getElementById('T-finding');
              Tf.style.opacity=0.1; 
              var Tk = document.getElementById('T-knowing');
              Tk.style.opacity=.1; 
              var Td = document.getElementById('T-delight');
              Td.style.opacity=1; 
              // console.log(Tf, Tk, Td)
            } else if(hit=="C Tube"){
              
              c1 = scene.getObjectByName('c1');
              c1.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                  // child.material = matHigh;
                  child.material.emissive.setHex( 0xff4a66 );
                }});
              q1 = scene.getObjectByName('q1');
              q1.traverse( function ( object ) { object.visible = false; } );
              t1 = scene.getObjectByName('t1');
              // t1.traverse( function ( object ) { object.visible = false; } );
              t1.visible=false;
              ground = scene.getObjectByName('Ground');
              ground.material.opacity = .1;
              
              // $("#FKD").text("KNOWING")
              var Tf = document.getElementById('T-finding');
              Tf.style.opacity=.1; 
              var Tk = document.getElementById('T-knowing');
              Tk.style.opacity=1; 
              var Td = document.getElementById('T-delight');
              Td.style.opacity=.1;
            }
}

function onWindowResize() {

camera.aspect = window.innerWidth / window.innerHeight;
if (retinaCheck == 2){
www = window.innerWidth;
hhh = window.innerHeight;
// renderer.setSize( window.innerWidth, window.innerHeight );
} else {
  if (/Mobi/.test(navigator.userAgent)) {
    www = window.innerWidth/2;
    hhh = screen.height/2;
}else{
www = window.innerWidth/2;
hhh = window.innerHeight/2;
}
// renderer.setSize( www, hhh );
}
renderer.setSize( www, hhh );
camera.updateProjectionMatrix();
// console.log(window.innerWidth)
}




function animate( event ) {
  flatT.lookAt(camera.position);
    TWEEN.update();
    pivot.rotation.y += 0.0006;
    ground.rotation.y += 0.0008;
    requestAnimationFrame( animate );
    controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
    render();
}

function render( event ) {
  var time = Date.now() * 0.0001;
  var delta = clock.getDelta();
  // console.log(clickTime)
  // if( object ) object.rotation.y -= 110.5 * delta;
  light1.position.x = Math.sin( time * 10.7 ) * 70;
  light1.position.y = Math.cos( time * 10.5 ) * 70;
  light1.position.z = Math.cos( time * 10.3 ) * 150;
  // }
    if (firstTime==1){
      cluster.rotation.y = (Math.cos( time * 10.5 ) * .1)+.1; //+=.003;
    }  
    if(clickTime==0){
      if (hovering==0){
        cluster.rotation.y = (Math.cos( time * 10.5 ) * .1)+.1; //+=.003;
      }
      if (/Mobi/.test(navigator.userAgent)) {  
      }else{
      rayHover( event );
      } 
  }
  // console.log(hovering, clickTime)
  light2.position.x = Math.sin( time * 10.7 ) * -530;
  light2.position.y = Math.cos( time * 10.5 ) * 540;
  light2.position.z = Math.cos( time * 10.3 ) * 1530;

  directionalLight.position.z = Math.cos( time * -3 ) * 50+30;
  renderer.render( scene, camera );
}

