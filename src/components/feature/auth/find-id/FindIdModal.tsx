"use client";

import ThumbnailIcon from "@assets/icons/auth/find-email/icon-thumbnail.svg";
import ModalCloseIcon from "@assets/icons/icon-modal-close.svg";
import IconButton from "@components/ui/IconButton";
import Input from "@components/ui/input/Input";
import Modal from "@components/common/Modal";
import Button from "@components/ui/Button";
import { useForm } from "react-hook-form";
import Icon from "@components/ui/Icon";

type FindIdModalProps = {
  onClose: () => void;
  isOpen: boolean;
};

const FindIdModal = ({ onClose, isOpen }: FindIdModalProps) => {
  const {
    formState: { errors },
    register,
  } = useForm({
    defaultValues: {
      phone: "",
      name: "",
    },
  });

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
          <div className="text-body-2 flex-center h-[40px] w-[192px] text-system-error">
            {/* 에러 표시 */}
          </div>
        </div>
        {/* 폼 영역 */}
        <form className="mt-[32px] flex flex-col gap-[40px]">
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-2">
              <div className="text-body-2 flex items-center gap-[2px] text-text-primary">
                <span>이름</span>
                <span className="text-system-error">*</span>
              </div>
              <Input
                className="h-[48px] w-full"
                placeholder="이름을 입력해주세요."
                type="text"
                id="name"
                {...register("name")}
                isValid={errors.name ? false : undefined}
                errorMessage={errors.name?.message}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-body-2 flex items-center gap-[2px] text-text-primary">
                <span>휴대전화</span>
                <span className="text-system-error">*</span>
              </div>
              <Input
                className="h-[48px] w-full"
                placeholder="전화번호를 입력해주세요."
                type="tel"
                id="name"
                {...register("phone")}
                isValid={errors.name ? false : undefined}
                errorMessage={errors.name?.message}
              />
            </div>
          </div>
          <Button className="w-full" type="submit">
            이메일 찾기
          </Button>
        </form>
      </div>
    </Modal>
  );
};
export default FindIdModal;
