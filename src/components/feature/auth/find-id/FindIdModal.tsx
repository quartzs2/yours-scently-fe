"use client";

import ThumbnailIcon from "@assets/icons/auth/find-email/icon-thumbnail.svg";
import { useActionState, useTransition, useEffect, useState } from "react";
import FindIdForm from "@components/feature/auth/find-id/FindIdForm";
import { findEmailSchema, FindEmailSchema } from "@app/login/schema";
import ModalCloseIcon from "@assets/icons/icon-modal-close.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import IconButton from "@components/ui/IconButton";
import { findEmail } from "@app/login/actions";
import Modal from "@components/common/Modal";
import Button from "@components/ui/Button";
import { useForm } from "react-hook-form";
import Icon from "@components/ui/Icon";

type FindIdModalProps = {
  onClose: () => void;
  isOpen: boolean;
};

const FindIdModal = ({ onClose, isOpen }: FindIdModalProps) => {
  const [state, formAction] = useActionState(findEmail, {
    errors: undefined,
    success: false,
    message: "",
  });
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FindEmailSchema>({
    defaultValues: {
      phoneNumber: "",
      name: "",
    },
    resolver: zodResolver(findEmailSchema),
    mode: "onChange",
  });

  const onSubmit = (data: FindEmailSchema) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    startTransition(() => formAction(formData));
  };

  useEffect(() => {
    if (state.success) {
      setIsSuccess(true);
      return;
    }

    if (state.errors) {
      Object.entries(state.errors).forEach(([key, value]) => {
        if (value) {
          form.setError(key as keyof FindEmailSchema, {
            message: value[0],
            type: "server",
          });
        }
      });
    } else if (!state.success && state.message) {
      setErrorMessage(state.message);
    }
  }, [state, form]);

  if (isSuccess) {
    return (
      <SuccessModal email={state.message} onClose={onClose} isOpen={isOpen} />
    );
  }

  return (
    <Modal isModalOpen={isOpen} onClose={onClose}>
      <div className="flex h-[504px] w-[374px] flex-col rounded-[12px] bg-bg-default p-[24px]">
        {/* 닫기 버튼 */}
        <div className="flex justify-end">
          <IconButton As={ModalCloseIcon} onClick={onClose} aria-label="닫기" />
        </div>
        {/* 타이틀 영역 */}
        <div className="mt-[16px] flex flex-col items-center gap-[8px]">
          <div className="flex flex-col items-center gap-[8px]">
            <Icon As={ThumbnailIcon} height={32} width={32} />
            <div className="text-body-1 text-text-primary">이메일 찾기</div>
          </div>
          <div className="text-body-2 flex-center h-[40px] w-[192px] text-center break-keep text-system-error">
            {errorMessage}
          </div>
        </div>
        {/* 폼 영역 */}
        <FindIdForm
          onSubmit={form.handleSubmit(onSubmit)}
          isPending={isPending}
          form={form}
        />
      </div>
    </Modal>
  );
};

type SuccessModalProps = {
  onClose: () => void;
  isOpen: boolean;
  email: string;
};

const SuccessModal = ({ onClose, isOpen, email }: SuccessModalProps) => {
  return (
    <Modal isModalOpen={isOpen} onClose={onClose}>
      <div className="flex h-[380px] w-[374px] flex-col rounded-[12px] bg-bg-default p-[24px]">
        {/* 닫기 버튼 */}
        <div className="flex justify-end">
          <IconButton As={ModalCloseIcon} onClick={onClose} aria-label="닫기" />
        </div>
        {/* 타이틀 영역 */}
        <div className="mt-[16px] flex flex-col items-center gap-[8px]">
          <div className="flex flex-col items-center gap-[8px]">
            <Icon As={ThumbnailIcon} height={32} width={32} />
            <div className="text-body-1 text-text-primary">이메일 찾기</div>
          </div>
          <div className="text-body-2 flex-center h-[40px] w-[192px] text-center break-keep text-text-primary">
            입력하신 정보와 일치하는 이메일입니다.
          </div>
        </div>
        {/* 이메일 표시 */}
        <div className="flex-center text-button-1 mt-[32px] h-[88px] w-full rounded-[4px] border border-border-default bg-bg-subtle text-text-primary">
          {email}
        </div>
        {/* 버튼 영역 */}
        <div className="mt-[40px] flex gap-2">
          <Button className="w-full" onClick={onClose} theme="light" size="2xl">
            로그인
          </Button>
          {/* TODO: 비밀번호 찾기 모달 추가 */}
          <Button className="w-full" size="2xl">
            비밀번호 찾기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FindIdModal;
