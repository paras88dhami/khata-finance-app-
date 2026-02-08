import { database } from "@/dataBase";
import { registerApi, loginApi } from "./authApi";
import { tokenStorage } from "./tokenStorage";

const usersCollection = database.collections.get("users");

export const authRepository = {
  // ✅ REGISTER (backend-first)
  async registerUser(data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  }) {
    // 1️⃣ Register on backend
    await registerApi({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      password: data.password,
    });

    // 2️⃣ Cache user locally (NO password)
    await database.write(async () => {
      const existing = await usersCollection.query().fetch();

      const alreadyExists = existing.find(
        (u: any) => u.email === data.email || u.phone === data.phone,
      );

      if (!alreadyExists) {
        await usersCollection.create((user: any) => {
          user.fullName = data.fullName;
          user.email = data.email;
          user.phone = data.phone;
          user.password = ""; // ❌ never store password
        });
      }
    });

    return { success: true };
  },

  // ✅ LOGIN (backend verified)
  async login(identifier: string, password: string) {
    // 1️⃣ Login via backend
    const tokens = await loginApi(identifier, password);

    // 2️⃣ Store JWT in AsyncStorage
    await tokenStorage.save(tokens.access, tokens.refresh);

    return { success: true };
  },

  // ✅ LOGOUT
  async logout() {
    await tokenStorage.clear();
    return { success: true };
  },

  // ✅ CHECK AUTH (app start)
  async isLoggedIn() {
    const token = await tokenStorage.getAccess();
    return !!token;
  },
};  