import Firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBey09d-c-euv1nFBnVesY2AFKfbdDZSNI",
  databaseURL:
    "https://reactchat-c593a-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "reactchat-c593a",
  appId: "1:870070164651:ios:9ba71a8490f3471fd0ebee", //ios
  storageBucket:"gs://reactchat-c593a.appspot.com",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBpXfF-d4Abg8SDNNPBTQKHzpOHHLzSX5M",
//   databaseURL:
//     "https://reactchat-c593a-default-rtdb.asia-southeast1.firebasedatabase.app/",
//   projectId: "reactchat-c593a",
//   appId: "1:870070164651:android:24d77090e3c0397ad0ebee", //android
//   storageBucket:"gs://reactchat-c593a.appspot.com",
// };

export default Firebase.initializeApp(firebaseConfig);
