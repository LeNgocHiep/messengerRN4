import { View, Image, Text, StyleSheet } from "react-native";
import { Colors } from "../../../utils/colors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainUserAction } from "../../../actions/user_action";
import { getUrlImageByImageName } from "../../../firebase/firebase_storage";

const MainUserComponent = () => {
  const mainUserInfo = useSelector((state) => state.mainUserReducer);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    dispatch(getMainUserAction());
  }, []);

  useEffect(() => {
    getUrlImageByImageName(mainUserInfo?.user?.avatar).then((url) => {
      setAvatar(url);
    });
  }, [mainUserInfo?.user]);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: avatar,
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
