import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'lil-gui'

// // Debug
// const gui = new dat.GUI({ width: 340 })

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

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100) // caméra en perspective, avec un champ de vision de 75°, une largeur et une hauteur de la fenêtre du navigateur, une distance minimale de 0.1 et une distance maximale de 100
camera.position.x = 3 // position de la caméra sur l'axe x
camera.position.y = 10 // position de la caméra sur l'axe y
camera.position.z = 18 // position de la caméra sur l'axe z
scene.add(camera)

// Textures
const textureLoader = new THREE.TextureLoader()

const alphaMap = textureLoader.load('/textures/alphamap.png') // charge la texture

// floor texture
const floorColorTexture = textureLoader.load('/textures/metal/basecolor.jpg')
const floorAmbientOcclusionTexture = textureLoader.load('/textures/metal/ambientOcclusion.jpg')
const floorHeightTexture = textureLoader.load('/textures/metal/height.png')
const floorNormalTexture = textureLoader.load('/textures/metal/normal.jpg')
const floorMetallicTexture = textureLoader.load('/textures/metal/metallic.jpg')
const floorRoughnessTexture = textureLoader.load('/textures/metal/roughness.jpg')

// metal texture
const metalColorTexture = textureLoader.load('/textures/metal/basecolor.jpg')
const metalAmbientOcclusionTexture = textureLoader.load('/textures/metal/ambientOcclusion.jpg')
const metalHeightTexture = textureLoader.load('/textures/metal/height.png')
const metalNormalTexture = textureLoader.load('/textures/metal/normal.jpg')
const metalMetallicTexture = textureLoader.load('/textures/metal/metallic.jpg')
const metalRoughnessTexture = textureLoader.load('/textures/metal/roughness.jpg')

// surface grunge
const surfaceGrungeColorTexture = textureLoader.load('/textures/surfaceGrunge/basecolor.jpg')
const surfaceGrungeAmbientOcclusionTexture = textureLoader.load('/textures/surfaceGrunge/ambientOcclusion.jpg')
const surfaceGrungeHeightTexture = textureLoader.load('/textures/surfaceGrunge/height.png')
const surfaceGrungeNormalTexture = textureLoader.load('/textures/surfaceGrunge/normal.jpg')
const surfaceGrungeRoughnessTexture = textureLoader.load('/textures/surfaceGrunge/roughness.jpg')

// Matcaps texture
const matCapTexture1 = textureLoader.load('/textures/matcaps/1.png')
const matCapTexture2 = textureLoader.load('/textures/matcaps/2.png')
const matCapTexture3 = textureLoader.load('/textures/matcaps/3.png')
const matCapTexture4 = textureLoader.load('/textures/matcaps/4.png')
const matCapTexture5 = textureLoader.load('/textures/matcaps/5.png')
const matCapTexture6 = textureLoader.load('/textures/matcaps/6.png')
const matCapTexture7 = textureLoader.load('/textures/matcaps/7.png')
const matCapTexture8 = textureLoader.load('/textures/matcaps/8.png')

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 50), // géométrie du plan
  new THREE.MeshStandardMaterial({
    map: floorColorTexture,
    transparent: true,
    aoMap: floorAmbientOcclusionTexture,
    displacementMap: floorHeightTexture,
    displacementScale: 0.1,
    normalMap: floorNormalTexture,
    metalnessMap: floorMetallicTexture,
    roughnessMap: floorRoughnessTexture,
    side: THREE.DoubleSide
  })
)
floor.rotation.x = - Math.PI * 0.5 // rotation du plan, pour qu'il soit horizontal
floor.position.y = 0 // position du plan sur l'axe y (hauteur)

floor.receiveShadow = true

floorColorTexture.wrapS = THREE.RepeatWrapping
floorAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorRoughnessTexture.wrapS = THREE.RepeatWrapping

floorColorTexture.wrapT = THREE.RepeatWrapping
floorAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorRoughnessTexture.wrapT = THREE.RepeatWrapping

