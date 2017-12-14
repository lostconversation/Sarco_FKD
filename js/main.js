if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
            var container, stats;
            var cross;

var camera, controls, scene, renderer, btn, stars=[], rains=[], pivot, startPosition=[], object;
var geometry, material;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var objects = [];
var circleClick = [];
var clickTime = 1;
var inside = 0;
var page;
var mouseDown = 0;
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



var query = "(-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2), (min-resolution: 192dpi)";
 
if (matchMedia(query).matches) {
  // do high-dpi stuff
  var retinaCheck = 1;
  var www = window.innerWidth/2;
  var hhh = window.innerHeight/2;

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

  $('#nav-icon').click(function(){
    $(this).toggleClass('open');
  });

// window.addEventListener("touchmove", rayHover, false);

window.addEventListener( "resize", onWindowResize, false );

window.addEventListener( "wheel", zoom, false );

var flag = 0;
window.addEventListener("mousedown", function( event ){
    flag = 0;
    mouseDown = 1;
    mouseClickX = ( event.clientX / www ) * retinaCheck - 1;
    mouseClickY =  - ( event.clientY / hhh ) * retinaCheck + 1;
    // console.log(mouse.x)
    // var geometry = new THREE.SphereGeometry( 10, 111 );
    // var material1 = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true, opacity: .5 } );
    // var circle1 = new THREE.Mesh( geometry, material );
    // // circle1.position.copy( inte.point );
    // circle1.lookAt(camera.position);
    // circle1.name="clickSphere1";
    // circle1.position.x = event.clientX-renderer.domElement.clientWidth/2;
    // circle1.position.y = event.clientY;
    // scene.add( circle1 );
    // circleClick.push( circle1 );
    // // var clickSph = setTimeout(function(){
    // //   scene.remove(circle1);
    // // },1500);
}, false);

window.addEventListener("mousemove", function( event ){
  mouse.x = ( event.clientX / www ) * retinaCheck - 1;
  mouse.y = - ( event.clientY / hhh ) * retinaCheck + 1;
}, false);

window.addEventListener("mouseup", function( event ){
  // circle1 = this.circle1;
  // scene.remove( circleClick.circle1 );
  var xx = Math.abs(mouseClickX - mouse.x);
  var yy = Math.abs(mouseClickY - mouse.y);
  // console.log(xx)
  if (xx > 0.02 || yy > 0.02){
    flag=1;
  }else{
    flag=0;
  }


    if(flag == 0){
        // console.log("click");
        if(clickTime==1){
        // new TWEEN.Tween( camera.position).to({ z: 1500 }, 2000 ).easing(TWEEN.Easing.Quartic.InOut).start()
        // clickTime = 0;
      }else{
        event.preventDefault();
        mouse.x = ( event.clientX / www ) * retinaCheck - 1;
        mouse.y = - ( event.clientY / hhh ) * retinaCheck + 1;
        raycaster.setFromCamera( mouse, camera );
        var intersects = raycaster.intersectObjects( objects, true );
        if ( intersects.length > 0 ) {
          // xx = intersects[ 0 ].point.x
          // yy = intersects[ 0 ].point.y
          // zz = intersects[ 0 ].point.z
          clickTime=1;
          inside=1;
          // console.log(intersects[ 0 ].point.x)
          // var particle = new THREE.Sprite( particleMaterial );
          // particle.position.copy( intersects[ 0 ].point );
          // particle.scale.x = particle.scale.y = 22;
          // scene.add( particle );
          inte = intersects[ 0 ];

          addClickSphere( inte );
          // var FKD = $("#FKD");
          var FKD = document.getElementById('FKD');
          FKD.classList.add('zoom');
          new TWEEN.Tween( cluster.rotation).to({ x: 0, y: 0, z: 0 }, 3000 ).easing(TWEEN.Easing.Quartic.InOut).start();
          // new TWEEN.Tween(FKD.scale).to({ x: 2, y: 2}).easing(TWEEN.Easing.Quartic.InOut).start();
          // console.log(FKD)
          // new TWEEN.TweenMax.to(KFD, .2, {transformPerspective:1000,scale:1, autoAlpha: 1,
          // transformOrigin:"50% 50%"});  
          // new TWEEN.Tween( FKD.position).to({ x: 0, y: 1330}, 2000 ).easing(TWEEN.Easing.Quartic.InOut).start()
          if(hit=="Q quad"){
              xx = 150;
              yy = -48;
              zz = 305;  
              page = document.getElementById('finding');
            } else if(hit=="T tri"){
              xx = -363;
              yy = 143;
              zz = -48;
              page = document.getElementById('delight');
            } else if(hit=="C Tube"){
              xx = -217;
              yy = 107;
              zz = 185;
              page = document.getElementById('knowing');
            }
            $('html,body').css('cursor', 'default');
            controls.enabled = false;
              
              
              
              
            new TWEEN.Tween( camera.position).to({ x: xx, y: yy, z: zz }, 3000 ).easing(TWEEN.Easing.Quartic.Out).onComplete(function(){
              FKD.style.color="black";
              page.style.color="black";
              page.style.opacity=1; 
              var logo = document.getElementById('logoSvg');
              logo.style.fill="black";
              var menuu = document.getElementsByTagName('span');
              menuu[0].classList.add('colorBlack');
              menuu[1].classList.add('colorBlack');
              menuu[2].classList.add('colorBlack');
              // var 'menu' = document.getElementById('nav-icon');
              // 'menu.background-color.fill'="black";
              var dollyN = 1;
              var dolly = setInterval(function(){
                dollyN += .00001;
                controls.dollyIn(dollyN);
                  if (dollyN >=1.0015){
                dollyN=1;
                // var page1 = document.getElementById('knowing');
                // page1.text.color="black";

                $("#particle").css({
                  'pointer-events': 'all',
                  'z-index': '1'
                });
                var back = document.getElementById('back');
                back.style.opacity=1; 
                // $("#knowing").text("ready");
                // $("container").css('-webkit-text-fill-color', 'black');
                // console.log($("pageContainer"))
                // console.log(camera.position.x,camera.position.y,camera.position.z);
                clearInterval(dolly);
                  }
                }, 8);
              }).start()

      }
      }
    }
    else if(flag == 1){
        // console.log("drag");
    }
}, false);



// var container = document.getElementById('container');
// container.onclick = function() {

  
      
// }





var clock = new THREE.Clock();




window.scene = scene;
window.THREE = THREE;

init();
addStars();
animateStars();
addGround();
obj1();
animate();

}); // end document.ready

