class AuthRoutes {
  backend_url: string = process.env.BACKEND_API_URL ?? "";
  base_path: string = "auth";

  auth(): string {
    return this.buildUrl("");
  }

  refresh(): string {
    return this.buildUrl("refresh/");
  }

  logout(): string {
    return this.buildUrl("logout/");
  }

  buildUrl(path: string): string {
    return this.backend_url + "/" + this.base_path + "/" + path;
  }
}

export const authRoutes = new AuthRoutes();
