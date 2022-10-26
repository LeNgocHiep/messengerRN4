import Realm from "realm";
import { USER, UserSchema } from "./user_schema";
import { CONVERSATION, ConversationSchema } from "./conversation_schema";
import { MESSAGE, MessageSchema } from "./message_schema";

export const realm = await Realm.open({
    path: "realmDatabase",
    schema: [UserSchema,ConversationSchema,MessageSchema],
  });