function about(){
    if (menu==0){
      $("#about").fadeIn(1000).css({
       'pointer-events': 'all'
    });
      // $("#logo-0").fadeTo('slow', .5);
      menu = 1;
      clickTime = 1;
      // if (inside==1){
      var logo = document.getElementById('logoSvg');
      logo.style.opacity=0;
      // }  
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
    var logo = document.getElementById('logoSvg');
    logo.style.opacity=1;
    if (inside==0){
    clickTime = 0;
    } else if (inside==1){
    var menuu = document.getElementsByTagName('span');
              menuu[0].classList.add('colorBlack');
              menuu[1].classList.add('colorBlack');
              menuu[2].classList.add('colorBlack');
    }
}
}

function camBack(page){
  inside=0;
  $("#particle").css({
                  'pointer-events': 'none',
                  'z-index': '-11'
                });
  var FKD = document.getElementById('FKD');
  FKD.classList.remove('zoom');
  var back = document.getElementById('back');
  back.style.opacity=0; 
  var menuu = document.getElementsByTagName('span');
              menuu[0].classList.remove('colorBlack');
              menuu[1].classList.remove('colorBlack');
              menuu[2].classList.remove('colorBlack');
  // var page = document.getElementById('knowing')
  var pageTitle = document.getElementById('FKD')
  var logo = document.getElementById('logoSvg');
  page.style.opacity=0; 
  pageTitle.style.color="white";
  logo.style.fill="white";
  var dollyN = 1;
  var dolly = setInterval(function(){
    dollyN -= .001;
    controls.dollyIn(dollyN);
    if (dollyN <=0.95){
      dollyN=1;
      xx = camera.position.x - 150;
      yy = camera.position.y - 200;
      zz = camera.position.z - 400;

      // $("#knowing").fadeIn();
      clickTime = 0;
      controls.enabled = true;
      new TWEEN.Tween( camera.position).to({ x:  xx, y: yy, z: zz }, 1000 ).easing(TWEEN.Easing.Quartic.Out).onComplete(function(){
                
              }).start()
      clearInterval(dolly);
    }
  }, 20);
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

        //   var clickSph = setInterval(function(){
        //     size-=1;
        //     $("clickSphere").scale(.2);
        //   circle.scale(size)
        //   if (size==0){
        //     dollyN=1;
        //     xx = camera.position.x - 700;
        //     // yy = camera.position.y - 1500;
        //     zz = camera.position.z - 400;
        //     // $("#knowing").fadeIn();
        //     clickTime = 0;
        //     controls.enabled = true;
        //     new TWEEN.Tween( camera.position).to({ x:  xx, y: yy, z: zz }, 2000 ).easing(TWEEN.Easing.Quartic.Out).onComplete(function(){
                      
        //             }).start()
        //     clearInterval(clickSph);
        //   }
        // }, 30);

}

