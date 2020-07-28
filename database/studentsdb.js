const mysql = require("mysql");
// connection configurations
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "students",
});

// connect to database
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected with mysqli database...");
});

//new student
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    return res.status(400).send({
      message: "Student's name cannot be empty",
    });
  } else if (!req.body.course) {
    return res.status(400).send({
      message: "Student's course cannot be empty",
    });
  } else if (!req.body.year) {
    return res.status(400).send({
      message: "Student's year cannot be empty",
    });
  }

  var params = req.body;
  console.log(params);

  connection.query("INSERT INTO students SET ? ", params, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    return res.send({
      data: results,
      message: "Student record created successfully!",
    });
  });
};

// Retrieve and return all todos from the database.
exports.findAll = (req, res) => {
  connection.query("select * from students", function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
};

//student{id}
exports.findOne = (req, res) => {
  connection.query(
    "select * from students where id=?",
    [req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
};

// Update student{id}
exports.update = (req, res) => {
  // Validate request
  if (!req.body.name) {
    return res.status(400).send({
      message: "Student's name cannot be empty",
    });
  } else if (!req.body.course) {
    return res.status(400).send({
      message: "Student's course cannot be empty",
    });
  } else if (!req.body.year) {
    return res.status(400).send({
      message: "Student's year cannot be empty",
    });
  }

  console.log(req.params.id);
  console.log(req.body.name);
  connection.query(
    "UPDATE `students` SET `name`=?,`course`=?,`year`=? where `id`=?",
    [req.body.name, req.body.course, req.body.year, req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
};

// Delete student{id}
exports.delete = (req, res) => {
  console.log(req.body);
  connection.query(
    "DELETE FROM `students` WHERE `id`=?",
    [req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      res.end("Student record deleted successfully");
    }
  );
};
