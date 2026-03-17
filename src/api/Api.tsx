import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  AxiosError,
  type Method,
} from "axios";
import UrlList from "./UrlList";

const API = async <T = any,>(type: Method, url: string, data?: any) => {
  const obj: AxiosRequestConfig = {
    method: type,
    url: `${UrlList.baseUrl}/${url}`,
    data: data,
  };

  console.log(obj);

  try {
    const apiresponse: AxiosResponse<T> = await axios(obj);
    return apiresponse;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
};

export default API;
