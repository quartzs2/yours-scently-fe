"use client";

import {
  ACCOUNT_DELETE_CONFIRM,
  ACCOUNT_DELETE_SUCCESS,
} from "@constants/messages";
import PrivacyEdit from "@components/feature/privacy-page/PrivacyEdit";
import PrivacyView from "@components/feature/privacy-page/PrivacyView";
import { mockAddresses } from "@app/privacy-page/mocks/userMockData";
import { mockUserApi } from "@app/privacy-page/mocks/userMockData";
import { DeliveryAddress, User } from "@custom-types/user";
import { useRouter } from "next/navigation";
import Button from "@components/ui/Button";
import { useState } from "react";

const MODE = {
  DEFAULT: "default",
  VIEW: "view",
  EDIT: "edit",
} as const;
type Mode = (typeof MODE)[keyof typeof MODE];

export default function PrivacyPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(MODE.VIEW);

  const [user, setUser] = useState<User | null>(mockUserApi);
  const [addresses, setAddresses] = useState<DeliveryAddress[]>(mockAddresses);

  const handleDeleteAccount = async () => {
    if (!confirm(ACCOUNT_DELETE_CONFIRM)) return;
    alert(ACCOUNT_DELETE_SUCCESS);
    router.push("/");
  };

  const handleSave = async (
    nextUser: User,
    nextAddresses: DeliveryAddress[],
  ) => {
    // TODO: 실제 저장 API 호출
    setUser(nextUser);
    setAddresses(nextAddresses);
    setMode(MODE.VIEW);
  };
  if (!user) {
    return <div>로딩 중...</div>;
  }

  if (mode === MODE.VIEW) {
    return (
      <PrivacyView
        DeleteButton={
          <Button onClick={handleDeleteAccount} theme="light" size="lg">
            회원 탈퇴하기
          </Button>
        }
        EditButton={
          <Button onClick={() => setMode(MODE.EDIT)} theme="dark" size="lg">
            수정하기
          </Button>
        }
        addresses={addresses}
        user={user}
      />
    );
  }

  return (
    <PrivacyEdit
      SaveButton={({ disabled, onClick }) => (
        <Button disabled={disabled} onClick={onClick} theme="dark" size="lg">
          저장하기
        </Button>
      )}
      initialAddresses={addresses}
      onSave={handleSave}
      initialUser={user}
    />
  );
}
