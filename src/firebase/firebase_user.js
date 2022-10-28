import Firebase from "./firebase_config";

export const avatarDefault = 'avatar_default.jpeg';

export const addUser = async (name, email, avatar, uid) => {
  try {
    return await Firebase.database()
      .ref("users/" + uid)
      .set({
        name: name,
        avatar: avatar ?? avatarDefault,
        email: email,
        uid: uid,
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

export const getUser = async (uid) => {
  try {
    const snapShoot = await Firebase.database()
      .ref("users/" + uid)
      .once("value")
      .catch((error) => {
        console.log(error);
        return error;
      });
    return snapShoot.val();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateUserImage = async (avatar, uid) => {
  try {
    // updateUser(uid, { avatar: avatar });
    return await Firebase.database.ref("users/" + uid).update({ avatar: avatar });
  } catch (error) {
    return error;
  }
};
