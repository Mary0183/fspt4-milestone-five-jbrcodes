var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET student list
router.get("/", async (req, res, next) => {
  try {
    let results = await db("SELECT * FROM students");
    res.send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET one student
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let sql = `
    SELECT *
    FROM students
    WHERE id = ${id}
    `;
    let results = await db(sql);
    if (results.data.length === 1) {
      res.send(results.data[0]);
    } else {
      res.status(404).send({ error: "Not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message }); //500 Internal Server Error
  }
});

// INSERT a new student into the DB
router.post("/", async (req, res) => {
  // The request's body is available in req.body
  let { firstname, lastname } = req.body;
  let sql = `
        INSERT INTO students (firstname, lastname)
        VALUES ('${firstname}', '${lastname}')
    `;
  try {
    let results = await db(sql);
    // Return *all* students
    results = await db("SELECT * FROM students");
    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// DELETE a student from the DB
router.delete("/:id", function(req, res, next) {
  //your code here
});

module.exports = router;
