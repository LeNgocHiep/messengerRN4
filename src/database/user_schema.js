import { realm } from "./database_manager";

export const USER = "USER";

export const UserSchema = {
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
export const getUserById = (userId) =>realm => realm.objectForPrimaryKey(USER, userId);

export const insertUser = (user) => {
  return realm => realm.write(() => realm.create(USER, user));
};

export const updateUser = (userId, newUser) => {
  const user = getUserById(userId);
  realm => realm.write(() => {
    if (newUser.name != null) user.name = newUser.name;
    if (newUser.email != null) user.email = newUser.email;
    if (newUser.avatar != null) user.avatar = newUser.avatar;
    if (newUser.createAt != null) user.createAt = newUser.createAt;
  });
};
export const deleteUser = (userId) => {
  const user = getUserById(userId);
  realm => realm.write(() => {
    // Delete the task from the realm.
    realm.delete(user);
    // Discard the reference.
    user = null;
  });
};

export const getAllUser = () => {
  return realm => realm.write(() =>realm.objects(USER));
};
