import Firebase from "./firebase_config";

export const onListenRealTimeMessage = async (conversationId) => {
  //     database()
  //   .ref('/users/123')
  //   .on('value', snapshot => {
  //     console.log('User data: ', snapshot.val());
  //   });
  try {
    Firebase.database()
      .ref("messages")
      .child(conversationId)
      .on("value", (snapshot) => {
        console.log(snapshot.val());
      });
  } catch (error) {
    console.log(error);
  }
};
