import { Colors } from "../../utils/colors";
import { View, Image, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/dist/Ionicons";
import DropShadow from "react-native-drop-shadow";
import LinearGradient from "react-native-linear-gradient";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListUser, getMainUser } from "../../actions/user_action";

const AppBarComponent = ({ mainUserInfo }) => {
  return (
    <View
      style={{
        width: "100%",
        height: 50,
        flexDirection: "row",
        paddingLeft: 20,
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri:
            mainUserInfo?.avatar ??
            "https://thumbs.dreamstime.com/z/default-avatar-profile-icon-social-media-user-vector-image-icon-default-avatar-profile-icon-social-media-user-vector-image-209162840.jpg",
        }}
        style={{ width: 45, height: 45, borderRadius: 45 / 2 }}
      />
      <Text
        style={{
          color: Colors.backgroundLight,
          fontSize: 24,
          paddingLeft: 20,
        }}
      >
        {mainUserInfo?.name ?? ""}
      </Text>
    </View>
  );
};
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

const UserComponent = ({user}) => {
  return (
    <DropShadow
      style={{
        paddingTop: 10,
        paddingBottom: 40,
        shadowColor: "#000000",
        shadowOffset: {
          width: 20,
          height: 17,
        },
        shadowOpacity: 0.45,
        shadowRadius: 15,
      }}
    >
      <View>
        <Image
          source={{
            uri: user.avatar,
          }}
          style={{
            // zIndex: 1,
            width: 95,
            height: 140,
            borderRadius: 30,

            // shadowColor: "#000",
            // shadowOffset: { height: 3, width: 3 },
            // shadowOpacity: 0.8,
            // shadowRadius: 0.5
          }}
        />
        <LinearGradient
          colors={["rgba(41,47,63,0)", "rgba(41,47,63,0.8)"]}
          style={{
            position: "absolute",
            width: 95,
            height: 140,
            borderRadius: 30,
            paddingHorizontal: 5,
            paddingTop: 80,
          }}
        >
          <Text style={{ color: Colors.backgroundLight, height: 34 }}>
            {user.name}
          </Text>
          <View style={{ alignItems: "flex-end", paddingEnd: 10 }}>
            <Icon name={"heart"} size={16} color={Colors.backgroundLight} />
          </View>
        </LinearGradient>
      </View>
    </DropShadow>
  );
};

const ListUserComponent = ({users}) => {
  const renderItem = ({ item }) => <UserComponent user={item} />;
  return (
    <View>
      <Text
        style={{
          paddingStart: 20,
          color: Colors.backgroundLight,
          fontSize: 24,
        }}
      >
        {"Favourite"}
      </Text>
      <FlatList
        horizontal
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        data={users}
        renderItem={renderItem}
        // keyExtractor={item => item.id}
      />
    </View>
  );
};

const ConversationItem = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Image
        source={{
          uri: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
        }}
        style={{ width: 45, height: 45, borderRadius: 45 / 2 }}
      />
      <View
        style={{
          flexDirection: "column",
          flex: 1,
          paddingHorizontal: 10,
          justifyContent: "space-around",
        }}
      >
        <Text
          style={{
            color: Colors.backgroundLight,
            fontSize: 15,
            fontWeight: "600",
          }}
        >
          {"James Cameroon"}
        </Text>
        <Text
          style={{
            color: Colors.backgroundLight,
            fontSize: 13,
            fontWeight: "300",
          }}
        >
          {"New message"}
        </Text>
      </View>
      <View style={{ justifyContent: "center" }}>
        <Text
          style={{
            color: Colors.backgroundLight,
            fontSize: 15,
            fontWeight: "600",
          }}
        >
          {"08:43"}
        </Text>
      </View>
    </View>
  );
};

const ListConversationComponent = () => {
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571ex29d72",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29gd72",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571we29wd72",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29dr72",
      title: "Third Item",
    },
  ];
  const renderItem = ({ item }) => <ConversationItem />;
  return (
    <View>
      {/* <Text
        style={{
          paddingStart: 20,
          color: Colors.backgroundLight,
          fontSize: 24,
        }}
      >
        {"Favourite"}
      </Text> */}
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        data={DATA}
        renderItem={renderItem}
        // keyExtractor={item => item.id}
      />
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const mainUserInfo = useSelector((state) => state.mainUserReducer);
  const usersInfo = useSelector((state) => state.listUserReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMainUser());
    dispatch(getListUser());
    console.log("useEffect");
  }, []);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: Colors.backgroundDark60,
      }}
    >
      <SafeAreaView>
        <AppBarComponent mainUserInfo={mainUserInfo.user} />
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
        {/* if({users.length} > 0){
          <ListUserComponent users={users} />
        } */}
        {usersInfo?.users?.length > 0 ? (
          <ListUserComponent users={usersInfo.users} />
        ) : <View/>}

        <ListConversationComponent />
      </SafeAreaView>
    </View>
  );
};
export default HomeScreen;
