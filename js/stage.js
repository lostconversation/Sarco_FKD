

function addStars(){
for ( var z= -12000; z < 100; z+=15 ) {
  var geometry = new THREE.ConeGeometry( 3,9,3 );
  var material = new THREE.MeshBasicMaterial( { flatShading: true, color: 0x318ea9, wireframe: true  } );
  var starGroup;
  var star = new THREE.Mesh(geometry, material)
  star.position.x = Math.random() * 14000 - 7000;
  star.position.y = Math.random() * 4500 - 1000;
  star.position.z = z+6000;
  star.rotation.z = Math.PI ;
// star.scale.x = star.scale.y = 2;
scene.add( pivot );
pivot.add( star );
stars.push(star);
star.name="Star"
}

}

function animateStars() {

// loop through each star
for(var i=0; i<stars.length; i++) {
star = stars[i];
star.rotation.x +=  i/500000;
star.rotation.y +=  i/50000;
}
}





function addGround() {

var data = generateHeight( worldWidth, worldDepth );
var geometry = new THREE.PlaneBufferGeometry( 22500, 22500, worldWidth - 1, worldDepth - 1 );
geometry.rotateX( - Math.PI / 2 );
var vertices = geometry.attributes.position.array;
for ( var i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {
  vertices[ j + 1 ] = data[ i ] * randGround1;

}
// console.log(randGround1)
texture = new THREE.CanvasTexture( generateTexture( data, worldWidth, worldDepth ) );
texture.wrapS = THREE.ClampToEdgeWrapping;
texture.wrapT = THREE.ClampToEdgeWrapping;

ground = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { map: texture,  wireframe:true, transparent:true} ) );

// scene.add( ground );
// ground.rotation.x = -Math.PI/2;
ground.position.y = -1500; //lower it 
geometry.computeFaceNormals(); 
geometry.computeVertexNormals();
// scene.add(groundG);
scene.add(ground); 
ground.name="Ground";
}


function generateHeight( width, height ) {
var size = width * height, data = new Uint8Array( size ),
perlin = new ImprovedNoise(), quality = 2, z = Math.random() * 1000;
for ( var j = 0; j < 4; j ++ ) {
  for ( var i = 0; i < size; i ++ ) {
    var x = i % width, y = ~~ ( i / width );
    data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * randGround2 );
  }
  // console.log(randGround2)
  quality *= 4;
}
return data;
}

function generateHeight2( width, height ) {
var size = width * height, data = new Uint8Array( size ),
perlin = new ImprovedNoise(), quality = 1, z = Math.random() * 100;
for ( var j = 0; j < 4; j ++ ) {
  for ( var i = 0; i < size; i ++ ) {
    var x = i % width, y = ~~ ( i / width );
    data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 8.75 );
  }
  quality *= 4;
}
return data;
}
function generateTexture( data, width, height ) {
var canvas, canvasScaled, context, image, imageData,
level, diff, vector3, sun, shade;
vector3 = new THREE.Vector3( 0, 0, 0 );
sun = new THREE.Vector3( 1,1,1 );
sun.normalize();
canvas = document.createElement( 'canvas' );
canvas.width = width;
canvas.height = height;
context = canvas.getContext( '2d' );
context.fillStyle = '#000';
context.fillRect( 0, 0, width, height );
image = context.getImageData( 0, 0, canvas.width, canvas.height );
imageData = image.data;
for ( var i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++ ) {
  vector3.x = data[ j - 4 ] - data[ j + 2 ];
  vector3.y = 1;
  vector3.z = data[ j - width * 2 ] - data[ j + width * 2 ];
  vector3.normalize();
  shade = vector3.dot( sun );
  imageData[ i ] = ( 4 + shade * 8 ) * ( 12.6 + data[ j ] * 0.007 )-22;
  imageData[ i + 1 ] = ( 7 + shade * 6 ) * ( 12.5 + data[ j ] * 0.001 )-22;
  imageData[ i + 2 ] = ( 10+shade * 6 ) * ( 16.9 + data[ j ] * 0.0001 )-22;
}

context.putImageData( image, 0, 0 );

// Scaled 4x
canvasScaled = document.createElement( 'canvas' );
canvasScaled.width = width * 4;
canvasScaled.height = height * 4;

context = canvasScaled.getContext( '2d' );
context.scale( 4, 4 );
context.drawImage( canvas, 0, 0 );
image = context.getImageData( 0, 0, canvasScaled.width, canvasScaled.height );
imageData = image.data;
for ( var i = 0, l = imageData.length; i < l; i += 9 ) {
var v = ~~ ( Math.random() * 10 );
imageData[ i ] += v;
imageData[ i + 1 ] += v;
imageData[ i + 2 ] += v;
}
context.putImageData( image, 0, 0 );
return canvasScaled;
}
function generateTextureDark( data, width, height ) {
var canvas, canvasScaled, context, image, imageData,
level, diff, vector3, sun, shade;
vector3 = new THREE.Vector3( 0, 0, 0 );
sun = new THREE.Vector3( 1,1,1 );
sun.normalize();
canvas = document.createElement( 'canvas' );
canvas.width = width;
canvas.height = height;
context = canvas.getContext( '2d' );
context.fillStyle = '#000';
context.fillRect( 0, 0, width, height );
image = context.getImageData( 0, 0, canvas.width, canvas.height );
imageData = image.data;
for ( var i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++ ) {
  vector3.x = data[ j - 4 ] - data[ j + 2 ];
  vector3.y = 1;
  vector3.z = data[ j - width * 2 ] - data[ j + width * 2 ];
  vector3.normalize();
  shade = vector3.dot( sun );
  imageData[ i ] = ( 3 + shade * 8 ) * (2 + data[ j ] * 0.07 )-22;
  imageData[ i + 1 ] = ( 2 + shade * 6 ) * ( 2 + data[ j ] * 0.001 )-22;
  imageData[ i + 2 ] = ( 4 + shade * 6 ) * (3 + data[ j ] * 0.001 )-22;
}

context.putImageData( image, 0, 0 );

// Scaled 4x
canvasScaled = document.createElement( 'canvas' );
canvasScaled.width = width * 4;
canvasScaled.height = height * 4;

context = canvasScaled.getContext( '2d' );
context.scale( 4, 4 );
context.drawImage( canvas, 0, 0 );
image = context.getImageData( 0, 0, canvasScaled.width, canvasScaled.height );
imageData = image.data;
for ( var i = 0, l = imageData.length; i < l; i += 9 ) {
var v = ~~ ( Math.random() * 50 );
imageData[ i ] += v;
imageData[ i + 1 ] += v;
imageData[ i + 2 ] += v;
}
context.putImageData( image, 0, 0 );
return canvasScaled;
}