import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/Addons.js"
import blobVx from "./shaders/blobVx.glsl"
import blobFg from "./shaders/blobFg.glsl"

//button and select field change events
const clickButton = document.querySelector("#start-button")
const trackField = document.querySelector("#track-select")


import { EffectComposer } from "three/examples/jsm/Addons.js"
import { RenderPass } from "three/examples/jsm/Addons.js"
import { UnrealBloomPass } from "three/examples/jsm/Addons.js"
import { OutputPass } from "three/examples/jsm/Addons.js"

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)

const uniforms = {
    uTime :{value: 0.0},
    uFrequency : {value: 0.0}
}
const geometry = new THREE.IcosahedronGeometry(4,30)
const material = new THREE.ShaderMaterial({
    vertexShader: blobVx,
    fragmentShader: blobFg,
    wireframe: true,
    uniforms,
   
})
const mesh = new THREE.Mesh(geometry, material)


if (window.innerWidth <= 768) {
    camera.position.z = 15;
} else {
    camera.position.z = 9;
}
//add audio effect
const listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( '/track1.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop(true);
	sound.setVolume(0.5);
	clickButton.addEventListener("click",()=>{
        if (sound.isPlaying) {
            sound.stop();
            setTimeout(() => {
              sound.play();
            }, 100);
          } else {
            sound.play();
          }
    })
});
trackField.addEventListener("change",(e)=>{
    audioLoader.load( `/${e.target.value}`, function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop(true);
        sound.setVolume(0.5);
        if (sound.isPlaying) {
          sound.stop();
          setTimeout(() => {
            sound.play();
          }, 100);
        } else {
          sound.play();
        }
        clickButton.addEventListener("click",()=>{
            if (sound.isPlaying) {
                sound.stop();
                setTimeout(() => {
                  sound.play();
                }, 100);
              } else {
                sound.play();
              }
        })
    });
})
const analyser = new THREE.AudioAnalyser( sound, 32 );


const canvas = document.querySelector('canvas')
const renderer = new THREE.WebGLRenderer({canvas, antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
scene.add(mesh)

const controls = new OrbitControls(camera, canvas)
controls.update()

//bloom code 
const renderScene = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight)
);
bloomPass.threshold = 0.2;
bloomPass.strength = 0.2;
bloomPass.radius = 0.5;

const outputPass = new OutputPass();
renderer.outputColorSpace = THREE.SRGBColorSpace;
const bloomComposer = new EffectComposer(renderer);
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);
bloomComposer.addPass(outputPass);


const clock = new THREE.Clock()
const animate = ()=>{
    uniforms.uTime.value = clock.getElapsedTime()*0.8
    uniforms.uFrequency.value =analyser.getAverageFrequency()
    mesh.rotation.x = clock.getElapsedTime()*0.1
    mesh.rotation.y = clock.getElapsedTime()*0.05
    requestAnimationFrame(animate)
    controls.update()
    bloomComposer.render();

    // renderer.render(scene, camera)

}
animate()


window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    bloomComposer.setSize(window.innerWidth, window.innerHeight);
  });