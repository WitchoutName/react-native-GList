import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./httpService";

const authUrl = "auth/";
const tokenKey = "token";

getAuthToken().then((t) => {
  api.setAuthToken(t);
});

export async function register(user) {
  const response = await api.client.put(authUrl + "get-token/", user);
  if (response.status >= 200 && response.status < 300) {
    await setAuthToken(response.data.token);
  }
  return response;
}

export async function login(email, password) {
  const response = await api.client.post(authUrl + "get-token/", {
    email,
    password,
  });
  if (response.status >= 200 && response.status < 300) {
    console.log("storing token");
    await setAuthToken(response.data.token);

    return response;
  }
  return response;
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
    api.setAuthToken(authToken);
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

export async function putUser(user) {
  try {
    const response = await api.client.put(authUrl + "update-user/", user);
    return response;
  } catch (error) {
    console.log(error);
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
  putUser,
  getAuthToken,
  register,
};
