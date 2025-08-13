import { API_URLS } from "@constants/urls";
import { publicApi } from "@api/api";

type EmailLoginResponse = {
  refresh_token: string;
  access_token: string;
};

type EmailLoginProps = {
  password: string;
  email: string;
};

const emailLogin = async ({ password, email }: EmailLoginProps) => {
  const data = await publicApi
    .post(API_URLS.EMAIL_LOGIN, {
      json: {
        password,
        email,
      },
    })
    .json<EmailLoginResponse>();

  return data;
};

export default emailLogin;
