import { API_URLS } from "@constants/urls";
import { publicApi } from "@api/api";

type CheckNicknameProps = {
  nickname: string;
};

const checkNickname = async ({ nickname }: CheckNicknameProps) => {
  const response = await publicApi
    .post(`${API_URLS.SIGN_UP_NICKNAME_CHECK}`, {
      json: { nickname },
    })
    .json();

  return response;
};

export default checkNickname;
