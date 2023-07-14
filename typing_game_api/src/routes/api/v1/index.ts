import { Router } from "express";

import accounts from "./accounts";
import textGen from "./textGenerator";

const urlpatterns: Map<string, Router> = new Map<string, Router>([
  ["/accounts", accounts],
  ["/text", textGen],
]);

const v1 = Router();
urlpatterns.forEach((router: Router, prefix: string) => {
  v1.use(prefix, router);
});

export default v1;
