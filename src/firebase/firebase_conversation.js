import Firebase from "./firebase_config";
import { avatarDefault } from "./firebase_user";

// conversationId: "string",
// name: "string",
// avatar: "string",
// createAt: "int",
// messages: `${MESSAGE}[]`,
// users: `${USER}[]`,

export const addConversationFB = async (
  conversationId,
  name,
  avatar,
  createAt,
  userIds,
  createBy
) => {
  try {
    return await Firebase.database()
      .ref("conversations/" + conversationId)
      .set({
        name: name,
        avatar: avatar ?? avatarDefault,
        conversationId: conversationId,
        createAt: createAt,
        userIds: userIds,
        createBy: createBy,
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const onListenRealTimeConversationFB = async (onListen, userId) => {
  //     database()
  //   .ref('/users/123')
  //   .on('value', snapshot => {
  //     console.log('User data: ', snapshot.val());
  //   });
  try {
    Firebase.database()
      .ref("conversations")
      //   .child("userIds")
      //   .constant(userId)
      //   .child(userId)
      .on("child_added", (snapshot) => {
        // console.log(snapshot.val());
        // const conversations = [];
        // const listConversation = snapshot.val();
        // listConversation.forEach((data) => {
        //   const array = data.userIds;
        //   if (data.userIds.includes(userId) && data.createBy != userId) {
        //     conversations.push(data.val());
        //   }
        // });
        // onListen(conversations);
        const conversation = snapshot.val();
        if (conversation.createBy !== userId && conversation.userIds.includes(userId)){
          onListen(conversation);
        }
      });
  } catch (error) {
    console.log(error);
  }
};
