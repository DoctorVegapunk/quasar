<script>
  import { onMount } from "svelte";
  import Navbar from "../../components/Navbar.svelte";
  import { Carousel } from 'flowbite-svelte'
  import animate from '$lib/animate'

  const background = '/Images/gallery_background.png'
  const projects = [
    {
      title:"Project XY",
      description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus, impedit porro. Libero, magnam? Alias mollitia, tempore in aut at delectus, tempora, nihil repellendus neque deserunt omnis dolorem eos officiis iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste inventore, voluptates esse earum nemo ipsam blanditiis commodi tempore obcaecati quod dolore, architecto voluptatum recusandae assumen. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente, saepe minima repellendus voluptas possimus, corporis aspernatur fuga animi temporibus odio consequatur nam quaerat natus tempore esse dicta assumenda numquam explicabo. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam, nisi. Quibusdam consequuntur nobis quasi quod in? Explicabo aspernatur minima asperiores laudantium, sapiente similique unde suscipit repellat a excepturi consequuntur aliquam.",
      images:[
        {
          imgurl: "/Images/athens_school_back.jpeg"
        },
        {
          imgurl: "/Images/gallery_background.png"
        }
      ]
    },
    {
      title:"Project XY",
      description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus, impedit porro. Libero, magnam? Alias mollitia, tempore in aut at delectus, tempora, nihil repellendus neque deserunt omnis dolorem eos officiis iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste inventore, voluptates esse earum nemo ipsam blanditiis commodi tempore obcaecati quod dolore, architecto voluptatum recusandae assumen. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente, saepe minima repellendus voluptas possimus, corporis aspernatur fuga animi temporibus odio consequatur nam quaerat natus tempore esse dicta assumenda numquam explicabo. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam, nisi. Quibusdam consequuntur nobis quasi quod in? Explicabo aspernatur minima asperiores laudantium, sapiente similique unde suscipit repellat a excepturi consequuntur aliquam.",
      images:[
        {
          imgurl: "/Images/athens_school_back.jpeg"
        },
        {
          imgurl: "/Images/gallery_background.png"
        }
      ]
    },
    {
      title:"Project XY",
      description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus, impedit porro. Libero, magnam? Alias mollitia, tempore in aut at delectus, tempora, nihil repellendus neque deserunt omnis dolorem eos officiis iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste inventore, voluptates esse earum nemo ipsam blanditiis commodi tempore obcaecati quod dolore, architecto voluptatum recusandae assumen. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente, saepe minima repellendus voluptas possimus, corporis aspernatur fuga animi temporibus odio consequatur nam quaerat natus tempore esse dicta assumenda numquam explicabo. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam, nisi. Quibusdam consequuntur nobis quasi quod in? Explicabo aspernatur minima asperiores laudantium, sapiente similique unde suscipit repellat a excepturi consequuntur aliquam.",
      images:[
        {
          imgurl: "/Images/athens_school_back.jpeg"
        },
        {
          imgurl: "/Images/gallery_background.png"
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
      
      <div class="w-20 mx-auto mt-10 md:mt-32 hidden md:block">
        <a href="#galleryItems">
          <div class="circular-background bg-cover bg-center"  id="scrollDownContainer">
            <img src="/Icons/scroll_down_background_white.png" alt="Circular Background" class="w-full h-full object-cover" />
          
            <div class="text relative z-10 buttonFont" style="margin-top:3px">
                    <p class="text-white">SCROLL DOWN</p>
                    <img src="/Icons/arrow_white.png" alt="Arrow Down" style="height:10px" class="mx-auto" />
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>

  <div class="mt-10 md:my-32 md:ml-20" id="galleryItems">
    {#each projects as project}
      <div>
        <div class="grid grid-cols-1 md:grid-cols-2">
          <div class=" p-10">
            <div class="relative z-10">
              <Carousel images={project.images} loop showCaptions={false} showThumbs={false} duration="3000"/>
            </div>
            
          </div>
          <div class="text-white text-cente md:text-left mx-10 md:mx-0 md:mr-24">
            <p class="buttonFont text-4xl">{project.title}</p>
            <p class="primaryFontLight text-sm mt-2 text-left">{project.description}</p>
          </div>
        </div>
        <hr class="mx-24 my-10 opacity-30">
      </div>
    {/each}
  </div>

</div>




