"use client";

import PhoneInput from "@components/ui/input/PhoneInput";
import { GenderToggle } from "@components/ui/tabs";
import Dialog from "@components/common/Dialog";
import Input from "@components/ui/input/Input";
import Logo from "@assets/logo/logo-gray.svg";
import Modal from "@components/common/Modal";
import { useRouter } from "next/navigation";
import Button from "@components/ui/Button";
import { cn } from "@utils/cn";

export default function RegisterModal() {
  const router = useRouter();

  return (
    <Modal
      onClose={() => {
        router.back();
      }}
      isModalOpen={true}
    >
      <Dialog
        className={cn(
          "flex w-[528px] flex-col",
          "rounded-2xl bg-bg-default px-[24px] py-[40px]",
          "shadow-[10px_10px_20px_0px_rgba(0,0,0,0.25)]",
        )}
      >
        <Logo className="self-center" aria-label="logo" />
        <div className="text-body-1 mt-8">회원가입</div>
        <form className="mt-6 flex h-[400px] flex-col gap-10 overflow-y-scroll">
          {/* 이름 */}
          <div className="flex flex-col gap-2">
            <div className="text-body-2 text-text-primary">이름</div>
            <Input
              className="h-[48px] w-full"
              placeholder="이름을 입력해주세요."
              type="text"
              id="name"
            />
          </div>
          {/* 닉네임 */}
          <div className="flex flex-col gap-2">
            <div className="text-body-2 text-text-primary">닉네임</div>
            <div className="flex gap-3">
              <Input
                className="h-[48px] w-[356px]"
                placeholder="닉네임을 입력해주세요."
                type="text"
              />
              <Button className="w-[112px]" theme={"light"} size={"2xl"}>
                중복 확인
              </Button>
            </div>
          </div>
          {/* 생년월일 */}
          <div className="flex flex-col gap-2">
            <div className="text-body-2 text-text-primary">생년월일</div>
            <Input
              placeholder="8자리 입력해주세요 (ex. 20001004)"
              className="h-[48px] w-full"
              type="text"
            />
          </div>
          {/* 성별 */}
          <div className="flex flex-col gap-2">
            <div className="text-body-2 text-text-primary">성별</div>
            <div className="flex gap-2">
              <GenderToggle
                className="h-[40px] w-[80px]"
                selected={true}
                label="남"
              />
              <GenderToggle
                className="h-[40px] w-[80px]"
                selected={false}
                label="여"
              />
            </div>
          </div>
          {/* 이메일 */}
          <div className="flex flex-col gap-4">
            <div className="text-body-2 text-text-primary">이메일</div>
            <div className="flex gap-3">
              <Input
                className="h-[48px] w-[356px]"
                placeholder="이메일을 입력해주세요."
                type="email"
              />
              <Button className="w-[112px]" theme={"light"} size={"2xl"}>
                인증코드전송
              </Button>
            </div>
            <div className="flex gap-3">
              <Input
                className="h-[48px] w-[356px]"
                placeholder="전송된 코드를 입력해주세요."
                type="text"
              />
              <Button className="w-[112px]" theme={"light"} size={"2xl"}>
                인증코드확인
              </Button>
            </div>
          </div>
          {/* 휴대전화 */}
          <div className="flex flex-col gap-2">
            <div className="text-body-2 text-text-primary">휴대전화</div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <PhoneInput values={["", "", ""]} onChange={() => {}} />
                <Button className="w-[112px]" theme={"light"} size={"2xl"}>
                  인증코드전송
                </Button>
              </div>
              <div className="flex gap-3">
                <Input
                  className="h-[48px] w-[356px]"
                  placeholder="전송된 코드를 입력해주세요."
                  type="text"
                />
                <Button className="w-[112px]" theme={"light"} size={"2xl"}>
                  인증코드확인
                </Button>
              </div>
            </div>
          </div>
          {/* 비밀번호 */}
          <div className="flex flex-col gap-2">
            <div className="text-body-2 text-text-primary">비밀번호</div>
            <Input
              className="h-[48px] w-full"
              placeholder="비밀번호를 입력해주세요."
              type="password"
            />
            <Input
              placeholder="비밀번호를 다시 입력해주세요."
              className="h-[48px] w-full"
              type="password"
            />
          </div>
          <Button className="w-full shrink-0" type="submit" size={"2xl"}>
            가입하기
          </Button>
        </form>
      </Dialog>
    </Modal>
  );
}
