import Firebase from "./firebase_config";

const SignUpUserFB = async (email, password) => {
  console.log(email);
  console.log(password);
  try {
    return await Firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    return error;
  }
};
export default SignUpUserFB;
