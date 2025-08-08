import { API_BASE_URL, API_URLS } from "@constants/urls";
import ky from "ky";

type SendEmailVerificationCodeProps = {
  email: string;
};

const sendEmailVerificationCode = async ({
  email,
}: SendEmailVerificationCodeProps) => {
  const response = await ky
    .post(`${API_BASE_URL}${API_URLS.SIGN_UP_EMAIL_SEND_CODE}`, {
      json: { email },
    })
    .json();

  return response;
};

export default sendEmailVerificationCode;
