import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./httpService";

const authUrl = "auth/";
const tokenKey = "token";

api.setAuthToken(getAuthToken);

export async function login(email, password) {
  const response = await api.client.post(authUrl + "get-token/", {
    email,
    password,
  });
  console.log(response.data, response.status);
  if (response.status >= 200 && response.status < 300) {
    await setAuthToken(response.data);
  }
  console.log(await getAuthToken());
}

export function loginWithAuthToken(token) {
  setAuthToken(token);
}

export function logout() {
  setAuthToken("");
}

async function setAuthToken(authToken) {
  try {
    await AsyncStorage.setItem(tokenKey, authToken);
    api.setAuthToken(getAuthToken);
  } catch (error) {
    throw new Error("Error storing the auth token");
  }
}

export async function getUser() {
  try {
    const { data } = await api.client.post(authUrl + "get-user/");
    return data;
  } catch (error) {
    return null;
  }
}

export async function getAuthToken() {
  try {
    return await AsyncStorage.getItem(tokenKey);
  } catch (error) {
    throw new Error("Error getting the auth token");
  }
}

export default {
  login,
  loginWithAuthToken,
  logout,
  getUser,
  getAuthToken,
};
