import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Table from "../table";
import { encode, decode } from "../utils/tokens";
import { Strategy as BearerStrategy } from "passport-http-bearer";
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const GOOGLE_CLIENT_ID = "429384879280-ntm4h0qfmd4k9n58n8ogjpinmr3jgoap.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "ewvomrfZrJ1kEOCMLIrqqDHX";

let usersTable = new Table("users");
let tokensTable = new Table("Tokens");
import { checkPassword } from "../utils/security";

async function configurePassport(app) {
  let configurationObject = {
    usernameField: "email",
    passwordField: "password",
    sessions: false
  };
  passport.use(
    new LocalStrategy(configurationObject, async (email, password, done) => {
      try {
        let user = (await usersTable.find({ email }))[0];
        if (user && user.hash) {
          let matches = await checkPassword(password, user.hash);
          if (matches) {
            return done(null, {
              token: encode((await tokensTable.insert({ userid: user.id })).id)
            });
          } else return done(null, false, { message: "Invalid login" });
        }
      } catch (err) {
        throw err;
      }
    })
  );

  // Use the GoogleStrategy within Passport.
  //   Strategies in Passport require a `verify` function, which accept
  //   credentials (in this case, an accessToken, refreshToken, and Google
  //   profile), and invoke a callback with a user object.
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        console.log('access token');
        console.log(accessToken);
        console.log('refresh token');
        console.log(refreshToken);
        console.log('profile');
        console.log(profile);
        console.log(done);
        // User.findOrCreate({ googleId: profile.id }, function(err, user) {
        //   return done(err, user);
        // });
      }
    )
  );

  passport.use(
    new BearerStrategy((token, done) => {
      let tokenId = decode(token); //will give you 1, 2, 3, etc.
      if (!tokenId) {
        return done(null, false, { message: "Invalid token" });
      }
      tokensTable
        .getOne(tokenId)
        .then(tokenRecord => {
          return usersTable.getOne(tokenRecord.userid);
        })
        .then(user => {
          if (user) {
            delete user.password;
            return done(null, user); //after this, req.user is SET
          } else {
            return done(null, false, { message: "Invalid token" });
          }
        })
        .catch(err => {
          return done(err);
        });
    })
  );

  app.use(passport.initialize()); //pass in the express application; turn on passport and use it
}

export default configurePassport;
