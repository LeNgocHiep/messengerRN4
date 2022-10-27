import Realm from "realm";
import { User } from "./user_schema";

const databaseConfig = {
  path: "myrealm",
  schema: [User.schema],
}

export const getRealm = async () => {
  return await Realm.open(databaseConfig);
};
