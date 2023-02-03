import axios from "axios";

const data_services = {
  key: "1894c68c3f951174844748767f8e32ea",
  action: "services",
};
const data_order = { key: "1894c68c3f951174844748767f8e32ea", action: "add" };
const data_orderStatus = {
  key: "1894c68c3f951174844748767f8e32ea",
  action: "status",
};
const data_balance = {
  key: "1894c68c3f951174844748767f8e32ea",
  action: "balance",
};

export const instance_services = axios.create({
  baseURL: "https://smmpanel.net/api/v2",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  data: data_services,
});

export const instance_order = axios.create({
  baseURL: "https://smmpanel.net/api/v2",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  data: data_order,
});

export const instance_orderStatus = axios.create({
  baseURL: "https://smmpanel.net/api/v2",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  data: data_orderStatus,
});

export const instance_balance = axios.create({
  baseURL: "https://smmpanel.net/api/v2",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  data: data_balance,
});
