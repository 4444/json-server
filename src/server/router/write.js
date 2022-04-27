"use strict";

const fs = require("fs");
const https = require("https");

module.exports = function write(db) {
  return (req, res, next) => {
    db.write();

    // Synchronize the file with my own server
    fs.readFile("./db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const options = {
        hostname: 'xvvv.nl',
        path: '/api/updateDb.php',
        method: 'POST'
      };
      const req = https.request(options, (res) => {
        if (res.statusCode !== 200) {
          console.error("Could not update json db");
          return; // Something definitely went wrong lol
        }
        console.log("Sync operation successful ☺");
      });
      req.write(data);
      req.end();
    });

    next();
  };
};
