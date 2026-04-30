const config = {
  rules: {
    "header-pattern": [2, "always", /^MAS-[0-9]+: .+/],
  },
  plugins: [
    {
      rules: {
        "header-pattern": ({ header }: { header: string }) => {
          const valid = /^MAS-[0-9]+: .+$/.test(header);

          return [
            valid,
            valid
              ? ""
              : "❌ Invalid commit message format\n👉 Expected: MAS-123: your message",
          ];
        },
      },
    },
  ],
};
export default config;
