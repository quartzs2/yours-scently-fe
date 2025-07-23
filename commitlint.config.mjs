const configuration = {
  plugins: [
    {
      rules: {
        "custom-header-pattern": ({ header }) => {
          const pattern = /^(\w+):\s(.+)\(SCENTLY-\d+\)$/;
          return [
            pattern.test(header),
            `커밋 메시지는 다음 패턴을 따라야 합니다: <type>: <subject>(SCENTLY-<number>) (예: "feat: add feature(SCENTLY-123)")`,
          ];
        },
      },
    },
  ],
  rules: {
    "custom-header-pattern": [2, "always"],
  },
  extends: ["@commitlint/config-conventional"],
};

export default configuration;
