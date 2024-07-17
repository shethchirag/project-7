import AxiosInstance from "../axios";

const commonUrl = "/user";
export const UserSigning = async ({ email, password }) => {
  const dataJson = JSON.stringify({
    email: email,
    password: password,
  });
  const options = {
    method: "post",
    url: `${commonUrl}/signin`,
    headers: {
      "content-type": "application/json",
    },
    data: dataJson,
  };
  try {
    const { data } = await AxiosInstance(options);
    return data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
