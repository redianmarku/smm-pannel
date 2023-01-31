import axios from "axios";

const data = { key: "1894c68c3f951174844748767f8e32ea", action: "services" };

const instance = axios.create({
  baseURL: "https://smmpanel.net/api/v2",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  data: data,
});

export default instance;
