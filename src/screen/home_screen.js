import { Colors } from "../utils/colors";
import { View, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/dist/Ionicons";

const AppBarComponent = () => {
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
          uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
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
        {"James Cameron"}
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

const HomeScreen = ({ navigation }) => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: Colors.backgroundDark80,
      }}
    >
      <SafeAreaView>
        <AppBarComponent />
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
      </SafeAreaView>
    </View>
  );
};
export default HomeScreen;
