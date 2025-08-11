// src/app/(mypage)/privacy/PrivacyPage.tsx
"use client";
import PrivacyEdit from "@components/privacy-page/PrivacyEdit";
import PrivacyView from "@components/privacy-page/PrivacyView";
import { DeliveryAddress } from "@custom-types/user";
import { useRouter } from "next/navigation";
import Button from "@components/ui/Button";
import { User } from "@custom-types/user";
import { useState } from "react";

import { mockAddresses, mockUserApi } from "./mocks/userMockData";

export default function PrivacyPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"view" | "edit">("view");

  const [user, setUser] = useState<User>(mockUserApi);
  const [addresses, setAddresses] = useState<DeliveryAddress[]>(mockAddresses);

  const handleDeleteAccount = async () => {
    if (!confirm("정말 탈퇴하시겠습니까?")) return;
    alert("탈퇴 처리되었습니다.");
    router.push("/");
  };

  const handleSave = async (
    nextUser: User,
    nextAddresses: DeliveryAddress[],
  ) => {
    // TODO: 실제 저장 API 호출
    setUser(nextUser);
    setAddresses(nextAddresses);
    setMode("view");
  };

  if (mode === "view") {
    return (
      <PrivacyView
        DeleteButton={
          <Button theme="light" size="lg">
            회원 탈퇴하기
          </Button>
        }
        EditButton={
          <Button theme="dark" size="lg">
            수정하기
          </Button>
        }
        onEdit={() => setMode("edit")}
        onDelete={handleDeleteAccount}
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
