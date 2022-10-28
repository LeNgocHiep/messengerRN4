import Firebase from "./firebase_config";

export const loginUser = async (email, password) => {
  try {
    return await Firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    return error;
  }
};
