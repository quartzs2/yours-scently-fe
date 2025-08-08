import { API_BASE_URL, API_URLS } from "@constants/urls";
import ky from "ky";

type SignupProps = {
  password_confirm: string;
  phone_number: string;
  password: string;
  nickname: string;
  gender: string;
  email: string;
  name: string;
};

const signup = async ({
  password_confirm,
  phone_number,
  password,
  nickname,
  gender,
  email,
  name,
}: SignupProps) => {
  const response = await ky
    .post(`${API_BASE_URL}${API_URLS.SIGN_UP}`, {
      json: {
        password_confirm,
        phone_number,
        password,
        nickname,
        gender,
        email,
        name,
      },
    })
    .json();

  return response;
};

export default signup;
