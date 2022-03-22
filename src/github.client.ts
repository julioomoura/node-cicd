import { AxiosStatic } from "axios";
import { NextFunction } from "express";

export class GitHubClient {
  private request: AxiosStatic;
  constructor(request: AxiosStatic) {
    this.request = request;
  }

  async getUserFollowers(user: string, next: NextFunction): Promise<number> {
    let followers;
    await this.request
      .get(`https://api.github.com/users/${user}`)
      .then((response) => {
        followers = response.data.followers;
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          next(`User ${user} not found`);
        }
      });

    return Number(followers);
  }
}
