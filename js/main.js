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
// mouse.x=0;
// mouse.y=0;
var objects = [];
var circleClick = [];
var clickTime = 1;
var inside = 0;
var page;
var maxVolume = .6;
var fadeVolume = 50;
var currentEP = 1;
var mouseDown = 0;
var showDrag = 1;
var movingMouse = 0;
var mouseClickX = 0;
var mouseClickY = 0;
var particleMaterial = new THREE.SpriteMaterial();
// gui = new dat.GUI();
var matHigh = new THREE.MeshStandardMaterial( { flatShading: false, color: 0x2fe2e3  } );
var material1 = new THREE.MeshBasicMaterial( { flatShading: false, color: 0x2fe2e3  } ); //blue
var material2t = new THREE.MeshLambertMaterial( { flatShading: false, color: 0xec6078, emissive: 0x1f0d10, transparent: true, side: THREE.DoubleSide  } );// rosa 0xec6078
var material2q = new THREE.MeshStandardMaterial( { flatShading: false, color: 0xec6078, emissive: 0x1f0d10, transparent: true, side: THREE.DoubleSide  } );
var material2c = new THREE.MeshPhongMaterial( { flatShading: false, color: 0xec6078, emissive: 0x1f0d10, transparent: true, side: THREE.DoubleSide  } );

var worldWidth = 256, worldDepth = 256,
worldHalfWidth = worldWidth / 2, worldHalfDepth = worldDepth / 2;
var clock = new THREE.Clock();
var pivot = new THREE.Group();
// var groundG = new THREE.Group();

var randGround1 = 40//Math.floor((Math.random() * 200) + 100);
var randGround2 = .4

var firstTime = 1;
var menu=0;
var flag = 0;
var sound = 0;
var soundLoaded = 0;


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

// var www = window.innerWidth;
// var hhh = window.innerHeight;

// document.getElementById("shot").addEventListener('click', takeScreenshot);
// document.addEventListener( 'click', onClick, false );






