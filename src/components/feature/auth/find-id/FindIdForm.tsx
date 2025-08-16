import { FindEmailSchema } from "@app/login/schema";
import { UseFormReturn } from "react-hook-form";
import Input from "@components/ui/input/Input";
import Button from "@components/ui/Button";

type FindIdFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  form: UseFormReturn<FindEmailSchema>;
  isPending: boolean;
};

const FindIdForm = ({ isPending, onSubmit, form }: FindIdFormProps) => {
  const {
    formState: { errors },
    register,
  } = form;

  return (
    <form className="mt-[32px] flex flex-col gap-[40px]" onSubmit={onSubmit}>
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
            placeholder="전화번호를 입력해주세요(01012345678)"
            className="h-[48px] w-full"
            id="phoneNumber"
            type="tel"
            {...register("phoneNumber")}
            isValid={errors.phoneNumber ? false : undefined}
            errorMessage={errors.phoneNumber?.message}
          />
        </div>
      </div>
      <Button disabled={isPending} className="w-full" type="submit" size="2xl">
        {isPending ? "찾는 중..." : "이메일 찾기"}
      </Button>
    </form>
  );
};
export default FindIdForm;
