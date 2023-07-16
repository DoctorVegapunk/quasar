<script async>
	import animate from '$lib/animate';
    import { onMount,onDestroy } from "svelte";
    import Navbar from "../../components/Navbar.svelte";
    import { PerspectiveCamera, Scene, Clock, WebGLRenderer, AmbientLight,Raycaster, PlaneGeometry, MeshBasicMaterial, Mesh, AxesHelper, Group, DirectionalLight, BoxGeometry, MeshStandardMaterial, Vector2 } from 'three';
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
    import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
    import gsap from 'gsap'
    import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
    import { theme } from "../../store";
    
    import { tweened } from "svelte/motion";
    import { cubicIn } from 'svelte/easing';

    let themeValue 
    theme.subscribe((val)=>{
        themeValue = val
    })
    

   

    // 1 Non Three JS Imports 
    const leviPotrait = '/Images/levi_portrait.jpg'
    const athensSchoolBack = '/Images/athens_school_back.jpeg'
    const testimonials = [{
        title:"Convert Gridsome Website to Astro (+Vue if required)",
        comment:"Very happy to recommend Levi. He was very pro-active, communicated very well and completed the job perfectly. Thanks Levi!"
    },
    {
        title:"Guide me on building a website",
        comment:"Levi knows a lot about web-development and is a great communicator. Recommended."
    }]


    // 2 Three Js Imports
    const scene = new Scene();
    let renderer;
    


    onMount(()=>{

        animate('pageSubtitle','fade',0,1)
        animate('pageDescription','fade',0,1)
        animate('pageTitle','typewriter')
        animate("pageHighlight1",'fadeup',0,1)
        animate("pageHighlight2",'fadeup',0,1)
        animate("pageHighlight3",'fadeup',0,1)
        animate("scrollDownContainer","scaleup",1,1.2)
        animate("developerTitle","borderslide")
        animate("leviAbout",'fade',0,1)
        animate("philosophyTitle","borderslide")
        testimonials.forEach((testimonial, index) => {
            animate(`testimonialComment${index}`,'typewriter')
        })



        // 4. Philosophy Container Udate color
        const divElement = document.getElementById('philosophy-container');
        const divPosition = divElement.offsetTop;

        var navElement = document.getElementById('navbar');



        const updateNavColor = ()=>{
            
                if (window.scrollY > (divPosition-50) ) {

                    navElement.style.color = 'white'; 

                    }
                    else{
                    navElement.style.color = 'black'; // Change the color to red
                }
        }
        
        updateNavColor()
        window.addEventListener('scroll',(e)=>{
            if (themeValue !== 'dark'){
                updateNavColor()
            }
        })

        // 5 Iphone Setup
        const canvas = document.getElementById("canvas");
        const sizes = {
            height: window.innerHeight,
            width: window.innerWidth/3
        };
        const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        camera.position.z = 1.55;
        camera.position.y = 0.05;
        scene.add(camera);

        renderer = new WebGLRenderer({
            canvas: canvas,
            alpha:'true'
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(sizes.width * 0.987, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));



        const ambientLight = new AmbientLight(0xffffff, 0);
        scene.add(ambientLight);

        function findArrayPosition(obj, target) {
            // Iterate through each property in the object
            for (const prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                const value = obj[prop];

                // Check if the property is an array
                if (Array.isArray(value)) {
                    // Search for the target object within the array
                    const index = value.findIndex((item) => JSON.stringify(item) === JSON.stringify(target));
                    if (index !== -1) {
                    return { propName: prop, index };
                    }
                }

                // If the property is another object, recursively search within it
                if (typeof value === 'object') {
                    const result = findArrayPosition(value, target);
                    if (result) {
                    // If the target object is found within a nested object, return the result
                    return { propName: prop, ...result };
                    }
                }
                }
            }

            // If the target object is not found, return null
            return null;
        }


        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        let iphoneModel_1;
        let iphoneModel_2;
        let iphoneModel_3;
        gltfLoader.setDRACOLoader(dracoLoader)
        


        gltfLoader.load(
            '3D Assets/iphone1/scene.gltf',
            (gltf) =>
            {
                gltf.scene.scale.set(4.5, 4.5, 4.5)
                gltf.scene.position.x = -0.3
                gltf.scene.position.y = -0.4
                gltf.scene.rotateY(110)
                gltf.scene.rotateStatus = true
                iphoneModel_1 = gltf.scene
                scene.add(iphoneModel_1)

            }
        )


        gltfLoader.load(
            '3D Assets/iphone2/scene.gltf',
            (gltf) =>
            {
                gltf.scene.scale.set(4.5, 4.5, 4.5)
                gltf.scene.position.x = 0.4
                gltf.scene.position.y = -0.85
                gltf.scene.rotation.y = 70
                gltf.scene.rotateY(110)
                gltf.scene.rotateStatus = true
                iphoneModel_2 = gltf.scene;
                scene.add(iphoneModel_2)
            }
        )
        gltfLoader.load(
            '3D Assets/iphone3/scene.gltf',
            (gltf) =>
            {
                gltf.scene.scale.set(4.5, 4.5, 4.5)
                gltf.scene.position.x = 0.4
                gltf.scene.position.y = 0.05
                gltf.scene.rotation.y = -70
                gltf.scene.rotateY(110)
                gltf.scene.rotateStatus = true
                iphoneModel_3 = gltf.scene
                scene.add(iphoneModel_3)
            }
        )


        const directionalLight_l = new DirectionalLight(0xffffff, 10);
        // const axesHelper_l = new AxesHelper(2); // Size parameter determines the length of the axes 

        const group_l = new Group();
        group_l.position.set(-0.8,0.7,-0.2)
        group_l.rotation.z = -0.6
        group_l.rotation.x = -0.7
        group_l.add(directionalLight_l)
        // group_l.add(axesHelper_l)

        scene.add(group_l);

        const directionalLight_r = new DirectionalLight(0xffffff, 10);
        // const axesHelper_r = new AxesHelper(2); // Size parameter determines the length of the axes

        const group_r = new Group();
        group_r.position.set(0.7,0.7,-0.2)
        group_r.rotation.z = -0.6
        group_r.rotation.y = -2
        group_r.rotation.x = -1
        group_r.add(directionalLight_r)
        // group_r.add(axesHelper_r)

        scene.add(group_r);


        const directionalLight_c = new DirectionalLight(0xffffff, 10);
        // const axesHelper_c = new AxesHelper(2); // Size parameter determines the length of the axes

        const group_c = new Group();
        group_c.position.z = 1.1
        group_c.rotation.y = 2.2
        group_c.add(directionalLight_c)
        // group_c.add(axesHelper_c)
        scene.add(group_c);

        // const cubeGeometry = new BoxGeometry(1, 1, 1);
        // const cubeMaterial = new MeshStandardMaterial({ color: 0xff0000 });
        // const cube = new Mesh(cubeGeometry, cubeMaterial);
        // cube.position.y = 1; // Place the cube on top of the plane

        // scene.add(cube);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.rotateSpeed = 0.3;
        controls.zoomSpeed = 0.6;
        controls.panSpeed = 0.8;

        const clock = new Clock();


        // 1. Animate the phone on hover
        const raycaster = new Raycaster()
        const mouse = new Vector2()
        const onDocumentMouseMove = (event) => {
            mouse.x = -5 + (event.clientX / window.innerWidth) * 6;

            mouse.y = -(event.clientY / sizes.height) * 2 + 1;
        }
        document.addEventListener('mousemove', onDocumentMouseMove, false);

        //1.1 Function to animate model
        const iphoneHoverAnimate = (model) =>{
            raycaster.setFromCamera(mouse,camera)
            var intersects = raycaster.intersectObject(model,true);

            if (intersects.length > 0) { 
                if(model.rotateStatus){
                    gsap.to(model.scale, {
                        duration: 1,
                        x: 5.2,
                        y: 5.2,
                        z: 5.2,
                        ease: "power2.out"
                    })
                }
                model.rotateStatus = false
                model.rotation.y = 0

            } else {
                if(!model.rotateStatus){
                    gsap.to(model.scale, {
                        duration: 1,
                        x: 4.5,
                        y: 4.5,
                        z: 4.5,
                        ease: "power2.out"
                    })
                }
                model.rotateStatus = true
                
            }

        }

        const tick = () => {

            const elapsedTime = clock.getElapsedTime()
            if(iphoneModel_1 !== undefined && iphoneModel_2 !== undefined && iphoneModel_3 !== undefined ){
                iphoneModel_1.rotateStatus ? iphoneModel_1.rotation.y = elapsedTime * 0.5 : undefined;
                iphoneModel_2.rotateStatus ? iphoneModel_2.rotation.y = 70 + ( elapsedTime * 0.5) : undefined;
                iphoneModel_3.rotateStatus ? iphoneModel_3.rotation.y = -70 + ( elapsedTime * 0.5) : undefined;
                
                iphoneHoverAnimate(iphoneModel_1)
                iphoneHoverAnimate(iphoneModel_2)
                iphoneHoverAnimate(iphoneModel_3)
            }
            controls.update(); // Update orbit controls
            renderer.render(scene, camera);
            window.requestAnimationFrame(tick);
        };
        tick();


    });
    onDestroy(()=>{
        if(renderer !== undefined){
            renderer.dispose();
        }
    })


    const scrollToElement = (elementID) =>{
        const element = document.getElementById(elementID)
        element.scrollIntoView({
            behavior:"smooth"
        })
    }




