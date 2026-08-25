class UserRoutes {
  backend_url: string = process.env.BACKEND_API_URL ?? "";
  base_path: string = "user";

  user(): string {
    return this.buildUrl("");
  }

  update(): string {
    return this.buildUrl("update/");
  }

  uploadAvatar(): string {
    return this.buildUrl("upload_avatar/");
  }

  buildUrl(path: string): string {
    return this.backend_url + "/" + this.base_path + "/" + path;
  }
}

export const userRoutes = new UserRoutes();
