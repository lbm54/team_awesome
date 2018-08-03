import { Router } from "express";
import Table from "../table";
import { insertLocation, getLocationId, getLocation } from "../utils/locations";
import { insertTags, getTags, updateTags } from "../utils/tags";
import { getComments } from "../utils/comments";

let router = Router();
let groupTable = new Table("Groups");

/**
 * get all groups
 */
router.get("/", async (req, res) => {
  try {
    let groups = await groupTable.getAll();

    for (var i = 0; i < groups.length; i++) {
      let tags = await getTags("groups", groups[i].id);
      groups[i]["tags"] = tags;
      groups[i]["location"] = await getLocation(groups[i].location_id);
      let comments = await getComments("group_id", groups[i].id);
      groups[i]["comments"] = comments;
    }
    res.json(groups);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/**
 * post a group
 * is expecting:
 * { name, location_name, address_line_one, address_line_two, city, state, zip,
 * regular_event_start_time, regular_event_end_time, regular_event_day_of_week,
 * host_user_id, blurb, thumbnail_image_link, details, tags  }
 * in the request's body
 *
 * for tags, I'm expecting:
 * {id, name}
 * for each new tag, don't pass in an id
 * if you pass in an id, I'm asusming it's an existing tag
 * however, you may want to have the user edit the tag right then,
 * so if you pass in a tag name along with a tag id, I'll go ahead and update the name
 */
router.post("/", async (req, res) => {
  try {
    //for the group's location
    let location_id;
    if (req.body.locationId) location_id = await req.body.locationId;
    else {
      location_id = await insertLocation(
        req.body.address_line_one,
        req.body.address_line_two,
        req.body.city,
        req.body.state,
        req.body.zip
      );
    }

    //inserting the group into the db
    let insertObject = {
      name: req.body.name,
      location_id,
      regular_event_start_time: req.body.regular_event_start_time,
      regular_event_end_time: req.body.regular_event_end_time,
      regular_event_day_of_week: req.body.regular_event_day_of_week,
      host_user_id: req.body.host_user_id,
      blurb: req.body.blurb,
      thumbnail_image_link: req.body.thumbnail_image_link,
      details: req.body.details
    };
    let idObj = await groupTable.insert(insertObject);

    //if there are tags, inserting them and attaching them to the group
    if (req.body.tags) {
      await insertTags("groups", idObj.id, req.body.tags);
    }
    res.status(201).json(idObj);
  } catch (err) {
    //duplicate entry
    if ((err.errno = 1062)) {
      res.send(400, "Group name has already been taken");
    } else res.statusMessage(400, err);
  }
});

router.post("/search", async (req, res) => {
  try {
    let searchInput = req.body.searchInput;
    let searchType = req.body.searchType;
    let query, groups;
    if (searchType === "name") {
      query = { name: searchInput };
      groups = await groupTable.find(query);
    } else if (searchType === "city") {
      let sql = `select groups.* from groups join locations on groups.location_id = locations.id where locations.city like "${searchInput}"`;
      groups = await groupTable.select(sql);
    } else {
      let sql = `select groups.* from groups_tags join groups on groups_tags.group_id = groups.id join tags on groups_tags.tag_id = tags.id where tags.name like "${searchInput}"`;
      groups = await groupTable.select(sql);
    }
    for (var i = 0; i < groups.length; i++) {
      let tags = await getTags("groups", groups[i].id);
      let comments = await getComments("group_id", groups[i].id);
      groups[i]["location"] = await getLocation(groups[i].location_id);
      groups[i]["tags"] = tags;
      groups[i]["comments"] = comments;
    }
    res.json(groups);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/**
 * get one group
 */
router.get("/:id", async (req, res) => {
  try {
    let foundgroup = await groupTable.getOne(req.params.id);
    foundgroup.location = await getLocation(foundgroup.location_id);
    let tags = await getTags("groups", foundgroup.id);
    let comments = await getComments("group_id", foundgroup.id);
    foundgroup["tags"] = tags;
    foundgroup["comments"] = comments;
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
    //if you pass in tags here, I will drop all tags on the events_tags junction table and just
    //add the ones passed in rather than figure out what's changed
    //if you don't want me to do that, then just don't pass in tags[] to this put method
    if (req.body.tags) {
      let tags = req.body.tags;
      await updateTags("groups", tags, req.params.id);
      delete req.body.tags;
    }

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
