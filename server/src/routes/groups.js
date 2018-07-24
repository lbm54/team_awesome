import { Router } from "express";
import Table from "../table";
import { insertLocation, getLocationId } from "../utils/locations";
import { handleTags } from "../utils/tags";

let router = Router();
let groupTable = new Table("Groups");

/**
 * get all groups
 */
router.get("/", async (req, res) => {
  console.log(req.user);
  try {
    let groups = await groupTable.getAll();
    res.json(groups);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/**
 * post a group
 * is expecting:
 * { name, locationName, addressLineOne, addressLineTwo, city, state, zip,
 * regularEventStartTime, regularEventEndTime, regularEventDayOfWeek,
 * hostUserId, blurb, thumbnailImageLink, details, tags  }
 * in the request's body
 *
 * for tags, I'm expecting:
 * {id, name}
 * for each new tag, don't pass in an id
 */
router.post("/", async (req, res) => {
  try {
    //for the group's location
    let location_id;
    if (req.body.locationName) {
      location_id = await getLocationId(req.body.locationName);
    } else {
      location_id = await insertLocation(
        req.body.addressLineOne,
        req.body.addressLineTwo,
        req.body.city,
        req.body.state,
        req.body.zip
      );
    }

    //inserting the group into the db
    let insertObject = {
      name: req.body.name,
      location_id,
      regular_event_start_time: req.body.regularEventStartTime,
      regular_event_end_time: req.body.regularEventEndTime,
      regular_event_day_of_week: req.body.regularEventDayOfWeek,
      host_user_id: req.body.hostUserId,
      blurb: req.body.blurb,
      thumbnail_image_link: req.body.thumbnailImageLink,
      details: req.body.details
    };
    let idObj = await groupTable.insert(insertObject);

    //if there are tags, inserting them and attaching them to the group
    if (req.body.tags) {
      await handleTags("groups", idObj.id, req.body.tags);
    }
    res.status(201).json(idObj);
  } catch (err) {
    //duplicate entry
    if ((err.errno = 1062)) {
      res.send(400, "Group name has already been taken");
    } else res.statusMessage(400, err);
  }
});

/**
 * get one group
 */
router.get("/:id", async (req, res) => {
  try {
    let foundgroup = await groupTable.getOne(req.params.id);
    res.json(foundgroup);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/**
 * update one group
 */
router.put("/:id", async (req, res) => {
  try {
    // not concerned about getting a value back, just waiting on update to finish
    await groupTable.update(req.params.id, req.body);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/**
 * hard deleting a group
 * need to think about soft deleting
 */
router.delete("/:id", async (req, res) => {
  try {
    // not concerned about getting a value back, just waiting on delete to finish
    await groupTable.delete(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default router;