$(document).ready(function(){

// var audio_preload = 0;
// function launchApp(launch){
//   audio_preload++;
//   if ( audio_preload == 3 || launch == 1) {  // set 3 to # of your files
//     start();  // set this function to your start function
//   }

$('#btnTop').fadeOut();
  $('#nav-icon').click(function(){
    $(this).toggleClass('open');
  });

// window.addEventListener("touchmove", rayHover, false);

window.addEventListener( 'resize', onWindowResize, false );
window.addEventListener( 'touchstart', onMouseDown, false);
window.addEventListener( 'touchend', onMouseUp, false );
window.addEventListener( 'mousedown', onMouseDown, false);
window.addEventListener( 'mouseup', onMouseUp, false );
window.addEventListener( 'mousemove', onMouseMove, false );
// window.addEventListener( "wheel", zoom, false );


function onMouseDown( event ){


    flag = 0;
    mouseDown = 1;
    isDragged = 1;
    clickTime = 1;
    showDrag = 0;
    var drag = document.getElementById('drag');
    drag.style.visibility='hidden'; 
    if (/Mobi/.test(navigator.userAgent)) {     
      mouseClickX = ( event.touches[0].clientX / www ) * retinaCheck - 1;
      mouseClickY =  - ( event.touches[0].clientY / hhh ) * retinaCheck + 1;
      mouse.x = mouseClickX;
      mouse.y = mouseClickY;
      rayHover( event );
      // console.log(event.touches[0].clientX, www, mouseClickX)
    } else{
    mouseClickX = ( event.clientX / www ) * retinaCheck - 1;
    mouseClickY =  - ( event.clientY / hhh ) * retinaCheck + 1;
    // console.log(event.touches[0].clientX)
  }
};

function onMouseMove( event ){
  // console.log("dragging?")
  // clickTime=1;
  if (clickTime == 0){
    $("#drag").css({
       left:  event.pageX,
       top:   event.pageY-65
    });
    $('html,body').css('cursor', 'pointer');

}
  if (/Mobi/.test(navigator.userAgent)) {
      // mouse.x = ( event.touches[0].clientX / www ) * retinaCheck - 1;
      // mouse.y =  - ( event.touches[0].clientY / hhh ) * retinaCheck + 1;
  }else{
  mouse.x = ( event.clientX / www ) * retinaCheck - 1;
  mouse.y = - ( event.clientY / hhh ) * retinaCheck + 1;
  // movingMouse=1;
}
};

function onMouseUp( event ){
  isDragged = 0;
  mouseDown = 0;
  if (/Mobi/.test(navigator.userAgent)) {
    if (hovering==1){
      
    }else{
      mouse.x = 11;
      mouse.y = 11;
    }
      // mouse.x = ( event.touches[0].clientX / www ) * retinaCheck - 1;
      // mouse.y =  - ( event.touches[0].clientY / hhh ) * retinaCheck + 1;
  }
// clickTime=0;
    // if (/Mobi/.test(navigator.userAgent)) {  
    // // console.log(event.touches[0].clientX, www, mouseClickX, mouse.x, mouse)   
    //     mouse.x = mouseClickX;
    //     mouse.y = mouseClickY;
    //     console.log("release")
    //   }else{

    //   }
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



    if(flag == 0){

        // console.log("click");
        if(clickTime==1){
          // clickTime=0;
        // new TWEEN.Tween( camera.position).to({ z: 1500 }, 2000 ).easing(TWEEN.Easing.Quartic.InOut).start()
        // clickTime = 0;
      }else{
        clickTime=0;
        event.preventDefault();
        
        if (/Mobi/.test(navigator.userAgent)) {  
        // console.log(event.touches[0].clientX, www, mouseClickX, mouse.x, mouse)   
            // mouse.x = mouseClickX;
            // mouse.y = mouseClickY;
            // console.log("release")
          } else{
            mouse.x = ( event.clientX / www ) * retinaCheck - 1;
            mouse.y = - ( event.clientY / hhh ) * retinaCheck + 1;
          // console.log(event.touches[0].clientX)
        }
        raycaster.setFromCamera( mouse, camera );
        var intersects = raycaster.intersectObjects( objects, true );
          // console.log(hit, flag, clickTime)
          // if(hit!="no" && /Mobi/.test(navigator.userAgent)){
          //   intersects = hit;
          //   console.log(intersects)
          // }
          // console.log(mouse.x)
        if ( intersects.length > 0 ) {

          clickTime=1;
          inside=1;
          inte = intersects[ 0 ];
          addClickSphere( inte );
          var FKD = document.getElementById('FKD');
          FKD.classList.add('zoom');
          new TWEEN.Tween( cluster.rotation).to({ x: 0, y: 0, z: 0 }, 3000 ).easing(TWEEN.Easing.Quartic.InOut).start();
          // new TWEEN.Tween(FKD.scale).to({ x: 2, y: 2}).easing(TWEEN.Easing.Quartic.InOut).start();
          // console.log(FKD)
          // new TWEEN.TweenMax.to(KFD, .2, {transformPerspective:1000,scale:1, autoAlpha: 1,
          // transformOrigin:"50% 50%"});  
          // new TWEEN.Tween( FKD.position).to({ x: 0, y: 1330}, 2000 ).easing(TWEEN.Easing.Quartic.InOut).start()
          var prevEP = currentEP;
          var prevAudio = eval("this.audio" + currentEP);

          if(hit=="Q quad"){
              xx = 150;
              yy = -48;
              zz = 305;  
              currentEP=1;
              // audio.src=ep1;
              var cover = document.getElementById('coverPlayers');
              cover.src="img/1_The_Finding.jpg";
              var newTextTitle = "THE FINDING";
              var epText = document.getElementById('EPtext').textContent='Listen to the EP "THE FINDING"';
              
            } else if(hit=="T tri"){
              xx = -363;
              yy = 143;
              zz = -46;
              currentEP=3;
              // audio.src=ep2;
              var cover = document.getElementById('coverPlayers');
              cover.src="img/3_The_Delight.jpg";
              cover.style.opacity=1;
              var newTextTitle = "THE DELIGHT";
              var epText = document.getElementById('EPtext').textContent='Listen to the EP "THE DELIGHT"';
            } else if(hit=="C Tube"){
              xx = -217;
              yy = 107;
              zz = 185;
              currentEP=2;
              var cover = document.getElementById('coverPlayers');
              cover.src="img/2_The_Knowing.jpg";
              var newTextTitle = "THE KNOWING";
              var epText = document.getElementById('EPtext').textContent='Listen to the EP "THE KNOWING"';
            }
            
            $('html,body').css('cursor', 'default');
            controls.enabled = false;

              if (!prevEP){
              } else {
                var EPtitle = document.getElementById('EPtitle').textContent = newTextTitle;
                if (sound == 1 && currentEP != prevEP){   
                  var EPtitle = document.getElementById('EPtitle').style.opacity=0;
                  if (/Mobi/.test(navigator.userAgent)) {
                      prevAudio.pause(); 
                  }else{
                    var fadeOut = setInterval(function(){
                            prevAudio.volume-=.01;
                            if (prevAudio.volume <= 0.01){
                              // console.log("done")
                              prevAudio.pause(); 
                              clearInterval(fadeOut);
                              prevAudio.volume=maxVolume;
                              var EPtitle = document.getElementById('EPtitle').textContent = newTextTitle;
                            }
                          },fadeVolume/2);
                  }
                  playSound(sound);
                }
              }
              
              camDolly(100);
              
              var logo = document.getElementById('logoSvg');
              logo.style.opacity=0;
            new TWEEN.Tween( camera.position).to({ x: xx, y: yy, z: zz }, 3000 ).easing(TWEEN.Easing.Quartic.Out).onComplete(function(){
              // console.log(prevEP, currentEP)
              
              page = document.getElementById('finding');
              page.style.opacity=1; 
              var FKD = document.getElementById('FKD');
              FKD.style.opacity=0; 
              var back = document.getElementById('back');
              back.style.visibility="visible";
              if(/Mobi/.test(navigator.userAgent)) {
                back.style.opacity=0;
              }else{
                back.style.opacity=1;
              }    
              var backText = document.getElementById('backText');
              backText.style.visibility="visible"; 
              if(/Mobi/.test(navigator.userAgent)) {
                backText.style.opacity=1;
              }else{
                backText.style.opacity=0;
              }
               

              var menuu = document.getElementsByTagName('span');
              menuu[0].classList.add('colorBlack');
              menuu[1].classList.add('colorBlack');
              menuu[2].classList.add('colorBlack');

              var soundIco = document.getElementsByClassName('soundIco');
              soundIco[0].style.stroke="black"; // [1] è il sound_no.svg
              var EPtitle = document.getElementById('EPtitle');
              EPtitle.style.color="black";
            
              
              var dollyN = 1;
              camDolly(40)
              
              var dolly = setInterval(function(){
                dollyN += .00001;
                controls.dollyIn(dollyN);
                  if (dollyN >=1.0013){
                dollyN=1;
                      var audioPlayer = document.getElementById('coverPlayers');
                      audioPlayer.style.opacity=1; 
                      var playIcoSvg = document.getElementById('playIco');
                      playIcoSvg.style.pointerEvents = "all";
                      playIcoSvg.style.opacity=1; 
                clearInterval(dolly);
                  }
                }, 8);
              }).start();
              
  

      }
      }
    }
    else if(flag == 1){
      if(inside==0){
      clickTime=0;
    }
        // console.log("drag");
        // isDragged = 1;
    }
};



// var container = document.getElementById('container');
// container.onclick = function() {

  
      
// }


  


var clock = new THREE.Clock();




window.scene = scene;
window.THREE = THREE;
// TouchEmulator();
Sound();
init();
addStars();
animateStars();
addGround();
obj1();
animate();

}); // end document.ready

