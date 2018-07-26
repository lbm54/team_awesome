import { Router } from "express";
const path = require('path');
const fs = require('fs');
let router = Router();

router.post("/", async (req, res) => {
  try {
    let imageFile = req.files.file;
    imageFile.mv(path.join(__dirname, `../../../client/images/${imageFile.name}`));
    res.status(201).json({name: imageFile.name});
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

export default router;
