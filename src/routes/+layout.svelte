<script>
	import { theme } from './../store.js';
    import "../app.css";
    import { onMount } from 'svelte';

    export let data;

    theme.set(data.theme)
    
    let themeValue;
    theme.subscribe((val)=>{
        themeValue = val
    })
    onMount(()=>{
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    })
   
</script>
<div id="theme-container" class={themeValue}>
    <slot></slot>
</div>