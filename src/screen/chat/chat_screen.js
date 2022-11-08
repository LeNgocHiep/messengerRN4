import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../utils/colors";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import {
  Image,
  FlatList,
  View,
  Dimensions,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import DropShadow from "react-native-drop-shadow";
import Icon from "react-native-vector-icons/dist/Ionicons";
import React from "react";
import { useEffect, useState } from "react";
import { getUrlImageByImageName } from "../../firebase/firebase_storage";
import { useSelector, useDispatch } from "react-redux";
import {
  createMessageAction,
  getListMessageAction,
  onListenMessagesAction,
} from "../../actions/message_action";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getListConversationAction } from "../../actions/conversation_action";

const UserComponent = ({ user }) => {
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    getUrlImageByImageName(user?.avatar).then((url) => {
      setAvatar(url);
    });
  }, []);

  return (
    <DropShadow
      style={{
        paddingTop: 10,
        paddingBottom: 25,
        shadowColor: "#000000",
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.45,
        shadowRadius: 10,
      }}
    >
      <Image
        source={{
          uri: avatar,
        }}
        style={{ width: 34, height: 34, borderRadius: 34 / 2 }}
      />
    </DropShadow>
  );
};
const AppBar = ({ users }) => {
  const renderItem = ({ item }) => {
    const index = users.indexOf(item);
    return index % 2 == 0 ? (
      <UserComponent user={item} />
    ) : (
      <View style={{ marginTop: 10 }}>
        <UserComponent user={item} />
      </View>
    );
  };
  return (
    <SafeAreaView SafeAreaView edges={["top"]}>
      <FlatList
        horizontal
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        data={users}
        renderItem={renderItem}
        // keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const MessageComponent = ({ message, mainUserId }) => {
  return (
    <View
      style={{
        maxWidth: Dimensions.get("window").width * 0.7,
        alignSelf: message.senderId === mainUserId ? "flex-end" : "flex-start",
      }}
    >
      <View
        style={{
          borderRadius: 20,
          padding: 14,
          backgroundColor:
            message.senderId === mainUserId
              ? Colors.bubbleOutgoing
              : Colors.bubbleIncoming,
        }}
      >
        <Text style={{ color: Colors.backgroundLight }}>{message.content}</Text>
      </View>
    </View>
  );
};

const ListMessageComponent = ({ conversationId, mainUserId }) => {
  const messagesInfo = useSelector((state) => state.listMessageReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListMessageAction(conversationId));
  }, []);

  const renderItem = ({ item }) => (
    <MessageComponent message={item} mainUserId={mainUserId} />
  );
  return (
    // <View style={{ backgroundColor: Colors.backgroundDark }}>
    messagesInfo?.messages?.length > 0 ? (
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        data={messagesInfo?.messages}
        renderItem={renderItem}
        // keyExtractor={item => item.id}
      />
    ) : (
      <View style={{ flex: 1 }} />
    )
    // </View>
  );
};

const TextInputComponent = ({ onPress }) => {
  const [text, setText] = useState("");
  return (
    <SafeAreaView edges={["bottom"]}>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          paddingTop: 20,
          // height: 70,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            backgroundColor: Colors.backgroundDark,
            borderRadius: 15,
          }}
        >
          <AutoGrowingTextInput
            style={{
              flex: 1,
              height: 50,
              paddingLeft: 20,
              paddingTop: 14,
              fontSize: 16,
              color: Colors.backgroundLight,
            }}
            onChangeText={(text) => {
              setText(text);
            }}
            multiline={true}
            placeholder={"Write..."}
            placeholderTextColor={Colors.hintText}
          ></AutoGrowingTextInput>
          <TouchableOpacity
            onPress={() => {
              onPress(text);
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
                backgroundColor: Colors.backgroundDark55,
              }}
            >
              <Icon name="send" size={20} color={Colors.backgroundLight} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ width: 20 }} />
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
          <Icon
            name="camera-outline"
            size={20}
            color={Colors.backgroundLight}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const ChatScreen = ({ route, navigation }) => {
  const conversation = route.params.conversation;
  const mainUserId = route.params.mainUserId;
  var changed = false;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onListenMessagesAction(conversation.conversationId));
  }, []);
  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        // the navigation.navigate will fire beforeRemove which causes an infinite loop. we guard this here
        if (e.data.action.type === "NAVIGATE") {
          return;
        }
        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // navigate manually
        navigation.navigate({
          name: "HomeScreen",
          // params: { post: postText },
          merge: true,
        });
        if (changed) dispatch(getListConversationAction());
      }),
    [navigation]
  );
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View
        style={{
          backgroundColor: Colors.backgroundDark60,
          flex: 1,
        }}
      >
        <AppBar users={conversation?.users} />
        {/* <View style={{backgroundColor:Colors.backgroundDark,flex:1}}> */}
        <ListMessageComponent
          conversationId={conversation.conversationId}
          mainUserId={mainUserId}
        />
        {/* </View> */}
        <TextInputComponent
          onPress={(text) => {
            console.log("send message");
            changed = true;
            dispatch(createMessageAction(text, conversation.conversationId));
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
export default ChatScreen;
