import { API_URLS } from "@constants/urls";
import { publicApi } from "@api/api";

type CheckNicknameProps = {
  nickname: string;
};

const checkNickname = async ({ nickname }: CheckNicknameProps) => {
  const data = await publicApi
    .post(`${API_URLS.SIGN_UP_NICKNAME_CHECK}`, {
      json: { nickname },
    })
    .json();

  return data;
};

export default checkNickname;
