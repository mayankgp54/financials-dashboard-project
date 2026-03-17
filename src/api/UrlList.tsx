const isDev = import.meta.env.MODE === "development";
console.log(isDev);

const development = {
  baseUrl: "https://dummyjson.com",
};

const production = {
  baseUrl: "https://api.yourdomain.com",
};

const UrlList = isDev ? development : production;

export default UrlList;
