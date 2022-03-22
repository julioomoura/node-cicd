import { NextFunction, Request, Response } from "express";
import { GitHubClient } from "./github.client";
import UserAndFollowers from "./userAndFollowers";

export class UserAndFollowersController {
  private gitHubClient: GitHubClient;
  constructor(gitHubClient: GitHubClient) {
    this.gitHubClient = gitHubClient;
  }

  async getFollowersByUserName(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const user = request.query["user"] || "julioomoura";

    let followers;

    await this.gitHubClient.getUserFollowers(`${user}`, next).then((res) => {
      followers = res;
    });
    const userAndFollowers: UserAndFollowers = {
      user: `${user}`,
      followersCount: followers,
    };

    response.json(userAndFollowers);
  }
}
