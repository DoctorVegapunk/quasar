<script>
	import animate from '$lib/animate';
    import Navbar from "../../components/Navbar.svelte";
    import { Button, Modal } from 'flowbite-svelte'
    import { onMount } from "svelte";

    let visitorEmail = '';
    let visitorMessage = ''
    let contactModal = false
    

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
        animate("emailUsButton",'scaleup',1,1.2)
    })
    

</script>
<div>
    <Navbar/>

    <Modal autoclose={false} title="Get in Contact" bind:open={contactModal}>
        <span class="flex"><p class="text-black dark:text-white">Enter your email:</p> <input bind:value={visitorEmail} class="text-black px-2 ml-2 w-2/3 rounded-md py-1 bg-gray-200 "/></span>
        <p class=" text-black dark:text-white" >Send us a hello 👋</p>
        <textarea class="w-full text-black py-6 rounded-md bg-gray-200 border shadow-lg dark:shadow-gray-700 border-black" bind:value={visitorMessage}/>
        <svelte:fragment slot='footer'>
        <Button on:click={sendMail}>Send Email</Button>
        <Button color="alternative" on:click={()=>{contactModal = false}}>Close</Button> 
        </svelte:fragment>
    </Modal>
    <div class="pt-28 dark:bg-gray-800 py-10 min-h-screen dark:text-white">
        <p class="text-5xl faustinaExtraBold underline text-center tracking-widest">Contact Us</p>
        <p class="w-8/12 text-center text-lg mx-auto mt-16 primaryFontLight">The best way to get in contact with us is by sending an email, but we also have a cell number and social media pages which you can get to us through.</p>
        
        <center>
            <button id="emailUsButton" on:click={()=>{contactModal = true}} class="flex mt-16 w-fit px-4 py-3 rounded-lg shadow-2xl text-white buttonFont bg-purple-600">
                Email Us
                <span><img alt="Email Icon" src="/Icons/email.png" width="25" class="ml-2" /></span>
            </button>
        </center>
        <div>
            <div class="grid grid-cols-2 md:mx-24 mt-24">
                <div class="flex mx-auto">
                    <img alt="Instagram Icon" src="/Icons/instagram.png" class="w-10 h-10 my-auto" />
                    <p class="my-auto robotoSlab ml-2 md:ml-6 text-xs md:text-lg">@quasar.tech</p>
                </div>
                <div class="flex mx-auto">
                    <img alt="Twitter Icon" src="/Icons/twitter.png" class="w-10 h-10 my-auto" />
                    <p class="my-auto robotoSlab ml-2 md:ml-6 text-xs md:text-lg">@quasar.tech</p>
                </div>
            </div>
            
        </div>



    </div>
</div>