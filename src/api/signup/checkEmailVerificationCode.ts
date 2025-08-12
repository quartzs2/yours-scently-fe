import { API_BASE_URL, API_URLS } from "@constants/urls";
import ky from "ky";

type CheckEmailVerificationCodeProps = {
  email: string;
  code: string;
};

const checkEmailVerificationCode = async ({
  email,
  code,
}: CheckEmailVerificationCodeProps) => {
  const response = await ky
    .post(`${API_BASE_URL}${API_URLS.SIGN_UP_EMAIL_VERIFY}`, {
      json: {
        verification_code: code,
        email,
      },
    })
    .json();

  return response;
};

export default checkEmailVerificationCode;
