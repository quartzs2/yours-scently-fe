import perfectionist from "eslint-plugin-perfectionist";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  perfectionist.configs["recommended-line-length"],
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn", // 에러 대신 경고로 설정
        {
          argsIgnorePattern: "^_", // _로 시작하는 매개변수는 미사용 허용
          varsIgnorePattern: "^_", // _로 시작하는 변수는 미사용 허용
        },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off", // 모듈 경계 타입 명시 강제 안함
      "@typescript-eslint/explicit-function-return-type": "off", // 함수 리턴 타입 명시 강제 안함
      "@typescript-eslint/no-explicit-any": "warn", // any 타입 사용시 경고만 (에러 아님)
      "no-duplicate-imports": "warn", // 중복 import 경고
      "no-unused-vars": "off", // JavaScript 미사용 변수 규칙 비활성화 (TypeScript가 처리),
      "prefer-const": "warn", // 재할당하지 않는 변수는 const 사용 권장 (경고만)
      "no-debugger": "warn", // debugger 문 사용시 경고 (에러 아님)
      "no-console": "warn", // console.log 사용시 경고 (개발 중에는 필요할 수 있음)
      "no-var": "error", // var 키워드 사용 금지 (let, const만 사용)
    },
  },
];

export default eslintConfig;
