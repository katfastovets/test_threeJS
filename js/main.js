let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);

let renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let controls = new THREE.OrbitControls( camera, renderer.domElement );


createCube = () => {
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    return new THREE.Mesh(geometry, material);
};

createSphere = () => {
    let geometry = new THREE.SphereGeometry(5, 32, 32);

    let material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    return new THREE.Mesh(geometry, material);
};

createPyramid = () => {
    let verticesOfCube = [
        -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1,
        -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1,
    ];

    let indicesOfFaces = [
        2, 1, 0, 0, 3, 2,
        0, 4, 7, 7, 3, 0,
        0, 1, 5, 5, 4, 0,
        1, 2, 6, 6, 5, 1,
        2, 3, 7, 7, 6, 2,
        4, 5, 6, 6, 7, 4
    ];

    let geometry = new THREE.PolyhedronGeometry(verticesOfCube, indicesOfFaces, 6, 2);

    let material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    return new THREE.Mesh(geometry, material);

};

createShape = (shapeName, scale) => {
    let shape;
    if (shapeName === 'cube') {
        shape = createCube();
    } else if (shapeName === 'pyramid') {
        shape = createPyramid()
    } else if (shapeName === 'sphere') {
        shape = createSphere()
    }

    scale = scale || 1;
    shape.geometry.scale(scale, scale, scale);

    scene.add(shape);

    shape.position.x = Math.random() * 9;
    shape.position.y = Math.random() * 9;
    shape.position.z = Math.random() * 2;

    camera.position.z = 10;
    camera.position.set( 0, 20, 100 );
    controls.update();

    const $newID = document.createElement("span");
    $newID.textContent = shape.uuid;
    const $btnDelete = document.createElement('button');
    $btnDelete.setAttribute('id', 'delete');
    $btnDelete.textContent = 'X';
    $newID.appendChild($btnDelete);
    document.body.appendChild($newID);

};





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
        console.log(e.target.parentNode.textContent);
    }
});
