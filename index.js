const express = require("express");
const morgan = require("morgan");
const fetch = require("node-fetch");
const { auth, assert, serve } = require("./lib");

const app = express();
const PORT = 8080;

app.use(morgan("combined"));
app.use(auth);

app.get("/", (req, res) => {
  assert(
    process.env.TOKEN !== undefined,
    "process.env.TOKEN can not be undefined"
  );

  fetch("https://api-dev.digitalhumani.com/tree", {
    method: "post",
    body: JSON.stringify({
      enterpriseId: "4dfe9cdc",
      projectId: "91919191",
      user: "michael.shi@logdna.com",
      treeCount: 1,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((json) => {
      fetch(
        "https://api-dev.digitalhumani.com/enterprise/4dfe9cdc/treeCount?startDate=2020-09-01&endDate=2020-11-01"
      )
        .then((response) => response.json())
        .then((json) => {
          res.send(`🌲🌲🌲 Total trees planted: ${json.count} 🌲🌲🌲\n`);
        });
    });
});

serve(app.listen(PORT, () => console.log(`Server running on ${PORT}`)));
