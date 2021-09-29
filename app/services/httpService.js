import { create } from "apisauce";

const client = create({
  baseURL: "http://192.168.1.114:8000/",
});

async function setAuthToken(token) {
  if (token) {
    client.addAsyncRequestTransform(async (request) => {
      request.headers["Authorization"] = `Token ${token}`;
    });
  }
}

export default {
  client,
  setAuthToken,
};
