const multer = require("multer");
// const path = require("path");

const uploads = multer({ dest: "tmp/" });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.resolve("./tmp"));
//   },
//   filename: function (req, file, cb) {
//     const [filename, extension] = file.originalname.split(".");
//     cb(null, `${filename}.${extension}`);
//   },
// });

// const uploads = multer({ storage: storage });

module.exports = uploads;