scene.add(floor)


/**
 * Objects
 */

for (let i = 0; i < 25; i++) {
    // Tie fighter
    const tieFighter = new THREE.Group()
    scene.add(tieFighter)

    // Cockpit
    const cockpitGeometry = new THREE.SphereGeometry( 0.5, 32, 32 );
    const cockpitMaterial = new THREE.MeshStandardMaterial({
      map: metalColorTexture,
      transparent: true,
      aoMap: metalAmbientOcclusionTexture,
      displacementMap: metalHeightTexture,
      displacementScale: 0.1,
      normalMap: metalNormalTexture,
      metalnessMap: metalMetallicTexture,
      roughnessMap: metalRoughnessTexture,
      side: THREE.DoubleSide
    })
    const cockpit = new THREE.Mesh( cockpitGeometry, cockpitMaterial );
    cockpit.position.y = 2 // position du cockpit sur l'axe y (hauteur)
    tieFighter.add( cockpit );

    // glass
    const glassGeometry = new THREE.ConeGeometry( 0.3, 0.1, 8 ); // (rayon, hauteur, nombre de segments)
    const glassMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      transparent: true,
      roughness: 0.1,
      metalness: 0.1,
      side: THREE.DoubleSide
    })
    const glass = new THREE.Mesh( glassGeometry, glassMaterial );
    glass.position.y = 2 // position du cockpit sur l'axe y (hauteur)
    glass.position.z = 0.535 // position du cockpit sur l'axe z (profondeur)
    glass.rotation.x = - Math.PI * 1.5
    tieFighter.add( glass );

    // glass structure
    const glassStructureGeometry = new THREE.ConeGeometry( 0.3, 0.1, 8 ); // (rayon, hauteur, nombre de segments)
    const glassStructureMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      wireframe: true,
      roughness: 0.1,
      metalness: 0.1,
      side: THREE.DoubleSide
    })
    const glassStructure = new THREE.Mesh( glassStructureGeometry, glassStructureMaterial );
    glassStructure.position.y = 2 // position du cockpit sur l'axe y (hauteur)
    glassStructure.position.z = 0.535 // position du cockpit sur l'axe z (profondeur)
    glassStructure.rotation.x = - Math.PI * 1.5
    tieFighter.add( glassStructure );

    // Wings
    const wingGeometry = new THREE.PlaneGeometry( 2, 2.5 );
    const wingMaterial = new THREE.MeshStandardMaterial({
      map: surfaceGrungeColorTexture,
      transparent: true,
      aoMap: surfaceGrungeAmbientOcclusionTexture,
      displacementMap: surfaceGrungeHeightTexture,
      displacementScale: 0.1,
      normalMap: surfaceGrungeNormalTexture,
      roughnessMap: surfaceGrungeRoughnessTexture,
      side: THREE.DoubleSide
    })
    const wing = new THREE.Mesh( wingGeometry, wingMaterial );
    wing.rotation.y = - Math.PI * 0.5
    wing.position.x = 1.04 // position de l'aile sur l'axe x (largeur)
    wing.position.y = 2 // position de l'aile sur l'axe y (hauteur)
    tieFighter.add( wing );

    // Wings structure
    const wingStructureGeometry = new THREE.PlaneGeometry( 2, 2.5 );
    const wingStructureMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      wireframe: true,
      roughness: 0.1,
      metalness: 0.1,
      opacity: 0.5,
      side: THREE.DoubleSide
    })
    const wingStructure = new THREE.Mesh( wingStructureGeometry, wingStructureMaterial );
    wingStructure.rotation.y = - Math.PI * 0.5
    wingStructure.position.x = 1 // position de l'aile sur l'axe x (largeur)
    wingStructure.position.y = 2 // position de l'aile sur l'axe y (hauteur)
    tieFighter.add( wingStructure );

    // Wings structure 2
    const wingStructure2Geometry = new THREE.PlaneGeometry( 2, 2.5 );
    const wingStructure2Material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      wireframe: true,
      roughness: 0.1,
      metalness: 0.1,
      opacity: 0.5,
      side: THREE.DoubleSide
    })
    const wingStructure2 = new THREE.Mesh( wingStructure2Geometry, wingStructure2Material );
    wingStructure2.rotation.y = Math.PI * 0.5
    wingStructure2.position.x = 1 // position de l'aile sur l'axe x (largeur)
    wingStructure2.position.y = 2 // position de l'aile sur l'axe y (hauteur)
    tieFighter.add( wingStructure2 );

    // Wings 2

    const wing2Geometry = new THREE.PlaneGeometry( 2, 2.5 ); // (largeur, hauteur)
    const wing2Material = new THREE.MeshStandardMaterial({
      map: surfaceGrungeColorTexture,
      transparent: true,
      aoMap: surfaceGrungeAmbientOcclusionTexture,
      displacementMap: surfaceGrungeHeightTexture,
      displacementScale: 0.1,
      normalMap: surfaceGrungeNormalTexture,
      roughnessMap: surfaceGrungeRoughnessTexture,
      side: THREE.DoubleSide
    })
    const wing2 = new THREE.Mesh( wing2Geometry, wing2Material );
    wing2.rotation.y = - Math.PI * 0.5
    wing2.position.x = - 0.95 // position de l'aile sur l'axe x (largeur)
    wing2.position.y = 2 // position de l'aile sur l'axe y (hauteur)
    tieFighter.add( wing2 );

    // Wings2 structure
    const wing2StructureGeometry = new THREE.PlaneGeometry( 2, 2.5 );
    const wing2StructureMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      wireframe: true,
      roughness: 0.1,
      metalness: 0.1,
      opacity: 0.5,
      side: THREE.DoubleSide
    })
    const wing2Structure = new THREE.Mesh( wing2StructureGeometry, wing2StructureMaterial );
    wing2Structure.rotation.y = - Math.PI * 0.5
    wing2Structure.position.x = -1 // position de l'aile sur l'axe x (largeur)
    wing2Structure.position.y = 2 // position de l'aile sur l'axe y (hauteur)
    tieFighter.add( wing2Structure );

    // Wings2 structure 2
    const wing2Structure2Geometry = new THREE.PlaneGeometry( 2, 2.5 );
    const wing2Structure2Material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      wireframe: true,
      roughness: 0.1,
      metalness: 0.1,
      opacity: 0.5,
      side: THREE.DoubleSide
    })
    const wing2Structure2 = new THREE.Mesh( wing2Structure2Geometry, wing2Structure2Material );
    wing2Structure2.rotation.y = Math.PI * 0.5
    wing2Structure2.position.x = -1 // position de l'aile sur l'axe x (largeur)
    wing2Structure2.position.y = 2 // position de l'aile sur l'axe y (hauteur)
    tieFighter.add( wing2Structure2 );

    // Cylinder
    const cylinderGeometry = new THREE.CylinderGeometry( 0.1, 0.2, 0.6, 32 ); // géométrie du cylindre (rayon du haut, rayon du bas, hauteur, nombre de segments)
    const cylinderMaterial = new THREE.MeshStandardMaterial({
      map: metalColorTexture,
      transparent: true,
      aoMap: metalAmbientOcclusionTexture,
      displacementMap: metalHeightTexture,
      displacementScale: 0.1,
      normalMap: metalNormalTexture,
      metalnessMap: metalMetallicTexture,
      roughnessMap: metalRoughnessTexture,
      side: THREE.DoubleSide
    })
    const cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
    cylinder.rotation.z = - Math.PI * 0.5
    cylinder.position.x = 0.7 // position de l'aile sur l'axe x (largeur)
    cylinder.position.y = 2 // position de l'aile sur l'axe y (hauteur)
    tieFighter.add( cylinder );

    const cylinder2Geometry = new THREE.CylinderGeometry( 0.1, 0.2, 0.6, 32 ); // géométrie du cylindre (rayon du haut, rayon du bas, hauteur, nombre de segments)
    const cylinder2Material = new THREE.MeshStandardMaterial({
      map: metalColorTexture,
      transparent: true,
      aoMap: metalAmbientOcclusionTexture,
      displacementMap: metalHeightTexture,
      displacementScale: 0.1,
      normalMap: metalNormalTexture,
      metalnessMap: metalMetallicTexture,
      roughnessMap: metalRoughnessTexture,
      side: THREE.DoubleSide
    })
    const cylinder2 = new THREE.Mesh( cylinder2Geometry, cylinder2Material );
    cylinder2.rotation.z = Math.PI * 0.5
    cylinder2.position.x = - 0.7 // position de l'aile sur l'axe x (largeur)
    cylinder2.position.y = 2 // position de l'aile sur l'axe y (hauteur)
    tieFighter.add( cylinder2 );

    // Position
    // espacer les tie fighters de 5 sur l'axe x et de 5 sur l'axe z et centrer la grille
    tieFighter.position.x = (i % 5) * 5 - 10 // 5 = nombre de tie fighters par ligne - 10 = centrer la grille
    tieFighter.position.z = Math.floor(i / 5) * 5 - 10 // position du tie fighter sur l'axe z (profondeur) - 10 = centrer la grille
    tieFighter.position.y = 1 // position du tie fighter sur l'axe y (hauteur)

    // Shadow
    cockpit.castShadow = true
    wing.castShadow = true
    wing2.castShadow = true
    cylinder.castShadow = true
    cylinder2.castShadow = true
}

