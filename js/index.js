import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let scene = new THREE.Scene();
scene.background = new THREE.Color( 0xcccccc );
scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let controls = new OrbitControls( camera, renderer.domElement );

let createCube = () => {
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true });
    return new THREE.Mesh(geometry, material);
};

let createSphere = () => {
    let geometry = new THREE.SphereGeometry(5, 32, 32);
    let material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true });
    return new THREE.Mesh(geometry, material);
};

let createPyramid = () => {
    let material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );
    let geometry = new THREE.TetrahedronGeometry( 5, 0 );
    return new THREE.Mesh(geometry, material);

};

let createCone = () => {
    let geometry = new THREE.ConeGeometry( 5, 10, 8 );
    let material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );
    return new THREE.Mesh( geometry, material );
};

let createShape = (shapeName, scale) => {
    let shape;
    if (shapeName === 'cube') {
        shape = createCube();
    } else if (shapeName === 'pyramid') {
        shape = createPyramid();
    } else if (shapeName === 'sphere') {
        shape = createSphere();
    } else if (shapeName === 'cone') {
        shape = createCone();
    }

    scale = scale || 1;
    shape.geometry.scale(scale, scale, scale);

    scene.add(shape);

    shape.position.x = Math.random() * 10;
    shape.position.y = Math.random() * 10;
    shape.position.z = Math.random() * 10;

    const $newID = document.createElement("span");
    $newID.textContent = shape.uuid;
    const $info = document.createElement('div');
    $info.setAttribute('id', 'info');

    const $btnDelete = document.createElement('button');
    $btnDelete.setAttribute('id', 'delete');
    $btnDelete.textContent = 'X';
    $info.appendChild($newID);
    $info.appendChild($btnDelete);
    document.body.append($info);

};

camera.position.x = 10;
camera.position.y = 10;
camera.position.z = 10;
controls.update();

let directLight = new THREE.DirectionalLight( 0xffffff );
directLight.position.set( 1, 1, 1 );
scene.add( directLight );
let directLight2 = new THREE.DirectionalLight( 0x222222 );
directLight2.position.set( - 1, - 1, - 1 );
scene.add( directLight2 );
let ambientLight = new THREE.AmbientLight( 0x222222 );
scene.add( ambientLight );


function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();


const $selectGeometry = document.getElementById('geometry');
const $inputScale = document.getElementById('scale');
const $btnCreate = document.getElementById('btnCreate');

$btnCreate.addEventListener('click', function () {
    let geometry = $selectGeometry.value;
    let scale = $inputScale.value;
    createShape(geometry, scale);
});
document.body.addEventListener('click', function (e) {
    if (e.target.id === 'delete') {
        let uuid = e.target.parentNode.children[0].textContent;
        let obj = scene.getObjectByProperty('uuid', uuid);
        scene.remove(obj);
        e.target.parentNode.remove();
    }
});

