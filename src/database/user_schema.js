import { getRealm } from "./database_manager";

export const USER = "USER";

export class User {
  constructor({ userId, name, email, avatar }) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.avatar = avatar;
    this.createAt = new Date();
  }

  static schema = {
    name: USER,
    primaryKey: "userId",
    properties: {
      userId: "string",
      name: "string",
      email: "string",
      avatar: "string",
      createAt: "date",
    },
  };
}

export const getUserById = async (userId) => {
  const realm = await getRealm();
  const user = realm.objectForPrimaryKey(USER, userId);
  return user;
};

export const insertUser = async (user) => {
  const realm = await getRealm();
  const constantUser = realm.objectForPrimaryKey(USER, user.userId);
  const resultUser = realm.write(() => realm.create(USER, user));
  return constantUser ?? resultUser;
};

export const getAllUser = async () => {
  const realm = await getRealm();
  return realm.objects(USER);
};
