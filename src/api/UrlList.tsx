const isDev = import.meta.env.NODE_ENV === "development";

const development = {
  baseUrl: "https://dummyjson.com",
};

const production = {
  baseUrl: "https://api.yourdomain.com",
};

const UrlList = isDev ? development : production;

export default UrlList;
