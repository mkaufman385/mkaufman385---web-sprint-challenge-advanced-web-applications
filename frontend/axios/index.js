// ✨ implement axiosWithAuth

import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token"); // Replace with your actual token retrieval logic

  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export default axiosWithAuth;
