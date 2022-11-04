import Firebase from "./firebase_config";

export const avatarDefault = "avatar_default.jpeg";

export const addUserFB = async (name, email, avatar, userId, createAt) => {
  try {
    return await Firebase.database()
      .ref("users/" + userId)
      .set({
        name: name,
        avatar: avatar ?? avatarDefault,
        email: email,
        userId: userId,
        createAt: createAt,
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

export const getUserFB = async (userId) => {
  try {
    const snapShoot = await Firebase.database()
      .ref("users/" + userId)
      .once("value")
      .catch((error) => {
        console.log(error);
        return error;
      });
    // const avatar = await getUrlImageByImageName(snapShoot.val().avatar);
    // const user = {
    //   name: snapShoot.val().name,
    //   avatar: avatar,
    //   email: snapShoot.val().email,
    //   uid: uid,
    //   createAt: new Date(snapShoot.val().createAt * 1000),
    // };
    // return user;
    return snapShoot.val();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateUserImageFB = async (avatar, uid) => {
  try {
    // updateUser(uid, { avatar: avatar });
    return await Firebase.database
      .ref("users/" + uid)
      .update({ avatar: avatar });
  } catch (error) {
    return error;
  }
};
