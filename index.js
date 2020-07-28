const express = require("express");
const bodyParser = require("body-parser");

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

//Homepage route
app.get("/", (req, res) => {
  res.json({ message: "Students CRUD Api" });
});

//studentss API Routes
require("./routes/students_routes")(app);

// listen for requests
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
