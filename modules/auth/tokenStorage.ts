import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";

export const tokenStorage = {
  async save(access: string, refresh: string) {
    await AsyncStorage.multiSet([
      [ACCESS_KEY, access],
      [REFRESH_KEY, refresh],
    ]);
  },

  async getAccess() {
    return AsyncStorage.getItem(ACCESS_KEY);
  },

  async getRefresh() {
    return AsyncStorage.getItem(REFRESH_KEY);
  },

  async clear() {
    await AsyncStorage.multiRemove([ACCESS_KEY, REFRESH_KEY]);
  },
};
