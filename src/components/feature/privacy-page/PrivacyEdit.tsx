// src/app/(mypage)/privacy/PrivacyEdit.tsx
"use client";
import FieldRow from "@components/feature/privacy-page/FieldRow";
import PhoneInput from "@components/ui/input/PhoneInput";
import { useEffect, useState, useMemo } from "react";
import { DeliveryAddress } from "@custom-types/user";
import Input from "@components/ui/input/Input";
import Button from "@components/ui/Button";
import { User } from "@custom-types/user";

type Props = {
  onSave: (
    nextUser: User,
    nextAddresses: DeliveryAddress[],
  ) => Promise<void> | void;
  SaveButton: (args: {
    onClick: () => void;
    disabled: boolean;
  }) => React.ReactNode;
  initialAddresses: DeliveryAddress[];
  initialUser: User;
};

const toKoreanGender = (g: User["gender"]) =>
  g === "MALE" ? "남성" : g === "FEMALE" ? "여성" : "기타";

const phoneToTriplet = (p: string): [string, string, string] => {
  const m = p.match(/^(\d{3})-(\d{3,4})-(\d{4})$/);
  return m ? ([m[1], m[2], m[3]] as [string, string, string]) : ["010", "", ""];
};
const tripletToPhone = (v: [string, string, string]) =>
  `${v[0]}-${v[1]}-${v[2]}`;

