import axios from "../axios";

export const apiRegister = (data) => {
  return axios({
    url: "/user/register",
    method: "POST",
    data: data
  });
};
export const apiLogin = (data) => {
  return axios({
    url: "/user/login",
    method: "POST",
    data: data,
  });
};
