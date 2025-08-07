"use client";
import { mockAddressData, mockUser } from "./mocks/userMockData";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[1340px] px-4 pt-[72px] pb-[120px] text-[14px] leading-[22px]">
      {/* 타이틀 & 수정 버튼 */}
      <div className="mb-[60px] flex items-start justify-between">
        <h2 className="text-subtitle-1 h-[48px] w-[160px] text-text-primary">
          개인 정보
        </h2>
        <button className="text-button-1 h-[40px] rounded-[4px] bg-gray-600 px-6 py-[10px] text-white">
          수정하기
        </button>
      </div>

      {/* 개인정보 내용 */}
      <div className="mx-auto flex w-full max-w-[800px] gap-8">
        {/* 라벨 필드 */}
        <div className="text-subtitle-2 w-[200px] text-text-primary">
          <p className="flex h-[80px] items-center">이름</p>
          <p className="flex h-[80px] items-center">닉네임</p>
          <p className="flex h-[80px] items-center">생년월일</p>
          <p className="flex h-[80px] items-center">성별</p>
          <p className="flex h-[80px] items-center">이메일</p>
          <p className="flex h-[80px] items-center">휴대전화</p>
          <p className="flex h-[80px] items-center">기본 배송지</p>
        </div>

        {/* 구분선 */}
        <div className="h-[560px] w-[1px] bg-border-default" />

        {/* 데이터 필드 - 이 부분은 실제 데이터가 들어가는 부분*/}
        <div className="text-body-1 flex-1 pl-[40px] text-text-primary">
          <p className="flex h-[80px] items-center">{mockUser.name}</p>
          <p className="flex h-[80px] items-center">{mockUser.nickname}</p>
          <p className="flex h-[80px] items-center">{mockUser.birthDate}</p>
          <p className="flex h-[80px] items-center">{mockUser.gender}</p>
          <p className="flex h-[80px] items-center">{mockUser.email}</p>
          <p className="flex h-[80px] items-center">{mockUser.phoneNumber}</p>
          <div className="flex h-[80px] flex-col justify-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-caption rounded-full border border-border-default bg-bg-subtle px-[6px] py-[2px] text-text-primary">
                도로명
              </span>
              <span>{mockAddressData.address_line1}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-caption rounded-full border border-border-default bg-bg-subtle px-[6px] py-[2px] text-text-primary">
                지번
              </span>
              <span>{mockAddressData.address_line2}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 회원 탈퇴 안내 영역 */}
      <div className="mx-auto mt-[72px] flex w-full max-w-[800px] items-center justify-between">
        {/* 설명 영역 */}
        <div className="flex w-full max-w-[640px] gap-8">
          {/* 라벨 */}
          <div className="flex w-[200px] items-center">
            <h2 className="text-subtitle-2 text-text-secondary">
              회원 탈퇴 안내
            </h2>
          </div>
          {/* 구분선 */}
          <div className="w-[1px] bg-border-default" />
          {/* 안내 문구 */}
          <div className="flex items-center">
            <p className="text-body-2 leading-[22px] text-text-secondary">
              탈퇴 처리 시, 포인트 / 쿠폰은 소멸되며 환불되지 않습니다. <br />
              필요한 경우, 반드시 탈퇴 전에 문의 바랍니다.
            </p>
          </div>
        </div>

        {/* 회원 탈퇴 버튼 */}
        <button className="text-button-1 h-[40px] shrink-0 rounded-[4px] border border-gray-600 px-6 py-[10px] text-gray-600">
          회원 탈퇴하기
        </button>
      </div>
    </div>
  );
}
