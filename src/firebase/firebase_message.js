import Firebase from "./firebase_config";

export const addMessageFB = async (
  messageId,
  conversationId,
  content,
  type,
  image,
  senderId,
  sentAt
) => {
  try {
    return await Firebase.database()
      .ref("messages/" + conversationId + "/" + messageId)
      .set({
        messageId: messageId,
        conversationId: conversationId,
        content: content,
        type: type,
        image: image,
        senderId: senderId,
        sentAt: sentAt,
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  } catch (error) {
    console.log(error);
  }
};

export const getMessageFB = async (messageId) => {
  try {
    let snapShoot = await Firebase.database()
      .ref("messages/" + messageId)
      .once("value")
      .catch((error) => {
        console.log(error);
        return error;
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const onListenRealTimeMessageFB = async (onListen, conversationId) => {
  //     database()
  //   .ref('/users/123')
  //   .on('value', snapshot => {
  //     console.log('User data: ', snapshot.val());
  //   });
  try {
    Firebase.database()
      .ref("messages/" + conversationId)
      .on("child_added", (snapshot) => {
        onListen(snapshot.val());
        console.log(snapshot.val());
      });
  } catch (error) {
    console.log(error);
  }
};
