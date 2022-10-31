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

const UserComponent = ({ user }) => {
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
          uri:
            user?.avatar ??
            "https://thumbs.dreamstime.com/z/default-avatar-profile-icon-social-media-user-vector-image-icon-default-avatar-profile-icon-social-media-user-vector-image-209162840.jpg",
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

const ListMessageComponent = ({ messages, mainUserId }) => {
  const renderItem = ({ item }) => (
    <MessageComponent message={item} mainUserId={mainUserId} />
  );
  return (
    <FlatList
      contentContainerStyle={{ paddingHorizontal: 20 }}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      data={messages}
      renderItem={renderItem}
      // keyExtractor={item => item.id}
    />
  );
};

const TextInputComponent = () => {
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
            multiline={true}
            placeholder={"Write..."}
            placeholderTextColor={Colors.hintText}
          ></AutoGrowingTextInput>
          <View
            style={{
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
              backgroundColor: Colors.backgroundDark55
            }}
          >
            <Icon
              name="send"
              size={20}
              color={Colors.backgroundLight}
            />
          </View>
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

const ChatScreen = ({ navigation, mainUserId }) => {
  const DATA = [
    {
      name: "Nellie Deckow",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/866.jpg",
      createAt: new Date(),
      userId: "d6976cc3-0ac5-44f7-84c1-7ba8a41afcce",
      email: "Demarcus.Labadie51@yahoo.com",
    },
    {
      name: "Willard Baumbach",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1003.jpg",
      createAt: new Date(),
      userId: "ef6d8c19-2ce9-4ba8-a540-cb9f5686e8a0",
      email: "Savanna.Lakin25@yahoo.com",
    },
    {
      name: "James Emmerich",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/485.jpg",
      createAt: new Date(),
      userId: "d1c69699-c3ed-492d-9d87-cac13f4afe27",
      email: "Elinore2@hotmail.com",
    },
    {
      name: "Sherri Halvorson",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1076.jpg",
      createAt: new Date(),
      userId: "2e9d61c5-4b93-4d29-a8a3-bec7704a42a2",
      email: "Serena.Bashirian@gmail.com",
    },
    {
      name: "Colin Olson",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/606.jpg",
      createAt: new Date(),
      userId: "7585163f-d8c5-4089-8f19-d9016de26128",
      email: "Breanna69@gmail.com",
    },
  ];

  const MESSAGES_DATA = [
    {
      messageId: "9f7c3c10-826d-4a5a-b245-cbb1571ca4d9",
      senderId: "ff395deb-b603-4d07-87c7-8b553d0bfd99",
      content:
        "velit Qui delectus doloribus porro rerum qui quisquam qui tempore ratione. Ea asperiores eaque sit at est fugiat.",
      conversationId: "b8739916-00a9-46fd-b859-a9641f6182b9",
    },
    {
      messageId: "4fdc84cf-a19a-4c58-a96b-fe82c174b549",
      senderId: "641af744-b43f-4211-b8d0-eba4bcdfd353",
      content:
        "Et eum libero sed ad. Qui delectus doloribus porro rerum qui quisquam qui tempore ratione. Ea asperiores eaque sit at est fugiat. Culpa cum qui sed consequatur doloribus distinctio laboriosam.\nVoluptatem autem et voluptas necessitatibus reprehenderit corporis omnis voluptatum ut. Molestiae voluptate debitis. Labore voluptas assumenda aliquid rerum sit blanditiis sit voluptas eum.\nIure odit distinctio eos minima repudiandae exercitationem quo veniam. Magnam sapiente quaerat est explicabo cum neque qui itaque blanditiis. Quibusdam enim quia nisi dolor non architecto quae. Eos vel quidem nulla nihil eos in vitae magnam. Rerum ut rerum at quis enim ipsa. Error at molestiae quae inventore cumque mollitia sint quod.",
      conversationId: "9969505d-5d7e-4dc9-b9e2-99da52a21f0a",
    },
    {
      messageId: "19b5cad5-e08f-438b-bb7e-384c96772e02",
      senderId: "5f8b9d3f-80dd-437d-9070-bb11308c6fc0",
      content: "cum qui sed consequatur doloribus",
      conversationId: "8e1680ea-f354-4aff-b4b1-32b9bfdad8af",
    },
    {
      messageId: "7bfd2e68-1309-4257-a177-c7a2e7c9e437",
      senderId: "001f9d99-ebb9-4135-939f-ce16be7f6dbc",
      content:
        "in hic ea Qui delectus doloribus porro rerum qui quisquam qui tempore ratione. Ea asperiores eaque sit at est fugiat.",
      conversationId: "0a2f36a7-bfe1-4091-92cd-8607a3d53c34",
    },
  ];
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
        <AppBar users={DATA} />
        <ListMessageComponent
          messages={MESSAGES_DATA}
          mainUserId={"641af744-b43f-4211-b8d0-eba4bcdfd353"}
        />
        <TextInputComponent />
      </View>
    </KeyboardAvoidingView>
  );
};
export default ChatScreen;
