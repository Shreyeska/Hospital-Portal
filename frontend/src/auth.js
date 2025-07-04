// src/auth.js
export const loginUser = (role) => {
  localStorage.setItem("role", role);
  console.log(role);
};

export const getUserRole = () => {
  return localStorage.getItem("role");
};

export const logoutUser = () => {
  localStorage.removeItem("role");
};
