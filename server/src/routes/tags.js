/**
 * probably never going to call these functions from the front-end
 */

import { Router } from 'express';
import Table from '../table';
import { insertTag } from '../utils/tags';

let router = Router();
let tagTable = new Table('Tags');

/**
 * get all tags
 */
router.get('/', async (req, res) => {
    console.log(req.user);
    try {
        let tags = await tagTable.getAll()
        res.json(tags);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

/**
 * post just one tag
 * is expecting:
 * { name }
 * in the request's body
 */
router.post('/', async (req, res) => {
    try {
        let id = await insertTag(req.body.name);
        res.status(201).json({id});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

/**
 * get one tag
 */
router.get('/:id', async (req, res) => {
    try {
        let foundtag = await tagTable.getOne(req.params.id);
        res.json(foundtag);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

/**
 * update one tag
 */
router.put('/:id', async (req, res) => {
    try {
        // not concerned about getting a value back, just waiting on update to finish
        await tagTable.update(req.params.id, req.body);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

/**
 * hard deleting a tag
 * need to think about soft deleting
 */
router.delete('/:id', async (req, res) => {
    try {
        // not concerned about getting a value back, just waiting on delete to finish
        await tagTable.delete(req.params.id);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

export default router;