/**
 * Torches
 */

const torch = new THREE.Group()
scene.add(torch)

const torchGeometry = new THREE.CylinderGeometry( 0.1, 0.1, 4, 32 ); // géométrie du cylindre (rayon du haut, rayon du bas, hauteur, nombre de segments)
const torchMaterial = new THREE.MeshStandardMaterial({
  color: 0x000000,
  transparent: true,
  roughness: 0.1, // brillance
  metalness: 0.1, // métal
  opacity: 0.5,
  side: THREE.DoubleSide
})
const torch1 = new THREE.Mesh( torchGeometry, torchMaterial );
torch1.position.x = 24.9 // position de l'aile sur l'axe x (largeur)
torch1.position.y = 2 // position de l'aile sur l'axe y (hauteur)
torch1.position.z = 24.9 // position de l'aile sur l'axe y (hauteur)
torch.add( torch1 );

const torch2 = new THREE.Mesh( torchGeometry, torchMaterial );
torch2.position.x = -24.9 // position de l'aile sur l'axe x (largeur)
torch2.position.y = 2 // position de l'aile sur l'axe y (hauteur)
torch2.position.z = 24.9 // position de l'aile sur l'axe y (hauteur)
torch.add( torch2 );

const torch3 = new THREE.Mesh( torchGeometry, torchMaterial );
torch3.position.x = 24.9 // position de l'aile sur l'axe x (largeur)
torch3.position.y = 2 // position de l'aile sur l'axe y (hauteur)
torch3.position.z = -24.9 // position de l'aile sur l'axe y (hauteur)
torch.add( torch3 );

