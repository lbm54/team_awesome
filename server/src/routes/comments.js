import { Router } from 'express';
import Table from '../table';

let router = Router();
let commentTable = new Table('Comments');

/**
 * get all comments
 */
router.get('/', async (req, res) => {
    try {
        let comments = await commentTable.getAll()
        res.json(comments);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

/**
 * post a comment
 * is expecting:
 * { user_id, comment, event_id, group_id }
 * in the request's body
 */
router.post('/', async (req, res) => {
    try {
        let idObj = await commentTable.insert(req.body);
        res.status(201).json(idObj);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

/**
 * get one comment
 */
router.get('/:id', async (req, res) => {
    try {
        let foundcomment = await commentTable.getOne(req.params.id);
        res.json(foundcomment);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

/**
 * update one comment
 */
router.put('/:id', async (req, res) => {
    try {
        // not concerned about getting a value back, just waiting on update to finish
        await commentTable.update(req.params.id, req.body);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

/**
 * hard deleting a comment
 * need to think about soft deleting
 */
router.delete('/:id', async (req, res) => {
    try {
        // not concerned about getting a value back, just waiting on delete to finish
        await commentTable.delete(req.params.id);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

export default router;