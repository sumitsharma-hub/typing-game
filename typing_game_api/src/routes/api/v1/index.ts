import { Router } from "express";

import accounts from "./accounts";
import generator from "./text-generator";
import googleLogin from "./google-login";
import userRecord from "./user-record";


const urlpatterns: Map<string, Router> = new Map<string, Router>([
  ["/accounts", accounts],
  ["/generate", generator],
  ["/api", googleLogin],
  ["/record",userRecord]
]);

const v1 = Router();
urlpatterns.forEach((router: Router, prefix: string) => {
  v1.use(prefix, router);
});

export default v1;
