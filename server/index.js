const express = require("express");
const app = express();
const path = require("path");

const filepath = path.join(__dirname, "../practice/dist");

const serveStatic = express.static(filepath);

//
const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next(); // Passes the request to the next middleware/controller
};

app.use(serveStatic);
app.use(logRoutes);

// All endpoints start at `/` which is the "root" of the server

app.get("/api/picture", (req, res, next) => {
  res.json({
    src: "https://static-cdn.jtvnw.net/jtv_user_pictures/meowntain-profile_banner-71b7a6d0d943dc9e-480.jpeg",
  });
});

app.get("/api/joke", (req, res, next) => {
  res.json({
    setup: "what do you call a pile of kittens?",
    punchline: "a meowntain",
  });
});

app.get("/api/rollDie", (req, res, next) => {
  let quantity = req.query.quantity;

  if (!quantity || isNaN(quantity) || quantity <= 0) {
    quantity = 1;
  } else {
    quantity = Number(quantity);
  }

  const rolls = [];
  for (let i = 0; i < quantity; i++) {
    rolls.push(Math.floor(Math.random() * 6) + 1);
  }
  res.json({ rolls });
});

const port = 8080;
app.listen(port);
