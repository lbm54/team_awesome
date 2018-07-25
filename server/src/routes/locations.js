import { Router } from "express";
import Table from "../table";

let router = Router();
let locationTable = new Table("Locations");

/**
 * get all locations
 */
router.get("/", async (req, res) => {
  try {
    let locations = await locationTable.getAll();
    res.json(locations);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/**
 * post a location
 * is expecting:
 * { address_line_one, address_line_two, city, state, zip, name }
 * in the request's body
 */
router.post("/", async (req, res) => {
  try {
    let idObj = await locationTable.insert(req.body);
    res.status(201).json(idObj);
  } catch (err) {
    console.log(err);
    if (err.errno === 1062) {
      res.status(500).send("You tried to post a duplicate location");
    } else res.sendStatus(500);
  }
});

/**
 * get one location
 */
router.get("/:id", async (req, res) => {
  try {
    let foundlocation = await locationTable.getOne(req.params.id);
    res.json(foundlocation);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/**
 * update one location
 */
router.put("/:id", async (req, res) => {
  try {
    // not concerned about getting a value back, just waiting on update to finish
    await locationTable.update(req.params.id, req.body);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/**
 * hard deleting a location
 * need to think about soft deleting
 */
router.delete("/:id", async (req, res) => {
  try {
    // not concerned about getting a value back, just waiting on delete to finish
    await locationTable.delete(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default router;
