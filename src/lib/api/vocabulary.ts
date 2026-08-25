class VocabularyRoutes {
  backend_url: string = process.env.BACKEND_API_URL ?? "";
  base_path: string = "vocabulary";

  list(): string {
    return this.buildUrl("");
  }

  add(): string {
    return this.buildUrl("add/");
  }

  buildUrl(path: string): string {
    return this.backend_url + "/" + this.base_path + "/" + path;
  }
}

export const vocabularyRoutes = new VocabularyRoutes();
