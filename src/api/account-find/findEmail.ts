import { API_URLS } from "@constants/urls";
import { publicApi } from "@api/api";

type FindEmailProps = {
  phoneNumber: string;
  name: string;
};

type FindEmailResponse = {
  email: string;
};

const findEmail = async ({ phoneNumber, name }: FindEmailProps) => {
  const data = await publicApi
    .post(API_URLS.FIND_EMAIL, {
      json: {
        phone_number: phoneNumber,
        name,
      },
    })
    .json<FindEmailResponse>();

  return data;
};
export default findEmail;
