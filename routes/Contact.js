const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");
//test routing
router.get("/hello", (req, res) => {
  res.send("hello routing");
});

// @POST method
// @desc post a contact
// @Public
//path : http://localhost:5000/api/contact/name

router.post("/name", async (req, res) => {
  try {
    // create a new contact with the model contact
    const newContact = new Contact(req.body);

    //test if user has an email
    if (!req.body.email) {
      res.status(400).send({ message: "email is required check again" });
      return;
    }
    // test 2 : if the email already exist => email should be unique

    const user = await Contact.findOne({ email: req.body.email });

    if (user) {
      res
        .status(400)
        .send({ message: "user already exist email should be unique" });
      return;
    }
    //save the contact
    const response = await newContact.save();

    res.send({ response: response, message: "user is saved" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "can not save it" });
  }
});
// @GET method
// @desc get all contacts
// @Public
//path : http://localhost:5000/api/contact
router.get("/", async (req, res) => {
  try {
    const result = await Contact.find();
    res.send({ response: result, message: "geting contacts successfully" });
  } catch (error) {
    res.status(400).send({ message: "can not get contacts" });
  }
});
// @GET method
// @desc Get one contact by id
// @Public
//path http://localhost:5000/api/contact/id
router.get("/:id", async (req, res) => {
  try {
    const contactid = await Contact.findOne({ _id: req.params.id });
    res.send({ response: contactid, message: "user found" });
  } catch (error) {
    res.status(400).send({ message: "there is no contact with this id" });
  }
});
// @DELETE method
// @desc Get one contact by id
// @Public
//path : http://localhost:5000/api/contact/id
router.delete("/:id", async (req, res) => {
  try {
    const result = await Contact.deleteOne({ _id: req.params.id });
    console.log(result);
    res.send({ response: "contact deleted" });
  } catch (error) {
    res.status(400).send({ message: "there is no contact with this id" });
  }
});
//@method PUT
//@desc update a contact by id
// @PATH  http://localhost:5000/api/contact/:id
// @Params id Body
router.put("/:id", async (req, res) => {
  try {
    const result = await Contact.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    console.log(result);
    result.nModified
      ? res.send({ message: "user updated" })
      : res.send({ message: "contact already updated" });
  } catch (error) {
    res.status(400).send({ message: "there is no user with this id" });
  }
});
module.exports = router;