function zoom(){
  console.log("zoooom")
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
camera = new THREE.PerspectiveCamera(70, www / hhh, 1, 100000 );
camera.position.z = 500;
camera.position.y = 12000;
controls = new THREE.OrbitControls( camera, container );
// controls.addEventListener( 'change', render ); // remove when using animation loop
controls.enableDamping = true;
controls.minPolarAngle = 0.4;
controls.maxPolarAngle = 2.5;
controls.dampingFactor = 0.06;
controls.rotateSpeed = 0.05;
controls.enableZoom = true;
controls.zoomSpeed = .1; // 1.0 is default
controls.minDistance = 200;
controls.maxDistance = 3000;

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
        // ooo+=1;
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
      cameraMove( 0, -50, 800 )
  }else{
    if (menu==1){
    clickTime = 1;
  }}
  })
  .start();
 
//  const beginT = controls.target.clone();
//  var positionT = new THREE.Vector3(0,0,0);
// new TWEEN.Tween(beginT)
//   .to(positionT, 2000)
//   .easing(TWEEN.Easing.Quartic.InOut)
//   .onUpdate(function() {
//     controls.target.set(this.x, this.y, this.z);//.normalize().negate();
//       // camera.controls.target.set( 0, 0, 0 )
//   })

//   .start();

}


function floorMove() {
  var ground = document.getElementsByName("Ground");
  var position = new THREE.Vector3(0,-1500,0);
  new TWEEN.Tween(ground)
  .to(position, 6000)
  .easing(TWEEN.Easing.Quartic.Out)
  .start();
}

function onMouseMove( event ) {

  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  
  // console.log(Math.floor(camera.position.x),Math.floor(camera.position.y),Math.floor(camera.position.z) )

      //     // console.log(annot, annot.style.opacity)
      // if (annot.style.opacity >=0){
      //   console.log(annot.style.opacity)
      //         var fadeAnnot = setInterval(function(){
      //           annot.style.opacity -= .05;
      //           if (annot.style.opacity <=0){
      //             annot.style.opacity=0;
      //             clearInterval(fadeAnnot);
      //           }
      //         }, 100);
      // }
}

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
        // console.log(mouse.x, camera.x)
        var intersects = raycaster.intersectObjects( objects, true );
        // console.log(mouse);
        if ( intersects.length > 0 ) {
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
www = window.innerWidth/2;
hhh = window.innerHeight/2;
// renderer.setSize( www, hhh );
}
renderer.setSize( www, hhh );
camera.updateProjectionMatrix();
// console.log(window.innerWidth)
}




function animate() {

  // setTimeout(function(){ 
  // cameraMove( 0,0,800 )
  // }, 1000);

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
        // if (firstTime<1){
        var time = Date.now() * 0.0001;
        var delta = clock.getDelta();
        // console.log(mouse.x)
        // if( object ) object.rotation.y -= 110.5 * delta;
        light1.position.x = Math.sin( time * 10.7 ) * 70;
        light1.position.y = Math.cos( time * 10.5 ) * 70;
        light1.position.z = Math.cos( time * 10.3 ) * 150;
        // }
        if (firstTime==1){
          cluster.rotation.y = (Math.cos( time * 10.5 ) * .1)+.1; //+=.003;
        }  
        if(clickTime==0){
        cluster.rotation.y = (Math.cos( time * 10.5 ) * .1)+.1; //+=.003;
        rayHover( event );
        }

        light2.position.x = Math.sin( time * 10.7 ) * -530;
        light2.position.y = Math.cos( time * 10.5 ) * 540;
        light2.position.z = Math.cos( time * 10.3 ) * 1530;

        directionalLight.position.z = Math.cos( time * -3 ) * 50+30;
renderer.render( scene, camera );
}

