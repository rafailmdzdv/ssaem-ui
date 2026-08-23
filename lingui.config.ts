const linguiConfig = {
  catalogs: [
    {
      path: "src/locale/{locale}/messages",
      include: ["src"],
      exclude: ["**/node_modules/**"],
    },
  ],
  locales: ["ru", "en", "kr"],
};

export default linguiConfig;
