import { View, Image, Text, FlatList, StyleSheet } from "react-native";
import { Colors } from "../../../utils/colors";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUrlImageByImageName } from "../../../firebase/firebase_storage";
import { getListConversationAction } from "../../../actions/conversation_action";
import { TouchableOpacity } from "react-native-gesture-handler";
import { onTouchConversationAction } from "../../../actions/conversation_action";

const ListConversationComponent = ({ navigation }) => {
  const conversationsInfo = useSelector(
    (state) => state.listConversationReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListConversationAction());
    console.log("useEffect");
  }, []);

  const ConversationItem = ({ conversation }) => {
    const [avatar, setAvatar] = useState();

    useEffect(() => {
      getUrlImageByImageName(conversation?.avatar).then((url) => {
        setAvatar(url);
      });
    }, []);
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(onTouchConversationAction(conversation, navigation));
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{
              uri: avatar,
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
              {conversation?.name}
            </Text>
            <Text
              style={{
                color: Colors.backgroundLight,
                fontSize: 13,
                fontWeight: "300",
              }}
            >
              {conversation?.content}
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
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => <ConversationItem conversation={item} />;
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
        data={conversationsInfo?.conversations}
        renderItem={renderItem}
        // keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ListConversationComponent;
