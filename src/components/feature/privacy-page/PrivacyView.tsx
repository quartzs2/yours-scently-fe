"use client";

import FieldRow from "@components/feature/privacy-page/FieldRow";
import { DeliveryAddress, User } from "@custom-types/user";

type Props = {
  DeleteButton: React.ReactNode;
  addresses: DeliveryAddress[];
  EditButton: React.ReactNode;
  user: User;
};

export const toKoreanGender = (g: User["gender"]) =>
  g === "MALE" ? "남성" : g === "FEMALE" ? "여성" : "기타";

export default function PrivacyView({
  DeleteButton,
  EditButton,
  addresses,
  user,
}: Props) {
  const defaultAddress = addresses.find((a) => a.isDefault);

  return (
    <div className="width-container-md M min- mx-auto max-w-[var(--width-container)] py-[40px] sm:max-w-[var(--width-container-sm)] md:max-w-[var(--width-container-md)] md:px-0">
      {/* 타이틀 & 수정 버튼 */}
      <div className="mb-[60px] flex items-start justify-between">
        <h2 className="text-subtitle-1 h-[48px] w-[160px] text-text-primary">
          개인 정보
        </h2>
        <div>{EditButton}</div>
      </div>

      <FieldRow label="이름">{user.name}</FieldRow>
      <FieldRow label="닉네임">{user.nickname}</FieldRow>
      <FieldRow label="생년월일">{user.birthDate}</FieldRow>
      <FieldRow label="성별">{toKoreanGender(user.gender)}</FieldRow>
      <FieldRow label="이메일">{user.email}</FieldRow>
      <FieldRow label="휴대전화">{user.phoneNumber}</FieldRow>

      {/* 기본 배송지(2줄) */}
      <div className="mx-auto w-full max-w-[800px]">
        <div className="flex gap-8">
          <div className="text-subtitle-2 w-[200px] text-text-primary">
            <div className="flex h-[80px] items-center">기본 배송지</div>
          </div>
          <div className="w-[1px] bg-border-default" />
          <div className="flex-1 pl-[40px] text-text-primary">
            <div className="flex h-[40px] items-center gap-2">
              <span className="text-caption flex w-[64px] justify-center rounded-full border border-border-default bg-bg-subtle py-[2px]">
                도로명
              </span>
              <span>{defaultAddress?.addressLine1 ?? ""}</span>
            </div>
            <div className="flex h-[40px] items-center gap-2">
              <span className="text-caption flex w-[64px] justify-center rounded-full border border-border-default bg-bg-subtle py-[2px]">
                지번
              </span>
              <span>{defaultAddress?.addressLine1 ?? ""}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 회원 탈퇴 안내 + 버튼 */}
      <div className="mx-auto mt-[72px] flex w-full max-w-[800px] items-center justify-between">
        <div className="flex w-full max-w-[640px] gap-8">
          <div className="flex w-[200px] items-center">
            <h2 className="text-subtitle-2 text-text-secondary">
              회원 탈퇴 안내
            </h2>
          </div>
          <div className="w-[1px] bg-border-default" />
          <div className="flex items-center">
            <div className="text-body-2 text-text-secondary">
              <p>탈퇴 처리 시, 포인트 / 쿠폰은 소멸되며 환불되지 않습니다.</p>
              <p>필요한 경우, 반드시 탈퇴 전에 문의 바랍니다.</p>
            </div>
          </div>
        </div>
        <div>{DeleteButton}</div>
      </div>
    </div>
  );
}
