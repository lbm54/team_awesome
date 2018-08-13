import { Router } from "express";
import passport from "passport";
import { encode } from "../utils/tokens";

let router = Router();

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, token, info) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    } else if (!token) {
      return res.status(401).json(info);
    } else {
      return res.status(201).json(token);
    }
  })(req, res, next);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback", (req, res, next) => {
  passport.authenticate(
    "google",
    {
      successRedirect: "/login/google",
      failureRedirect: "/users/register"
    },
    (err, token, info) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      } else if (!token) {
        return res.status(201).redirect(`/login/google/-1`);
      } else {
        return res.status(201).redirect(`/login/google/${token.token}`);
      }
    }
  )(req, res, next);
});

export default router;
