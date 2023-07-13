export async function load({ cookies }) {  
  let theme;
  
  const cookieTheme = cookies.get('theme')
  if(cookieTheme === null || cookieTheme === undefined){
    cookies.set("theme","dark")
    theme = 'dark'
  }
  else{
    theme = cookieTheme
  }

  return{
    theme
  }
    
    
}