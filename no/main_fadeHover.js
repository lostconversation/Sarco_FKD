if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
            var container, stats;
            var cross;

var camera, controls, scene, renderer, btn, stars=[], rains=[], pivot, startPosition=[], object;
var geometry, material;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(), INTERSECTED1;
var objects = [];

// gui = new dat.GUI();

var worldWidth = 256, worldDepth = 256,
worldHalfWidth = worldWidth / 2, worldHalfDepth = worldDepth / 2;
var clock = new THREE.Clock();
var pivot = new THREE.Group();
// var groundG = new THREE.Group();

var randGround1 = 40//Math.floor((Math.random() * 200) + 100);
var randGround2 = .4

var firstTime = 1;
var hovered = 0;
// var ground = new THREE.Object3d();



var query = "(-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2), (min-resolution: 192dpi)";
 
if (matchMedia(query).matches) {
  // do high-dpi stuff
  var retinaCheck = 1;
  var www = window.innerWidth/2;
  var hhh = window.innerHeight/2;

} else {
  // do non high-dpi stuff
  var retinaCheck = 0;
  var www = window.innerWidth;
  var hhh = window.innerHeight;
}

// var www = window.innerWidth;
// var hhh = window.innerHeight;

// document.getElementById("shot").addEventListener('click', takeScreenshot);

// document.addEventListener( 'click', onClick, false );

document.addEventListener( 'mousemove', onMouseMove, false );


$(document).ready(function(){

  $('#nav-icon4').click(function(){
    $(this).toggleClass('open');
  });
});

var container = document.getElementById('container');
container.onclick = function() {

  event.preventDefault();
      // var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
      // projector.unprojectVector( vector, camera );
      var cluster = scene.getObjectByName( "t1" , true)
      // console.log(cluster.name);
      var raycaster = new THREE.Raycaster();
      raycaster.setFromCamera( mouse, camera );
      var intersects = raycaster.intersectObjects( objects, true );
      if ( intersects.length > 0 ) {
          console.log(intersects.name);
          intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
      }
      
}



var clock = new THREE.Clock();




window.scene = scene;
window.THREE = THREE;

init();
addStars();
animateStars();
addGround();
obj1();
// $.when(obj1a()).then(obj1b());
// $.when(obj1()).then(cameraMove( 0,0,800 ));
// $.when(animate()).then(cameraMove( 0,0,800 ));
animate();
// $.when(obj1a()).then(obj1b());

// animate();
// cameraMove( 0,0,800 );



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
// var container = document.getElementById( 'container' );
container.appendChild( renderer.domElement );
camera = new THREE.PerspectiveCamera(70, www / hhh, 1, 100000 );
camera.position.z = 500;
camera.position.y = 12000;
controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', render ); // remove when using animation loop
controls.enableDamping = true;
// controls.minPolarAngle = 0.2;
// controls.maxPolarAngle = 2.9;
controls.dampingFactor = 0.06;
controls.rotateSpeed = 0.1;
controls.enableZoom = true;
controls.minDistance = 2;
controls.maxDistance = 4000;
// world

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



window.addEventListener( 'resize', onWindowResize, false );
}



