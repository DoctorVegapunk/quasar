<script>
  import { onMount } from "svelte";
  import Navbar from "../../components/Navbar.svelte";
  import { Carousel } from 'flowbite-svelte'
  import animate from '$lib/animate'

  const background = '/Images/gallery_background.png'
  const projects = [
    {
      title:"Nodpay",
      description:"Nodpay is a neo-bank that aims to revolutionize payment transactions and foster community connections. The project involved designing their website, with a focus on prototyping and incorporating animations and motion to enhance the user experience. Interactive prototypes were created to bring elements of the website to life, while engaging animations were added to captivate and engage visitors. Clickable mockups were developed to simulate the functionality and behavior of the website, providing stakeholders and the development team with a tangible and interactive representation of the final product.",
      images:[
        {
          imgurl: "/gallery/nod-pay/0.jpg"
        },
        {
          imgurl: "/gallery/nod-pay/1.jpg"
        },
        {
          imgurl: "/gallery/nod-pay/2.jpg"
        },
        {
          imgurl: "/gallery/nod-pay/3.jpg"
        },
        {
          imgurl: "/gallery/nod-pay/4.jpg"
        }
      ]
    },
    {
      title:"Clarity Tech Services",
      description:"Clarity Technical Services is a reputable company that specializes in providing comprehensive technical solutions for superyachts and high-end properties. With expertise in areas such as Audio Visual/Entertainment, IT, Lighting, Control, and Special Features, they ensure that owners receive optimal performance from their systems.\nFounded and operated by Edwin Edelenbos, Clarity Technical Services has earned a trusted name in the superyacht industry. Testimonials on their website attest to Edwin's exceptional skills and character, highlighting his reliability and expertise.\nWhile some testimonials mention Edwin as being 'independent,' it's important to note that he also owns a company benefiting from product sales. However, this does not compromise his ability to offer valuable advice and top-notch service to clients. Edwin prioritizes transparency and disclosure, as evidenced by his published articles on LinkedIn discussing his views on this matter.\nClarity Technical Services stands as a valuable resource for discerning owners seeking a reliable expert to optimize their superyacht and high-end property systems.",
      images:[
        {
          imgurl: "/gallery/clarity-tech/clarity_tech_1.png"
        },
        {
          imgurl: "/gallery/clarity-tech/clarity_tech_2.png"
        },
        {
          imgurl: "/gallery/clarity-tech/clarity_tech_3.png"
        },
        {
          imgurl: "/gallery/clarity-tech/clarity_tech_4.png"
        }
      ]
    },
    {
      title:"Specialized",
      description:"Specialized is a bike selling company founded by passionate bikers. The project involved designing their website, with a focus on creating an appealing visual design for their e-commerce platform. The team worked closely to carefully consider layout, color schemes, typography, and imagery to effectively showcase the products, enhance the user experience, and reflect the brand's identity and values.",
      images:[
        {
          imgurl: "/gallery/specialized/1.jpg"
        },
        {
          imgurl: "/gallery/specialized/2.jpg"
        },
        {
          imgurl: "/gallery/specialized/3.jpg"
        },
        {
          imgurl: "/gallery/specialized/4.jpg"
        },
        {
          imgurl: "/gallery/specialized/5.jpg"
        },
        {
          imgurl: "/gallery/specialized/6.jpg"
        }
      ]
    },
    {
      title:"Blockchain Beavers",
      description:"Blockchain Beavers is an NFT project on the Ethereum network that aims to secure various blockchains through mining. The project involved the design of their website, with a focus on creating seamless user experiences. The collaboration included working closely with the conceptual designer to design user flows and define the navigation of the site. Wireframes and prototypes were developed to visually represent the website's structure, content hierarchy, and navigation pathways, providing a clear and comprehensive overview of the project's website.",
      images:[
        {
          imgurl: "/gallery/blockchain-beavers/1.jpg"
        },
        {
          imgurl: "/gallery/blockchain-beavers/2.jpg"
        },
        {
          imgurl: "/gallery/blockchain-beavers/3.jpg"
        },
        {
          imgurl: "/gallery/blockchain-beavers/4.jpg"
        },
        {
          imgurl: "/gallery/blockchain-beavers/5.jpg"
        }
      ]
    },
    {
      title:"BMStar Oilfield Services ",
      description:"BMStar Oilfield Services is an indigenous Oil and Gas servicing firm based in Port Harcourt, Nigeria. The project involved the design and development of their website, with a focus on two key aspects: the website footer and written content. The design team collaborated closely to create a visually appealing and functional footer that aligned with the overall aesthetics of the site. Additionally, compelling written content was generated to enhance the user experience and ensure a cohesive design that aligned with the company's branding guidelines and user needs.",
      images:[
        {
          imgurl: "/gallery/bm-star/1.jpg"
        },
        {
          imgurl: "/gallery/bm-star/2.jpg"
        },
        {
          imgurl: "/gallery/bm-star/3.jpg"
        },
        {
          imgurl: "/gallery/bm-star/4.jpg"
        }
      ]
    }
   
  ]


  let visible = true;


  onMount(()=>{
    const navElement = document.getElementById('navbar')
    navElement.style.color = 'white'; 
    animate("tagline",'fadeup',0,1)
    animate("scrollDownContainer","scaleup",1,1.2)
  })
  
  const scrollToElement = (elementID) =>{
        const element = document.getElementById(elementID)
        const topOffset = element.getBoundingClientRect().top - 120;
        window.scrollTo({top:topOffset,behavior:"smooth"})
  }
  function formatDescription(description) {
    return description.replace(/\n/g, "<br>");
  }

