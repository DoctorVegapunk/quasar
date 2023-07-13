<script >

    import { onMount } from 'svelte'
    import {PerspectiveCamera,Scene,WebGLRenderer,Mesh,SphereBufferGeometry,MeshBasicMaterial,Clock,TextureLoader,MeshMatcapMaterial,BufferGeometry,PointsMaterial,Color,BufferAttribute,AdditiveBlending,Points} from 'three'
    import * as THREE from 'three'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
    import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
    import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
    import gsap from 'gsap'
    import Navbar from '../components/Navbar.svelte'
    const scene = new Scene()
    
    onMount(()=>{
        const textureLoader = new TextureLoader()
        
        const canvas = document.querySelector('canvas.webgl')
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }


        const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.z = 4
        
        scene.add(camera)
        
        const matcapTextureGlobe = textureLoader.load('textures/matcaps/2.png')
        const geometry = new SphereBufferGeometry(1, 22, 22)
        const material = new MeshBasicMaterial({ color: "white" ,wireframe:true,map:matcapTextureGlobe})
        const mesh = new Mesh(geometry, material)
        scene.add(mesh)
        const matcapTextureText = textureLoader.load('textures/matcaps/2.png')
        const fontLoader = new FontLoader()
        fontLoader.load('/fonts/helvetiker_regular.typeface.json',
            (font) =>
            {
               
                // Material
                const materialMatCap = new MeshMatcapMaterial({ matcap: matcapTextureText })

                // Text
                const textGeometry = new TextGeometry(
                    "WWW.",
                    {
                        font: font,
                        size: 0.4,
                        height: 0.4,
                        curveSegments: 32,
                        bevelEnabled: true,
                        bevelThickness: 0.03,
                        bevelSize: 0.02,
                        bevelOffset: 0,
                        bevelSegments: 5,
                    }
                )
                textGeometry.center()
                

                const text = new THREE.Mesh(textGeometry, materialMatCap)
                scene.add(text)
                window.requestAnimationFrame(()=>console.log("d"))
  
            }
        )

            /**
 * Textures
 */
const particleTexture = textureLoader.load('/textures/particles/8.png')

/**
 * Particles
 */
// Geometry
const particlesGeometry = new BufferGeometry()
const count = 2000

const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for(let i = 0; i < count * 3; i++)
{
    positions[i] = (Math.random() - 0.5) * 10
    colors[i] = Math.random()
}

particlesGeometry.setAttribute('position', new BufferAttribute(positions, 3))
particlesGeometry.setAttribute('color', new BufferAttribute(colors, 3))

// Material
const particlesMaterial = new PointsMaterial()

particlesMaterial.size = 0.1
particlesMaterial.sizeAttenuation = true

particlesMaterial.color = new Color('#ff88cc')

particlesMaterial.transparent = true
particlesMaterial.alphaMap = particleTexture
// particlesMaterial.alphaTest = 0.01
// particlesMaterial.depthTest = false
particlesMaterial.depthWrite = false
particlesMaterial.blending = AdditiveBlending

particlesMaterial.vertexColors = true

// Points
const particles = new Points(particlesGeometry, particlesMaterial)
scene.add(particles)


        const renderer = new WebGLRenderer({
            canvas: canvas
        })
        renderer.setSize(sizes.width * 0.987, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.render(scene, camera)

        const controls = new OrbitControls(camera, canvas)
        controls.enableDamping = true
        const clock = new Clock()
        const tick = () =>
        {
            const elapsedTime = clock.getElapsedTime()
            mesh.rotation.y = elapsedTime * 0.5
          
            // Update controls 
            controls.update()

            // Render
            renderer.render(scene, camera)

          

            // Call tick again on the next frame
            
           
            window.requestAnimationFrame(tick)
        }
        window.addEventListener('mousemove', event => {
                camera.position.x = (event.clientX - (sizes.width/2)) / 400
                camera.position.y = (event.clientY - (sizes.height/2)) / 400
               
        });
        window.addEventListener('resize',event=>{
     
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
        tick()
        
    })

    
    let canvas = null;

</script>


<canvas bind:this={canvas} class="webgl absolute" style="z-index:-1;"></canvas>
<div class="retroFont" style="height:100vh;">
    <div class="text-center text-white pt-5 h-1/3 ">
        <p class="text-4xl md:mt-10 titleFont">Quasar Web Technologies</p>
        <br>
        <p class="subtitleFont">
            Take your business to the next step today
        </p>
        
    </div>
    <!-- <div class="h-1/3 md:mt-4"></div>
    <p class="text-center mt-5">Loading...</p>
    
    <div class="my-10">
        <div class="w-5/6 mx-auto bg-inherit">
            <div class="h-6 bg-green-700" style="width: 25%"></div>
        </div>
    </div> -->
    {#if canvas}
        <a href="/home"><button class="flex mx-auto rounded-md primary-background text-white py-3 px-6 w-fit my-10 absolute inset-x-0 bottom-0 buttonFont" >VISIT OUR WEBSITE</button></a>
    {/if}
   
</div>
