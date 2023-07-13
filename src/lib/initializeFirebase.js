import { initializeApp } from "firebase/app";
export default initializeFirebase = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyDzKa0P4WbBN3HUCuhwz_i0JhdC2sWYfl8",
        authDomain: "quasarwebsitesolutions.firebaseapp.com",
        projectId: "quasarwebsitesolutions",
        storageBucket: "quasarwebsitesolutions.appspot.com",
        messagingSenderId: "753349623657",
        appId: "1:753349623657:web:88407dbfc54bd188adc7f8",
        measurementId: "G-LQ4C1CLD10"
    };
    
    return initializeApp(firebaseConfig);
}