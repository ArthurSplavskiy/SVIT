//import { bodyLockStatus, bodyLockToggle } from '../../core/utils/functions.js'

export default class Sketch {
    constructor (options) {
        this.container = options.domElement
        this.fadeElement = options.fadeElement

        this.width = this.container.offsetWidth
        this.height = this.container.offsetHeight

        this.camera = new THREE.PerspectiveCamera( 75, this.width / this.height, 0.1, 100 )
	    this.camera.position.z = 1

	    this.scene = new THREE.Scene()

        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true
        })
        this.renderer.physicallyCorrectLights = true
        this.renderer.outputEncoding = THREE.sRGBEncoding
        this.renderer.toneMapping = THREE.ReinhardToneMapping
        this.renderer.toneMappingExposure = 3
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        this.container.appendChild( this.renderer.domElement )

        this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement )
        this.enableZoom = false
        this.controls.zoomSpeed = false
        this.controls.enableDamping = true
        this.controls.minAzimuthAngle = -(Math.PI * 0.5)
        this.controls.maxAzimuthAngle = Math.PI * 0.5

        this.time = 0

        this.addLoaders()
        this.resize()
        this.addModel()
        this.addLights()
        this.addEnvironmentMaps()
        this.setModelPosition()
        this.setupResize()
        this.render()
    }

    /*
      * Loaders
    */
    addLoaders () {
        this.loadingManager = new THREE.LoadingManager(
            // Loaded
            () =>
            {
                this.modelShow()
            },
            // Progress
            (itemUrl, itemsLoaded, itemsTotal) =>
            {
                //console.log(itemsTotal)
            }
        )

        this.cubeTextureLoader = new THREE.CubeTextureLoader()
    }

    /*
      * 3d models
    */
    addModel () {
        const dracoLoader = new THREE.DRACOLoader(this.loadingManager)
        dracoLoader.setDecoderPath('/others/draco/')

        const gltfLoader = new THREE.GLTFLoader(this.loadingManager)
        gltfLoader.setDRACOLoader(dracoLoader)

        gltfLoader.load('/others/model.glb', (gltf) => {
            this.model = gltf.scene
            this.model.position.set(0, 0, -0.5)
            this.controls.target.set(0, 0, -0.5)
            this.scene.add(this.model)
            
            this.updateAllMaterials()
        })
    }

    /*
      * Lights
    */
    addLights () {
        // ambient
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
        this.scene.add(this.ambientLight)

        // directional
        this.directionalLight = new THREE.DirectionalLight(0xa121ce, 0.3)
        this.scene.add(this.directionalLight)
    }

    /*
      * Resize
    */
    resize () {
        this.width = this.container.offsetWidth
        this.height = this.container.offsetHeight
        this.renderer.setSize( this.width, this.height )
        this.camera.aspect = this.width / this.height
        this.camera.updateProjectionMatrix()
    }
    setupResize () {
        window.addEventListener('resize', this.resize.bind(this))
    }

    /*
      * Utils
    */
    updateAllMaterials () {
        this.scene.traverse((child) =>
        {
            if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
            {
                child.material.envMapIntensity = 0.3
                child.material.needsUpdate = true
                child.castShadow = true
                child.receiveShadow = true
            }
        })
    }

    addEnvironmentMaps () {
        this.environmentMap = this.cubeTextureLoader.load([
            '/others/textures/environmentMaps/nx.jpg',
            '/others/textures/environmentMaps/ny.jpg',
            '/others/textures/environmentMaps/nz.jpg',
            '/others/textures/environmentMaps/px.jpg',
            '/others/textures/environmentMaps/py.jpg',
            '/others/textures/environmentMaps/pz.jpg'
        ])
        this.environmentMap.encoding = THREE.sRGBEncoding
        this.scene.environment = this.environmentMap
    }

    setModelPosition () {
        gsap.set(this.container, {
            y: '50%',
            scale: 1.5
        })
    }

    modelShow () {
        const modelMotionTimeline = gsap.timeline()

        modelMotionTimeline.to('[data-preloader]', {
            opacity: 0
        })
        modelMotionTimeline.to(this.container, {
           duration: 2,
           delay: 1,
           y: '0',
           x: '350',
           scale: 1,
           ease: Power3.easeOut   
        })
        modelMotionTimeline.to(this.model.rotation, {
            duration: 2,
            ease: Power3.easeOut,
            x: -0.75,
            y: 0.25
        }, '-=0.5')
        modelMotionTimeline.to(this.model.rotation, {
            duration: 1.5,
            x: 0,
            y: 0
        })
        modelMotionTimeline.call(_ => {
            this.fadeElement.classList.add('show')
            // if (bodyLockStatus) {
            //     bodyLockToggle()
            // }
        })
    }

    /*
      * Render
    */
    render () {
        this.time += 0.05

        this.controls.update()

	    this.renderer.render( this.scene, this.camera )

        window.requestAnimationFrame(this.render.bind(this))
    }
}