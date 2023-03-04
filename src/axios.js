import axios from "axios";

export const url = "https://smmpanel.net/api/v2";

const key = process.env.REACT_APP_SMMPANEL_API;

const data_services = {
  key: key,
  action: "services",
};
const data_order = { key: key, action: "add" };
const data_orderStatus = {
  key: key,
  action: "status",
};
const data_balance = {
  key: key,
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
