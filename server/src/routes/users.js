import { Router } from "express";
import { tokenMiddleware, isLoggedIn } from "../middleware/auth.mw";
import { generateHash } from "../utils/security";
import Table from "../table";
import { insertLocation, getLocationId } from "../utils/locations";

let router = Router();
let userTable = new Table("Users");

router.get("/me", tokenMiddleware, isLoggedIn, (req, res) => {
  res.json(req.user);
});

/**
 * get all users
 */
router.get("/", async (req, res) => {
  try {
    let users = await userTable.getAll();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/**
 * register a user
 * is expecting:
 * { email, password, location_name, address_line_one, address_line_two, city, state, zip, new_location_name, bio, first_name, last_name, middle_initial, profile_picture_link, telephone, username }
 * in the request's body
 */
router.post("/", async (req, res) => {
  try {
    let address_location_id;
    if (req.body.location_name) {
      address_location_id = await getLocationId(req.body.location_name);
    } else {
      address_location_id = await insertLocation(
        req.body.address_line_one,
        req.body.address_line_two,
        req.body.city,
        req.body.state,
        req.body.zip,
        req.body.new_location_name
      );
    }

    let hash = await generateHash(req.body.password);
    let insertObject = {
      email: req.body.email,
      hash,
      address_location_id,
      bio: req.body.bio,
      first_name: req.body.first_name,
      middle_initial: req.body.middle_initial,
      last_name: req.body.last_name,
      profile_picture_link: req.body.profile_picture_link,
      telephone: req.body.telephone,
      username: req.body.username
    };
    let idObj = await userTable.insert(insertObject);
    res.status(201).json(idObj);
  } catch (err) {
    console.log(err);
    if (err.errno === 1062) {
      res.status(500).send("Emails have to be unique!");
    } else res.status(500).send(err);
  }
});

/**
 * get one user
 */
router.get("/:id", async (req, res) => {
  try {
    let founduser = await userTable.getOne(req.params.id);
    res.json(founduser);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/**
 * update one user
 */
router.put("/:id", async (req, res) => {
  try {
    // not concerned about getting a value back, just waiting on update to finish
    await userTable.update(req.params.id, req.body);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/**
 * hard deleting a user
 * need to think about soft deleting
 */
router.delete("/:id", async (req, res) => {
  try {
    // not concerned about getting a value back, just waiting on delete to finish
    await userTable.delete(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default router;
