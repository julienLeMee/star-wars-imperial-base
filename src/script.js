import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Cursor
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
})

// Resize
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})

// Scene
const scene = new THREE.Scene()

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 50), // géométrie du plan
  new THREE.MeshNormalMaterial({
    color: '#ff0000',
    side: THREE.DoubleSide
  }) // matériau du plan
)
floor.rotation.x = - Math.PI * 0.5 // rotation du plan, pour qu'il soit horizontal
floor.position.y = 0 // position du plan sur l'axe y (hauteur)
scene.add(floor)


/**
 * Objects
 */

for (let i = 0; i < 25; i++) {
    // Tie fighter
    const tieFighter = new THREE.Group()
    scene.add(tieFighter)

    // Cockpit
    const cockpitGeometry = new THREE.SphereGeometry( 0.5, 8, 8 );
    const cockpitMaterial = new THREE.MeshBasicMaterial( {
      color: 0xffff00,
      wireframe: true
    });
    const cockpit = new THREE.Mesh( cockpitGeometry, cockpitMaterial );
    cockpit.position.y = 2 // position du cockpit sur l'axe y (hauteur)
    tieFighter.add( cockpit );

    // Wings
    const wingGeometry = new THREE.PlaneGeometry( 2, 2);
    const wingMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      side: THREE.DoubleSide,
      wireframe: true
    });
    const wing = new THREE.Mesh( wingGeometry, wingMaterial );
    wing.rotation.y = - Math.PI * 0.5
    wing.position.x = 1 // position de l'aile sur l'axe x (largeur)
    wing.position.y = 2 // position de l'aile sur l'axe y (hauteur)
    tieFighter.add( wing );

    const wing2Geometry = new THREE.PlaneGeometry( 2, 2 );
    const wing2Material = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      side: THREE.DoubleSide,
      wireframe: true
    });
    const wing2 = new THREE.Mesh( wing2Geometry, wing2Material );
    wing2.rotation.y = - Math.PI * 0.5
    wing2.position.x = -1 // position de l'aile sur l'axe x (largeur)
    wing2.position.y = 2 // position de l'aile sur l'axe y (hauteur)
    tieFighter.add( wing2 );

    // Cylinder
    const cylinderGeometry = new THREE.CylinderGeometry( 0.1, 0.2, 0.5, 8 ); // géométrie du cylindre (rayon du haut, rayon du bas, hauteur, nombre de segments)
    const cylinderMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      side: THREE.DoubleSide,
      wireframe: true
    });
    const cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
    cylinder.rotation.z = - Math.PI * 0.5
    cylinder.position.x = 0.75 // position de l'aile sur l'axe x (largeur)
    cylinder.position.y = 2 // position de l'aile sur l'axe y (hauteur)
    tieFighter.add( cylinder );

    const cylinder2Geometry = new THREE.CylinderGeometry( 0.1, 0.2, 0.5, 8 ); // géométrie du cylindre (rayon du haut, rayon du bas, hauteur, nombre de segments)
    const cylinder2Material = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      side: THREE.DoubleSide,
      wireframe: true
    });
    const cylinder2 = new THREE.Mesh( cylinder2Geometry, cylinder2Material );
    cylinder2.rotation.z = Math.PI * 0.5
    cylinder2.position.x = - 0.75 // position de l'aile sur l'axe x (largeur)
    cylinder2.position.y = 2 // position de l'aile sur l'axe y (hauteur)
    tieFighter.add( cylinder2 );

    // Position
    // espacer les tie fighters de 5 sur l'axe x et de 5 sur l'axe z
    tieFighter.position.x = (i % 5) * 5 // 5 = nombre de tie fighters par ligne
    tieFighter.position.z = Math.floor(i / 5) * 5 // position du tie fighter sur l'axe z (profondeur)
    tieFighter.position.y = 1 // position du tie fighter sur l'axe y (hauteur)

    // tieFighter.position.x = (i % 5) * 2 // 5 = nombre de tie fighters par ligne
    // tieFighter.position.z = Math.floor(i / 5) // position du tie fighter sur l'axe z (profondeur)
    // tieFighter.position.y = 1 // position du tie fighter sur l'axe y (hauteur)

}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100) // caméra en perspective, avec un champ de vision de 75°, une largeur et une hauteur de la fenêtre du navigateur, une distance minimale de 0.1 et une distance maximale de 100
camera.position.x = 4 // position de la caméra sur l'axe x
camera.position.y = 4 // position de la caméra sur l'axe y
camera.position.z = 10 // position de la caméra sur l'axe z
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
