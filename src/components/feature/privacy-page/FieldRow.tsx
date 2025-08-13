"use client";

type FieldRowProps = {
  children: React.ReactNode;
  label: React.ReactNode;
  className?: string;
};

export default function FieldRow({
  className = "",
  children,
  label,
}: FieldRowProps) {
  return (
    <div className="mx-auto flex w-full max-w-[800px] gap-8">
      {/* 라벨 */}
      <div className="text-subtitle-2 w-[200px] text-text-primary">
        <div className="flex h-[80px] items-center">{label}</div>
      </div>
      {/* 구분선 */}
      <div className="w-[1px] self-stretch bg-border-default" />
      {/* 콘텐츠 */}
      <div
        className={`text-body-1 flex flex-1 items-center pb-5 pl-[40px] text-text-primary ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
