import { View, Image, Text, StyleSheet } from "react-native";
import { Colors } from "../../../utils/colors";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainUser } from "../../../actions/user_action";

const MainUserComponent = () => {
  const mainUserInfo = useSelector((state) => state.mainUserReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMainUser());
    console.log("useEffect");
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            mainUserInfo?.user?.avatar ??
            "https://thumbs.dreamstime.com/z/default-avatar-profile-icon-social-media-user-vector-image-icon-default-avatar-profile-icon-social-media-user-vector-image-209162840.jpg",
        }}
        style={styles.image}
      />
      <Text style={styles.text}>{mainUserInfo?.user?.name ?? ""}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: 50,
      flexDirection: "row",
      paddingLeft: 20,
      alignItems: "center",
    },
    image: {
      width: 45,
      height: 45,
      borderRadius: 45 / 2,
    },
    text: {
      color: Colors.backgroundLight,
      fontSize: 24,
      paddingLeft: 20,
    },
  });

export default MainUserComponent;