</script>

<div id="scrollContainer" class="overflow-x-hidden" style="background-color:#808080">
  
  <div class="relative z-20">
    <Navbar/>
  </div>

  <div class="h-screen w-screen " style="background-image:url({background});background-size:cover">
    <div class="pt-28 mx-16">
      <div class="italic titleFont text-white relative mx-auto md:w-2/6 text-center text-5xl md:text-8xl z-10">
        <p>GALLERY</p>
      </div>
      <div class="relative z-10 mt-24 text-center">
      <p class="text-6xl titleFont" id="tagline">GET A GLI<span class="text-white">MPSE OF OUR STYLE.</span></p>
      </div>
      
      <button on:click={()=>{scrollToElement("galleryItems")}} class="w-20 mx-auto mt-10 md:mt-32 hidden md:block">
          <div class="circular-background bg-cover bg-center"  id="scrollDownContainer">
            <img src="/Icons/scroll_down_background_white.png" alt="Circular Background" class="w-full h-full object-cover" />
          
            <div class="text relative z-10 buttonFont" style="margin-top:3px">
                    <p class="text-white">SCROLL DOWN</p>
                    <img src="/Icons/arrow_white.png" alt="Arrow Down" style="height:10px" class="mx-auto" />
            </div>
          </div>
        </button>
    </div>
  </div>

  <div class="mt-10 md:my-32 md:ml-20" id="galleryItems">
    {#each projects as project}
      <div>
        <div class="grid grid-cols-1 md:grid-cols-2">
          <div class=" p-10">
            <div class="relative z-10">
              <Carousel images={project.images} loop showIndicators={false} showCaptions={false} showThumbs={false} duration="3000"/>
            </div>
            
          </div>
          <div class="text-white text-cente md:text-left mx-10 md:mx-0 md:mr-24">
            <p class="buttonFont text-4xl">{project.title}</p>
            <p class="primaryFontLight text-sm mt-2 text-left">{@html formatDescription(project.description)}</p>
          </div>
        </div>
        <hr class="mx-24 my-10 opacity-30">
      </div>
    {/each}
  </div>

</div>