function rayCastDrag( event ){
        deltaX = -camera.position.x;
        deltaY = -camera.position.y;
        deltaZ = -camera.position.z;

        distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);

        // console.log(distance);
// mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
// mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        // var camZ = camera.position.z/1000;
        // console.log(camZ);
        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera( mouse, camera );
        // console.log(mouse.x, event.clientX, event.touches[0].clientX, mouseClickX)
        var intersects = raycaster.intersectObjects( flatTarget );
        // console.log(mouse.x)
        if ( intersects.length > 0 ) {
          // console.log(intersects[ 0 ])
          var geometry = new THREE.SphereGeometry( .005*distance,19,16 );
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
          },2)
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
    $("#drag").css({
       visibility: "visible"
       // left:  window.innerWidth/2-50,
       // top:   window.innerHeight/2+35
    });
  }}
  })
  .start();
}

function camBack(page){
  
  if (/Mobi/.test(navigator.userAgent)) {  
        // console.log(event.touches[0].clientX, www, mouseClickX, mouse.x, mouse)   
            mouse.x = 1000;
            mouse.y = 1000;          
  }
  
  // $("#particle").css({
  //                 'pointer-events': 'none',
  //                 'z-index': '-11'
  //               });
  var playIcoSvg = document.getElementById('playIco');
  playIcoSvg.style.pointerEvents = "none";
  playIcoSvg.style.opacity=0; 
  var cover = document.getElementById('coverPlayers');
  cover.style.opacity=0;
  var FKD = document.getElementById('FKD');
  FKD.style.opacity=.2;
  FKD.classList.remove('zoom');
  var back = document.getElementById('back');
  back.style.visibility="hidden"; 
  var backText = document.getElementById('backText');
  backText.style.visibility="hidden"; 
  var EPtitle = document.getElementById('EPtitle');
      EPtitle.style.color="white";
  var menuu = document.getElementsByTagName('span');
              menuu[0].classList.remove('colorBlack');
              menuu[1].classList.remove('colorBlack');
              menuu[2].classList.remove('colorBlack');
  // var page = document.getElementById('knowing')
  // var FKD = document.getElementById('FKD')
  // FKD.style.color="white";
  
  page.style.opacity=0; // page è #finding
  


  var dollyN = 1;
  setTimeout(function(){
  var dolly = setInterval(function(){
    dollyN -= .001;
    controls.dollyIn(dollyN);
    if (dollyN <=0.95){
      dollyN=1;
      xx = 0 //camera.position.x - 100;
      yy = -50 //camera.position.y - 100;
      zz = 2500 //camera.position.z - 200;
      // $("#knowing").fadeIn();
      
      controls.enabled = true;
      var logo = document.getElementById('logoSvg');
          logo.style.opacity=1;
      var soundIco = document.getElementsByClassName('soundIco');
              soundIco[0].style.stroke="white"; // [1] è il sound_no.svg
      new TWEEN.Tween( camera.position).to({ x:  xx, y: yy, z: zz }, 3000 ).easing(TWEEN.Easing.Quartic.Out).onComplete(function(){
                // camDolly(70)
                clickTime = 0;
                inside=0;
              }).start()
      clearInterval(dolly);
    }
  }, 20);
  },1000);
}

