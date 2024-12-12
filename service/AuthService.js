import AsyncStorage from "@react-native-async-storage/async-storage";

const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem("user");
    if (user === null || user === "undefined") {
      return null;
    } else {
      return JSON.parse(user);

    }
  } catch (error) {
    console.error("Error getting user from AsyncStorage", error);
    return null;
  }
};

const getToken = async () => {
  try {
    return await AsyncStorage.getItem("token");
  } catch (error) {
    console.error("Error getting token from AsyncStorage", error);
    return null;
  }
};

const setUserSession = async (user, token) => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    await AsyncStorage.setItem("token", token);
  } catch (error) {
    console.error("Error setting user session in AsyncStorage", error);
  }
};

const resetUserSession = async () => {
  try {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.error("Error resetting user session in AsyncStorage", error);
  }
};
const getUserId = async () => {
  try {
    const user = await getUser();
    console.log("User ID:",user);
    return user ? user.id : null;
  } catch (error) {
    console.error("Error getting user ID", error);
    return null;
  }
};

export default {
  getUser,
  getToken,
  setUserSession,
  resetUserSession,
  getUserId,
};
