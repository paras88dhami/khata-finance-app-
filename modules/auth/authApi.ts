import apiClient from "@/api/apiClient";

export type RegisterPayload = {
  full_name: string;
  email: string;
  phone: string;
  password: string;
};

export async function registerApi(data: RegisterPayload) {
  const response = await apiClient.post("/auth/register/", data);
  return response.data;
}

export async function loginApi(identifier: string, password: string) {
  const response = await apiClient.post("/auth/login/", {
    identifier, // ✅ MUST MATCH LoginSerializer
    password,
  });

  return response.data; // { access, refresh, user }
}

