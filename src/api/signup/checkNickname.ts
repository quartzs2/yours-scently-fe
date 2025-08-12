import { API_BASE_URL, API_URLS } from "@constants/urls";
import ky from "ky";

type CheckNicknameProps = {
  nickname: string;
};

const checkNickname = async ({ nickname }: CheckNicknameProps) => {
  const response = await ky
    .post(`${API_BASE_URL}${API_URLS.SIGN_UP_NICKNAME_CHECK}`, {
      json: { nickname },
    })
    .json();

  return response;
};

export default checkNickname;