function camDolly(value){
//   camera.fov = 20;
// camera.updateProjectionMatrix();
    var update = function(){
      camera.fov = currentFov.fov;
      camera.updateProjectionMatrix();
        // camera.projectionMatrix.makePerspective( currentFov.fov, www / hhh, 1, 10000 );
        render();
    }
    // con
    // currentFov = { fov: 70};
    currentFov = { fov: camera.fov};
    // var newFov = 120;
    // TWEEN.removeAll();
    camTween = new TWEEN.Tween( currentFov ).to( {fov: value},3000 ).easing( TWEEN.Easing.Quartic.InOut ).onUpdate(update);
    camTween.start();
}




function zoom(){
  // console.log("zoooom")
}

function Sound() {
    // this.name = name;
    // audio = scene.getObjectById( 'audio');
    // audio = document.createElement('audio');
    audio1 = document.createElement('audio');
    audio2 = document.createElement('audio');
    audio3 = document.createElement('audio');
    // var rand = Math.floor(Math.random() * 2)+1;
    // audio.src = currentEP;
    // console.log(audio.src)
    audio1.src = "audio/1_The_Finding.mp3";
    audio2.src = "audio/2_The_Knowing.mp3";
    audio3.src = "audio/3_The_Delight.mp3";
    // audio = currentAudio;
    audio1.volume=maxVolume;
    audio1.loop=true;
    audio2.volume=maxVolume;
    audio2.loop=true;
    audio3.volume=maxVolume;
    audio3.loop=true;

    // // this.audio.play();
    // audio.onended = function() {
    // // rand+=1;
    // // if (rand == 3) rand=1;
    // // audio.src = 'audio_1/Cassini_'+rand+'.mp3';
    // audio.play();
    // };
    // container = document.querySelector('#cont');
    // stats = new Stats();
    // container.appendChild( stats.dom );
    // $("#statsDiv").hide();


    // audioSfx = document.createElement('audio');
    // audioSfxArray = new Array;
    // for ( var i = 1; i < 8; i ++ ) {
    // audioSfxArray.push('audio_1/SFX/sfx-'+i+'.mp3');
    // }

  }

