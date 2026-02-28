import { registerApi, loginApi } from "./authApi";
import { tokenStorage } from "./tokenStorage";

export const authRepository = {
 
  async registerUser(data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  }) {
    await registerApi({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      password: data.password,
    });

    return { success: true };
  },

  // ✅ LOGIN (backend verified)
  async login(identifier: string, password: string) {
    const tokens = await loginApi(identifier, password);

    // store JWT securely
    await tokenStorage.save(tokens.access, tokens.refresh);

    return {
      success: true,
      user: tokens.user, // optional (if backend returns user)
    };
  },

  // ✅ LOGOUT
  async logout() {
    await tokenStorage.clear();
    return { success: true };
  },

  // ✅ CHECK AUTH (app start / splash)
  async isLoggedIn() {
    const token = await tokenStorage.getAccess();
    return Boolean(token);
  },
};
