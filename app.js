const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const axios = require("axios");
const AppInfo = require("./appinfo.json");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", router);
app.use(express.static("public"));
app.engine("html", require("ejs").renderFile);

var url = "http://mock-api.com/onwOb0nN.mock/auth";
//------------------------------------------------------------------------

router.get("/", (req, res) => {
  const { username } = AppInfo;
  res.render(__dirname + "/index.html", {
    username,
  });
});

router.get("/privacy", (req, res) => {
  const { username, appname, email } = AppInfo;
  res.render(__dirname + "/privacy.html", { username, appname, email });
});

router.get("/contact", (req, res) => {
  const { username, email } = AppInfo;
  res.render(__dirname + "/contact.html", { username, email });
});
//------------------------------------------------------------------------
router.get("/v1/login", (req, res) => {
  axios
    .get(url)
    .then((response) => {
      console.log(response.data);
      if (response.data.enable === true) {
        res.status(200).send({
          isLogged: response.data.enable,
          role: response.data.mode,
          token: response.data.url,
        });
      } else {
        res.status(400).send({ message: "Auth failed" });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

const hostname = "0.0.0.0";
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Serving running at http://${hostname}:${port}/`);
});
