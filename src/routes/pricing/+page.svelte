<script>
	import animate from '$lib/animate';
    import { onMount } from "svelte";
    import Navbar from "../../components/Navbar.svelte";
    import { Button, Modal } from 'flowbite-svelte'
    let price = {
        current:250,
        min:100,
        max:30000
    }
    const formatter = Intl.NumberFormat('en',{
        notation:'compact',
        style:"currency",
        currency:"USD"
        
    })
    $:formattedNumber = formatter.format(price.current)

    const validatePriceInput = (input) =>{
        console.log("input Value",input.value);
        if (price.current < price.min) {
            price.current = price.min;
        } else if (price.current > price.max) {
            price.current = price.max;
        }
        else if(!Number.isInteger(price.current)){
            price.current = 0
        }

    }

    const priceTiers = [
        {
            title:"Standard Service",
            tiers:[
                {
                    title: "Basic",
                    priceMin: 100,
                    priceMax: 399,
                    tierDescription: "Get started with our basic package, perfect for establishing your online presence.",
                    tierBullets: [
                        "Stylish Design",
                        "SEO optimization",
                        "Fluid and animated website elements",
                        "Dark/Light theme options",
                        "No backend functionality"
                    ]
                },
                {
                    title: "Intermediate",
                    priceMin: 400,
                    priceMax: 599,
                    tierDescription: "Take your website to the next level with our intermediate package, designed to enhance functionality and user experience.",
                    tierBullets: [
                        "Simple backend integration",
                        "Admin dashboard for easy content management",
                        "Analytics to track the number of visitors"
                    ]
                },
                {
                    title: "Advanced",
                    priceMin: 600,
                    priceMax: 1499,
                    tierDescription: "Maximize your online potential with our advanced package, offering comprehensive features to grow your digital presence.",
                    tierBullets: [
                        "Support for multiple admin accounts",
                        "Advanced analytics for in-depth insights",
                        "Email listing functionality for effective communication"
                    ]
                }
            ]
        },
        {
            title:"Premium Service",
            tiers:[
                {
                    title: "Basic",
                    priceMin: 1500,
                    priceMax: 2499,
                    tierDescription: "Elevate your online brand with our premium basic package, tailored to meet your unique business requirements.",
                    tierBullets: [
                        "Custom tailoring to match your business vibe",
                        "Complex color palette selection",
                        "Minimal 3D integration for enhanced visual appeal",
                        "Complex font selection",
                        "No backend development"
                    ]
                },
                {
                    title: "Intermediate",
                    priceMin: 2500,
                    priceMax: 4999,
                    tierDescription: "Unlock the power of advanced features with our premium intermediate package, designed to optimize your website's performance.",
                    tierBullets: [
                        "Advanced backend development",
                        "Complex analytics to analyze user interactions",
                        "Increased server security, including 2-factor authentication",
                        "Backend optimizations for improved speed and efficiency"
                    ]
                },
                {
                    title: "Advanced",
                    priceMin: 5000,
                    priceMax: 10000,
                    tierDescription: "Go beyond the ordinary with our premium advanced package, offering cutting-edge solutions for a superior online presence.",
                    tierBullets: [
                        "Complex analytics to gain deep insights into user behavior",
                        "Complex increased server security, including 2-factor authentication",
                        "Complex backend optimizations for maximum performance",
                        "Chatbot integration for seamless customer interactions"
                    ]
                }
            ]
        },
        {
            title:"Elite Service",
            tiers:[
                {
                    title: "Basic",
                    priceMin: 10000,
                    priceMax: 13999,
                    tierDescription: "Experience the epitome of digital excellence with our elite basic package, designed to set you apart from the competition.",
                    tierBullets: [
                        "Lighthouse optimization for top performance",
                        "AI analysis of design elements",
                        "Custom logo design aligned with your brand's style and color palette",
                        "Advanced design techniques, such as parallax scrolling"
                    ]
                },
                {
                    title: "Intermediate",
                    priceMin: 14000,
                    priceMax: 19999,
                    tierDescription: "Unleash the full potential of your online presence with our elite intermediate package, featuring advanced functionalities.",
                    tierBullets: [
                        "Complex increased server security, including 2-factor authentication",
                        "Complex backend optimizations for optimum performance",
                        "Advanced email tracking with notifications for effective marketing"
                    ]
                },
                {
                    title: "Advanced",
                    priceMin: 20000,
                    priceMax: 30000,
                    tierDescription: "Reach new heights with our elite advanced package, offering state-of-the-art solutions to dominate the digital landscape.",
                    tierBullets: [
                        "AI chatbot integration for personalized customer interactions",
                        "AI analytics analysis for advanced data insights",
                        "Social media management through APIs for seamless integration"
                    ]
                }
            ]
        }
    ]
    const findTierByPrice = (price) => {
        for (const tierGroup of priceTiers) {
            const tierGroupTitle = tierGroup.title
            for (const tier of tierGroup.tiers) {
                const tierTitle = tier.title
                const tierID = `${tierGroupTitle}${tierTitle}`
                const tierElement = document.getElementById(tierID)
                const highlightElement = tierElement.querySelector("#selectedHiglight")
                
                if (price >= tier.priceMin && price <= tier.priceMax) {
                    tierElement.classList.add('tier-selected')
                    highlightElement.classList.remove('hidden')
                    window.scrollTo({
                        top: tierElement.offsetTop,
                        behavior: 'smooth'
                    });

                    console.log(tierElement);
                }
                else{
                    tierElement.classList.remove('tier-selected')
                    highlightElement.classList.add('hidden')
                }
            }
        }
        // console.log(null); // Return null if no tier is found for the given price
    }
    const scrollToTop = () =>{
        window.scrollTo(
            {top:0,behavior:"smooth"}
        )
    }
    onMount(()=>{
        priceTiers.forEach(priceTier => {
            priceTier.tiers.forEach(tier=>{
                animate(`${priceTier.title}${tier.title}`,'scaleup',1,1.1)
            })
        });

        const scrollButton = document.getElementById("scrollButton")
        window.addEventListener("scroll",()=>{
            const scrollPosition = window.scrollY
            if (scrollPosition <= 400)
            {
                scrollButton.classList.add("hidden")
            }
            else{
                scrollButton.classList.remove("hidden")
            }
        })
    })


    
    let visitorEmail = ''
    let visitorMessage = ''
    let enquiryModal = false
    let enquiryMessage;

    const setEnquiryMessage = (tierTitle,tierSubtitle,subTitleMinPrice,subTitleMaxPrice,currentPrice) =>{
        enquiryModal = true
        enquiryMessage = `The user selected the ${tierTitle} - ${tierSubtitle} which ranges from ${subTitleMinPrice} to ${subTitleMaxPrice}. The user had currently selected the price ${currentPrice} `
    }

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
                    body: JSON.stringify({ email:visitorEmail,message:visitorMessage,enquiry:true,enquiryMessage })
                }).then(()=>{
                    enquiryModal = false
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


</script>
<style>
    .custom-range-color::-webkit-slider-thumb {
      background-color: #8F00FF;
    }
    .range-track-blue::-webkit-slider-runnable-track {
        background-color: blue;
    }
  </style>
<div class="dark:bg-gray-800">
    <Modal autoclose={false} title="Get in Contact" bind:open={enquiryModal}>
        <span class="flex"><p class="text-black dark:text-white">Enter your email:</p> <input bind:value={visitorEmail} class="text-black px-2 ml-2 w-2/3 rounded-md py-1 bg-gray-200 "/></span>
        <p class=" text-black dark:text-white" >Send us a hello 👋</p>
        <textarea class="w-full text-black py-6 rounded-md bg-gray-200 border shadow-lg dark:shadow-gray-700 border-black" bind:value={visitorMessage}/>
        <svelte:fragment slot='footer'>
        <Button on:click={sendMail}>Send Email</Button>
        <Button color="alternative" on:click={()=>{enquiryModal = false}}>Close</Button> 
        </svelte:fragment>
    </Modal>
    <div class="relative z-10" >
        <Navbar/>
    </div>
    <div class="pt-24">
        <p class="text-center faustinaExtraBold text-4xl underline  dark:text-white">Pricing</p>
        <p class="mt-10 text-center primaryFont  dark:text-white">Choose your own price</p>
        <p class="mt-4 text-center buttonFont text-lg  dark:text-white">{formattedNumber}</p>

        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div id="scrollButton" on:click={scrollToTop} class="hidden dark:text-white fixed w-12 h-12 z-50 rounded-full bg-opacity-80 bg-purple-600 right-10 bottom-10">
            <span class="block m-auto text-white">
                <center>
                    <img alt="Scroll Top" src="/Icons/arrow_up.png" class="p-2" />
                </center>
            </span>
        </div>
        <div class="md:mx-24 mx-8 my-4">
            <input type="range" class="appearance-none custom-range-color bg-gray-200 rounded-full h-2 custom-range w-full outline-none" step="50" min={price.min} max={price.max} bind:value={price.current} >
            <span class="flex mt-4">
              
                <input type="number" class="rounded-md md:w-44" placeholder="Select price" min={price.min} max={price.max} bind:value={price.current} on:input={validatePriceInput}/>
                <button class="rounded-md primary-background text-white py-2 px-6 w-fit buttonFont ml-auto" on:click={() => findTierByPrice(price.current)}>Go to price tier</button>
            </span>
        </div>
        {#each priceTiers as priceTier}
            <div class="mt-10">
                <div>
                    <p class="text-center text-3xl faustina  dark:text-white">{priceTier.title}</p>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mx-10 md:mx-32 my-10 mt-10">
                        {#each priceTier.tiers as tier}
                            <div class="rounded-lg shadow-lg relative" id={`${priceTier.title}${tier.title}`} style="background-color: #F4D19C;">
                                <div id="selectedHiglight" class="absolute hidden rounded-t-lg bg-purple-600 w-full h-8">
                                    <p class="buttonFont mt-2 text-center text-sm">SELECTED PRICE</p>                                    
                                </div>
                                <div class="p-10">
                                    <p class="text-center faustina text-2xl" id="title">{tier.title}</p>
                                    <p class="text-center faustinaLight text-lg mt-2">{ formatter.format(tier.priceMin)} - {formatter.format(tier.priceMax)}</p>
                                    <p class="mt-4 faustinaLight text-sm">{tier.tierDescription}</p>
                                    <ol class="l list-disc w-8/12 mx-auto mt-4 faustinaLight text-sm">
                                        {#each tier.tierBullets as tierBullet}
                                            <li>{tierBullet}.</li>
                                        {/each}  
                                    </ol>
                                    <center><button class="underline faustinaExtraBold mt-4 text-xl cursor-pointer mx-auto" on:click={()=>{setEnquiryMessage(priceTier.title,tier.title,formatter.format(tier.priceMin),formatter.format(tier.priceMax),formattedNumber)}} >Send Enquiry</button></center>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        {/each}
        <div class="italic text-center mt-16 pb-20 mx-20 dark:text-white">
            <p class="text-2xl buttonFont">Note:</p>
            <p class="buttonfont text-lg">The quotations listed above are the framework we use to create price quotations and therefore they only serve as a rough estimate, feel free to <span class="underline cursor-pointer">contact us</span> for a custom quote.</p>
        </div>
    
    </div>
</div>