</script>
<div >
    
    <div class="dark:bg-gray-800">
        <div class="relative z-10">
            <Navbar/>
        </div>
        <canvas id="canvas" style="background-color:transparent;position:absolute; right:0;" class="hidden md:block"></canvas>
        <div class="px-8 min-h-screen md:py-0">
            <div class="pt-32 mx-6">
                <div class="hidden md:block">
                    <p id="pageTitle" class="titleFont italic !shadow-red-800 homeTitle text-5xl md:text-7xl" style="text-shadow: 6px 10px 4px rgba(143, 0, 255, 0.61);-webkit-text-stroke: 2.8px #fff;">
                        Quasar Web Solutions
                    </p>
                </div>
                <div class="block md:hidden">
                    <p class="titleFont italic !shadow-red-800 homeTitle text-5xl md:text-7xl" style="text-shadow: 6px 10px 4px rgba(143, 0, 255, 0.61);-webkit-text-stroke: 2.8px #fff;">
                        Quasar Web Solutions
                    </p>
                </div>
                <div class="md:mx-16 mt-2 dark:text-white">
                    {#if themeValue === "light"}
                        <p id="pageSubtitle"  class="italic subtitleFont text-2xl homeSubtitle">
                            Accelerate your online presence
                        </p>
                    {:else}
                        <p id="pageSubtitle"  class="italic subtitleFont text-2xl homeSubtitleDark">
                            Accelerate your online presence
                        </p>
                    {/if}
                    <p id="pageDescription" class="primaryFontLight mt-6 md:w-4/6 ">
                        Welcome to Quasar, your gateway to digital success. We create stunning websites that impress and captivate. With our seamless design and functionality, your online presence will shine. Boost your outreach with our SEO optimization, ranking your site higher on Google. Consolidate your business info into an easily digestible format, attracting prospective clients. Track leads effortlessly and nurture relationships with our user-friendly system. Join Quasar for growth and opportunity. Let's leave your competitors in the dust. Success starts here.
                    </p>
                    <span class="flex mt-8 [&>p]:md:mx-14 [&>p]:mx-2 highlightFont text-xs md:text-lg">
                        <p style="margin-left:0px" id="pageHighlight1">100% Five-Star Client Reviews</p>
                        <p id="pageHighlight2">15+ Website Technologies</p>
                        <p  id="pageHighlight3">5+ Years of Experience</p>
                    </span>
                    <div class="w-20 mx-auto mt-6 hidden md:block">
                        <button on:click={()=>{scrollToElement("developerSection")}} class="circular-background bg-cover bg-center cursor-pointer" id="scrollDownContainer">
                            {#if themeValue === "light"}
                                
                            <img src="/Icons/scroll_down_background.png" alt="Circular Background" class="w-full h-full object-cover" />
                        
                            <div class="text  buttonFont" style="margin-top:3px">
                                SCROLL DOWN
                                <img src="/Icons/arrow.png" alt="Arrow Down" style="height:10px" class="mx-auto" />
                            </div>
                            {:else}
                                
                            <img src="/Icons/scroll_down_background_white.png" alt="Circular Background" class="w-full h-full object-cover" />
                        
                            <div class="text !text-white buttonFont" style="margin-top:3px">
                                SCROLL DOWN
                                <img src="/Icons/arrow_white.png" alt="Arrow Down" style="height:10px" class="mx-auto" />
                            </div>
                            {/if}
                            
                        </button>
                    </div>
                
                </div>
            </div>
            
            <div class="py-10">
                <div class="py-16" id="developerSection">
                    {#if themeValue === "light"}
                        <p id="developerTitle" class="text-center titleFont text-4xl"  style="text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.51);  -webkit-text-stroke: 1px #64B0F5;">
                            Developer Team
                        </p>
                    {:else}
                        <p id="developerTitle" class="text-center !text-white titleFont text-4xl"  style={`text-shadow: 3px  3px  3px rgba(255, 255, 255, 0.51);  -webkit-text-stroke: 1px #015EB2;`}>
                            Developer Team
                        </p>
                    {/if}
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 md:mt-24 md:mx-20 dark:text-white">
                        <div class="md:mx-10">
                            <div class="mr-auto w-full md:w-72 md:h-56 h-56 rounded-lg flex justify-start items-end latoExtraBold text-white text-xl" style="-webkit-text-stroke: 0.5px #000;background-image:url({leviPotrait});background-size:cover;">

                                <span class="m-4">
                                    <p>CEO</p>
                                    <p>Fullstack Developer</p>
                                </span>
                            </div>
                            <div class="mx-auto mt-2 buttonFont text-lg mt-20 md:mt-0">
                                <span class="flex">
                                    <p>About Me</p>
                                    <div class="ml-auto cursor-pointer">
                                        <a href="https://www.levinzamba.com/" target="_blank" class="primaryFontLight text-sm underline">Visit Portfolio</a>
                                    </div>
                                </span>
                                <p class="primaryFontLight text-sm mt-4" id="leviAbout">
                                    Hey there! I'm Levi Nzamba, a web dev enthusiast passionate about creating awesome online experiences. From CMS like WordPress and Wix to custom dev with React, Next.js, Vue.js, Angular, Sveltekit (and more), I bring ideas to life. As an extrovert, I value building strong relationships with clients to deliver top-notch results. I'm a perfectionist who goes the extra mile for excellence. Let's team up and create something remarkable. Get in touch, let's make magic happen!
                                </p>

                            </div>
                        </div>
                        <div class="mt-14 md:mt-0">
                            <p class="absolute -right-20 md:right-0 mt-20 text-6xl rotate-90 buttonFont z-0" id="reviewsTitle">REVIEWS</p>
                            {#each testimonials as testimonial,i}
                                <div class="border border-slate-400 py-4 rounded-lg shadow-lg mb-8">
                                    <p class="primaryFont pl-4 text-lg">{testimonial.title}</p>
                                    <span class="flex mx-4 mt-3 [&>img]:mx-6">
                                        <img alt="Star" src="/Icons/star.png" width="27" style="margin-left:0;" />
                                        <img alt="Star" src="/Icons/star.png" width="27" style="margin-left:0;" />
                                        <img alt="Star" src="/Icons/star.png" width="27" style="margin-left:0;" />
                                        <img alt="Star" src="/Icons/star.png" width="27" style="margin-left:0;" />
                                        <img alt="Star" src="/Icons/star.png" width="27" style="margin-left:0;" />
                                        <p class="text-sm my-auto buttonFont">5.00</p>
                                    </span>
                                    <p class="mx-4 mt-4 text-sm italic primaryFontLight" id={`testimonialComment${i}`}>"{testimonial.comment}"</p>
                                </div>
                            {/each}
                            <div class="text-right">
                                <a class="underline cursor-pointer primaryFontLight" href="https://www.upwork.com/freelancers/~0133e622b7fa22dc2d" target="_blank">See testimonials directly from upwork</a>
                            </div>
                        </div>
                       
                    </div>
                    
                    <!-- <div class="mx-24">
                        <hr class="opacity-10 my-12"/>
                        <div class="flex mx-6">
                            <img src="/devs/bill.jpg" alt="Bill" class="h-44 rounded-lg"  />
                            <div class="px-10 text-white">
                                <p class="latoExtraBold text-2xl">Bill Mwendwa</p>
                                <p class="text-xl mb-3">Bill Mwendwa</p>
                                <p class="primaryFontLight mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus illo culpa incidunt ipsa inventore. Obcaecati amet ipsum, porro esse odit, cupiditate autem nostrum laboriosam inventore nulla quidem deserunt, eos neque.</p>
                                <a class="float-right primaryFontLight underline" href="https://www.google.com" target="_blank">Visit Protfolio</a>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
      

    </div>

    <div id="philosophy-container" class="min-h-screen" style="background-image: url({athensSchoolBack}); background-size:cover">
        <div class="min-h-screen py-10" style="background-color: rgba(0,0,0,0.7);">
            <p class="text-4xl text-center titleFont text-white mt-10"  style="text-shadow: 3px 3px 3px rgba(244, 244, 244, 0.51);  -webkit-text-stroke: 1px #64B0F5;"  id="philosophyTitle">Our Philosophy</p>
            <div class="text-white w-2/3 my-10 mx-auto">
                <p class="faustinaExtraBold text-3xl md:text-4xl underline" >What do we do ?</p>
                <p class="faustinaLight text-lg mt-4">We offer our clients a simple and effective web presence. By building a professional website, we give you a platform to share what your business offers with the world. Our web services bring all parts of your business together in one easy to understand place, so anyone can see exactly what your company is about. With a customized website, you can connect with more new customers.</p>
            </div>
            <div class="text-white w-2/3 my-10 mx-auto">
                <p class="faustinaExtraBold text-3xl md:text-4xl underline" >How do we do it ?</p>
                <p class="faustinaLight text-lg mt-4">
                    Through tech skills and creativity, we help take your business to the next level. We start by learning everything about your business and what it offers. Then we transform what we learned into a simple and impactful website focused on connecting you with growth.
                    
                    With an exceptional website as the base, we then use targeted techniques to increase your visibility online. By combining digital marketing and beautiful design, we give you the tools to increase your reach and build lasting relationships. Our tracking provides insights into potential new customers, so you know how best to reach them. By blending web design, marketing methods, and business strategy, we launch your business into the future.</p>
            </div>
        </div>
    </div>

</div>