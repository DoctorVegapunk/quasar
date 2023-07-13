import { tweened } from "svelte/motion";
import { cubicIn,cubicOut } from 'svelte/easing';

const animate = (elementID,animationType, initialValue, finalValue) => {
  
  const element = document.getElementById(elementID);
  if (animationType === "fade") {

    const opacity = tweened(initialValue, {
      duration: 600,
      easing: cubicIn
    });
    opacity.subscribe((val)=>{
        element.style.opacity = val;
    })

    let options = {
      threshold: 0.1,
    };

    const callback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
            opacity.set(finalValue);
        }
      });
    };

    let observer = new IntersectionObserver(callback, options);
    observer.observe(element);
  }
  else if(animationType === "fadeup"){
    console.log("d");
    element.style.position = "relative";
    
    const yAxis = tweened(20,{
      duration: 1500,
      easing: cubicIn
    })
    const opacity = tweened(initialValue, {
      duration: 1500,
      easing: cubicIn
    });

    yAxis.subscribe(val=>{
      element.style.top = `${val}px`
    })
    opacity.subscribe((val)=>{
        element.style.opacity = val;
    })

    let options = {
      threshold: 0.1,
    };

    const callback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          opacity.set(finalValue);
          yAxis.set(0)

        }
      });
    };

    let observer = new IntersectionObserver(callback, options);
    observer.observe(element);
  }
  else if(animationType === "typewriter"){
    function typeWriter(element) {
      const text = element.innerHTML;
      element.innerHTML = '';
      let i = 0;
      function type() {
        if (i < text.length) {
          element.innerHTML += text.charAt(i);
          i++;
          setTimeout(type, 100); // adjust speed here
        }
      }
      type();
    }

    // Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(()=>{
            typeWriter(entry.target);
            observer.unobserve(entry.target);
          },300)
        }
      });
    });

    // Assuming your paragraph has an id of 'myParagraph'
    observer.observe(element);
  }
  else if(animationType === "borderslide"){
    var currentTextShadow = element.style.textShadow;



    const textShadow = tweened(0, {
        duration: 1000,
        easing: cubicIn
    });

    textShadow.subscribe(val=>{
      var newTextShadow = currentTextShadow.replace("3px 3px 3px", `${val}px ${val}px ${val}px`);
      element.style.textShadow = newTextShadow;
    })

    let options = {
        threshold: 0.1,
    };

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                textShadow.set(3)
                console.log("d");
            }
        });
    };

    let observer = new IntersectionObserver(callback, options);
    observer.observe(element);

  }
  else if(animationType === "scaleup"){
    const scale = tweened(1, {
      duration: 300,
      easing: cubicOut,
    });
    scale.subscribe(val=>{
      element.style.transform = `scale(${val})`
    })
    let isHovered = false;

    function handleMouseEnter() {
      isHovered = true;
      scale.set(finalValue);
    }

    function handleMouseLeave() {
      isHovered = false;
      scale.set(initialValue);
    }

    element.addEventListener('mouseenter',handleMouseEnter)
    element.addEventListener('mouseleave',handleMouseLeave)
  }
};

export default animate;
