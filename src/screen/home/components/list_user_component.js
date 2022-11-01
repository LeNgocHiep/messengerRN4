import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/dist/Ionicons";
import DropShadow from "react-native-drop-shadow";
import LinearGradient from "react-native-linear-gradient";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListUserAction } from "../../../actions/user_action";
import { Colors } from "../../../utils/colors";
import { createConversationAction } from "../../../actions/conversation_action";
import { getUrlImageByImageName } from "../../../firebase/firebase_storage";
// import Spinner from "react-native-loading-spinner-overlay";
const ListUserComponent = ({ navigation }) => {
  const usersInfo = useSelector((state) => state.listUserReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListUserAction());
    console.log("useEffect");
  }, []);

  const UserComponent = ({ user }) => {
    const [avatar, setAvatar] = useState();

    useEffect(() => {
      getUrlImageByImageName(user.avatar).then((url) => {
        setAvatar(url);
      });
    }, []);

    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(createConversationAction(user.userId, navigation));
        }}
      >
        <DropShadow style={styles.userContainer}>
          <View>
            <Image
              source={{
                uri: avatar,
              }}
              style={styles.image}
            />
            <LinearGradient
              colors={["rgba(41,47,63,0)", "rgba(41,47,63,0.8)"]}
              style={styles.gradient}
            >
              <Text style={styles.text}>{user.name}</Text>
              <View style={styles.icon}>
                <Icon name={"heart"} size={16} color={Colors.backgroundLight} />
              </View>
            </LinearGradient>
          </View>
        </DropShadow>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => <UserComponent user={item} />;

  // const loadingInfo = useSelector((state) => state.loadingReducer);
  // console.log(loadingInfo);
  return usersInfo?.users?.length > 0 ? (
    <View>
      {/* <Spinner
        visible={loadingInfo?.isLoading}
        textContent={loadingInfo?.content}
      /> */}
      <Text style={styles.listUserContainer}>{"Favourite"}</Text>
      <FlatList
        horizontal
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        data={usersInfo?.users}
        renderItem={renderItem}
        // keyExtractor={item => item.id}
      />
    </View>
  ) : (
    <View />
  );
};

const styles = StyleSheet.create({
  listUserContainer: {
    paddingStart: 20,
    color: Colors.backgroundLight,
    fontSize: 24,
  },
  userContainer: {
    paddingTop: 10,
    paddingBottom: 40,
    shadowColor: "#000000",
    shadowOffset: {
      width: 20,
      height: 17,
    },
    shadowOpacity: 0.45,
    shadowRadius: 15,
  },
  image: {
    width: 95,
    height: 140,
    borderRadius: 30,
  },
  gradient: {
    position: "absolute",
    width: 95,
    height: 140,
    borderRadius: 30,
    paddingHorizontal: 5,
    paddingTop: 80,
  },
  icon: {
    alignItems: "flex-end",
    paddingEnd: 10,
  },
  text: {
    color: Colors.backgroundLight,
    height: 34,
  },
});
export default ListUserComponent;
