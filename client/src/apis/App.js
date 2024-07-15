import axios from "../axios";

export const apiGetCategory = () => {
  return axios({
    url: "/prodcategory/",
    method: "GET",
  });
};
