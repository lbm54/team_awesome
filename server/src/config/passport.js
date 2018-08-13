import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Table from "../table";
import { encode, decode } from "../utils/tokens";
import { Strategy as BearerStrategy } from "passport-http-bearer";
let GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
import { generateHash } from "../utils/security";

const GOOGLE_CLIENT_ID =
  "429384879280-ntm4h0qfmd4k9n58n8ogjpinmr3jgoap.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "ewvomrfZrJ1kEOCMLIrqqDHX";
const GOOGLE_CALLBACK_URL = "https://teamawesomeapp.herokuapp.com/api/auth/google/callback";
// const GOOGLE_CALLBACK_URL = "http://localhost:3000/api/auth/google/callback";


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

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  // Use the GoogleStrategy within Passport.
  //   Strategies in Passport require a `verify` function, which accept
  //   credentials (in this case, an accessToken, refreshToken, and Google
  //   profile), and invoke a callback with a user object.
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL
      },
      async function(accessToken, refreshToken, profile, done) {
        let email = profile.emails[0].value;
        if (accessToken && email) {
          let user;
          try {
            user = await usersTable.find({ email });

            //found the user already and setting token
            if (user && user[0]) {
              user = user[0];
              return done(null, {
                token: encode((await tokensTable.insert({ userid: user.id })).id)
              });
            } else {
              //need to send the user to the register page
              return done(null);

              // let hash = await generateHash(accessToken);
              // let newUser = {
              //   last_name: profile.name.familyName,
              //   first_name: profile.name.givenName,
              //   email,
              //   hash,
              //   username: profile.displayName
              // };
              // user = await usersTable.insert(newUser);
            }
          } catch (err) {
            console.log(err);
            return done(null, false, { message: "Invalid login" });
          }
        }
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
