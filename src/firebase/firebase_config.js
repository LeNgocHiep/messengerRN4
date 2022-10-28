import Firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBey09d-c-euv1nFBnVesY2AFKfbdDZSNI",
  //https://messengerrn-80d51-default-rtdb.asia-east1.firebasedatabase.app
  databaseURL:
    "https://reactchat-c593a-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "reactchat-c593a",
  appId: "1:870070164651:ios:9ba71a8490f3471fd0ebee", //ios
  // appId:"1:446155438040:android:a1acdcfb905c80cef9a4ad" //android
  storageBucket:"gs://reactchat-c593a.appspot.com",
};

export default Firebase.initializeApp(firebaseConfig);
