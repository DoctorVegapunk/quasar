<script>
    import gsap from 'gsap'
    import { onMount } from 'svelte';
    import { Button, Modal } from 'flowbite-svelte'
    import { theme } from '../store';
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, ImagePlaceholder, Skeleton, TextPlaceholder } from 'flowbite-svelte'



    let themeValue;
    theme.subscribe((val)=>{
        themeValue = val
    }) 

    let changeToDark;
    let changeToLight;

    let contactModal = false;

    let visitorEmail;
    let visitorMessage;
    function isEmailValid(email) {
        // Regular expression pattern for email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Test the email against the pattern
        const isValid = emailPattern.test(email);

        return isValid;
    }

    const sendMail = async() =>{
        if(isEmailValid(visitorEmail)){
            if(visitorMessage.length > 10){
                await fetch('/api/send-mail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email:visitorEmail,message:visitorMessage,enquiry:false,enquiryMessage:null })
                }).then(()=>{
                    contactModal = false
                    visitorMessage = ""
                    alert("Mail Sent, thank you for reaching out. We will be sure to get back to you as soon as possible.")
                })
            }
            else{
                alert("The message must be more than 10 characters long")
            }
        }
        else{
            alert("Invalid Email")
        }
      
    }


    onMount(()=>{

        const themeContainerElement = document.getElementById('theme-container')

        changeToDark = async () =>{
            themeContainerElement.classList.add("dark")
            await fetch('/api/set-theme', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ theme: 'dark' })
            });
            theme.set("dark")
        }
        changeToLight = async () =>{
            await fetch('/api/set-theme', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ theme: 'light' })
            });
            theme.set("light")
        }



        const pageLinkElements = document.getElementsByClassName('pageLink')
        const pageLinkGraphics = document.getElementsByClassName('pageLinkGraphic')
        const pageLinks = Array.from(pageLinkElements)

        for (const [index,pageLink] of pageLinks.entries()) {
            const pageLinkGraphic = pageLinkGraphics[index]
            const spanElement = pageLinkGraphic.querySelector('span');
            const imgElement = pageLinkGraphic.querySelector('img');

            const tl = gsap.timeline({defaults: {duration: 0.3, ease: 'power2.out'}});

            pageLink.addEventListener('mouseenter',(e)=>{
                tl.clear()
                .fromTo(pageLinkGraphic, { width: '0' }, { width: '1.5rem' })
                .fromTo(spanElement, { width: '0' }, { width: '100%' }, "-=0.15")
                .fromTo(imgElement, { opacity: '0' }, { opacity: '1' }, "-=0.15")
            })

            pageLink.addEventListener('mouseleave',()=>{
                tl.clear()
                .fromTo(imgElement, { opacity: '1' }, { opacity: '0' })
                .fromTo(pageLinkGraphic, { width: '1.5rem' }, { width: '0' }, "-=0.15")
                .fromTo(spanElement, { width: '100%' }, { width: '0' }, "-=0.15")
            })
        }
    })

</script>
<div>
<Modal autoclose={false} title="Get in Contact" bind:open={contactModal}>
    <span class="flex"><p class="text-black dark:text-white">Enter your email:</p> <input bind:value={visitorEmail} class="text-black px-2 ml-2 w-2/3 rounded-md py-1 bg-gray-200 "/></span>
    <p class=" text-black dark:text-white" >Send us a hello 👋</p>
    <textarea class="w-full text-black py-6 rounded-md bg-gray-200 border shadow-lg dark:shadow-gray-700 border-black" bind:value={visitorMessage}/>
    <svelte:fragment slot='footer'>
    <Button on:click={sendMail}>Send Email</Button>
    <Button color="alternative" on:click={()=>{contactModal = false}}>Close</Button> 
    </svelte:fragment>
</Modal>
<div class="md:hidden fixed w-screen px-8">
    <Navbar
      navClass="px-2 sm:px-4 py-2.5 absolute w-full z-20 top-0 left-0 border-b"
      let:hidden
      let:toggle
    >
      <NavBrand href="/">
        <img alt="Quasar Web Solutions Logo" src="/Icons/logo.png" class="w-14">
        <p class="titleFont my-auto ml-3 text-2xl italic">QWS</p>
      </NavBrand>
      <NavHamburger on:click={toggle} />
      <NavUl {hidden}>
        <NavLi href="/home">Home</NavLi>
        <NavLi href="/gallery">Gallery</NavLi>
        <NavLi href="/pricing">Pricing</NavLi>
        <NavLi href="/contact">Contact Us</NavLi>
      </NavUl>
    </Navbar>
  </div>
<div id="navbar" class="hidden md:flex py-4 fixed top-0 left-0 right-0 ml-8 mr-2 dark:!text-white">
    <img alt="Quasar Web Solutions Logo" src="/Icons/logo.png" class="w-14">
    <p class="titleFont my-auto ml-3 text-2xl italic">QWS</p>
    <span class="flex [&>a]:mx-4 [&>a]:my-auto [&>p]:robotoSlab mx-auto">
        <a href="/home" class="py-1 relative flex">
            <span class="pageLink relative z-10">
                Home
            </span>
            <div class="pageLinkGraphic">
                <img alt="home" src="/Icons/home.png" class="opacity-0 w-4 h-4 relative z-10 left-2 top-1"/>
                <span class="absolute left-1 py-2 top-4 bg-purple-600"></span>
            </div>
        </a>
        <a href="/gallery" class="py-1 relative flex">
            <span class="pageLink relative z-10" >
                Gallery
            </span>
            <div class="pageLinkGraphic">
                <img alt="home" src="/Icons/gallery.png" class="opacity-0 w-4 h-4 relative z-10 left-2 top-1"/>
                <span class="absolute left-1 py-2 top-4 bg-purple-600"></span>
            </div>
        </a>
        <a href="/pricing" class="py-1 relative flex">
            <span class="pageLink relative z-10" >
                Pricing
            </span>
            <div class="pageLinkGraphic">
                <img alt="home" src="/Icons/pricing.png" class="opacity-0 w-4 h-4 relative z-10 left-2 top-1"/>
                <span class="absolute left-1 py-2 top-4 bg-purple-600"></span>
            </div>
        </a>
        <a href="/contact" class="py-1 relative flex">
            <span class="pageLink relative z-10" >
                Contact
            </span>
            <div class="pageLinkGraphic">
                <img alt="home" src="/Icons/contact.png" class="opacity-0 w-4 h-4 relative z-10 left-2 top-1"/>
                <span class="absolute left-1 py-2 top-4 bg-purple-600"></span>
            </div>
        </a>
    </span>
    <span class="relative flex items-center float-right">
        <button class="z-10 primary-background text-white px-5 py-1 rounded-xl shadow-xl" on:click={() => contactModal = true}>Reach Out</button>
        {#if themeValue === "light"}
            <button class="mx-5" on:click={changeToDark} >
                <img src="/Icons/dark_mode.png" width="25" alt="Dark Mode"  />
            </button>
        {:else}
            <button class="mx-5" on:click={changeToLight}>
                <img src="/Icons/light_mode.png" width="25" alt="Dark Mode" />
            </button>
        {/if}
    </span>
</div>
</div>