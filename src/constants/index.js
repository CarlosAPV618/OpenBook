export const API_URL =
  process.env.REACT_APP_NODE_ENV === "develop"
    ? "http://localhost:4000/api"
    : process.env.REACT_APP_URL;
