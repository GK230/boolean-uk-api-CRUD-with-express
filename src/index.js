const express = require("express");
const morgan = require("morgan");

const db = require("./utils/database");

// Import routers
const booksRouter = require("./resources/books/router");

const app = express();

// Set up middleware
app.use(morgan("dev"));
app.use(express.json());

// Set up routes
app.use("/books", booksRouter);

app.get("*", (req, res) => {
  res.json({ ok: true });
});

// Start server
const port = 3030;

app.listen(port, () => {
  db.connect((error) => {
    if (error) {
      console.error("[ERROR] Connection error: ", error.stack);
    } else {
      console.log("\n[DB] Connected....\n");
    }
  });
  console.log(`[SERVER] Running on http://localhost:${port}/`)
});
