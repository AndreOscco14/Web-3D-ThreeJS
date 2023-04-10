import { red } from '@material-ui/core/colors';
import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})


renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight)
camera.position.setZ(30);

renderer.render(scene,camera)
//  FIGURA TORUS
const geometry = new THREE.TorusGeometry(10, 3,16,100)
// const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true});
const material = new THREE.MeshStandardMaterial({color: 0xFF6347 })
const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

//* ======================== LUCES ===============================
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)


const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

// Ayuda en la pantalla
const lighHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,80);
scene.add(lighHelper,  gridHelper)
//* ======================== FIN LUCES ===============================

// Controles para mover la orbitra y figura en imagen
const controls = new OrbitControls(camera, renderer.domElement);


//------------- Figura Star
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)
}
Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture;

//------------- Avatar Imagen Dre
const dreTexture = new THREE.TextureLoader().load('1.png') 

const dre = new THREE.Mesh(
  new THREE.BoxGeometry(3,6,3),
  new THREE.MeshBasicMaterial({ map: dreTexture})
)
scene.add(dre)

// ------------- Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);

scene.add(moon)

// ------------- Animacion del aro 
function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.1

  controls.update();

  renderer.render(scene,camera)
}

animate();

// Libreria ThreeJS y bac en NextJS (PRACTICARLo)