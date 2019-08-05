import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

let scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc);
scene.fog = new THREE.FogExp2(0xcccccc, 0.02);
let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);

class Shape extends THREE.Object3D {
    constructor(shapeName, scale) {
        super();

        switch (shapeName) {
            case 'cube':
                this.geometry = new THREE.BoxGeometry(1, 1, 1);
                break;
            case 'pyramid':
                this.geometry = new THREE.TetrahedronGeometry(5, 0);
                break;
            case 'sphere':
                this.geometry = new THREE.SphereGeometry(5, 32, 32);
                break;
            case 'cone':
                this.geometry = new THREE.ConeGeometry(5, 10, 8);
                break;
            default:
                this.geometry = new THREE.BoxGeometry(1, 1, 1);
                break;
        }

        let material = new THREE.MeshPhongMaterial({color: 5059197, flatShading: true});
        this.shape = new THREE.Mesh(this.geometry, material);

        if (scale) {
            this.geometry.scale(scale, scale, scale);
        }


        this.shape.position.x = Math.random() * 10;
        this.shape.position.y = Math.random() * 10;
        this.shape.position.z = Math.random() * 10;
    }

    addShape() {
        scene.add(this.shape);
    }

    deleteShape() {
        const $newID = document.createElement("span");
        $newID.textContent = this.shape.uuid;
        const $info = document.createElement('div');
        $info.setAttribute('id', 'info');

        const $btnDelete = document.createElement('button');
        $btnDelete.setAttribute('class', 'delete');
        $btnDelete.textContent = 'X';
        $btnDelete.addEventListener('click', function (e) {
            let uuid = this.parentNode.children[0].textContent;
            let obj = scene.getObjectByProperty('uuid', uuid);
            scene.remove(obj);
            this.parentNode.remove();
        });
        $info.appendChild($newID);
        $info.appendChild($btnDelete);
        document.body.append($info);
    }
}

camera.position.x = 10;
camera.position.y = 10;
camera.position.z = 10;
controls.update();

let directLight = new THREE.DirectionalLight(12964329);
directLight.position.set(1, 1, 1);
scene.add(directLight);
let directLight2 = new THREE.DirectionalLight(12964329);
directLight2.position.set(-1, -1, -1);
scene.add(directLight2);
let ambientLight = new THREE.AmbientLight(0x222222);
scene.add(ambientLight);

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
    let shape = new Shape(geometry, scale);
    shape.deleteShape();
    shape.addShape();
});

