import { View, Image, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/dist/Ionicons";
import MainUserComponent from "./components/main_user_component";
import { Colors } from "../../utils/colors";
import ListUserComponent from "./components/list_user_component";
import ListConversationComponent from "./components/list_conversation_component";
// import Spinner from "react-native-loading-spinner-overlay";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onListenConversationsAction } from "../../actions/conversation_action";


const SearchComponent = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        //   backgroundColor: Colors.backgroundDark80,
        // width: "75%",
        flex: 1,
        backgroundColor: Colors.backgroundDark,
        borderRadius: 15,
      }}
    >
      <TextInput
        style={{
          flex: 1,
          height: 50,
          paddingLeft: 20,
          fontSize: 16,
          //   alignItems: 'flex-end'
          // justifyContent:"space-between"
        }}
        placeholder={"Search..."}
        placeholderTextColor={Colors.hintText}
      ></TextInput>
      <View
        style={{
          width: 50,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 15,
        }}
      >
        <Icon name="search-outline" size={20} color={Colors.backgroundLight} />
      </View>
    </View>
  );
};

const ButtonAddComponent = () => {
  return (
    <View
      style={{
        height: 50,
        width: 50,
        backgroundColor: Colors.blue,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon name="add-outline" size={20} color={Colors.backgroundLight} />
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  // const loadingInfo = useSelector((state) => state.loadingReducer);
  // console.log(loadingInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onListenConversationsAction());
    console.log("useEffect");
  }, []);

  return (
    <View>
      {/* <Spinner
        visible={loadingInfo?.isLoading}
        textContent={loadingInfo?.content}
      /> */}
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: Colors.backgroundDark60,
        }}
      >
        <SafeAreaView>
          <MainUserComponent />
          <View
            style={{
              width: "100%",
              paddingHorizontal: 20,
              height: 70,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <SearchComponent />
            <View style={{ width: 20 }} />
            <ButtonAddComponent />
          </View>
          <ListUserComponent navigation={navigation} />
          {/* <View style={{ flex: 1 }}> */}
          <ListConversationComponent navigation={navigation} />
          {/* </View> */}
        </SafeAreaView>
      </View>
    </View>
  );
};
export default HomeScreen;
