const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config();

const PORT = process.env.PORT || 4040;
const uriDb = process.env.DB_HOST;
mongoose.set("strictQuery", false);

const connection = mongoose.connect(uriDb);

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
