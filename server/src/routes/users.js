import { Router } from "express";
import { tokenMiddleware, isLoggedIn } from "../middleware/auth.mw";
import { generateHash } from "../utils/security";
import Table from "../table";
import { insertLocation, getLocation, updateLocation } from "../utils/locations";

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
    let groupsUsersTable = new Table("groups_users");
    let eventsUsersTable = new Table("events_users");
    for (var i = 0; i < users.length; i++) {
      let groupsUsers = await groupsUsersTable.find({ user_id: users[i].id });
      users[i]["groups"] = groupsUsers;
      let eventsUsers = await eventsUsersTable.find({ user_id: users[i].id });
      users[i]["events"] = eventsUsers;
    }
    res.json(users);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/**
 * register a user
 * is expecting:
 * { email, password, address_line_one, address_line_two, city, state, zip, bio, first_name, last_name, middle_initial, profile_picture_link, telephone, username }
 * in the request's body
 */
router.post("/", async (req, res) => {
  try {
    let address_location_id = await insertLocation(
      req.body.address_line_one,
      req.body.address_line_two,
      req.body.city,
      req.body.state,
      req.body.zip
    );

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

//adding a user to a group
//expecting {user_id, group_id}
router.post("/addToGroup", async (req, res) => {
  try {
    let groupsUsersTable = new Table("groups_users");
    let idObj = await groupsUsersTable.insert(req.body);
    res.status(201).json(idObj);
  } catch (err) {
    console.log(err);
    if (err.errno === 1062) {
      res.status(500).send("This user has already been assigned to this group");
    } else res.status(500).send(err);
  }
});

//adding a user to an event
//expecting {user_id, event_id}
router.post("/addToEvent", async (req, res) => {
  try {
    let eventsUsersTable = new Table("events_users");
    let idObj = await eventsUsersTable.insert(req.body);
    res.status(201).json(idObj);
  } catch (err) {
    console.log(err);
    if (err.errno === 1062) {
      res.status(500).send("This user has already been assigned to this event");
    } else res.status(500).send(err);
  }
});

//remove a user from a group
//expecting {user_id, group_id}
router.post("/removeFromGroup", async (req, res) => {
  try {
    let groupsUsersTable = new Table("groups_users");
    await groupsUsersTable.deleteCompoundPrimaryKey(
      "group_id",
      "user_id",
      req.body.group_id,
      req.body.user_id
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    if (err.errno === 1062) {
      res.status(500).send("This user has already been assigned to this group");
    } else res.status(500).send(err);
  }
});

//remove a user from an event
//expecting {user_id, event_id}
router.post("/removeFromEvent", async (req, res) => {
  try {
    let eventsUsersTable = new Table("events_users");
    await eventsUsersTable.deleteCompoundPrimaryKey(
      "event_id",
      "user_id",
      req.body.event_id,
      req.body.user_id
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    if (err.errno === 1062) {
      res.status(500).send("This user has already been assigned to this event");
    } else res.status(500).send(err);
  }
});

/**
 * get one user
 */
router.get("/:id", async (req, res) => {
  try {
    let founduser = await userTable.getOne(req.params.id);
    let groupsUsersSql = `select g.* from groups g join groups_users gu on g.id = gu.group_id join users u on u.id = gu.user_id where u.id = ${
      founduser.id
    }`;
    let groupsUsers = await userTable.select(groupsUsersSql);
    founduser["groups"] = groupsUsers;
    let eventsUsersSql = `select e.* from events e join events_users eu on e.id = eu.event_id join users u on u.id = eu.user_id where u.id = ${
      founduser.id
    }`;
    let eventsUsers = await userTable.select(eventsUsersSql);
    founduser["events"] = eventsUsers;
    founduser["location"] = await getLocation(founduser.address_location_id);
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
    if (req.body.location) {
      updateLocation(req.body.location);
      delete req.body.location;
    }
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
