import { Router } from "express";
import Table from "../table";
import { insertLocation, getLocationId } from "../utils/locations";
import { insertTags, getTags, updateTags } from "../utils/tags";
import { getComments } from '../utils/comments';

let router = Router();
let eventTable = new Table("Events");

/**
 * get all events
 */
router.get("/", async (req, res) => {
  try {
    let events = await eventTable.getAll();
    for (var i = 0; i < events.length; i++) {
      let tags = await getTags("events", events[i].id);
      let comments = await getComments("event_id", events[i].id);
      events[i]["tags"] = tags;
      events[i]["comments"] = comments;
    }
    res.json(events);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/**
 * post a event
 * is expecting:
 * { start_time, end_time, location_name, address_line_one, address_line_two, city, state, zip, name, thumbnail_image_link, tags[]  }
 * in the request's body
 *
 * for tags, I'm expecting an array of objects, where each object is of type:
 * {id, name}
 */
router.post("/", async (req, res) => {
  try {
    //for the event's location
    let location_id;
    if (req.body.location_name) location_id = await getLocationId(req.body.location_name);
    else {
      location_id = await insertLocation(
        req.body.address_line_one,
        req.body.address_line_two,
        req.body.city,
        req.body.state,
        req.body.zip
      );
    }

    //inserting the event into the db
    let insertObject = {
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      location_id,
      name: req.body.name,
      thumbnail_image_link: req.body.thumbnail_image_link
    };
    let id = (await eventTable.insert(insertObject)).id;

    //handling the event's tags
    if (req.body.tags) await insertTags("events", id, req.body.tags);

    res.status(201).json({ id });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/**
 * get one event
 */
router.get("/:id", async (req, res) => {
  try {
    let foundevent = await eventTable.getOne(req.params.id);
    let tags = await getTags("events", foundevent.id);
    let comments = await getComments("event_id", foundevent.id);
    foundevent["tags"] = tags;
    foundevent["comments"] = comments;
    res.json(foundevent);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/**
 * update one event
 */
router.put("/:id", async (req, res) => {
  try {
    //if you pass in tags here, I will drop all tags on the events_tags junction table and just
    //add the ones passed in rather than figure out what's changed
    //if you don't want me to do that, then just don't pass in tags[] to this put method
    if (req.body.tags) {
      let tags = req.body.tags;
      await updateTags("events", tags, req.params.id);
      delete req.body.tags;
    }

    // not concerned about getting a value back, just waiting on update to finish
    await eventTable.update(req.params.id, req.body);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/**
 * hard deleting a event
 * need to think about soft deleting
 */
router.delete("/:id", async (req, res) => {
  try {
    // not concerned about getting a value back, just waiting on delete to finish
    await eventTable.delete(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default router;