const torch4 = new THREE.Mesh( torchGeometry, torchMaterial );
torch4.position.x = -24.9 // position de l'aile sur l'axe x (largeur)
torch4.position.y = 2 // position de l'aile sur l'axe y (hauteur)
torch4.position.z = -24.9 // position de l'aile sur l'axe y (hauteur)
torch.add( torch4 );

// head torch
// ajouter un Octahedron pour faire une tête de torche
const headTorchGeometry = new THREE.OctahedronGeometry( 0.2, 0 ); // rayon, nombre de segments
const headTorchMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  transparent: true,
  roughness: 0.5, // brillance
  metalness: 0.5, // métal
  opacity: 0.5,
  side: THREE.DoubleSide
})
const headTorch1 = new THREE.Mesh( headTorchGeometry, headTorchMaterial );
headTorch1.position.x = 24.9
headTorch1.position.y = 4
headTorch1.position.z = 24.9
torch.add( headTorch1 );

const headTorch2 = new THREE.Mesh( headTorchGeometry, headTorchMaterial );
headTorch2.position.x = -24.9
headTorch2.position.y = 4
headTorch2.position.z = 24.9
torch.add( headTorch2 );

const headTorch3 = new THREE.Mesh( headTorchGeometry, headTorchMaterial );
headTorch3.position.x = 24.9
headTorch3.position.y = 4
headTorch3.position.z = -24.9
torch.add( headTorch3 );

