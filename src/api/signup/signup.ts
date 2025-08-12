import { API_BASE_URL, API_URLS } from "@constants/urls";
import ky from "ky";

type SignupProps = {
  password_confirm: string;
  phone_number: string;
  birth_date: string;
  password: string;
  nickname: string;
  gender: string;
  email: string;
  name: string;
};

const signup = async ({
  password_confirm,
  phone_number,
  birth_date,
  password,
  nickname,
  gender,
  email,
  name,
}: SignupProps) => {
  const formData = new FormData();
  formData.append("password_confirm", password_confirm);
  formData.append("phone_number", phone_number);
  formData.append("birth_date", birth_date);
  formData.append("password", password);
  formData.append("nickname", nickname);
  formData.append("gender", gender);
  formData.append("email", email);
  formData.append("name", name);

  const response = await ky
    .post(`${API_BASE_URL}${API_URLS.SIGN_UP}`, {
      body: formData,
    })
    .json();

  return response;
};

export default signup;
