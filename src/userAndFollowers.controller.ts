import { Request, Response } from "express";
import { GitHubClient } from "./github.client";
import UserAndFollowers from "./userAndFollowers";

export class UserAndFollowersController {
  private gitHubClient: GitHubClient;
  constructor(gitHubClient: GitHubClient) {
    this.gitHubClient = gitHubClient;
  }

  async getFollowersByUserName(request: Request, response: Response) {
    const user = request.query["user"] || "julioomoura";

    const followers = await this.gitHubClient.getUserFollowers(`${user}`);

    const userAndFollowers: UserAndFollowers = {
      user: `${user}`,
      followersCount: followers,
    };

    response.json(userAndFollowers);
  }
}