const headTorch4 = new THREE.Mesh( headTorchGeometry, headTorchMaterial );
headTorch4.position.x = -24.9
headTorch4.position.y = 4
headTorch4.position.z = -24.9
torch.add( headTorch4 );

// torch light
const torchLight = new THREE.PointLight(0xffffff, 1, 15) // couleur, intensité, distance
torchLight.position.set(24.9, 4, 24.9)
scene.add(torchLight)

// torch2 light
const torch2Light = new THREE.PointLight(0xffffff, 1, 15)
torch2Light.position.set(-24.9, 4, 24.9)
scene.add(torch2Light)

// torch3 light
const torch3Light = new THREE.PointLight(0xffffff, 1, 15)
torch3Light.position.set(24.9, 4, -24.9)
scene.add(torch3Light)

// torch4 light
const torch4Light = new THREE.PointLight(0xffffff, 1, 15)
torch4Light.position.set(-24.9, 4, -24.9)
scene.add(torch4Light)

// torch light top
const torchLightTop = new THREE.PointLight(0xff0000, 1, 15)
torchLightTop.position.set(24.9, 6, 24.9)
scene.add(torchLightTop)

// torch2 light top
const torch2LightTop = new THREE.PointLight(0xff0000, 1, 15)
torch2LightTop.position.set(-24.9, 6, 24.9)
scene.add(torch2LightTop)

// torch3 light top
const torch3LightTop = new THREE.PointLight(0xff0000, 1, 15)
torch3LightTop.position.set(24.9, 6, -24.9)
scene.add(torch3LightTop)

// torch4 light top
const torch4LightTop = new THREE.PointLight(0xff0000, 1, 15)
torch4LightTop.position.set(-24.9, 6, -24.9)
scene.add(torch4LightTop)

/**
 * Particles
 */
// Geometry
const particlesGeometry = new THREE.BufferGeometry()
const count = 100000

const positions = new Float32Array(count * 3)

for (let i = 0; i < count * 3; i++)
{
    positions[i] = ((Math.random() - 0.5) * 10) * 100
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

// Material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.2,
    sizeAttenuation: true,
    alphaMap: alphaMap,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
})

// Points
const bubbles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(bubbles)


// Lights
const ambientLight = new THREE.AmbientLight( 0xff9000, 0.5 ) // lumière ambiante, couleur, intensité de 0.5
scene.add(ambientLight)

const pointLight = new THREE.PointLight( 0xff9000, 1 )
pointLight.position.set(0, 25, 0) // position de la lumière directionnelle sur l'axe x, y et z
pointLight.castShadow = true
pointLight.shadow.camera.near = 0.1 // distance minimale de la caméra
pointLight.shadow.camera.far = 35 // distance maximale de la caméra
pointLight.shadow.mapSize.width = 1024 // taille de la carte d'ombre
pointLight.shadow.mapSize.height = 1024 // taille de la carte d'ombre
pointLight.shadow.radius = 2 // taille de la carte d'ombre
scene.add(pointLight)

const UpsidePointLight = new THREE.PointLight( 0xff9000, 1 )
UpsidePointLight.position.set(0, -25, 0) // position de la lumière directionnelle sur l'axe x, y et z
scene.add(UpsidePointLight)