function playSound(sound){
  // console.log(SC.pause());
  //   SC.pause();
    this.sound=sound;
    this.maxVolume=maxVolume;
    var icoPlay = document.getElementById('icoPlay');
    var icoPause = document.getElementById('icoPause');
    if (soundLoaded == 0){
      var soundIco = document.getElementById('sound_no');
          soundIco.style.opacity=1;
    soundLoaded = 1;
    // console.log(sound)
    }
    var soundIcoBar = document.getElementById('g2');
    if (this.sound==1){ //-------------- PAUSE
        var audio = eval("this.audio" + currentEP);
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
        icoPause.style.opacity=0;
        icoPlay.style.opacity=1;
        var EPtitle = document.getElementById('EPtitle');
        EPtitle.style.opacity=.2;
    }else if (this.sound==0){ //-------------- PLAY
        var audio = eval("this.audio" + currentEP);
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
        },fadeVolume);
        this.sound=1;
        soundIcoBar.style.opacity=0;
        icoPause.style.opacity=1;
        icoPlay.style.opacity=0;
        var EPtitle = document.getElementById('EPtitle');
        EPtitle.style.opacity=1;
    }
} 

// function soundPlause


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
controls.maxPolarAngle = 2.5;
controls.dampingFactor = .2;
controls.rotateSpeed = 0.04;
controls.enableZoom = true;
controls.zoomSpeed = .2; // 1.0 is default
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
// scene.add( light2 );


// stats = new Stats();
// container.appendChild( stats.dom );

        //   var PI2 = Math.PI * 2;
        //   particleMaterial = new THREE.SpriteMaterial( {
        //   color: 0xffffff,
        //   program: function ( context ) {
        //     context.beginPath();
        //     context.arc( 0, 0, 0.5, 0, PI2, true );
        //     context.fill();
        //   }
        // } );






}



function obj1(){

var geometry = new THREE.PlaneGeometry( 6000, 6000 );
var materialINV = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0.3, alphaTest: 0, visible: false } );
flatT = new THREE.Mesh( geometry, materialINV );
// circle1.position.copy( inte.point );
flatT.lookAt(camera.position);
flatT.name="flatTarget";
// flatT.opacity=0;
// flatT.rotation.x=3.14/2;

scene.add( flatT );
flatTarget.push(flatT)

  cluster = new THREE.Object3D();
  cluster.name="cluster"
  scene.add(cluster);




// var material2t = new THREE.MeshLambertMaterial( { flatShading: false, color: 0xffffff, transparent: true  } );// rosa 0xec6078

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
        // ooo+=1;

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
        // ooo+=1;
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
        // ooo+=1;
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



// floor = new THREE.Object3D();
//   floor.name="floor"
//   scene.add(floor);

// var loaderG = new THREE.OBJLoader( );
// // ground;
//         loaderG.load( 'obj/ground_13.obj', function ( object ) {
//           object.traverse( function ( child ) {
//         if ( child instanceof THREE.Mesh ) {
//             child.material = material3;
//             ooo+=1;
//         }
//     } );
//         // object.rotation.y = 80;
//         object.name="ground";
//         floor.add( object );

// });

// var loaderFull = new THREE.OBJLoader( );
//         loaderFull.load( 'obj/Full-1.obj', function ( object ) {
//           object.traverse( function ( child ) {
//         if ( child instanceof THREE.Mesh ) {
//             child.material = material2;
//             ooo+=1;
//         }
//     } );
//         object.rotation.y = 79.9;
//         object.name="t3";
//         scene.add( object );

// });

var go = setInterval(function(){
  // console.log("sdf")
if(ooo>=6){
  // console.log("sdf")
cameraMove( 0,-50,2000 );
// floorMove();
clearInterval(go);
}
}, 2000);
}

