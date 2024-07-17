import AxiosInstance from "../axios";

export const fetchExample = async () => {
  try {
    const { data } = AxiosInstance.get("/");
    return data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
