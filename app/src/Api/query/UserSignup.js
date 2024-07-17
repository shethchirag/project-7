import AxiosInstance from "../axios";

const commonUrl = "/user";
export const UserSignup = async ({ name, surname, email, password }) => {
  let dataJson = JSON.stringify({
    firstName: name,
    lastName: surname,
    email: email,
    password: password,
  });

  let config = {
    method: "post",
    url: `${commonUrl}/signup`,
    headers: {
      "Content-Type": "application/json",
    },
    data: dataJson,
  };
  try {
    const response = await AxiosInstance(config);
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export const emailVerify = async ({ email }) => {
  const emailJson = JSON.stringify({
    email: email,
  });
  const config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    url: `${commonUrl}/send-verification-mail`,
    data: emailJson,
  };
  try {
    const response = await AxiosInstance(config);
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
export const emailVerifyToken = async ({ token }) => {
  const tokenConfig = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    url: `${commonUrl}/verfiy-user-mail`,
    data: JSON.stringify({ token }),
  };

  try {
    const response = await AxiosInstance(tokenConfig);
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
export const forgotPassword = async ({ email }) => {
  const emailConfig = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    url: `${commonUrl}/forgot-password`,
    data: JSON.stringify({ email }),
  };
  try {
    const response = await AxiosInstance(emailConfig);
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export const resetPassword = async ({ password, token }) => {
  const passwordConfig = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      token: token,
      password: password,
    }),
    url: `${commonUrl}/verify-forgot-mail`,
  };
  try {
    const response = await AxiosInstance(passwordConfig);
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
