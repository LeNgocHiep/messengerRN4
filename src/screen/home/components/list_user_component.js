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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListUser } from "../../../actions/user_action";
import { Colors } from "../../../utils/colors";

const UserComponent = ({ user }) => {
  return (
    <TouchableOpacity onPress={() => {
      
    }}>
      <DropShadow style={styles.userContainer}>
        <View>
          <Image
            source={{
              uri: user.avatar,
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

const ListUserComponent = () => {
  const usersInfo = useSelector((state) => state.listUserReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListUser());
    console.log("useEffect");
  }, []);
  const renderItem = ({ item }) => <UserComponent user={item} />;
  return usersInfo?.users?.length > 0 ? (
    <View>
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
