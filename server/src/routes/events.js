import { Router } from "express";
import Table from "../table";
import { insertLocation, getLocationId, getLocation, updateLocation } from "../utils/locations";
import { insertTags, getTags, updateTags } from "../utils/tags";
import { getComments } from "../utils/comments";

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
      events[i]["location"] = await getLocation(events[i].location_id);
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
 * { start_time, end_time, location_name, address_line_one, address_line_two, city, state, zip, name, thumbnail_image_link, details, blurb, tags[], has_cover_charge, cover_charge_amount  }
 * in the request's body
 *
 * for tags, I'm expecting an array of objects, where each object is of type:
 * {id, name}
 */
router.post("/", async (req, res) => {
  try {
    //for the event's location
    let location_id = await insertLocation(
      req.body.address_line_one,
      req.body.address_line_two,
      req.body.city,
      req.body.state,
      req.body.zip,
      req.body.lat,
      req.body.lng
    );

    //inserting the event into the db
    let insertObject = {
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      location_id,
      name: req.body.name,
      blurb: req.body.blurb,
      details: req.body.details,
      has_cover_charge: req.body.has_cover_charge,
      thumbnail_image_link: req.body.thumbnail_image_link,
      cover_charge_amount: req.body.cover_charge_amount,
      host_user_id: req.body.host_user_id
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
    foundevent.location = await getLocation(foundevent.location_id);
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

router.post("/search", async (req, res) => {
  try {
    let searchInput = req.body.searchInput;
    let searchType = req.body.searchType;
    let query, events;
    if (searchType === "name") {
      query = { name: searchInput };
      events = await eventTable.find(query);
    } else if (searchType === "city") {
      let sql = `select events.* from events join locations on events.location_id = locations.id where locations.city like "${searchInput}"`;
      events = await eventTable.select(sql);
    } else {
      let sql = `select events.* from events_tags join events on events_tags.event_id = events.id join tags on events_tags.tag_id = tags.id where tags.name like "${searchInput}"`;
      events = await eventTable.select(sql);
    }
    for (var i = 0; i < events.length; i++) {
      let tags = await getTags("events", events[i].id);
      let comments = await getComments("event_id", events[i].id);
      events[i]["location"] = await getLocation(events[i].location_id);
      events[i]["tags"] = tags;
      events[i]["comments"] = comments;
    }
    res.json(events);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/search/city", async (req, res) => {
  try {
    let searchInput = req.body.searchInput;
    let query = { city: searchInput };
    let events = await eventTable.find(query);
    for (var i = 0; i < events.length; i++) {
      let tags = await getTags("events", events[i].id);
      let comments = await getComments("event_id", events[i].id);
      events[i]["location"] = await getLocation(events[i].location_id);
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
 * update one event
 */
router.put("/:id", async (req, res) => {
  try {
    //if you pass in tags here, I will drop all tags on the events_tags junction table and just
    //add the ones passed in rather than figure out what's changed
    //if you don't want me to do that, then just don't pass in tags[] to this put method
    console.log(req.body);
    if (req.body.tags) {
      let tags = req.body.tags;
      await updateTags("events", tags, req.params.id);
      delete req.body.tags;
    }
    if (req.body.location) {
      updateLocation(req.body.location);
      delete req.body.location;
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
