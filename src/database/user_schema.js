import { getRealm } from "./database_manager";

export const USER = "USER";

export class User {
  constructor({ userId, name, email, avatar, createAt }) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.avatar = avatar;
    this.createAt = createAt;
  }

  static schema = {
    name: USER,
    primaryKey: "userId",
    properties: {
      userId: "string",
      name: "string",
      email: "string",
      avatar: "string",
      createAt: "int",
    },
  };
}

export const getUserByIdDB = async (userId) => {
  let realm = await getRealm();
  let user = realm.objectForPrimaryKey(USER, userId);
  return user;
};

export const insertUserIfNeededDB = async (user) => {
  let realm = await getRealm();
  let constantUser = realm.objectForPrimaryKey(USER, user.userId);
  if (constantUser) return constantUser;
  let resultUser = realm.write(() => realm.create(USER, user));
  return constantUser ?? resultUser;
};

export const getAllUserDB = async () => {
  let realm = await getRealm();
  let result = realm.objects(USER);
  return result;
};
