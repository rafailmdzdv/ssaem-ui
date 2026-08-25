class GrammarRoutes {
  backend_url: string = process.env.BACKEND_API_URL ?? "";
  base_path: string = "grammars";

  list(): string {
    return this.buildUrl("");
  }

  all(): string {
    return this.buildUrl("all/");
  }

  buildUrl(path: string): string {
    return this.backend_url + "/" + this.base_path + "/" + path;
  }
}

export const grammarRoutes = new GrammarRoutes();