const pointLight2 = new THREE.PointLight( 0xff0000, 0.8 )
pointLight2.position.set(0, 1, -20) // position de la lumière directionnelle sur l'axe x, y et z
pointLight2.castShadow = true
pointLight2.shadow.camera.near = 0.1 // distance minimale de la caméra
pointLight2.shadow.camera.far = 35 // distance maximale de la caméra
pointLight2.shadow.mapSize.width = 1024 // taille de la carte d'ombre
pointLight2.shadow.mapSize.height = 1024 // taille de la carte d'ombre
scene.add(pointLight2)

const pointLight3 = new THREE.PointLight( 0xffffff, 0.8 )
pointLight3.position.set(0, 1, 20) // position de la lumière directionnelle sur l'axe x, y et z
pointLight3.castShadow = true
pointLight3.shadow.camera.near = 0.1 // distance minimale de la caméra
pointLight3.shadow.camera.far = 35 // distance maximale de la caméra
pointLight3.shadow.mapSize.width = 1024 // taille de la carte d'ombre
pointLight3.shadow.mapSize.height = 1024 // taille de la carte d'ombre
scene.add(pointLight3)

const pointLight4 = new THREE.PointLight( '#ff00ff', 0.3 )
pointLight4.position.set(20, 1, 0) // position de la lumière directionnelle sur l'axe x, y et z
pointLight4.castShadow = true
pointLight4.shadow.camera.near = 0.1 // distance minimale de la caméra
pointLight4.shadow.camera.far = 35 // distance maximale de la caméra
pointLight4.shadow.mapSize.width = 1024 // taille de la carte d'ombre
pointLight4.shadow.mapSize.height = 1024 // taille de la carte d'ombre
scene.add(pointLight4)

const pointLight5 = new THREE.PointLight( '#00ffff', 0.8 )
pointLight5.position.set(-20, 1, 0) // position de la lumière directionnelle sur l'axe x, y et z
pointLight5.castShadow = true
pointLight5.shadow.camera.near = 0.1 // distance minimale de la caméra
pointLight5.shadow.camera.far = 35 // distance maximale de la caméra
pointLight5.shadow.mapSize.width = 1024 // taille de la carte d'ombre
pointLight5.shadow.mapSize.height = 1024 // taille de la carte d'ombre
scene.add(pointLight5)

// Helpers
// const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
// scene.add(pointLightCameraHelper)

// const pointLightCameraHelper2 = new THREE.CameraHelper(pointLight2.shadow.camera)
// scene.add(pointLightCameraHelper2)

// // Debug
// gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('Ambient Light')
// gui.add(pointLight, 'intensity').min(0).max(1).step(0.001).name('Point Light')
// gui.add(pointLight2, 'intensity').min(0).max(1).step(0.001).name('Point Light 2')
// gui.add(pointLight3, 'intensity').min(0).max(1).step(0.001).name('Point Light 3')
// // gui.add(pointLight4, 'intensity').min(0).max(1).step(0.001).name('Point Light 4')
// gui.add(pointLight5, 'intensity').min(0).max(1).step(0.001).name('Point Light 5')

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap // permet d'avoir des ombres plus douces

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    const pointLight2Angle = elapsedTime * 0.5
    pointLight2.position.x = Math.cos(pointLight2Angle) * 10
    pointLight2.position.z = Math.sin(pointLight2Angle) * 10

    // Torch
    //faire clignoter torch1 et headTorch1
    if (elapsedTime % 1 < 0.1) {
        torchLightTop.visible = true
        headTorch1.visible = true
        torch2LightTop.visible = true
        headTorch2.visible = true
        torch3LightTop.visible = true
        headTorch3.visible = true
        torch4LightTop.visible = true
        headTorch4.visible = true
    } else {
        torchLightTop.visible = false
        headTorch1.visible = false
        torch2LightTop.visible = false
        headTorch2.visible = false
        torch3LightTop.visible = false
        headTorch3.visible = false
        torch4LightTop.visible = false
        headTorch4.visible = false
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