function obj1(){

  cluster = new THREE.Object3D();
  cluster.name="cluster"
  scene.add(cluster);


var material1 = new THREE.MeshBasicMaterial( { flatShading: false, color: 0x2fe2e3  } ); //blue
var material2t = new THREE.MeshLambertMaterial( { flatShading: false, color: 0xffffff, transparent: true  } );// rosa 0xec6078
var material2q = new THREE.MeshLambertMaterial( { flatShading: true, color: 0xec6078, transparent: true  } );
var material2c = new THREE.MeshBasicMaterial( { flatShading: false, color: 0xec6078, transparent: true  } );
var matHigh = new THREE.MeshBasicMaterial( { flatShading: false, color: 0xec6078  } );

var ooo=0;


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
      cameraMove( 0, -50, 1000 )
  }
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



  event.preventDefault();
      var raycaster = new THREE.Raycaster();
      raycaster.setFromCamera( mouse, camera );
      var intersects = raycaster.intersectObjects( objects, true );
      // console.log(mouse);
      if ( intersects.length > 0 ) {
        $('html,body').css('cursor', 'pointer');
          hit = intersects[ 0 ].object.name;
          console.log(intersects[ 0 ].object.name);
          if(hit=="Q quad"){
            // console.log(hit.material.opacity)
            t1 = scene.getObjectByName('t1');
            t1.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
              // child.material.opacity = .03;
              var fade1 = setInterval(function(){
                child.material.opacity -= .05;
                if (child.material.opacity <=0){
                  clearInterval(fade1);
                }
              }, 100)
            }});
            c1 = scene.getObjectByName('c1');
            c1.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
              // child.material.opacity = .03;
              var fade2 = setInterval(function(){
                child.material.opacity -= .05;
                if (child.material.opacity <=0){
                  clearInterval(fade2);
                }
              }, 100)
            }});

          }else if(hit=="T tri"){
            // console.log(hit.material.opacity)
            q1 = scene.getObjectByName('q1');
            q1.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
              // child.material.opacity = .03;
              var fade1 = setInterval(function(){
                child.material.opacity -= .05;
                if (child.material.opacity <=0){
                  clearInterval(fade1);
                }
              }, 100)
            }});
            c1 = scene.getObjectByName('c1');
            c1.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
              // child.material.opacity = .03;
              var fade2 = setInterval(function(){
                child.material.opacity -= .05;
                if (child.material.opacity <=0){
                  clearInterval(fade2);
                }
              }, 100)
            }});

          } else if(hit=="Element Tube"){
            // console.log(hit.material.opacity)
            t1 = scene.getObjectByName('t1');
            t1.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
              // child.material.opacity = .03;
              var fade1 = setInterval(function(){
                child.material.opacity -= .05;
                if (child.material.opacity <=0){
                  clearInterval(fade1);
                }
              }, 100)
            }});
            q1 = scene.getObjectByName('q1');
            q1.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
              // child.material.opacity = .03;
              var fade2 = setInterval(function(){
                child.material.opacity -= .05;
                if (child.material.opacity <=0){
                  clearInterval(fade2);
                }
              }, 100)
            }});
            hovered=1;

          }

      }else{
        $('html,body').css('cursor', 'auto');
        if(hovered==0){}else{
        clearInterval(fade1);
        clearInterval(fade2);
      }
        t1 = scene.getObjectByName('t1');
            t1.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
              // child.material.opacity = .03;
              var fadeB1 = setInterval(function(){
                child.material.opacity += .05;
                if (child.material.opacity >=1){
                  clearInterval(fadeB1);
                }
              }, 100);
              }});

        c1 = scene.getObjectByName('c1');
           c1.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
              // child.material.opacity = .03;
              var fadeB2 = setInterval(function(){
                child.material.opacity += .05;
                if (child.material.opacity >=1){
                  clearInterval(fadeB2);
                }
              }, 100);
              }});
        q1 = scene.getObjectByName('q1');
            q1.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
              // child.material.opacity = .03;
              var fadeB3 = setInterval(function(){
                child.material.opacity += .05;
                if (child.material.opacity >=1){
                  clearInterval(fadeB3);
                }
              }, 100);
              }});
      }
      hovered=0;
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





function onWindowResize() {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
if (retinaCheck == 0){
renderer.setSize( window.innerWidth, window.innerHeight );
} else {
renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
}
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
// composer.render();
}
function render() {
  var time = Date.now() * 0.0001;
        var delta = clock.getDelta();
        // if( object ) object.rotation.y -= 110.5 * delta;
        light1.position.x = Math.sin( time * 10.7 ) * 70;
        light1.position.y = Math.cos( time * 10.5 ) * 70;
        light1.position.z = Math.cos( time * 10.3 ) * 150;

        cluster.rotation.y = Math.cos( time * 10.5 ) * .1; //+=.003;
        // cluster.rotation.x +=2;

        light2.position.x = Math.sin( time * 10.7 ) * -530;
        light2.position.y = Math.cos( time * 10.5 ) * 540;
        light2.position.z = Math.cos( time * 10.3 ) * 1530;

        directionalLight.position.z = Math.cos( time * -3 ) * 50+30;

renderer.render( scene, camera );
}

