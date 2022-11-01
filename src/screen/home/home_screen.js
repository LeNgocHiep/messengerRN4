import { View, Image, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/dist/Ionicons";
import DropShadow from "react-native-drop-shadow";
import LinearGradient from "react-native-linear-gradient";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListUser, getMainUser } from "../../actions/user_action";
import MainUserComponent from "./components/main_user_component";
import { Colors } from "../../utils/colors";
import ListUserComponent from "./components/list_user_component";

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
  return (
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
        {/* <ListConversationComponent /> */}
      </SafeAreaView>
    </View>
  );
};
export default HomeScreen;
