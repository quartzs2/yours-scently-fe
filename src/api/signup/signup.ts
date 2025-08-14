import { API_URLS } from "@constants/urls";
import { publicApi } from "@api/api";

export type SignupData = {
  gender: "FEMALE" | "MALE";
  password_confirm: string;
  phone_number: string;
  birth_date: string;
  password: string;
  nickname: string;
  email: string;
  name: string;
};
type SignupProps = {
  signupData: SignupData;
};

const signup = async ({ signupData }: SignupProps) => {
  const formData = new FormData();
  Object.entries(signupData).forEach(([key, value]) => {
    if (value) {
      formData.append(key, value);
    }
  });

  const data = await publicApi
    .post(`${API_URLS.SIGN_UP}`, {
      body: formData,
    })
    .json();

  return data;
};

export default signup;
