import { Router } from 'express';
import { charge } from '../utils/charge';


router.post('/', (req, res) => {
    let tokenID = req.body.token.id;
    let amount = req.body.token.amount;
    charge(tokenID, amount)
        .then((success) => {
            res.status(200).json( {message: 'success'});
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

export default router;