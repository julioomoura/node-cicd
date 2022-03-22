import express, { response } from "express";
import axios from "axios";
import UserAndFollowers from "./userAndFollowers";
import { UserAndFollowersController } from "./userAndFollowers.controller";
import { GitHubClient } from "./github.client";

const app = express();
const request = axios;
const port = process.env.PORT || 3000;

const gitHubClient = new GitHubClient(request);
const userAndFollowersController = new UserAndFollowersController(gitHubClient);

app.get("/", async (req, res) => {
  await userAndFollowersController.getFollowersByUserName(req, res);
});

app.listen(3000, () => {
  console.log("App running on port:", port);
});

function sayHello(): string {
  const name = "Júlio";
  return `Hello ${name}`;
}