function about(){

    if (menu==0){
      // var embed = document.getElementById('embed');
      // embed.style.visibility="hidden";
      // embed.style.pointerEvents = "none"; 
      $("#about").fadeIn(1000).css({
       'pointer-events': 'all'
    });
      // $("#logo-0").fadeTo('slow', .5);
      menu = 1;
      clickTime = 1;
      if (inside==0){
      var logo = document.getElementById('logoSvg');
      logo.style.opacity=0;
      }  
      var soundIco = document.getElementsByClassName('soundIco');
      soundIco[0].style.stroke="white";
      console.log(soundIco[0])
      var menuu = document.getElementsByTagName('span');
              menuu[0].classList.remove('colorBlack');
              menuu[1].classList.remove('colorBlack');
              menuu[2].classList.remove('colorBlack');
  }
  else if (menu==1){

    $("#about").fadeOut(1000).css({
       'pointer-events': 'none'
    });
    // $("#logo-0").fadeTo('slow', 1);
    menu = 0;
    if (inside==0){
    var logo = document.getElementById('logoSvg');
    logo.style.opacity=1;
    var soundIco = document.getElementsByClassName('soundIco');
      soundIco[0].style.stroke="white";
    clickTime = 0;
    } else if (inside==1){
      var soundIco = document.getElementsByClassName('soundIco');
      soundIco[0].style.stroke="black";
    var menuu = document.getElementsByTagName('span');
              menuu[0].classList.add('colorBlack');
              menuu[1].classList.add('colorBlack');
              menuu[2].classList.add('colorBlack');
    }
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

// function onMouseMove( event ) {

//   // calculate mouse position in normalized device coordinates
//   // (-1 to +1) for both components

// mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
// mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

// }




// function takeScreenshot() {
//     // open in new window like this
//     var w = window.open('', '');
//     w.document.title = "Screenshot";
//     //w.document.body.style.backgroundColor = "red";
//     var img = new Image();
//     // Without 'preserveDrawingBuffer' set to true, we must render now
//     renderer.render(scene, camera);
//     img.src = renderer.domElement.toDataURL();
//     w.document.body.appendChild(img);
    
//     // download file like this.
//     //var a = document.createElement('a');
//     // Without 'preserveDrawingBuffer' set to true, we must render now
//     //renderer.render(scene, camera);
//     //a.href = renderer.domElement.toDataURL().replace("image/png", "image/octet-stream");
//     //a.download = 'canvas.png'
//     //a.click();
// }

function rayHover( event ){
      // event.preventDefault();
        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera( mouse, camera );
        // console.log(mouse, camera);
        var intersects = raycaster.intersectObjects( objects, true );
        // console.log(mouse);
        if ( intersects.length > 0 ) {
          var drag = document.getElementById('drag');
          drag.style.visibility='hidden'; 
          hovering=1;
          $('html,body').css('cursor', 'pointer');
            hit = intersects[ 0 ].object.name;
            // console.log(hit)
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
              $("#FKD").text("FINDING")

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
              $("#FKD").text("DELIGHT")
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
              $("#FKD").text("KNOWING")
            }

            var FKD = document.getElementById('FKD');
            FKD.style.opacity = 1;
        }else{
          if (showDrag == 1){
            var drag = document.getElementById('drag');
                drag.style.visibility='visible'; 

          }
          hovering=0;
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
              // $(".title").hide();
              var FKD = document.getElementById('FKD');
              FKD.style.opacity = 0;
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
          // if (firstTime<1){
        
flatT.lookAt(camera.position);


        // console.log(firstTime);
  // setTimeout(function(){ 
  // cameraMove( 0,0,800 )
  // }, 1000);
// movingMouse=0;
if (isDragged == 1){
    rayCastDrag( event );
  }

  TWEEN.update();
  // var ground = document.getElementsByName("ground")
  // if (ground) {ground.rotation.y += 0.0008;}
  pivot.rotation.y += 0.0006;
  ground.rotation.y += 0.0008;
  // mountains.rotation.y += 0.0004;


requestAnimationFrame( animate );
controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
// stats.update();
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
        rayHover( event );
        }

        light2.position.x = Math.sin( time * 10.7 ) * -530;
        light2.position.y = Math.cos( time * 10.5 ) * 540;
        light2.position.z = Math.cos( time * 10.3 ) * 1530;

        directionalLight.position.z = Math.cos( time * -3 ) * 50+30;
renderer.render( scene, camera );
}

