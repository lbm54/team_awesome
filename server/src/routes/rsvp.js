import { Router } from "express";
import { sendEmail } from "../utils/mail";

let router = Router();

router.post("/", async (req, res, next) => {
  try {
    let messageBody = `Name: ${req.body.name}
                        Email: ${req.body.email}
                        Message: ${req.body.message}`;
    let response = await sendEmail(
      "lee.b.martin@gmail.com",
      "lee.b.martin@gmail.com",
      "New Contact Form Submission",
      messageBody
    );
    res.status(201).json({message: 'ok'}); //201 is 'accepted' we have receive something and confirming
  } catch (err) {
    console.log(err);
  }
  //to email is *our* email as this is a contact form
});

export default router;
