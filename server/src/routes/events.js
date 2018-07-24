import { Router } from 'express';
import Table from '../table';
import { insertLocation, getLocationId } from '../utils/locations';
import { insertEvent } from '../utils/events';

let router = Router();
let eventTable = new Table('Events');

/**
 * get all events
 */
router.get('/', async (req, res) => {
    console.log(req.user);
    try {
        let events = await eventTable.getAll()
        res.json(events);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

/**
 * post a event
 * is expecting:
 * { startTime, endTime, startDate, endDate, locationName, addressLineOne, addressLineTwo, city, state, zip, name, thumbnailImageLink, tags[]  }
 * in the request's body
 * 
 * for tags, I'm expecting: 
 * {id, name}
 * for each new tag, don't pass in an id
 */
router.post('/', async (req, res) => {
    try {

        //for the event's location
        let location_id;
        if (req.body.locationName) {
            location_id = await getLocationId(req.body.locationName);
        } else {
            location_id = await insertLocation(req.body.addressLineOne, req.body.addressLineTwo, req.body.city, req.body.state, req.body.zip);
        }

        //inserting the event into the db
        let id = await insertEvent(req.body.startTime, req.body.endTime, req.body.startDate, req.body.endDate, location_id, req.body.name, req.body.thumbnailImageLink);

        //handling the event's tags
        if (req.body.tags) {
            await handleTags("events", id, req.body.tags);
        }
        res.status(201).json({id});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

/**
 * get one event
 */
router.get('/:id', async (req, res) => {
    try {
        let foundevent = await eventTable.getOne(req.params.id);
        res.json(foundevent);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

/**
 * update one event
 */
router.put('/:id', async (req, res) => {
    try {
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
router.delete('/:id', async (req, res) => {
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