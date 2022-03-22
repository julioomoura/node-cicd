import { AxiosStatic } from "axios";

export class GitHubClient {
  private request: AxiosStatic;
  constructor(request: AxiosStatic) {
    this.request = request;
  }

  async getUserFollowers(user: string): Promise<number> {
    let followers;
    await this.request
      .get(`https://api.github.com/users/${user}`)
      .then((response) => {
        followers = response.data.followers;
      });

    return Number(followers);
  }
}
