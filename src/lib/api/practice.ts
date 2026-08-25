class PracticeRoutes {
  backend_url: string = process.env.BACKEND_API_URL ?? "";
  base_path: string = "practice";

  generate(): string {
    return this.buildUrl("generate/");
  }

  check(): string {
    return this.buildUrl("check/");
  }

  buildUrl(path: string): string {
    return this.backend_url + "/" + this.base_path + "/" + path;
  }
}

export const practiceRoutes = new PracticeRoutes();
