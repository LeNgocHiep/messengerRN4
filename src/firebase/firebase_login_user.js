import Firebase from "./firebase_config";

export const LoginUser = async (email, password) => {
  try {
    return await Firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    return error;
  }
};
