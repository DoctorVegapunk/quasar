import { initializeApp } from "firebase/app";
import { getFirestore,addDoc,collection } from "firebase/firestore";



const getTime = () => {
    const currentDate = new Date();
    const months = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    const weekdays = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
  
    const weekday = weekdays[currentDate.getUTCDay()];
    const month = months[currentDate.getUTCMonth()];
    const day = currentDate.getUTCDate();
    const year = currentDate.getUTCFullYear();
    let hours = currentDate.getUTCHours();
    const minutes = currentDate.getUTCMinutes();
  
    let period = "AM";
    if (hours >= 12) {
      period = "PM";
      hours -= 12;
    }
  
    const timezoneOffset = -180;
    const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
    const offsetMinutes = Math.abs(timezoneOffset) % 60;
  
    function getOrdinalSuffix(day) {
      if (day >= 11 && day <= 13) {
        return "th";
      }
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }
  
    function padZero(number) {
      return number.toString().padStart(2, "0");
    }
  
    function getTimezoneString(offset) {
      const sign = offset >= 0 ? "+" : "-";
      const hours = padZero(offsetHours);
      const minutes = padZero(offsetMinutes);
      return `${sign}${hours}:${minutes}`;
    }
  
    const formattedDate = `${weekday} ${month} ${day}${getOrdinalSuffix(day)} ${year} ${padZero(hours)}:${padZero(minutes)}${period} GMT${getTimezoneString(timezoneOffset)}`;
  
    return formattedDate;
}


export async function POST(event) {
    
    const {email,message,enquiry,enquiryMessage} = await event.request.json()


    const firebaseConfig = {
        apiKey: "AIzaSyDzKa0P4WbBN3HUCuhwz_i0JhdC2sWYfl8",
        authDomain: "quasarwebsitesolutions.firebaseapp.com",
        projectId: "quasarwebsitesolutions",
        storageBucket: "quasarwebsitesolutions.appspot.com",
        messagingSenderId: "753349623657",
        appId: "1:753349623657:web:88407dbfc54bd188adc7f8",
        measurementId: "G-LQ4C1CLD10"
    };
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app);
    if(enquiry){
        await addDoc(collection(db, "Messages"), {
            email,
            message,
            enquiry,
            enquiryMessage,
            time: getTime()
        });
    }
    else{
        await addDoc(collection(db, "Messages"), {
            email,
            message,
            enquiry,
            enquiryMessage,
            time: getTime()
        });
    }

    

    return new Response(JSON.stringify({ success: true }),{
            body: {
                success: true
            }
        }
    )
    
}
