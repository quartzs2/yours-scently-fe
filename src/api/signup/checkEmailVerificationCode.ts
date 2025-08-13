import { API_URLS } from "@constants/urls";
import { publicApi } from "@api/api";

type CheckEmailVerificationCodeProps = {
  email: string;
  code: string;
};

const checkEmailVerificationCode = async ({
  email,
  code,
}: CheckEmailVerificationCodeProps) => {
  const response = await publicApi
    .post(`${API_URLS.SIGN_UP_EMAIL_VERIFY}`, {
      json: {
        verification_code: code,
        email,
      },
    })
    .json();

  return response;
};

export default checkEmailVerificationCode;
