// import { useQuery, useRealm } from "./database_manager";
import Realm from "realm";
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

export const getUserById = async(userId) => {
  // const realm = await Realm.open({
  //   path: "myrealm",
  //   schema: [User.schema],
  // });
  const realm = await getRealm();
  const user = realm.objectForPrimaryKey(USER, userId);
  realm.close();
  return user;
};

export const insertUser = async (user) => {
  // const realm = await Realm.open({
  //   path: "myrealm",
  //   schema: [User.schema],
  // });
  const realm = await getRealm();
  const resultUser = realm.write(() => realm.create(USER, user));
  realm.close();
  return resultUser;
};

// export const updateUser = (userId, newUser) => {
//   const realm = useRealm();
//   const user = realm.objectForPrimaryKey(USER, userId);
//   return realm.write(() => {
//     if (newUser.name != null) user.name = newUser.name;
//     if (newUser.email != null) user.email = newUser.email;
//     if (newUser.avatar != null) user.avatar = newUser.avatar;
//     if (newUser.createAt != null) user.createAt = newUser.createAt;
//   });
// };

// export const deleteUser = (userId) => {
//   const realm = useRealm();
//   const user = realm.objectForPrimaryKey(USER, userId);
//   return realm.write(() => {
//     realm.delete(user);
//     user = null;
//   });
// };

export const getAllUser = async () => {
  const realm = await getRealm();
  return realm.objects(USER);
};
