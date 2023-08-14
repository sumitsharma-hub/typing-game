import { Router } from "express";

import { AccountController } from "../../../controllers";
import SessionController from "../../../controllers/session";

const accountController = new AccountController();
const sessionController=new SessionController

const accounts = Router();
accounts.route("/login").post(accountController.login);
accounts.route("/register").post(accountController.register);
accounts.route("/detail").get(accountController.detail);
accounts.route("/logout").delete(accountController.logout);
// accounts.route("/api/sessions/oauth/google").get(accountController.googleOauthHandler);

export default accounts;
