let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );

let renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

function createCube(scale) {
    let geometry = new THREE.BoxGeometry( 1, 1, 1 );
    let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    let cube = new THREE.Mesh( geometry, material );

    scale = scale || 1;
    geometry.scale(scale, scale, scale);

    scene.add( cube );

    cube.position.x = Math.random() * 9;
    cube.position.y = Math.random() * 9;
    cube.position.z = Math.random() * 2;

    const $newID = document.createElement("span");
    $newID.textContent = cube.uuid;
    const $btnDelete = document.createElement('button');
    $btnDelete.setAttribute('id', 'delete');
    $btnDelete.textContent = 'X';
    $newID.appendChild($btnDelete);

    document.body.appendChild($newID);
}

camera.position.z = 10;

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();

const $selectGeometry = document.getElementById('geometry');
const $inputScale = document.getElementById('scale');
const $btnCreate = document.getElementById('btnCreate');

$btnCreate.addEventListener('click', function () {
    let geometryN = $selectGeometry.value;
    let scale = $inputScale.value;
    if (geometryN === 'cube') {
        createCube(scale)
    }
});
document.body.addEventListener('click', function(e) {
        if (e.target.id === 'delete') {
            console.log(e.target.parentNode.textContent);
        }
});
