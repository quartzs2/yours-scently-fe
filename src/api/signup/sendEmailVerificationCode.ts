import { API_URLS } from "@constants/urls";
import { publicApi } from "@api/api";

type SendEmailVerificationCodeProps = {
  email: string;
};

const sendEmailVerificationCode = async ({
  email,
}: SendEmailVerificationCodeProps) => {
  const data = await publicApi
    .post(`${API_URLS.SIGN_UP_EMAIL_SEND_CODE}`, {
      json: { email },
    })
    .json();

  return data;
};

export default sendEmailVerificationCode;
