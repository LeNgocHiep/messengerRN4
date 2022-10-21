import {initializeApp} from 'firebase/app';
const firebaseConfig = {
    apiKey: "AIzaSyApB6rh9PByKb4RavegCOt0prc8ZbpCyiw",
    databaseUrl:"https://messengerrn-80d51-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId:"messengerrn-80d51",
    appId:"1:446155438040:ios:c3b8fbb6b5f003bef9a4ad" //ios
    // appId:"1:446155438040:android:a1acdcfb905c80cef9a4ad" //android
};

export default initializeApp(firebaseConfig);