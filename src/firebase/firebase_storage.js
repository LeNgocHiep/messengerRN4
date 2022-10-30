import Firebase from "./firebase_config";
import { avatarDefault } from "./firebase_user";

export const uploadImage = async (pathLocal) => {
  const listString = pathLocal.split("/");
  const fileName = listString[listString.length - 1];
  const reference = Firebase.storage().ref(fileName);
  await reference.putFile(pathLocal);
  return fileName;
};

export const getUrlAvatarDefault = async () => {
  return await Firebase.storage().ref(avatarDefault).getDownloadURL();
};

export const getUrlImageByImageName = async (imageName) => {
  return await Firebase.storage().ref(imageName).getDownloadURL();
};
