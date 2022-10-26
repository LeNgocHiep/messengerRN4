import Firebase from "./firebase_config";
import { insertUser, updateUser } from "../database/user_schema";

const AddUser = async (name, email, image, uid) => {
  try {
    const user = {
      userId: uid,
      name: name,
      email: email,
      avatar: image,
      createAt: Date.now(),
    };

    insertUser(user);

    return await Firebase.database()
      .ref("users/" + uid)
      .set({
        name: name,
        email: email,
        image: image,
        uuid: uid,
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

const UpdateUserImage = async (image, uid) => {
  try {
    updateUser(uid, { avatar: image });
    return await Firebase.database.ref("users/" + uid).update({ image: image });
  } catch (error) {
    return error;
  }
};

export default AddUser;