export default function PrivacyEdit({
  initialAddresses,
  initialUser,
  SaveButton,
  onSave,
}: Props) {
  const [user, setUser] = useState<User>(initialUser);
  const [addresses, setAddresses] =
    useState<DeliveryAddress[]>(initialAddresses);

  const [sendingCode, setSendingCode] = useState(false);
  const [code, setCode] = useState("");
  const [codeVerified, setCodeVerified] = useState(false);
  const [phoneValues, setPhoneValues] = useState<[string, string, string]>(
    phoneToTriplet(initialUser.phoneNumber),
  );
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const defaultAddress = useMemo(
    () => addresses.find((a) => a.isDefault) ?? addresses[0],
    [addresses],
  );

  useEffect(() => {
    setUser((prev) => ({ ...prev, phoneNumber: tripletToPhone(phoneValues) }));
  }, [phoneValues]);

  const handlePhoneChange = (newValues: string[]) => {
    setPhoneValues(newValues as [string, string, string]);
  };

  const isValid = useMemo(() => {
    const nn = user.nickname?.trim().length >= 1;
    const phoneOk = /^010-\d{3,4}-\d{4}$/.test(user.phoneNumber);
    return nn && phoneOk && codeVerified;
  }, [user.nickname, user.phoneNumber, codeVerified]);

  const sendCode = async () => {
    setSendingCode(true);
    setTimeout(() => setSendingCode(false), 700);
  };

  const verifyCode = () => {
    setCodeVerified(code === "000000");
  };

  const updateDefaultAddress = (patch: Partial<DeliveryAddress>) => {
    if (!defaultAddress) return;
    setAddresses((prev) =>
      prev.map((a) => (a.id === defaultAddress.id ? { ...a, ...patch } : a)),
    );
  };

  const handleSave = async () => {
    await onSave(user, addresses);
  };

  return (
    <div className="mx-auto max-w-[1340px] px-[80px] pt-[72px] pb-[120px] text-[14px] leading-[22px]">
      <div className="mb-[60px] flex items-start justify-between">
        <h2 className="text-subtitle-1 h-[48px] w-[160px] text-text-primary">
          개인 정보
        </h2>
        <div className="flex gap-2">
          {SaveButton({ onClick: handleSave, disabled: !isValid })}
        </div>
      </div>

      <FieldRow label="이름">
        <p>{user.name}</p>
      </FieldRow>

      <FieldRow label="닉네임">
        <div className="flex items-center gap-2">
          <Input
            onChange={(e) => setUser({ ...user, nickname: e.target.value })}
            className="h-[48px] w-[328px]"
            placeholder="닉네임을 입력하세요"
            value={user.nickname}
            type="text"
          />
          <Button
            className="h-[48px] w-[112px] border border-border-default text-text-secondary"
            theme="light"
          >
            중복확인
          </Button>
        </div>
      </FieldRow>

      <FieldRow className="mb-[1px]" label="생년월일">
        {user.birthDate}
      </FieldRow>
      <FieldRow className="mb-[1px]" label="성별">
        {toKoreanGender(user.gender)}
      </FieldRow>
      <FieldRow className="mb-[1px]" label="이메일">
        {user.email}
      </FieldRow>

      {/* 휴대전화 */}
      <FieldRow className="mb-[40px]" label="휴대전화">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <PhoneInput
              isValid={phoneValues.every((v) => v.length > 0)}
              onChange={handlePhoneChange}
              validMessage="유효한 번호입니다."
              values={phoneValues}
              errorMessage=""
            />
            <Button
              className="h-[48px] w-[112px] border border-border-default text-text-secondary"
              disabled={sendingCode}
              onClick={sendCode}
              theme="light"
            >
              {sendingCode ? "전송중..." : "인증코드전송"}
            </Button>
          </div>
          <div className="itmes-center flex gap-2">
            <Input
              className="h-[48px] w-[360px] border border-border-default text-text-secondary"
              onChange={(e) => setCode(e.target.value)}
              validMessage="인증코드를 입력하세요"
              isValid={code.length > 0}
              placeholder="인증코드"
              value={code}
              type="text"
            />
            <Button
              className="h-[48px] w-[112px] border border-border-default text-text-secondary"
              onClick={verifyCode}
              theme="light"
            >
              인증코드확인
            </Button>
            {codeVerified && (
              <span className="text-[12px] text-green-600">인증 완료</span>
            )}
          </div>
        </div>
      </FieldRow>

      {/* 기본 배송지 */}
      <FieldRow className="mb-[40px]" label="기본 배송지 ">
        <div className="flex w-full flex-col gap-8">
          <div className="flex items-center gap-2">
            <Input
              onChange={(e) =>
                updateDefaultAddress({ postalCode: e.target.value })
              }
              className="text-button-2 h-[48px] w-[208px] text-text-disabled"
              isValid={(defaultAddress?.postalCode ?? "").length > 0}
              value={defaultAddress?.postalCode ?? ""}
              validMessage="우편번호를 입력하세요"
              placeholder="우편번호"
              type="text"
            />
            <Button
              className="h-[48px] w-[112px] border border-border-default text-text-secondary"
              theme="light"
            >
              우편번호 찾기
            </Button>
          </div>
          <div className="flex flex-col gap-[8px]">
            <div className="mt-2 flex items-center gap-2">
              <span className="text-caption flex w-[64px] justify-center rounded-full border border-border-default bg-bg-subtle py-[2px]">
                도로명
              </span>
              <span>{defaultAddress?.addressLine1 ?? ""}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-caption flex w-[64px] justify-center rounded-full border border-border-default bg-bg-subtle py-[2px]">
                지번
              </span>
              <span>{defaultAddress?.addressLine1 ?? ""}</span>
            </div>
          </div>

          <Input
            onChange={(e) =>
              updateDefaultAddress({ addressLine2: e.target.value })
            }
            isValid={(defaultAddress?.addressLine2 ?? "").length > 0}
            value={defaultAddress?.addressLine2 ?? ""}
            className="h-[48px] w-[360px]"
            validMessage="상세주소를 입력하세요"
            placeholder="상세주소"
            type="text"
          />
          <span className="text-body-2 mt-2 text-text-disabled">
            신규배송지 정보는 마이페이지 내 배송지에 저장됩니다.
          </span>
        </div>
      </FieldRow>
      {/* 비밀번호 */}
      <FieldRow className="mb-[40px]" label="비밀번호">
        <div className="flex w-full flex-col gap-8">
          <div className="flex items-center gap-2">
            <Input
              className="text-button-2 h-[48px] w-[360px] text-text-disabled"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="새 비밀번호를 입력하세요"
              validMessage="비밀번호를 입력하세요."
              value={password}
              type="password"
              errorMessage=""
              isValid={true}
            />
            <p className="text-body-2 relative text-text-primary">
              새 비밀번호
              <span className="text-body-2 text-system-error">*</span>
              <span className="absolute left-20 font-semibold whitespace-nowrap text-text-primary">
                6~15자의 영문 대소문자, 숫자, 특수문자 포함
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Input
              className="text-button-2 h-[48px] w-[360px] text-text-disabled"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 다시 입력하세요."
              validMessage="새 비밀번호를 입력하세요."
              value={confirmPassword}
              type="password"
              errorMessage=""
              isValid={true}
            />
            <Button
              className="h-[48px] w-[112px] border border-border-default text-text-secondary"
              onClick={() => console.log("비밀번호 변경 클릭")}
              theme="light"
            >
              비밀번호 변경
            </Button>
          </div>
        </div>
      </FieldRow>
    </div>
  );
}
